import { createArticle } from "@/actions/articles";

export default function Form() {
  return (
    <form action={createArticle} className="form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input type="text" name="title" id="title" required aria-required />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          required
          aria-required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          cols={30}
          rows={10}
          required
          aria-required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input type="file" name="image" id="image" required aria-required />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          name="category"
          id="category"
          required
          aria-required
          defaultValue="food"
        >
          <option value="food">food</option>
          <option value="games">games</option>
        </select>
      </div>
      <div className="form-group">
        <button type="submit" className="form-button">
          Create Article
        </button>
      </div>
    </form>
  );
}
