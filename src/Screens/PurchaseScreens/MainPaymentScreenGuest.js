import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import CustomerInfoScreen from "./CustomerInfoScreen";
import PaymentScreen from "./PaymentScreen";
import BookInfo from "./BookInfo";
import NewAddressFormScreen from "./NewAddressFormScreen"; // Sadece yeni adres formu gösterilecek
import { getBookById } from "../../axios/bookApi";
import Footer from '../../Components/Footer';
import { purchaseBook } from "../../axios/paymentApi"; // Ödeme işlemi için API fonksiyonu

const MainPaymentScreenGuest = ({ bookId }) => {
  const [customerData, setCustomerData] = useState(null);
  const [book, setBook] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentId, setPaymentId] = useState(null); // Ödeme ID'sini tut

  const handleCustomerSubmit = (data) => {
    setCustomerData(data);
    setShowPaymentForm(true);
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId); 
        setBook(data);
      } catch (err) {
        console.error("Kitap bilgisi alınamadı:", err);
      }
    };
  
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const handleAddressConfirm = async (address) => {
    setAddressData(address);
    setShowPaymentForm(true); 
  };

  const handlePayment = async (paymentDetails) => {
    try {
      const { price } = paymentDetails;
      const response = await purchaseBook({
        books: [bookId],
        customerData,
        address: addressData,
        price,
      });

      if (response.paymentId) {
        setPaymentId(response.paymentId);
      }
    } catch (error) {
      console.error("Ödeme sırasında bir hata oluştu:", error);
    }
  };

  return (
    <>
      <MDBContainer className="py-5">
        <h2 className="text-center mb-4">Üye Olmadan Satın Al</h2>

        {book && <BookInfo book={book} />}

        <MDBRow>
          <MDBCol md="6">
            <CustomerInfoScreen onCustomerSubmit={handleCustomerSubmit} />
          </MDBCol>
          <MDBCol md="6">
            {/* Sadece yeni adres girme formu */}
            <NewAddressFormScreen onCancel={() => {}} onConfirm={handleAddressConfirm} />

            {showPaymentForm && (
              <div className="mt-4">
                <PaymentScreen onPayment={handlePayment} />
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default MainPaymentScreenGuest;
