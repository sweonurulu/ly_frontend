import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { updateAddress, deleteAddress } from "../axios/addressApi"; // Adres işlemleri API fonksiyonları
import cities from "../cities.json"; // Şehir ve ilçe bilgileri JSON'dan geliyor
import toast from "react-hot-toast"; // Toast kütüphanesi

const EditAddressModal = ({ show, handleClose, addressData, userId }) => {
  const [formData, setFormData] = useState({
    title: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    zipCode: "",
  });

  const [districts, setDistricts] = useState([]); // İlçe bilgilerini tutmak için

  useEffect(() => {
    if (addressData) {
      setFormData(addressData);
    }
  }, [addressData]);

  useEffect(() => {
    // Şehir seçildiğinde o şehre ait ilçeleri ayarlayın
    const selectedCity = cities.find((city) => city.name === formData.city);
    if (selectedCity) {
      setDistricts(selectedCity.districts);
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

  const handleSubmit = async () => {
    try {
      await updateAddress(userId, formData); // Adresi güncelle
      toast.success("Adres başarıyla güncellendi!");
      handleClose();
    } catch (error) {
      toast.error("Adres güncellenirken bir hata oluştu.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAddress(userId, addressData._id); // Adresi sil
      toast.success("Adres başarıyla silindi!");
      handleClose();
    } catch (error) {
      toast.error("Adres silinirken bir hata oluştu.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adres Güncelle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Adres Başlığı</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="addressLine1">
            <Form.Label>Adres Satırı 1</Form.Label>
            <Form.Control
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
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
                  required
                >
                  <option value="">Şehir Seçiniz</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
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
                  required
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
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Adresi Sil
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          İptal
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Güncelle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAddressModal;
