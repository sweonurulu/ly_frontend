import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { uploadEbookWithDetails } from '../axios/bookApi'; // Güncellenmiş fonksiyonu import ediyoruz
import toast from 'react-hot-toast';

const UploadBookModal = ({ showModal, handleClose, bookId }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [reviewPdfFile, setReviewPdfFile] = useState(null);
  const [threeMonthPrice, setThreeMonthPrice] = useState("");
  const [sixMonthPrice, setSixMonthPrice] = useState("");
  const [oneYearPrice, setOneYearPrice] = useState("");

  const handleSendBookPdfs = async () => {
    try {
      const bookData = {
        bookId,
        threeMonthPrice,
        sixMonthPrice,
        oneYearPrice,
      };

      if (pdfFile) {
        await uploadEbookWithDetails(bookData, pdfFile, reviewPdfFile);
        toast.success("Kitap ve inceleme PDF dosyaları başarıyla yüklendi!");
      } else {
        toast.error("Lütfen kitap PDF dosyasını ekleyin.");
      }

      handleClose();
    } catch (error) {
      console.error("Kitap veya inceleme PDF dosyası yüklenirken bir hata oluştu: ", error);
      toast.error("Kitap veya inceleme PDF dosyası yüklenemedi.");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kitap PDF ve İnceleme PDF Dosyalarını Yükle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPdfFile">
            <Form.Label>Kitap PDF Dosyası</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group controlId="formReviewPdfFile">
            <Form.Label>İnceleme PDF Dosyası</Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(e) => setReviewPdfFile(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group controlId="formThreeMonthPrice">
            <Form.Label>3 Aylık Fiyat (TL)</Form.Label>
            <Form.Control
              type="number"
              placeholder="3 aylık kiralama fiyatını girin"
              value={threeMonthPrice}
              onChange={(e) => setThreeMonthPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formSixMonthPrice">
            <Form.Label>6 Aylık Fiyat (TL)</Form.Label>
            <Form.Control
              type="number"
              placeholder="6 aylık kiralama fiyatını girin"
              value={sixMonthPrice}
              onChange={(e) => setSixMonthPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formOneYearPrice">
            <Form.Label>1 Yıllık Fiyat (TL)</Form.Label>
            <Form.Control
              type="number"
              placeholder="1 yıllık kiralama fiyatını girin"
              value={oneYearPrice}
              onChange={(e) => setOneYearPrice(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          İptal
        </Button>
        <Button variant="primary" onClick={handleSendBookPdfs}>
          Gönder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadBookModal;
