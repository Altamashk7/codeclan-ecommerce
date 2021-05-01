import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));

const ContactFrom = lazy(() => import("../../components/ContactForm"));

const Contact = () => {
  const title = "We're happy to help";
  const text = "Tel 9723708470 | Myindianthingss@gmail.com";
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "-60px",
        }}
      >
        Contact
      </h1>
      <Container>
        <ContactFrom id="contact" title={title} content={text} />
      </Container>
    </>
  );
};

export default Contact;
