import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose();
    navigate('/signin');
  };

  const handleGuestCheckout = () => {
    handleClose();
    // Burada üye olmadan devam edilecek bir rotaya yönlendirebilirsin
    // Örneğin: navigate('/guest-checkout');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Giriş Yap veya Üye Olmadan Devam Et</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Lütfen devam etmek için giriş yapın veya üye olmadan satın alma işlemini gerçekleştirin.</p>
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
