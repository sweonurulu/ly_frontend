import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginRequiredModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    handleClose();
    navigate('/signin');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Giriş Yapmanız Gerekiyor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Giriş yaptıktan sonra alışverişinize devam edebilirsiniz.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLogin}>
          Giriş Yap
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginRequiredModal;
