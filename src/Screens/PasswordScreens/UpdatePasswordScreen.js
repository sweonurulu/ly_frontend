import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { resetPassword } from "../../axios/userApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function ResetPasswordScreen() {
  const { resetCode } = useParams(); // URL'deki resetCode'u al
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Şifreler eşleşmiyor.");
      return;
    }

    try {
      await resetPassword(resetCode, newPassword);
      toast.success("Şifreniz başarıyla güncellendi.");
    } catch (error) {
      toast.error("Şifre güncellenemedi.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleResetPassword}>
            <Form.Group controlId="formNewPassword">
              <Form.Label>Yeni Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Yeni Şifre"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Şifreyi Doğrula</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifreyi Doğrula"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Şifreyi Güncelle
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPasswordScreen;
