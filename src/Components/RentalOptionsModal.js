// RentalOptionsModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const RentalOptionsModal = ({ show, handleClose, book }) => {
  const [rentalPeriod, setRentalPeriod] = useState("");
  const navigate = useNavigate();

  const handleRental = () => {
    if (!rentalPeriod) {
      toast.error("Lütfen bir kiralama süresi seçin!");
      return;
    }
  
    if (!book || !book.bookNo) {
      toast.error("Kitap bilgileri eksik!");
      return;
    }
  
    // Ödeme sayfasına yönlendir, seçilen süreyi de gönder
    navigate(`/payment?bookId=${book._id}&rentalPeriod=${rentalPeriod}`);
    handleClose(); // Modalı kapat
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Kiralama Seçenekleri</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Kiralama Süresi Seçin</Form.Label>
            <Form.Control
              as="select"
              value={rentalPeriod}
              onChange={(e) => setRentalPeriod(e.target.value)}
            >
              <option value="">Seçim Yapın</option>
              <option value="3 months">3 Aylık</option>
              <option value="6 months">6 Aylık</option>
              <option value="12 months">1 Yıllık</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
        <Button variant="primary" onClick={handleRental}>
          Kirala
        </Button>
      </Modal.Footer>
      <Toaster /> {/* Toast bildirimlerini göstermek için Toaster bileşeni */}
    </Modal>
    
  );
};

export default RentalOptionsModal;
