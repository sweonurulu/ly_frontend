import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, handleClose, bookId }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose();
    navigate('/signin');
  };

  const handleGuestCheckout = () => {
    handleClose();
    // Kitap ID'sini liste formatında aktararak ödeme sayfasına yönlendiriyoruz
    const bookIds = JSON.stringify([bookId]); // Tek kitap ID'si içeren bir liste
    navigate(`/payment?books=${encodeURIComponent(bookIds)}&purchase=true`, {
      state: { isGuest: true }, // Üye olmadan devam edildiğini belirtmek için state ekliyoruz
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Giriş Yap veya Üye Olmadan Devam Et</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Lütfen devam etmek için giriş yapın veya üye olmadan satın alma işlemini gerçekleştirin.
        </p>
        <p style={{ fontSize: '12px', color: 'gray' }}>
          Üye olmadan satın aldığınızda ödeme bilgilerinizi manuel olarak girmeniz gerekecek.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLogin}>
          Giriş Yap
        </Button>
        <Button variant="secondary" onClick={handleGuestCheckout}>
          Üye Olmadan Satın Al
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
