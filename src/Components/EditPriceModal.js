import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateBookPrice } from '../axios/bookApi'; // Kitap fiyatı güncelleme API çağrısı
import toast from 'react-hot-toast'; // Toast bildirimi için

function EditPriceModal({ show, handleClose, book, setBooks }) {
  const [newPrice, setNewPrice] = useState(book.price || ''); // Yeni fiyatı tutmak için state

  const handleSave = async () => {
    try {
      // API'ye PUT isteği gönder
      await updateBookPrice(book._id, newPrice);
      toast.success('Fiyat başarıyla güncellendi');

      // Güncellenen kitap fiyatını ekranda anında yansıtmak için books state'i güncelle
      setBooks(prevBooks => 
        prevBooks.map(b => (b._id === book._id ? { ...b, price: newPrice } : b))
      );

      handleClose(); // Modal'ı kapat
    } catch (error) {
      toast.error('Fiyat güncellenirken bir hata oluştu');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Fiyatı Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Yeni Fiyat (TL)</Form.Label>
            <Form.Control
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Yeni fiyatı giriniz"
              step="0.01"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPriceModal;
