import React from "react";
import { Card, Image } from "react-bootstrap";

const PaymentBookInfo = ({ books }) => {
  // books boş ya da undefined ise
  if (!books || books.length === 0) {
    return <div>Ödeme yapılacak kitap bulunamadı.</div>;
  }

  return (
    <div className="mb-4">
      <Card>
        <Card.Header>
          <h5>Ödeme Yapılacak Kitaplar</h5>
        </Card.Header>
        <Card.Body>
          {books.map((book) => (
            <div key={book._id} className="mb-3 d-flex align-items-center">
              {/* Kitap küçük resmi */}
              {book.bookImg && book.bookImg.image ? (
                <Image
                  src={`data:${book.bookImg.contentType};base64,${book.bookImg.image.toString('base64')}`}
                  alt={book.bookName}
                  rounded
                  style={{ width: "60px", height: "90px", marginRight: "15px" }}
                />
              ) : (
                <Image
                  src="/path-to-default-image.jpg" // Varsayılan bir resim yolu ekleyebilirsiniz
                  alt="Varsayılan Görsel"
                  rounded
                  style={{ width: "60px", height: "90px", marginRight: "15px" }}
                />
              )}
              <div>
                <h6>{book.bookName}</h6> {/* Kitap ismi */}
                <p>Yazar: {book.authors?.length ? book.authors.join(", ") : "Bilinmiyor"}</p> {/* Yazar bilgileri */}
                <p>Fiyat: {book.price ? `${book.price} TL` : "Fiyat bilgisi yok"}</p> {/* Kitap fiyatı */}
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentBookInfo;
