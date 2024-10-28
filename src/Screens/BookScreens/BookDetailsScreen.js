import React from "react";
import { Card, Table, Button, Row, Col } from "react-bootstrap";

// Buffer'dan Base64 stringine dönüştürme fonksiyonu
const convertBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};


const BookDetailsScreen = ({ book, bookId }) => {
  console.log("Gelen kitap verisi:", book);
  return (
    <Card className="mt-4">
      <Row noGutters>
        <Col md={12} className="text-center">
          <Card.Img
            variant="top"
            src={
              book.bookImg
                ? book.bookImg // Gelen base64 verisi
                : "/default-image.jpg" // Varsayılan resim
            }
            style={{
              height: "300px",
              width: "40%",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col md={12}>
          <Card.Body>
            <Card.Title>{book.bookName}</Card.Title>

            {/* Eğer bookReviewPdfUploaded true ise önizleme butonunu göster */}
            {book.bookReviewPdfUploaded && (
              <Button
                variant="success"
                className="mb-4"
                onClick={() => window.open(`/review-pdf/${bookId}`, '_blank')}
              >
                İçindekiler
              </Button>
            )}

            <Table striped bordered hover>
              <tbody>
                {book.authors && (
                  <tr>
                    <td><strong>Editörler:</strong></td>
                    <td>{book.authors.join(", ")}</td>
                  </tr>
                )}
                {book.publisher && (
                  <tr>
                    <td><strong>Yayınevi:</strong></td>
                    <td>{book.publisher}</td>
                  </tr>
                )}
                {book.isbn && (
                  <tr>
                    <td><strong>ISBN:</strong></td>
                    <td>{book.isbn}</td>
                  </tr>
                )}
                {book.pageCount && (
                  <tr>
                    <td><strong>Sayfa Sayısı:</strong></td>
                    <td>{book.pageCount}</td>
                  </tr>
                )}
                {book.dimensions && (
                  <tr>
                    <td><strong>Ürün Ebatı:</strong></td>
                    <td>{book.dimensions}</td>
                  </tr>
                )}
                {book.language && (
                  <tr>
                    <td><strong>Dil:</strong></td>
                    <td>{book.language}</td>
                  </tr>
                )}
                {book.bindingType && (
                  <tr>
                    <td><strong>Kapak:</strong></td>
                    <td>{book.bindingType}</td>
                  </tr>
                )}
                {book.publishDate && (
                  <tr>
                    <td><strong>Baskı Yılı:</strong></td>
                    <td>{book.publishDate}</td>
                  </tr>
                )}
                {/* Kitabın kategorisini göstermek */}
                {book.bookCategory && (
                  <tr>
                    <td><strong>Kategoriler:</strong></td>
                    <td>{book.bookCategory.map(category => category.name).join(", ")}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default BookDetailsScreen;
