import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { contact } from "../../axios/contactApi";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../Components/Footer";
import LeftBar from "../../Components/LeftBar"; // LeftBar bileşenini import edin

function ContactScreenGuest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verileri doğrula
      if (!name || !surname || !email || !phoneNumber || !message) {
        toast.error("Lütfen tüm alanları doldurun.");
        return;
      }

      const formData = { name, surname, email, phoneNumber, message };
      const res = await contact(formData);

      if (res.message === "Mesajınız alındı.") {
        setSubmitted(true);
        toast.success(
          "Mesajınız alındı, bizimle iletişime geçtiğiniz için teşekkür ederiz!"
        );
        // Formu temizle
        setName("");
        setSurname("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Mesaj gönderilirken bir hata oluştu.");
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <LeftBar /> {/* LeftBar bileşenini sol tarafa ekliyoruz */}
          </Col>
          <Col md={9}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label>İsim</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="İsminizi Giriniz"
                  value={name}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicSurname">
                <Form.Label>Soyisim</Form.Label>
                <Form.Control
                  onChange={(e) => setSurname(e.target.value)}
                  type="text"
                  placeholder="Soyisminizi Giriniz"
                  value={surname}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>E-posta</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="E-posta Giriniz"
                  value={email}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
                <Form.Label>Telefon Numarası</Form.Label>
                <PhoneInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  defaultCountry="TR"
                  className="react-phone-input"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicMessage">
                <Form.Label>Mesaj</Form.Label>
                <Form.Control
                  onChange={(e) => setMessage(e.target.value)}
                  as="textarea"
                  placeholder="Mesajınızı Giriniz"
                  value={message}
                  required
                />
              </Form.Group>
              <Form.Group className="d-grid">
                <Button variant="primary" type="submit" className="mt-2">
                  Gönder
                </Button>
              </Form.Group>
            </Form>
            <Toaster />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ContactScreenGuest;
