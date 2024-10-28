import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../../axios/bookApi";
import { addToCart } from "../../axios/cartApi"; // Sepete ekleme API fonksiyonu
import { getProfile } from "../../axios/userApi"; // Kullanıcı bilgilerini getiren fonksiyon
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import LeftBar from "../../Components/LeftBar";
import toast, { Toaster } from "react-hot-toast";
import BookDetailsScreen from "./BookDetailsScreen"; // Kitap Detayları bileşenini import et
import AuthModal from "../../Components/AuthModal"; // AuthModal bileşenini import et
import LoginRequiredModal from "../../Components/LoginRequiredModal"; // LoginRequiredModal bileşenini import et

const BookScreen = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Kullanıcı bilgisini tutacak state
  const [showAuthModal, setShowAuthModal] = useState(false); // Auth modal kontrolü
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false); // Login required modal kontrolü
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId);
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError("Kitap bilgileri yüklenirken hata oluştu.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  // Kullanıcı bilgisini almak için useEffect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getProfile(); // Profil bilgilerini çek
        setUser(profile); // Kullanıcı bilgilerini state'e koy
      } catch (err) {
        setUser(null); // Kullanıcı yoksa state null olsun
      }
    };

    fetchUser();
  }, []);

  const handlePurchase = async () => {
    if (!book || !book._id) {
      toast.error("Kitap bilgileri eksik!");
      return;
    }

    // Eğer kullanıcı giriş yapmamışsa LoginRequiredModal aç
    if (!user) {
      setShowLoginRequiredModal(true);
      return;
    }

    // Kitap ID'yi doğrudan URL'ye ekleyerek satın alma sayfasına yönlendir
    navigate(`/payment?bookId=${book._id}&purchase=true`);
  };

  const handleAddToCart = async () => {
    if (!book || !book._id) {
      toast.error("Kitap bilgileri eksik!");
      return;
    }

    if (!user) {
      setShowLoginRequiredModal(true);
      return;
    }

    try {
      await addToCart(user._id, book._id, book.price); // Sepete ekle (user._id'yi kullan)
      toast.success("Kitap sepete eklendi!");
    } catch (err) {
      toast.error("Kitap sepete eklenirken hata oluştu.");
    }
  };

  const handleRentalClick = (rentalPeriod) => {
    if (!book || !book._id) {
      toast.error("Kitap bilgileri eksik!");
      return;
    }

    if (!user) {
      setShowLoginRequiredModal(true);
      return;
    }

    // Kitap ID'si ve kiralama süresi ile birlikte rental sayfasına yönlendirme
    navigate(`/rental?bookId=${book._id}&rentalPeriod=${rentalPeriod}`);
  };

  const handleEditBook = () => {
    if (!user) {
      setShowLoginRequiredModal(true);
      return;
    }
    navigate(`/book/edit/${bookId}`); // Kitap düzenleme sayfasına yönlendir
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
            <LeftBar />
          </Col>
          <Col md={6}>
            {/* BookDetails bileşenini kullan */}
            <BookDetailsScreen book={book} bookId={bookId} />
          </Col>
          <Col md={3}>
            <div className="mt-4">
              <Card>
                <Card.Body>
                  <h4>Fiyat: {book.price} TL</h4>
                  <Button
                    variant="primary"
                    onClick={handlePurchase}
                    className="mt-2 w-100"
                  >
                    Satın Al
                  </Button>

                  <Button
                    variant="success"
                    onClick={handleAddToCart}
                    className="mt-2 w-100"
                  >
                    Sepete Ekle
                  </Button>

                  {user && user.userType === "ADMIN" && (
                    <Button
                      variant="warning"
                      onClick={handleEditBook}
                      className="mt-2 w-100"
                    >
                      Kitabı Düzenle
                    </Button>
                  )}

                  {/* Eğer bookPdfUploaded true ise kiralama seçeneklerini göster */}
                  {book.bookPdfUploaded && (
                    <div className="mt-4 text-center">
                      <h5>Kitap PDF Kiralama Seçenekleri</h5>
                      <Button
                        variant="outline-primary"
                        className="w-100 mb-2"
                        onClick={() => handleRentalClick("3 months")}
                      >
                        3 Aylık Kirala: {book.threeMonthRentalPrice} TL
                      </Button>
                      <Button
                        variant="outline-primary"
                        className="w-100 mb-2"
                        onClick={() => handleRentalClick("6 months")}
                      >
                        6 Aylık Kirala: {book.sixMonthRentalPrice} TL
                      </Button>
                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={() => handleRentalClick("12 months")}
                      >
                        12 Aylık Kirala: {book.oneYearRentalPrice} TL
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      {/* AuthModal bileşeni */}
      <AuthModal
        show={showAuthModal}
        handleClose={() => setShowAuthModal(false)}
        bookId={book._id}
      />

      {/* LoginRequiredModal bileşeni */}
      <LoginRequiredModal
        show={showLoginRequiredModal}
        handleClose={() => setShowLoginRequiredModal(false)}
      />

      <Footer />
      <Toaster />
    </>
  );
};

export default BookScreen;
