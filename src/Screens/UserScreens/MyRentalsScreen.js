import React, { useState, useEffect } from "react";
import { getProfile } from "../../axios/userApi"; // Kullanıcı profilini almak için
import { getRentalsByUser } from "../../axios/rentingApi"; // Kiralamaları almak için API çağrısı
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom"; // Yönlendirme için Link kullanacağız

const MyRentalsScreen = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Kullanıcı profil bilgilerini alıyoruz
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUserId(profile._id); // Kullanıcı ID'sini state'e kaydediyoruz
      } catch (error) {
        console.error("Profil bilgileri alınamadı:", error);
        setError("Profil bilgileri alınamadı.");
      }
    };

    fetchProfile();
  }, []);

  // Kullanıcının kiralamalarını alıyoruz
  useEffect(() => {
    const fetchRentals = async () => {
      if (!userId) return;

      try {
        const rentalsData = await getRentalsByUser(userId);
        setRentals(rentalsData); // Kiralamaları state'e kaydediyoruz
      } catch (error) {
        console.error("Kiralama listesi alınamadı:", error);
        setError("Kiralama listesi alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [userId]);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <MDBContainer className="py-5">
      <h2 className="text-center mb-4">Kiraladığım Kitaplar</h2>
      {rentals.length === 0 ? (
        <p>Kiralama bulunamadı.</p>
      ) : (
        <MDBRow>
          {rentals.map((rental) => (
            <MDBCol md="6" lg="4" key={rental._id} className="mb-4">
              <MDBCard>
                <MDBCardBody>
                  <h5>Kitap: {rental.books[0].bookName}</h5>
                  <p>Yazar: {rental.books[0].authors.join(", ")}</p>
                  <p>Kiralama Süresi: {rental.rentalPeriod}</p>
                  <p>Ödeme Tutarı: {rental.paymentAmount / 100} TL</p>
                  <p>Kiralama Bitiş Tarihi: {new Date(rental.rentalEndDate).toLocaleDateString()}</p>
                  <Link to={`/book/pdf/${rental.books[0]._id}`}>
                    <MDBBtn color="primary">PDF İçeriğine Ulaş</MDBBtn>
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default MyRentalsScreen;
