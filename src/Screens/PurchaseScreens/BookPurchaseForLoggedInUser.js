import React, { useState, useEffect } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn, MDBCardHeader } from "mdb-react-ui-kit";
import { Form } from "react-bootstrap";
import { getProfile } from "../../axios/userApi"; // Kullanıcı profilini almak için
import AddAddressModal from "../../Components/AddAddressModal"; // Adres ekleme modali

const BookPurchaseForLoggedInUser = ({ onPurchaseSubmit }) => {
  const [customerData, setCustomerData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    zipCode: "",
  });

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

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setCustomerData({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      district: address.district,
      zipCode: address.zipCode,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPurchaseSubmit(customerData); // Satın alma işlemi başlat
  };

  return (
    <MDBContainer>
      <MDBCard className="shadow-lg">
        <MDBCardHeader className="text-center">
          <h4>Fiziksel Kitap Satın Al - Giriş Yapmış Kullanıcı</h4>
        </MDBCardHeader>
        <MDBCardBody>
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

          <MDBBtn onClick={handleSubmit} color="primary" size="lg" block className="mt-4">
            Satın Al
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default BookPurchaseForLoggedInUser;
