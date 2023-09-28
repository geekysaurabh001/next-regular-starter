"use server";

import { unlink, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";

export const getArticles = async () => {
  const response = await fetch(`${process.env.NEXT_SERVER_URL}/articles`);
  const articles = await response.json();
  return articles;
};
export const getArticle = async (slug: string) => {
  const response = await fetch(
    `${process.env.NEXT_SERVER_URL}/articles?slug=${slug}`,
  );
  const article = await response.json();
  return article[0];
};
export const createArticle = async (data: FormData) => {
  if (!data) throw new Error("No data provided!");

  let title = data.get("title") as string;
  let description = data.get("description") as string;
  let category = data.get("category") as string;
  let content = data.get("content") as string;
  let image: File | null = data.get("image") as unknown as File;

  // a bunch of sanitisation and validation. small useless example below
  if (!title) throw new Error("Title is required!");
  title = title.trim();
  const slug = title.toLocaleLowerCase().trim().replace(/\s/g, "-");

  if (!description) throw new Error("Description is required!");
  description = description.trim();

  if (!category) throw new Error("Category is required!");
  category = category.trim();
  if (category !== "food" && category !== "games") {
    throw new Error("Invalid category!");
  }

  if (!content) throw new Error("Content is required!");
  content = content.trim();

  if (!image) throw new Error("Image is required!");
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(process.cwd(), "public", "uploaded-images", image.name);
  try {
    await writeFile(path, buffer);
  } catch (err: any) {
    throw new Error(err?.message);
  }

  const finalData = {
    createdAt: new Date().toLocaleDateString(),
    title,
    description,
    content,
    image: `/uploaded-images/${image.name}`,
    category,
    slug,
  };
  try {
    await fetch(`${process.env.NEXT_SERVER_URL}/articles`, {
      method: "post",
      body: JSON.stringify(finalData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidatePath("/");
  } catch (err: any) {
    throw new Error(err?.message);
  }
};
export const deleteArticle = async (data: FormData) => {
  const id = data.get("id") as string;
  const slug = data.get("slug") as string;
  if (!id) throw new Error("No id found!");
  if (!slug) throw new Error("No slug found!");
  try {
    const file = (await getArticle(slug))[0];
    const imagePath = join(process.cwd(), "public", file.image);
    await unlink(imagePath);
    await fetch(`${process.env.NEXT_SERVER_URL}/articles/${id}`, {
      method: "delete",
    });
    revalidatePath("/");
  } catch (err: any) {
    console.error(err?.message);
  }
};
