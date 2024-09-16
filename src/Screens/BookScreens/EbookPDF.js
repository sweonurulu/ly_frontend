import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Container, Row, Col } from "react-bootstrap";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const EbookPDF = () => {
  const { bookPdfId } = useParams(); // Dinamik ID'yi almak için useParams kullanılır
  const [pdfFile, setPdfFile] = useState(null); // PDF dosyası state
  const [numPages, setNumPages] = useState(null); // Toplam sayfa sayısı

  useEffect(() => {
    // Dinamik olarak ilgili PDF dosyasını fetch etmek veya bir API'den almak
    const fetchPdf = async () => {
      try {
        // API çağrısı yaparak bookPdfId'ye ait PDF dosyasını al
        // Örneğin:
        // const response = await fetch(`/api/books/pdf/${bookPdfId}`);
        // const pdfData = await response.blob();
        // setPdfFile(URL.createObjectURL(pdfData));
        
        // Şu anlık varsayılan bir PDF dosyasını gösteriyoruz
        setPdfFile(`/path/to/pdf/files/${bookPdfId}.pdf`); // Kendi PDF dosya yolunuzu ekleyin
      } catch (error) {
        console.error("PDF dosyası yüklenirken bir hata oluştu:", error);
      }
    };

    fetchPdf();
  }, [bookPdfId]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>E-Kitap PDF Görüntüleyici</h2>
          {pdfFile ? (
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          ) : (
            <p>PDF dosyası yükleniyor...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EbookPDF;
