import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, ListGroup, Image, Form } from "react-bootstrap";
import { getCart, removeFromCart } from "../../axios/cartApi"; // Sepet verisini almak için
import { getProfile } from "../../axios/userApi"; // Kullanıcı profilini almak için
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Bildirimler için
import Footer from "../../Components/Footer";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // Kullanıcı ID'si
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(); // Kullanıcı profilini al
        if (profile) {
          setUserId(profile._id); // Kullanıcı ID'sini set et
        } else {
          toast.error("Lütfen giriş yapın.");
          navigate("/signin"); // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
        }
      } catch (err) {
        setError("Kullanıcı bilgileri alınamadı.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      const fetchCart = async () => {
        try {
          const data = await getCart(userId); // Kullanıcıya ait sepeti getir
          setCartItems(data.items);
          setTotalPrice(data.totalPrice);
          setLoading(false);
        } catch (err) {
          setError("Sepet bilgileri getirilemedi.");
          setLoading(false);
        }
      };

      fetchCart();
    }
  }, [userId]);

  const handleRemoveFromCart = async (bookId) => {
    try {
      await removeFromCart(userId, bookId); // Sepetten kaldır
      setCartItems(cartItems.filter((item) => item.bookId._id !== bookId)); // Sepet listesini güncelle
      toast.success("Ürün sepetten kaldırıldı.");
    } catch (error) {
      toast.error("Ürün sepetten çıkarılırken hata oluştu.");
    }
  };

  const handleQuantityChange = (bookId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.bookId._id === bookId ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Sepetinizde ürün bulunmuyor.");
      return;
    }

    // Alışveriş tamamlama işlemi için fiziksel kitap satın alma sayfasına yönlendirme
    const bookDetails = cartItems.map((item) => ({
      bookNo: item.bookId._id,
      quantity: item.quantity,
    }));

    navigate("/book-purchase", {
      state: { items: bookDetails, totalPrice },
    });
  };

  const renderImage = (bookImg) => {
    if (bookImg && bookImg.startsWith("data:image")) {
      return bookImg; // Zaten base64 formatında ise doğrudan kullan
    }
    // Base64 formatında ise eklemek için data:image/jpeg;base64 vb. ön ekler eklenir
    return `data:image/jpeg;base64,${bookImg}`;
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="py-5">
      <h2>Sepetiniz</h2>

      {cartItems.length === 0 ? (
        <p>Sepetinizde henüz ürün bulunmamaktadır.</p>
      ) : (
        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.bookId._id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={renderImage(item.bookId.bookImg)} // Base64 formatını kullan
                            fluid
                            rounded
                            alt={item.bookId.bookName}
                          />
                        </Col>
                        <Col md={4}>
                          <h5>{item.bookId.bookName}</h5>
                        </Col>
                        <Col md={3}>
                          <Form.Control
                            as="select"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.bookId._id, e.target.value)}
                          >
                            {[...Array(10).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={3}>
                          <p>{item.price * item.quantity} TL</p>
                          <Button
                            variant="danger"
                            className="mt-2"
                            onClick={() => handleRemoveFromCart(item.bookId._id)}
                          >
                            Kaldır
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <h4>Sipariş Özeti</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Toplam Fiyat:</Col>
                      <Col>{totalPrice} TL</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
                <Button variant="success" className="mt-4 w-100" onClick={handleCheckout}>
                  Alışverişi Tamamla
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <Footer />
    </Container>
  );
};

export default CartScreen;
