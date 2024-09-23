import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import CustomerInfoScreen from "./CustomerInfoScreen";
import RentalDetailsDisplay from "./RentalDetailsDisplay";
import { getBookById } from "../../axios/bookApi";
import { getProfile } from "../../axios/userApi"; // Kullanıcı profilini çekmek için import
import Footer from '../../Components/Footer';
import { rentBook } from "../../axios/rentingApi";
import { useLocation } from 'react-router-dom';

const MainRentalScreen = () => {
  const [customerData, setCustomerData] = useState(null);
  const [book, setBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [rentalId, setRentalId] = useState(null);
  const [iframeToken, setIframeToken] = useState(null); // iframe token state
  const [rentalPeriod, setRentalPeriod] = useState("3 months");
  const [userId, setUserId] = useState(null); // Kullanıcı ID'sini tutmak için state

  const location = useLocation();

  // Kullanıcı profil bilgilerini çek
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(); // Profil bilgilerini çekiyoruz
        setUserId(profile._id); // Kullanıcı ID'sini state'e kaydediyoruz
      } catch (error) {
        console.error("Profil bilgileri alınamadı:", error);
      }
    };

    fetchProfile();
  }, []);

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

  const handleCustomerSubmit = async (data) => {
    if (!userId) {
      console.error("Kullanıcı ID'si henüz alınamadı.");
      return;
    }
    
    setCustomerData({
      ...data,
      userId // Kullanıcı ID'sini customerData'ya ekliyoruz
    });
  
    try {
      const response = await rentBook({
        bookId: book,
        customerData: { ...data, userId },
        rentalPeriod,
      });
  
      if (response.iframeToken) {
        setIframeToken(response.iframeToken); // iframe token alındığında kaydediyoruz
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
            {/* İframe token varsa sağ tarafta ödeme iframe'i görüntülenir */}
            {iframeToken && (
              <div className="mt-4">
                <iframe
                  src={`https://www.paytr.com/odeme/api/goster/${iframeToken}`}
                  frameBorder="0"
                  scrolling="no"
                  style={{ width: "100%", height: "450px" }}
                ></iframe>
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
