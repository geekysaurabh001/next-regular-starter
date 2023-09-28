import Container from "../layouts/Container";

const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-950 py-4 text-gray-50">
      <Container>
        <div className="flex w-full items-center justify-center">
          <p>
            Copyright &copy; {new Date().getFullYear()} | All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
