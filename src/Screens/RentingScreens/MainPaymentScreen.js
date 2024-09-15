import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import CustomerInfoScreen from "./CustomerInfoScreen";
import PaymentScreen from "./PaymentScreen";
import BookInfo from "./BookInfo";
import { getBookById } from "../../axios/bookApi"; // Kitap bilgilerini almak için
import Footer from '../../Components/Footer';

const MainPaymentScreen = ({ bookId }) => {
  const [customerData, setCustomerData] = useState(null);
  const [book, setBook] = useState(null);

  const handleCustomerSubmit = (data) => {
    setCustomerData(data); // Müşteri bilgilerini kaydet
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId); // Kitap bilgilerini getir
        console.log("Kitap bilgisi:", data); // Kitap verisini kontrol et
        setBook(data);
      } catch (err) {
        console.error("Kitap bilgisi alınamadı:", err);
      }
    };
  
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);
  

  return (
    <>
    <MDBContainer className="py-5">
      <h2 className="text-center mb-4">Ödeme Adımları</h2>

      {book && <BookInfo book={book} />} {/* Kitap Bilgisi Bölümü */}

      <MDBRow>
        <MDBCol md="6">
          <CustomerInfoScreen onCustomerSubmit={handleCustomerSubmit} />
        </MDBCol>
        <MDBCol md="6">
          {customerData ? (
            <PaymentScreen />
          ) : (
            <p className="text-center">Lütfen önce müşteri bilgilerini doldurun.</p>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <Footer/>
    </>
  );
};

export default MainPaymentScreen;
