import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCardHeader } from "mdb-react-ui-kit";
import { Form, Row, Col } from "react-bootstrap";
import { getProfile } from "../../axios/userApi"; // Kullanıcı profilini almak için
import AddAddressModal from "../../Components/AddAddressModal"; // Adres ekleme modali

const BookPurchaseScreen = ({ onPurchaseSubmit }) => {
  const [customerData, setCustomerData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    tcIdNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false); // Adres modalı için state

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfile(); // Kullanıcı profilini al
        setUser(profile);

        if (profile && profile.addresses) {
          setAddresses(profile.addresses); // Kullanıcının kayıtlı adreslerini getir
        }
      } catch (error) {
        console.error("Kullanıcı bilgileri alınamadı", error);
      }
    };

    fetchUserProfile();
  }, []);

  const validate = () => {
    const newErrors = {};

    // Validasyon
    if (!customerData.name.trim()) {
      newErrors.name = "Ad boş olamaz.";
    } else if (customerData.name.length < 2) {
      newErrors.name = "Ad en az 2 karakter olmalıdır.";
    }

    if (!customerData.surname.trim()) {
      newErrors.surname = "Soyad boş olamaz.";
    } else if (customerData.surname.length < 2) {
      newErrors.surname = "Soyad en az 2 karakter olmalıdır.";
    }

    if (!customerData.email.trim()) {
      newErrors.email = "E-posta boş olamaz.";
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = "Geçerli bir e-posta giriniz.";
    }

    if (!customerData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Telefon numarası boş olamaz.";
    }

    if (!customerData.tcIdNumber.trim()) {
      newErrors.tcIdNumber = "TC Kimlik No boş olamaz.";
    }

    if (!customerData.addressLine1.trim()) {
      newErrors.addressLine1 = "Adres Satırı 1 boş olamaz.";
    }

    if (!customerData.city.trim()) {
      newErrors.city = "Şehir seçilmelidir.";
    }

    if (!customerData.district.trim()) {
      newErrors.district = "İlçe seçilmelidir.";
    }

    if (!customerData.zipCode.trim()) {
      newErrors.zipCode = "Posta Kodu boş olamaz.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onPurchaseSubmit(customerData); // Satın alma işlemi başlat
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setCustomerData({
      ...customerData,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      district: address.district,
      zipCode: address.zipCode,
    });
  };

  return (
    <MDBContainer>
      <MDBCard className="shadow-lg">
        <MDBCardHeader className="text-center">
          <h4>Fiziksel Kitap Satın Al</h4>
        </MDBCardHeader>
        <MDBCardBody>
          {!user ? (
            <>
              <p>Lütfen aşağıdaki bilgileri doldurun:</p>
              {/* Kullanıcı giriş yapmamışsa manuel adres bilgileri girilecek */}
              <MDBInput
                label="Ad"
                name="name"
                value={customerData.name}
                onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                className="mb-3"
                invalid={!!errors.name}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}

              <MDBInput
                label="Soyad"
                name="surname"
                value={customerData.surname}
                onChange={(e) => setCustomerData({ ...customerData, surname: e.target.value })}
                className="mb-3"
                invalid={!!errors.surname}
              />
              {errors.surname && <p className="error-text">{errors.surname}</p>}

              <MDBInput
                label="E-posta"
                name="email"
                value={customerData.email}
                onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                className="mb-3"
                invalid={!!errors.email}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <MDBInput
                label="Telefon Numarası"
                name="phoneNumber"
                value={customerData.phoneNumber}
                onChange={(e) => setCustomerData({ ...customerData, phoneNumber: e.target.value })}
                className="mb-3"
                invalid={!!errors.phoneNumber}
              />
              {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}

              <MDBInput
                label="TC Kimlik No"
                name="tcIdNumber"
                value={customerData.tcIdNumber}
                onChange={(e) => setCustomerData({ ...customerData, tcIdNumber: e.target.value })}
                className="mb-3"
                invalid={!!errors.tcIdNumber}
              />
              {errors.tcIdNumber && <p className="error-text">{errors.tcIdNumber}</p>}

              {/* Adres Bilgileri */}
              <MDBInput
                label="Adres Satırı 1"
                name="addressLine1"
                value={customerData.addressLine1}
                onChange={(e) => setCustomerData({ ...customerData, addressLine1: e.target.value })}
                className="mb-3"
                invalid={!!errors.addressLine1}
              />
              {errors.addressLine1 && <p className="error-text">{errors.addressLine1}</p>}

              <MDBInput
                label="Adres Satırı 2 (Opsiyonel)"
                name="addressLine2"
                value={customerData.addressLine2}
                onChange={(e) => setCustomerData({ ...customerData, addressLine2: e.target.value })}
                className="mb-3"
              />

              <Row>
                <Col>
                  <Form.Group controlId="city">
                    <Form.Label>Şehir</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={customerData.city}
                      onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                      isInvalid={!!errors.city}
                    />
                    {errors.city && <p className="error-text">{errors.city}</p>}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="district">
                    <Form.Label>İlçe</Form.Label>
                    <Form.Control
                      type="text"
                      name="district"
                      value={customerData.district}
                      onChange={(e) => setCustomerData({ ...customerData, district: e.target.value })}
                      isInvalid={!!errors.district}
                    />
                    {errors.district && <p className="error-text">{errors.district}</p>}
                  </Form.Group>
                </Col>
              </Row>

              <MDBInput
                label="Posta Kodu"
                name="zipCode"
                value={customerData.zipCode}
                onChange={(e) => setCustomerData({ ...customerData, zipCode: e.target.value })}
                className="mb-3"
                invalid={!!errors.zipCode}
              />
              {errors.zipCode && <p className="error-text">{errors.zipCode}</p>}
            </>
          ) : (
            <>
              <p>Kayıtlı adres bilgilerinizi seçin veya yeni bir adres ekleyin:</p>
              <Form.Group controlId="selectAddress">
                <Form.Label>Adres Seç</Form.Label>
                <Form.Control as="select" onChange={(e) => handleAddressSelect(addresses[e.target.value])}>
                  <option value="">Adres Seçiniz</option>
                  {addresses.map((address, index) => (
                    <option key={index} value={index}>
                      {address.addressLine1}, {address.city}, {address.district}, {address.zipCode}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <MDBBtn color="secondary" className="mt-3" onClick={() => setShowAddressModal(true)}>
                Yeni Adres Ekle
              </MDBBtn>

              {/* Yeni adres eklemek için modal */}
              <AddAddressModal
                show={showAddressModal}
                handleClose={() => setShowAddressModal(false)}
                userId={user._id}
              />
            </>
          )}

          <MDBBtn onClick={handleSubmit} color="primary" size="lg" block className="mt-4">
            Satın Al
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default BookPurchaseScreen;
