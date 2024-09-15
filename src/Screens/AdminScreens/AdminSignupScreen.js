// AdminSignupScreen.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { adminSignup } from "../../axios/adminApi";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const AdminSignupScreen = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    password: "",
    correctionPassword: "",
    email: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      formData.password.length >= 8 &&
      formData.username.length >= 3 &&
      formData.name.length >= 3 &&
      formData.surname.length >= 3 &&
      formData.email.length >= 5 &&
      phoneNumber.length >= 10 &&
      formData.correctionPassword === formData.password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData, phoneNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const signupData = { ...formData, phoneNumber };

    adminSignup(signupData)
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        console.error(err); // Hata mesajını daha detaylı görmek için
        setError(err.response ? err.response.data.message : "Bir hata oluştu.");
      });
  };

  return (
    <>
    <h1>Admin Kayıt</h1>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formBasicName">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="İsminizi Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicSurname">
              <Form.Label>Soyisim</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
                type="text"
                placeholder="Soyisminizi Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicUsername">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                type="text"
                placeholder="Kullanıcı Adı Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>E-posta</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="E-posta Giriniz"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="Şifre Giriniz"
              />
            </Form.Group>
            <Form.Group
              className="mb-2"
              controlId="formBasicCorrectionPassword"
            >
              <Form.Label>Şifre Tekrar</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    correctionPassword: e.target.value,
                  })
                }
                type="password"
                placeholder="Yeniden Şifre Giriniz"
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
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="KVKK Kabul Ediyorum" />
            </Form.Group>
            <Form.Group className="d-grid">
              <Button
                disabled={disabled}
                variant="primary"
                type="submit"
                className="mt-2"
              >
                Adminlik Başvurusu Yap
              </Button>
              <Form.Text className="text-center mt-2">
                Hesabın var mı? <Link to="/signin">Giriş Yap</Link>
              </Form.Text>
            </Form.Group>
          </Form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                color: "red",
                display: formData.password.length >= 8 && "none",
              }}
            >
              * Şifreniz 8 karakterden fazla olmalı
            </p>
            <p
              style={{
                color: "red",
                display: formData.name.length >= 3 && "none",
              }}
            >
              * İsminiz 3 karakterden fazla olmalı
            </p>
            <p
              style={{
                color: "red",
                display:
                  formData.password === formData.correctionPassword && "none",
              }}
            >
              Şifreler eşleşmiyor.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default AdminSignupScreen;
