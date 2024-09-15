import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookPreviewPdf } from '../../axios/pdfApi'; // Axios fonksiyonunu import et
import { Container, Spinner, Alert } from 'react-bootstrap';
import Footer from "../../Components/Footer";

const ReviewPdfViewer = () => {
  const { bookId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        // PDF verisini backend'den getir
        const response = await getBookPreviewPdf(bookId);

        // PDF verisini blob formatına çevir
        const pdfBlob = new Blob([response], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        setPdfData(pdfUrl); // PDF URL'sini state'e kaydet
        setLoading(false);
      } catch (error) {
        setError('PDF önizleme yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchPdf();
  }, [bookId]);

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
    <Container className="mt-5">
      {pdfData && (
        <iframe
          src={pdfData}
          title="PDF Preview"
          width="100%"
          height="800px"
          style={{ border: 'none' }}
        />
      )}
    
    <Footer/>
    </Container>
  );
};

export default ReviewPdfViewer;
