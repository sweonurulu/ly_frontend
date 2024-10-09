import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPdfContent } from '../../axios/pdfApi'; // PDF içeriğini getiren fonksiyon
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import Footer from "../../Components/Footer";
import LeftBar from "../../Components/LeftBar"; // LeftBar bileşeni

const PdfViewer = () => {
  const { pdfId } = useParams(); // MongoDB'deki `_id` parametresini al
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    if (!pdfId) {
      setError('PDF ID eksik.');
      setLoading(false);
      return;
    }

    const fetchPdf = async () => {
      try {
        const response = await getPdfContent(pdfId); // PDF verisini _id ile getir
        console.log("PDF verisi alındı:", response);

        if (response && response.byteLength > 0) {
          // ArrayBuffer'dan Blob oluşturma
          const pdfBlob = new Blob([response], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          console.log(pdfUrl);
          setPdfData(pdfUrl);  // PDF URL'sini state'e kaydet
        } else {
          throw new Error('Boş veya geçersiz PDF verisi alındı.');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message || 'PDF yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchPdf();
  }, [pdfId]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={3}>
          <LeftBar /> {/* LeftBar bileşeni sol tarafta */}
        </Col>
        <Col md={9}>
          {pdfData ? (
            <iframe
              src={pdfData}
              title={pdfId}
              width="100%"
              height="800px"
              style={{ border: 'none' }}
            />
          ) : (
            <Alert variant="warning">PDF dokümanı yüklenemedi.</Alert>
          )}
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default PdfViewer;
