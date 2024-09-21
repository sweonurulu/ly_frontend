import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';

const RentalDetailsDisplay = ({ rentalPeriod, book }) => {
  // Kitap bilgisi null ise bu bileşeni render etme
  if (!book) {
    return (
      <MDBCard className="mb-4">
        <MDBCardBody>
          <MDBCardText>Kitap bilgisi bulunamadı.</MDBCardText>
        </MDBCardBody>
      </MDBCard>
    );
  }

  return (
    <MDBCard className="mb-4">
      <MDBCardBody>
        <MDBCardTitle>Kiralama Detayları</MDBCardTitle>

        {/* Kitap resmi gösterimi */}
        {/*{book.bookImg && book.bookImg.image ? (
          <MDBCardImage 
            src={`data:${book.bookImg.contentType};base64,${book.bookImg.image.toString('base64')}`} 
            alt={book.bookName} 
            fluid 
            style={{ width: '100px', height: '150px' }} 
          />
        ) : (
          <MDBCardText>Resim bulunamadı.</MDBCardText>
        )}*/}

        <MDBCardText>
          <strong>Kitap İsmi:</strong> {book.bookName}
        </MDBCardText>
        <MDBCardText>
          <strong>Editörler:</strong> {book.authors.join(", ")}
        </MDBCardText>
        <MDBCardText>
          <strong>Kiralama Süresi:</strong> {rentalPeriod}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default RentalDetailsDisplay;
