import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useSearchParams } from "react-router-dom";

const PaymentScreen = () => {
  const [searchParams] = useSearchParams();
  const bookNo = searchParams.get("bookNo");
  const rentalPeriod = searchParams.get("rentalPeriod");

  // Form state ve error state
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Kart sahibinin adı validasyonu (boş olamaz)
    if (!paymentData.cardName.trim()) {
      newErrors.cardName = "Kart sahibinin adı boş olamaz.";
    }

    // Kart numarası validasyonu (16 haneli sayısal olmalı)
    const cardNumberRegex = /^\d{16}$/;
    if (!paymentData.cardNumber.trim()) {
      newErrors.cardNumber = "Kart numarası boş olamaz.";
    } else if (!cardNumberRegex.test(paymentData.cardNumber)) {
      newErrors.cardNumber = "Kart numarası 16 haneli olmalıdır.";
    }

    // Son kullanma tarihi validasyonu (MM/YY formatında olmalı)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!paymentData.expiryDate.trim()) {
      newErrors.expiryDate = "Son kullanma tarihi boş olamaz.";
    } else if (!expiryDateRegex.test(paymentData.expiryDate)) {
      newErrors.expiryDate = "Son kullanma tarihi MM/YY formatında olmalıdır.";
    }

    // CVV validasyonu (3 haneli sayısal olmalı)
    const cvvRegex = /^\d{3}$/;
    if (!paymentData.cvv.trim()) {
      newErrors.cvv = "CVV boş olamaz.";
    } else if (!cvvRegex.test(paymentData.cvv)) {
      newErrors.cvv = "CVV 3 haneli olmalıdır.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert(`Ödeme yapılıyor... Kitap No: ${bookNo}, Kiralama Süresi: ${rentalPeriod}`);
    }
  };

  return (
    <MDBContainer>
      <MDBCard className="rounded-3 shadow-lg">
        <MDBCardBody className="p-4">
          <h4 className="text-center mb-4">Ödeme Bilgileri</h4>
          <div className="form-group">
            <MDBInput
              label="Kart Sahibinin Adı"
              name="cardName"
              value={paymentData.cardName}
              onChange={handleChange}
              size="md" // Boyutu küçültmek için "md" olarak ayarlandı
              placeholder="Kart sahibinin adını girin"
              className="my-2"
            />
            {errors.cardName && <p style={{ color: "red" }}>{errors.cardName}</p>}
          </div>
          <MDBRow>
            <MDBCol size="6">
              <MDBInput
                label="Kart Numarası"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                size="md" // Boyutu küçültmek için "md" olarak ayarlandı
                placeholder="1234 5678 1234 5678"
              />
              {errors.cardNumber && <p style={{ color: "red" }}>{errors.cardNumber}</p>}
            </MDBCol>
            <MDBCol size="4">
              <MDBInput
                label="Son Kullanma Tarihi"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                size="md" // Boyutu küçültmek için "md" olarak ayarlandı
                placeholder="MM/YY"
              />
              {errors.expiryDate && <p style={{ color: "red" }}>{errors.expiryDate}</p>}
            </MDBCol>
            <MDBCol size="2">
              <MDBInput
                label="CVV"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                type="password"
                size="md" // Boyutu küçültmek için "md" olarak ayarlandı
                placeholder="CVV"
              />
              {errors.cvv && <p style={{ color: "red" }}>{errors.cvv}</p>}
            </MDBCol>
          </MDBRow>
          <MDBBtn
            onClick={handlePayment}
            color="success"
            size="md" // Buton boyutu da "md" olarak küçültüldü
            block
            className="mt-3"
            style={{ transition: "none" }}
          >
            Ödeme Yap
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default PaymentScreen;
