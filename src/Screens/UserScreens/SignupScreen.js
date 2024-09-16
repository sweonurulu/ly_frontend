import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
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
    phoneNumber: "", // phoneNumber formData içinde tutulacak
    email: "",
    userType: "USER",
  });

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [showKVKKModal, setShowKVKKModal] = useState(false); // Modal için state
  const [validated, setValidated] = useState(false); // Validasyon durumu

  // Touched durumlarını yönetmek için ayrı state
  const [touched, setTouched] = useState({
    username: false,
    name: false,
    surname: false,
    password: false,
    correctionPassword: false,
    email: false,
    phoneNumber: false
  });

  // Validasyon mesajlarını izlemek için state
  const [validationMessages, setValidationMessages] = useState({
    password: "",
    username: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    correctionPassword: ""
  });

  // Telefon numarasını formData içinde güncelle
  useEffect(() => {
    setFormData({ ...formData, phoneNumber });
  }, [phoneNumber]);

  useEffect(() => {
    const newValidationMessages = {
      password: formData.password.length >= 8 ? "" : "Şifre en az 8 karakter olmalıdır.",
      username: formData.username.length >= 3 ? "" : "Kullanıcı adı en az 3 karakter olmalıdır.",
      name: formData.name.length >= 3 ? "" : "İsim en az 3 karakter olmalıdır.",
      surname: formData.surname.length >= 3 ? "" : "Soyisim en az 3 karakter olmalıdır.",
      email: formData.email.length >= 5 ? "" : "Geçerli bir e-posta adresi giriniz.",
      phoneNumber: formData.phoneNumber && formData.phoneNumber.length >= 10 ? "" : "Geçerli bir telefon numarası giriniz.",
      correctionPassword: formData.correctionPassword === formData.password ? "" : "Şifreler eşleşmiyor."
    };

    setValidationMessages(newValidationMessages);

    // Herhangi bir validasyon mesajı varsa butonu disable yap
    const hasErrors = Object.values(newValidationMessages).some((message) => message !== "");
    setDisabled(hasErrors);

  }, [formData]);

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      try {
        await register(formData);
        navigate("/signin");
      } catch (err) {
        setError(err.message || "Kayıt işlemi sırasında bir hata oluştu.");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formBasicName">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                required
                onBlur={() => handleBlur('name')} // Blura ekliyoruz
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                type="text"
                placeholder="İsminizi Giriniz"
                minLength={3}
              />
              {touched.name && validationMessages.name && <Alert variant="danger">{validationMessages.name}</Alert>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicSurname">
              <Form.Label>Soyisim</Form.Label>
              <Form.Control
                required
                onBlur={() => handleBlur('surname')} // Blura ekliyoruz
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                type="text"
                placeholder="Soyisminizi Giriniz"
                minLength={3}
              />
              {touched.surname && validationMessages.surname && <Alert variant="danger">{validationMessages.surname}</Alert>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicUsername">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                required
                onBlur={() => handleBlur('username')} // Blura ekliyoruz
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                type="text"
                placeholder="Kullanıcı Adı Giriniz"
                minLength={3}
              />
              {touched.username && validationMessages.username && <Alert variant="danger">{validationMessages.username}</Alert>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>E-posta</Form.Label>
              <Form.Control
                required
                onBlur={() => handleBlur('email')} // Blura ekliyoruz
                type="email"
                placeholder="E-posta Giriniz"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {touched.email && validationMessages.email && <Alert variant="danger">{validationMessages.email}</Alert>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                required
                minLength={8}
                onBlur={() => handleBlur('password')} // Blura ekliyoruz
                type="password"
                placeholder="Şifre Giriniz"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {touched.password && validationMessages.password && <Alert variant="danger">{validationMessages.password}</Alert>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPasswordConfirmation">
              <Form.Label>Şifre Tekrar</Form.Label>
              <Form.Control
                required
                onBlur={() => handleBlur('correctionPassword')} // Blura ekliyoruz
                type="password"
                placeholder="Yeniden Şifre Giriniz"
                onChange={(e) => setFormData({ ...formData, correctionPassword: e.target.value })}
              />
              {touched.correctionPassword && validationMessages.correctionPassword && <Alert variant="danger">{validationMessages.correctionPassword}</Alert>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPhoneNumber">
              <Form.Label>Telefon Numarası</Form.Label>
              <PhoneInput 
                required
                onBlur={() => handleBlur('phoneNumber')} // Blura ekliyoruz
                value={phoneNumber} 
                onChange={setPhoneNumber} 
                defaultCountry="TR" 
                className="react-phone-input" 
              />
              {touched.phoneNumber && validationMessages.phoneNumber && <Alert variant="danger">{validationMessages.phoneNumber}</Alert>}
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicCheckbox">
              <Form.Check 
                required 
                type="checkbox" 
                label={<span><Link to="#" onClick={() => setShowKVKKModal(true)}>Gizlilik Politikası</Link> Kabul Ediyorum</span>} 
              />
              <Form.Control.Feedback type="invalid">
                Gizlilik politikasını kabul etmelisiniz.
              </Form.Control.Feedback>
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
        </Col>
      </Row>

      {/* Gizlilik Politikası Modal'ı */}
      <KVKKModal show={showKVKKModal} handleClose={() => setShowKVKKModal(false)} />
    </Container>
  );
};

export default SignupScreen;
