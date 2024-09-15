import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const KVKKModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>KVKK Aydınlatma Metni</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca işlenmektedir. 
          Bu aydınlatma metni, kişisel verilerinizin toplanma ve işlenme amaçlarını, işlenme sürecinde sahip 
          olduğunuz hakları ve bu hakların nasıl kullanılabileceğini açıklamaktadır.
        </p>
        <p>
          Daha fazla bilgi için lütfen <strong>KVKK Aydınlatma Metni</strong>'ni dikkatlice okuyun.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KVKKModal;
