import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import KVKKModal from './KVKKModal';
import MesafeliSatisModal from './MesafeliSatisModal';
import TeslimatIadeModal from './TeslimatIadeModal';
import paytrLogo from '../logo_band_white@3x.png';  // Logo dosyasını bu şekilde import edin
import lisansYayincilikLogo from '../ustlogo.png';  // Logo dosyasını bu şekilde import edin

const Footer = () => {
  const [showKVKKModal, setShowKVKKModal] = useState(false);
  const [showMesafeliModal, setShowMesafeliModal] = useState(false);
  const [showTeslimatIadeModal, setShowTeslimatIadeModal] = useState(false);

  return (
    <footer className="bg-dark text-white mt-4">
      <Container>
        {/* Logo, iletişim bilgileri */}
        <Row>
          <Col className="text-center py-3">
            <h5>Lisans Yayıncılık</h5>
            <p>&copy; 2024 Lisans Yayıncılık. Tüm Hakları Saklıdır.</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-2">
            <p>Adres: Tahtakale Mah. Hicret Sokak No:8/A Avcılar - İSTANBUL</p>
            <p>Telefon: (0212) 619 18 38 | E-mail: lisansyayincilik@gmail.com</p>
          </Col>
        </Row>

        {/* Lisans Yayıncılık ve Hizmetler menüsü */}
        <Row className="py-4">
          <Col xs={6}>
            <h5>LİSANS YAYINCILIK</h5>
            <ul className="list-unstyled">
              <li>Anasayfa</li>
              <li>Kurumsal</li>
              <li>Yayınevi</li>
              <li>Yazarlar</li>
              <li>İletişim</li>
              <li>Blog</li>
              <li>Yayın İlkeleri</li>
            </ul>
          </Col>
          <Col xs={6}>
            <h5>HİZMETLER VE KOŞULLAR</h5>
            <ul className="list-unstyled">
              <li>Müşteri Hizmetleri</li>
              <li>Kullanım Koşulları</li>
              <li>Tüketici Hakları</li>
              <li>
                <Button variant="link" className="text-white p-0" onClick={() => setShowMesafeliModal(true)}>
                  Mesafeli Satış Sözleşmesi
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white p-0" onClick={() => setShowTeslimatIadeModal(true)}>
                  Teslimat ve İade Koşulları
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-white p-0" onClick={() => setShowKVKKModal(true)}>
                  Gizlilik Politikası
                </Button>
              </li>
              <li>Telif Hakkı</li>
            </ul>
          </Col>
        </Row>

        {/* Modal bileşenleri */}
        <KVKKModal show={showKVKKModal} handleClose={() => setShowKVKKModal(false)} />
        <MesafeliSatisModal show={showMesafeliModal} handleClose={() => setShowMesafeliModal(false)} />
        <TeslimatIadeModal show={showTeslimatIadeModal} handleClose={() => setShowTeslimatIadeModal(false)} />

        {/* Alt kısım: telif ve footer */}
        <Row className="bg-dark text-white py-3">
          <Col className="text-center">
            <p>&copy; 2024 Lisans Yayıncılık. Tüm Hakları Saklıdır.</p>
            <img src={paytrLogo} alt="PayTR" style={{ width: "100%", maxWidth: "1000px" }} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
