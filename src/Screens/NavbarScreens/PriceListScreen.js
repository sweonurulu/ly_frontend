import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { listBooks } from '../../axios/bookApi';
import Footer from '../../Components/Footer';
import LeftBar from '../../Components/LeftBar'; 
import { useNavigate } from 'react-router-dom'; 
import { getProfile } from '../../axios/userApi'; 
import EditPriceModal from '../../Components/EditPriceModal'; // Fiyat düzenleme modal'ı

function PriceListScreen() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); // Seçilen kitabı tutacak state
  const [showModal, setShowModal] = useState(false); // Modal görünürlüğü kontrolü

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await listBooks();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Kitaplar yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const userData = await getProfile(); 
        setUser(userData); 
      } catch (err) {
        // Kullanıcı giriş yapmamışsa hata oluştuğunu varsayıyoruz, ancak burada hata gösterilmemeli
        setUser(null); // Giriş yapılmadığında user null olarak ayarlanır
      }
    };

    fetchBooks();
    fetchUser();
  }, []);

  const handleEditPrice = (book) => {
    setSelectedBook(book); // Seçilen kitabı state'e kaydet
    setShowModal(true); // Modal'ı aç
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <LeftBar /> 
          </Col>
          <Col md={9}>
            {books.length === 0 ? (
              <Row>
                <Col>
                  <p>Şu anda mevcut kitap bulunmamaktadır.</p>
                </Col>
              </Row>
            ) : (
              <Container>
                <h2 className="my-4">Fiyat Listesi</h2>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Kitap Adı</th>
                      <th>Yazar</th>
                      <th>Fiyat (TL)</th>
                      {/* ADMIN kullanıcılar için butonu göster */}
                      {user?.userType === "ADMIN" && <th>İşlemler</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book._id}>
                        <td>{book.bookName}</td>
                        <td>{book.authors ? book.authors.join(", ") : 'Yazar Bilgisi Yok'}</td>
                        <td>{book.price} TL</td>
                        {/* ADMIN kullanıcılar için fiyat düzenleme butonu */}
                        {user?.userType === "ADMIN" && (
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleEditPrice(book)}
                            >
                              Fiyatı Düzenle
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            )}
          </Col>
        </Row>
      </Container>

      {/* Fiyat düzenleme Modal'ı */}
      {selectedBook && (
        <EditPriceModal 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          book={selectedBook} 
          setBooks={setBooks} 
        />
      )}

      <Footer />
    </>
  );
}

export default PriceListScreen;
