import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookPdf } from '../../axios/pdfApi'; // PDF API'sini import ediyoruz
import PDFViewer from './PDFViewer'; // PDFViewer bileşenini import ediyoruz
import { Container, Spinner, Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Footer from "../../Components/Footer";

const EbookPDF = () => {
  const { bookId } = useParams(); // URL'den bookId'yi alıyoruz
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const token = Cookies.get('token'); // Kullanıcı token'ını alıyoruz
        const pdfBlobUrl = await getBookPdf(bookId, token); // PDF verisini backend'den alıyoruz
        setPdfUrl(pdfBlobUrl); // PDF URL'sini state'e kaydediyoruz
        setLoading(false);
      } catch (error) {
        setError("PDF yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchPdf();
  }, [bookId]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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
    <Container className="mt-5">
      {pdfUrl ? <PDFViewer pdfUrl={pdfUrl} /> : <Alert variant="danger">PDF verisi bulunamadı</Alert>}
      <Footer />
    </Container>
  );
};

export default EbookPDF;
