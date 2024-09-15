import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { sendResetCode } from "../../axios/userApi"; // E-posta gönderim API fonksiyonu
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false); // Kod gönderildikten sonra değişir
  const [verificationCode, setVerificationCode] = useState(""); // Kullanıcıdan gelen doğrulama kodu
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      await sendResetCode(email);
      toast.success("Şifre sıfırlama kodu e-posta adresinize gönderildi.");
      setIsCodeSent(true); // Kod gönderildiğini işaretle
    } catch (error) {
      toast.error(
        error.response?.data?.message || "E-posta gönderilirken bir hata oluştu."
      );
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6 || verificationCode.length === 8) {
      // Kod doğrulama işlemi başarılıysa, şifre güncelleme sayfasına yönlendirme
      navigate(`/reset-password/${verificationCode}`);
    } else {
      toast.error("Geçersiz doğrulama kodu.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {!isCodeSent ? (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendCode();
              }}
            >
              <Form.Group controlId="formEmail">
                <Form.Label>E-posta Adresinizi Giriniz</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="E-posta"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Kod Gönder
              </Button>
            </Form>
          ) : (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerifyCode();
              }}
            >
              <Form.Group controlId="formCode">
                <Form.Label>E-posta ile gelen doğrulama kodunu giriniz</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="6 veya 8 haneli kod"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" type="submit" className="mt-3">
                Kodu Doğrula
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPasswordScreen;
