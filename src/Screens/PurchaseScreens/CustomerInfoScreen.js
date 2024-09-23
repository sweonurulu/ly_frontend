import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./CustomerInfoScreen.css"; // Özel CSS dosyası ekleyin

const CustomerInfoScreen = ({ onCustomerSubmit }) => {
  const [customerData, setCustomerData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    tcIdNumber: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Ad validasyonu (Boş olamaz ve en az 2 karakter)
    if (!customerData.name.trim()) {
      newErrors.name = "Ad boş olamaz.";
    } else if (customerData.name.length < 2) {
      newErrors.name = "Ad en az 2 karakter olmalıdır.";
    }

    // Soyad validasyonu (Boş olamaz ve en az 2 karakter)
    if (!customerData.surname.trim()) {
      newErrors.surname = "Soyad boş olamaz.";
    } else if (customerData.surname.length < 2) {
      newErrors.surname = "Soyad en az 2 karakter olmalıdır.";
    }

    // E-posta validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerData.email.trim()) {
      newErrors.email = "E-posta boş olamaz.";
    } else if (!emailRegex.test(customerData.email)) {
      newErrors.email = "Geçersiz e-posta formatı.";
    }

    // Telefon numarası validasyonu (Basit validasyon: sadece 10 haneli sayısal kontrol)
    const phoneRegex = /^\d{10}$/;
    if (!customerData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Telefon numarası boş olamaz.";
    } else if (!phoneRegex.test(customerData.phoneNumber)) {
      newErrors.phoneNumber = "Telefon numarası 10 haneli olmalıdır.";
    }

    // TC Kimlik No validasyonu (11 haneli olmalı ve sadece sayılar içermeli)
    const tcIdRegex = /^\d{11}$/;
    if (!customerData.tcIdNumber.trim()) {
      newErrors.tcIdNumber = "TC Kimlik No boş olamaz.";
    } else if (!tcIdRegex.test(customerData.tcIdNumber)) {
      newErrors.tcIdNumber = "TC Kimlik No 11 haneli olmalıdır.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onCustomerSubmit(customerData); // Müşteri bilgilerini üst bileşene ilet
    }
  };

  return (
    <MDBContainer>
      <MDBCard className="shadow-lg">
        <MDBCardBody>
          <h4 className="text-center mb-4">Müşteri Bilgileri</h4>

          <div className="form-group">
            <MDBInput
              label="Ad"
              name="name"
              onChange={handleChange}
              value={customerData.name}
              className="my-3"
              invalid={!!errors.name}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <MDBInput
              label="Soyad"
              name="surname"
              onChange={handleChange}
              value={customerData.surname}
              className="my-3"
              invalid={!!errors.surname}
            />
            {errors.surname && <p className="error-text">{errors.surname}</p>}
          </div>

          <div className="form-group">
            <MDBInput
              label="E-posta"
              name="email"
              type="email"
              onChange={handleChange}
              value={customerData.email}
              className="my-3"
              invalid={!!errors.email}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <MDBInput
              label="Telefon"
              name="phoneNumber"
              onChange={handleChange}
              value={customerData.phoneNumber}
              className="my-3"
              invalid={!!errors.phoneNumber}
            />
            {errors.phoneNumber && (
              <p className="error-text">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="form-group">
            <MDBInput
              label="TC Kimlik No"
              name="tcIdNumber"
              onChange={handleChange}
              value={customerData.tcIdNumber}
              className="my-3"
              invalid={!!errors.tcIdNumber}
            />
            {errors.tcIdNumber && (
              <p className="error-text">{errors.tcIdNumber}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#007bff", // Bootstrap'in 'primary' rengi
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%", // 'block' yapısı için genişliği %100 ayarlıyoruz
              transition: "none", // Butona tıklanıldığında herhangi bir animasyon olmasını istemiyorsanız
            }}
          >
            Devam Et
          </button>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default CustomerInfoScreen;
