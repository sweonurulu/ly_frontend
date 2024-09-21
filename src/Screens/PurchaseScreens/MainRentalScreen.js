import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import CustomerInfoScreen from "./CustomerInfoScreen";
import PaymentScreen from "./PaymentScreen"; 
import RentalDetailsDisplay from "./RentalDetailsDisplay";
import { getBookById } from "../../axios/bookApi";
import Footer from '../../Components/Footer';
import { rentBook } from "../../axios/rentingApi";
import { useLocation } from 'react-router-dom';

const MainRentalScreen = () => {
  const [customerData, setCustomerData] = useState(null);
  const [book, setBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [rentalId, setRentalId] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState("3 months");

  const location = useLocation();

  // Kitap ID'sini ve kiralama süresini URL'den alıyoruz
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const bookIdParam = searchParams.get("bookId");
    const rentalPeriodParam = searchParams.get("rentalPeriod");

    if (rentalPeriodParam) {
      setRentalPeriod(rentalPeriodParam);
    }

    if (bookIdParam) {
      setBook(bookIdParam);
    }
  }, [location.search]);

  // Kitap ID'si ile kitap bilgilerini çekiyoruz
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const details = await getBookById(book);
        setBookDetails(details);
      } catch (err) {
        console.error("Kitap bilgisi alınamadı:", err);
      }
    };

    if (book) {
      fetchBookDetails();
    }
  }, [book]);

  const handleCustomerSubmit = (data) => {
    setCustomerData(data);
    setShowPaymentForm(true); 
  };

  const handlePayment = async (paymentDetails) => {
    try {
      // Ödeme miktarını hesaplayın (örneğin, kitap fiyatını kiralama süresiyle çarpabilirsiniz)
      const rentalMultiplier = rentalPeriod === "3 months" ? 0.3 : rentalPeriod === "6 months" ? 0.5 : 1;
      const paymentAmount = bookDetails.price * rentalMultiplier;
  
      const response = await rentBook({
        bookId: book,
        customerData,
        rentalPeriod,
        paymentDetails,
        //paymentAmount, // Hesaplanan toplam ödeme miktarını gönderiyoruz
      });
  
      if (response.rentalId) {
        setRentalId(response.rentalId);
      }
    } catch (error) {
      console.error("Ödeme sırasında bir hata oluştu:", error);
    }
  };
  

  return (
    <>
      <MDBContainer className="py-5">
        <h2 className="text-center mb-4">Kiralama Adımları</h2>

        <RentalDetailsDisplay rentalPeriod={rentalPeriod} book={bookDetails} />

        <MDBRow>
          <MDBCol md="6">
            <CustomerInfoScreen onCustomerSubmit={handleCustomerSubmit} />
          </MDBCol>

          <MDBCol md="6">
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

export default MainRentalScreen;
