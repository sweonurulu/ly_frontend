import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import PaymentBookInfo from "./PaymentBookInfo"; // Kitap bilgilerini gösteren bileşen
import CustomerInfoScreen from "./CustomerInfoScreen";
import PaymentScreen from "./PaymentScreen";
import { getBookById } from "../../axios/bookApi"; 
import Footer from '../../Components/Footer';
import { purchaseBook } from "../../axios/paymentApi";
import { useLocation } from 'react-router-dom';
import AddressSelectScreen from "./AddressSelectScreen"; 
import NewAddressFormScreen from "./NewAddressFormScreen";

const MainPaymentScreen = () => {
  const [customerData, setCustomerData] = useState(null);
  const [books, setBooks] = useState([]); // Kitap ID'lerini bir liste olarak tutuyoruz
  const [bookDetails, setBookDetails] = useState([]); // Kitap detaylarını bir liste olarak tutuyoruz
  const [addressData, setAddressData] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

  const location = useLocation();
  const isGuest = location.state?.isGuest || false;

  // Kitap ID'lerini URL'den çekiyoruz
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const booksParam = searchParams.get("books");

    if (booksParam) {
      try {
        const parsedBooks = JSON.parse(decodeURIComponent(booksParam));
        setBooks(parsedBooks);
      } catch (error) {
        console.error("Kitap ID'leri alınırken bir hata oluştu:", error);
      }
    }
  }, [location.search]);

  // Kitap ID'leri ile kitap bilgilerini çekiyoruz
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const details = await Promise.all(
          books.map((bookId) => getBookById(bookId))
        );
        setBookDetails(details); // Kitap detaylarını liste formatında set et
      } catch (err) {
        console.error("Kitap bilgisi alınamadı:", err);
      }
    };
  
    if (books.length > 0) {
      fetchBookDetails();
    }
  }, [books]);

  const handleAddressConfirm = async (address) => {
    setAddressData(address);
    setShowPaymentForm(true); 
  };

  const handlePayment = async (paymentDetails) => {
    try {
      const { price } = paymentDetails;
      const response = await purchaseBook({
        books, // Kitap ID'lerini liste olarak gönderiyoruz
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
        <h2 className="text-center mb-4">Ödeme Adımları</h2>

        {/* Kitap bilgilerini en üstte gösteriyoruz */}
        {bookDetails.length > 0 && <PaymentBookInfo books={bookDetails} />}

        <MDBRow>
          <MDBCol md="6">
            <CustomerInfoScreen onCustomerSubmit={setCustomerData} />
          </MDBCol>
          <MDBCol md="6">
            {isGuest ? (
              <NewAddressFormScreen onCancel={() => {}} onConfirm={handleAddressConfirm} />
            ) : (
              <AddressSelectScreen
                onAddNewAddress={() => {}}
                onAddressSelect={handleAddressConfirm}
              />
            )}

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

export default MainPaymentScreen;
