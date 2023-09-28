import Container from "@/components/layouts/Container";

const Header = () => {
  return (
    <header className="bg-gray-950 py-4 text-gray-50">
      <Container>
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl font-bold">Next App Router</p>
        </div>
      </Container>
    </header>
  );
};

export default Header;
