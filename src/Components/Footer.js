import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import KVKKModal from './KVKKModal';
import MesafeliSatisModal from './MesafeliSatisModal';
import TeslimatIadeModal from './TeslimatIadeModal';

const Footer = () => {
  const [showKVKKModal, setShowKVKKModal] = useState(false);
  const [showMesafeliModal, setShowMesafeliModal] = useState(false);
  const [showTeslimatIadeModal, setShowTeslimatIadeModal] = useState(false);

  return (
    <footer className="footer bg-dark text-white mt-4">
      <Container fluid>
        {/* Üst Kısım: İletişim Bilgileri */}
        <Row className="py-4">
          <Col md={12} className="text-center">
            <p>Adres: Tahtakale Mah. Hicret Sokak No:8/A Avcılar - İSTANBUL</p>
            <p>Telefon: (0212) 619 18 38 | GSM: (+90) 536 351 83 17 | E-mail: lisansyayincilik@gmail.com</p>
          </Col>
        </Row>

        {/* Alt Kısım: Sözleşmeler */}
        <Row className="footer-contracts text-center py-3">
          <Col xs={12}>
            <Button variant="link" className="text-white p-0 mx-2" onClick={() => setShowMesafeliModal(true)}>
              Mesafeli Satış Sözleşmesi
            </Button>
            <Button variant="link" className="text-white p-0 mx-2" onClick={() => setShowTeslimatIadeModal(true)}>
              Teslimat ve İade Koşulları
            </Button>
            <Button variant="link" className="text-white p-0 mx-2" onClick={() => setShowKVKKModal(true)}>
              Gizlilik Politikası
            </Button>
          </Col>
        </Row>

        {/* Modal Bileşenleri */}
        <KVKKModal show={showKVKKModal} handleClose={() => setShowKVKKModal(false)} />
        <MesafeliSatisModal show={showMesafeliModal} handleClose={() => setShowMesafeliModal(false)} />
        <TeslimatIadeModal show={showTeslimatIadeModal} handleClose={() => setShowTeslimatIadeModal(false)} />

        {/* Alt Kısım: Telif Hakkı */}
        <Row className="bg-dark text-white py-3">
          <Col className="text-center">
            <p>&copy; 2024 Lisans Yayıncılık. Tüm Hakları Saklıdır.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
