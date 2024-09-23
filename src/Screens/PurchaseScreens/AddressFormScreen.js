import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { getAddresses } from "../../axios/addressApi"; // Adres bilgilerini almak için
import { getProfile } from "../../axios/userApi"; // Kullanıcı bilgilerini almak için
import citiesData from "../../il-ilce.json"; // Şehir ve ilçe bilgileri JSON'dan geliyor

const AddressFormScreen = () => {
  const [formData, setFormData] = useState({
    title: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    zipCode: "",
  });

  const [addresses, setAddresses] = useState([]); // Kullanıcının mevcut adreslerini tutacak state
  const [userId, setUserId] = useState(null); // Kullanıcı ID bilgisi
  const [districts, setDistricts] = useState([]); // İlçe bilgilerini tutmak için
  const [showForm, setShowForm] = useState(false); // Form varsayılan olarak kapalı
  const cities = citiesData.data;

  // Kullanıcı ve adres bilgilerini çekme
  useEffect(() => {
    const fetchUserAndAddresses = async () => {
      try {
        const userProfile = await getProfile(); // Kullanıcı bilgilerini al
        setUserId(userProfile._id); // Kullanıcı ID'yi kaydet
        
        const fetchedAddresses = await getAddresses(userProfile._id); // Kullanıcının adreslerini al
        setAddresses(fetchedAddresses); // Adresleri kaydet
      } catch (error) {
        console.error("Adresler yüklenirken bir hata oluştu:", error);
      }
    };

    fetchUserAndAddresses();
  }, []);

  // Şehir seçildiğinde ilgili ilçeleri ayarlama
  useEffect(() => {
    const selectedCity = cities.find((city) => city.il_adi === formData.city);
    if (selectedCity) {
      setDistricts(selectedCity.ilceler.map((ilce) => ilce.ilce_adi));
    } else {
      setDistricts([]);
    }
  }, [formData.city]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressSelect = (e) => {
    const selectedAddressId = e.target.value;
    const selectedAddress = addresses.find((address) => address._id === selectedAddressId);

    if (selectedAddress) {
      setFormData({
        title: selectedAddress.title,
        addressLine1: selectedAddress.addressLine1,
        addressLine2: selectedAddress.addressLine2,
        city: selectedAddress.city,
        district: selectedAddress.district,
        zipCode: selectedAddress.zipCode,
      });
    } else {
      setFormData({
        title: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        zipCode: "",
      });
    }
  };

  return (
    <Card className="p-4 mb-4">
      <h4 className="mb-4">Adres Bilgileri</h4>

      {addresses.length > 0 && (
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
      )}

      <Button variant="primary" class="mb-2" block onClick={() => setShowForm(!showForm)}>
        Farklı bir adres gir
      </Button>

      {showForm && (
        <div>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Adres Başlığı</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="addressLine1">
              <Form.Label>Adres Satırı 1</Form.Label>
              <Form.Control
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="addressLine2">
              <Form.Label>Adres Satırı 2</Form.Label>
              <Form.Control
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group controlId="city">
                  <Form.Label>Şehir</Form.Label>
                  <Form.Control
                    as="select"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">Şehir Seçiniz</option>
                    {cities.map((city) => (
                      <option key={city.il_adi} value={city.il_adi}>
                        {city.il_adi}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="district">
                  <Form.Label>İlçe</Form.Label>
                  <Form.Control
                    as="select"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.city}
                  >
                    <option value="">İlçe Seçiniz</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="zipCode">
              <Form.Label>Posta Kodu</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" className="mt-3" block>
              Adresi Onayla
            </Button>
          </Form>
        </div>
      )}
    </Card>
  );
};

export default AddressFormScreen;
