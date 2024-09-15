import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-4">
      <Container>
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
      </Container>
    </footer>
  );
};

export default Footer;
