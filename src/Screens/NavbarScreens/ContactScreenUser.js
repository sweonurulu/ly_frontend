import { useState } from "react";
import { contact } from "../../axios/contactApi.js";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { getProfile } from "../../axios/userApi.js";
import Footer from '../../Components/Footer';
import LeftBar from '../../Components/LeftBar'; // LeftBar bileşenini import edin
import toast, { Toaster } from 'react-hot-toast';

function ContactScreenUser() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useState(() => {
    const fetchUser = async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Verileri doğrula
      if (!message) {
        toast.error('Lütfen mesajınızı girin.');
        return;
      }
  
      const formData = { name: user.name, surname: user.surname, email: user.email, phoneNumber: user.phoneNumber, message };
      const res = await contact(formData);
  
      if (res.message === 'Mesajınız alındı.') {
        setSubmitted(true);
        toast.success('Mesajınız alındı, bizimle iletişime geçtiğiniz için teşekkür ederiz!');
        // Formu temizle
        setMessage('');
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Mesaj gönderilirken bir hata oluştu.");
    }
  };
  

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (submitted) {
    return <Alert variant="success">Mesajınız alındı, bizimle iletişime geçtiğiniz için teşekkür ederiz!</Alert>;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <LeftBar /> {/* LeftBar bileşenini sol tarafa ekliyoruz */}
          </Col>
          <Col md={9}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
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
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ContactScreenUser;
