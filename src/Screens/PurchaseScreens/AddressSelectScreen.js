import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { getAddresses } from "../../axios/addressApi"; // Adres bilgilerini almak için
import { getProfile } from "../../axios/userApi"; // Kullanıcı bilgilerini almak için

const AddressSelectScreen = ({ onAddNewAddress, onAddressSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    const fetchUserAndAddresses = async () => {
      try {
        const userProfile = await getProfile();
        const fetchedAddresses = await getAddresses(userProfile._id);
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error("Adresler yüklenirken bir hata oluştu:", error);
      }
    };
    fetchUserAndAddresses();
  }, []);

  const handleAddressSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedAddressId(selectedId);
    onAddressSelect(selectedId); // Seçilen adres ID'sini dışarı bildir
    console.log(`Seçilen adres: ${selectedId}`);
  };

  return (
    <Card className="p-4 mb-4">
      <h4 className="mb-4">Adres Seçimi</h4>
      {addresses.length > 0 ? (
        <Form.Group controlId="selectAddress">
          <Form.Label>Mevcut Adreslerden Birini Seçin</Form.Label>
          <Form.Control as="select" onChange={handleAddressSelect}>
            <option value="">Adres Seçiniz</option>
            {addresses.map((address) => (
              <option key={address._id} value={address._id}>
                {address.title}: {address.addressLine1}, {address.district}, {address.city}, {address.zipCode}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      ) : (
        <p>Henüz kayıtlı bir adresiniz yok.</p>
      )}

      <Button variant="primary" className="mt-3" block onClick={onAddNewAddress}>
        Farklı bir adres ekle
      </Button>
    </Card>
  );
};

export default AddressSelectScreen;
