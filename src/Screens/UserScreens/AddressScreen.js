import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { getAddresses } from "../../axios/addressApi"; // Adres işlemleri API fonksiyonları
import { useNavigate, useLocation } from 'react-router-dom';
import EditAddressModal from '../../Components/EditAddressModal'; // Düzenleme modalı
import AddAddressModal from '../../Components/AddAddressModal'; // Ekleme modalı

const AddressScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {}; // Kullanıcı ID'sini aldığımız kısım

  const [addresses, setAddresses] = useState([]); // Kullanıcının mevcut adresleri
  const [selectedAddress, setSelectedAddress] = useState(null); // Düzenlenecek adres
  const [showEditModal, setShowEditModal] = useState(false); // Düzenleme modalını kontrol eder
  const [showAddModal, setShowAddModal] = useState(false); // Ekleme modalını kontrol eder

  // Mevcut adresleri getir
  useEffect(() => {
    if (userId) {
      const fetchAddresses = async () => {
        try {
          const data = await getAddresses(userId);
          setAddresses(data);
        } catch (error) {
          console.error("Adresler alınamadı:", error);
        }
      };
      fetchAddresses();
    }
  }, [userId]);

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setShowEditModal(true); // Düzenleme modalını aç
  };

  const handleAddAddress = () => {
    setShowAddModal(true); // Ekleme modalını aç
  };

  return (
    <Container className="py-5">
      <h3>Mevcut Adresleriniz</h3>
      {addresses.length > 0 ? (
        <Row>
          {addresses.map((address) => (
            <Col key={address._id} md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{address.title}</Card.Title>
                  <Card.Text>
                    {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
                    {address.district}, {address.city}, {address.zipCode}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEditAddress(address)} // Düzenle modalını aç
                  >
                    Düzenle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Henüz adres eklemediniz.</p>
      )}

      <div className="mt-4">
        <Button variant="primary" onClick={handleAddAddress}>
          Yeni Adres Ekle
        </Button>
      </div>

      {/* Düzenleme ve Ekleme Modalları */}
      <EditAddressModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        addressData={selectedAddress}
        userId={userId}
      />
      <AddAddressModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        userId={userId}
      />
    </Container>
  );
};

export default AddressScreen;
