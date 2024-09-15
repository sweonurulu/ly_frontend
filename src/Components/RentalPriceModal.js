import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { getGeneralRentedPrice, updateGeneralRentedPrice } from "../axios/rentingApi";

const RentalPriceModal = ({ showModal, handleClose }) => {
  const [threeMonthPercentage, setThreeMonthPercentage] = useState(10);
  const [sixMonthPercentage, setSixMonthPercentage] = useState(20);
  const [oneYearPercentage, setOneYearPercentage] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentedPrice = async () => {
      try {
        const rentedPrice = await getGeneralRentedPrice();
        setThreeMonthPercentage(rentedPrice.threeMonthPercentage);
        setSixMonthPercentage(rentedPrice.sixMonthPercentage);
        setOneYearPercentage(rentedPrice.oneYearPercentage);
        setLoading(false);
      } catch (error) {
        toast.error("Kiralama oranları alınırken bir hata oluştu.");
        setLoading(false);
      }
    };

    if (showModal) {
      fetchRentedPrice();
    }
  }, [showModal]);

  const handleSubmit = async () => {
    try {
      await updateGeneralRentedPrice({
        threeMonthPercentage,
        sixMonthPercentage,
        oneYearPercentage,
      });
      toast.success("Kiralama oranları başarıyla güncellendi.");
      handleClose();
    } catch (error) {
      toast.error("Kiralama oranları güncellenemedi.");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Kiralama Oranlarını Düzenle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Yükleniyor...</span>
            </Spinner>
          </div>
        ) : (
          <Form>
            <Form.Group controlId="threeMonthPercentage">
              <Form.Label>3 Aylık Kiralama Oranı (%)</Form.Label>
              <Form.Control
                type="number"
                value={threeMonthPercentage}
                onChange={(e) => setThreeMonthPercentage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="sixMonthPercentage" className="mt-3">
              <Form.Label>6 Aylık Kiralama Oranı (%)</Form.Label>
              <Form.Control
                type="number"
                value={sixMonthPercentage}
                onChange={(e) => setSixMonthPercentage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="oneYearPercentage" className="mt-3">
              <Form.Label>1 Yıllık Kiralama Oranı (%)</Form.Label>
              <Form.Control
                type="number"
                value={oneYearPercentage}
                onChange={(e) => setOneYearPercentage(e.target.value)}
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      {!loading && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Oranları Güncelle
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default RentalPriceModal;
