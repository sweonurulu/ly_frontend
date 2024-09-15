import React, { useState, useEffect } from "react";
import { Container, Form, Button, FormGroup, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import KVKKModal from '../../Components/KVKKModal'; // KVKKModal bileşenini import et
import { register } from "../../axios/userApi";

const SignupScreen = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    password: "",
    correctionPassword: "",
    phoneNumber: "",
    email: "",
    userType: "USER",
  });
  
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [showKVKKModal, setShowKVKKModal] = useState(false); // Modal için state

  useEffect(() => {
    if (formData.password.length >= 8 &&
      formData.username.length >= 3 &&
      formData.name.length >= 3 &&
      formData.surname.length >= 3 &&
      formData.email.length >= 5 &&
      formData.phoneNumber.length >= 10 &&
      formData.correctionPassword === formData.password 
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

  useEffect(() => {
    setFormData({ ...formData, phoneNumber: phoneNumber })
  }, [phoneNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/signin");
    } catch (err) {
      setError(err.message || "Kayıt işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formBasicName">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                type="text"
                placeholder="İsminizi Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicSurname">
              <Form.Label>Soyisim</Form.Label>
              <Form.Control
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                type="text"
                placeholder="Soyisminizi Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicUsername">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                type="text"
                placeholder="Kullanıcı Adı Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>E-posta</Form.Label>
              <Form.Control
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="email"
                placeholder="E-posta Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                type="password"
                placeholder="Şifre Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPasswordConfirmation">
              <Form.Label>Şifre Tekrar</Form.Label>
              <Form.Control
                onChange={(e) => setFormData({ ...formData, correctionPassword: e.target.value })}
                type="password"
                placeholder="Yeniden Şifre Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
              <Form.Label>Telefon Numarası</Form.Label>
              <PhoneInput value={phoneNumber} onChange={setPhoneNumber} defaultCountry="TR" className="react-phone-input" />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check 
                type="checkbox" 
                label={<span><Link to="#" onClick={() => setShowKVKKModal(true)}>KVKK</Link> Kabul Ediyorum</span>} 
              />
            </Form.Group>
            <Form.Group className="d-grid">
              <Button disabled={disabled} variant="primary" type="submit" className="mt-2">
                Kayıt Ol
              </Button>
              <Form.Text className="text-center mt-2">
                Hesabın var mı? <Link to="/signin">Giriş Yap</Link>
              </Form.Text>
            </Form.Group>
          </Form>
          <div style={{ display: "flex", flexDirection: "column", textAlign: "center", marginTop: "10px" }}>
            <p style={{ color: "red", display: formData.password.length >= 8 ? "none" : "block" }}>
              * Şifreniz 8 karakterden fazla olmalı
            </p>
            <p style={{ color: "red", display: formData.name.length >= 3 ? "none" : "block" }}>
              * İsminiz 3 karakterden fazla olmalı
            </p>
            <p style={{ color: "red", display: formData.password === formData.correctionPassword ? "none" : "block" }}>
              Şifreler eşleşmiyor.
            </p>
          </div>
        </Col>
      </Row>

      {/* KVKK Modal'ı */}
      <KVKKModal show={showKVKKModal} handleClose={() => setShowKVKKModal(false)} />
    </Container>
  );
};

export default SignupScreen;
