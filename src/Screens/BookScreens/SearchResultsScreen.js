import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Sorgu parametrelerini almak ve yönlendirme için
import { searchBooks } from "../../axios/searchApi"; // Arama API fonksiyonunu import et
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../../styles.css"; // CSS dosyasını import edin

const SearchResultsScreen = () => {
  const location = useLocation(); // URL'deki sorgu parametrelerini almak için
  const [searchResults, setSearchResults] = useState([]); // Arama sonuçları için state
  const queryParams = new URLSearchParams(location.search); // URL'deki query parametrelerini al
  const query = queryParams.get("query"); // "query" parametresini al
  const navigate = useNavigate(); // Sayfa yönlendirme işlemleri için

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const results = await searchBooks(query); // API çağrısı ile kitapları getir
          setSearchResults(results); // Sonuçları state'e ata
        } catch (error) {
          console.error("Arama sonuçları alınırken bir hata oluştu:", error);
        }
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <Container>
      <h2>Arama Sonuçları</h2>
      <Row className="mt-3">
        {searchResults.length === 0 ? (
          <Col>
            <p>Sonuç bulunamadı.</p>
          </Col>
        ) : (
          searchResults.map((book) => (
            <Col key={book._id} xs={12} md={6} lg={4} className="mb-3">
              <Card onClick={() => navigate(`/book/${book._id}`)} className="search-result-card">
                <Card.Img
                  variant="top"
                  src={`data:${book.bookImg.contentType};base64,${book.bookImg.image}`} // Base64 formatını düzenledik
                  alt={book.bookName}
                  className="home-img-thumbnail"
                />
                <Card.Body>
                  <Card.Title>{book.bookName}</Card.Title>
                  <Card.Text>Yazar: {book.authors.join(", ")}</Card.Text>
                  <Card.Text>Fiyat: {book.price} TL</Card.Text>
                  <Button variant="primary" onClick={() => navigate(`/book/${book._id}`)}>
                    Detayları Görüntüle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default SearchResultsScreen;
