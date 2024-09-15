import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { getContent } from '../../axios/contentApi';
import Footer from '../../Components/Footer';
import LeftBar from '../../Components/LeftBar';

function InfoScreen() {
  const [aboutUsContent, setAboutUsContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getContent();
        setAboutUsContent(content.aboutUsContent); // Hakkımızda içeriğini ayarla
      } catch (error) {
        console.error("İçerik alınırken hata oluştu:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <LeftBar />
          </Col>
          <Col md={9}>
            <div>{aboutUsContent}</div> {/* Veritabanından çekilen içerik */}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default InfoScreen;
