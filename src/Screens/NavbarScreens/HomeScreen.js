import React, { useEffect, useState } from "react";
import { listBooks } from "../../axios/bookApi";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import LeftBar from "../../Components/LeftBar";
import Footer from "../../Components/Footer";
import "../../styles.css"; // <-- CSS dosyasını buradan import edin

const HomeScreen = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await listBooks();
        setBooks(Array.isArray(response) ? response : []);
        setLoading(false);
      } catch (err) {
        setError("Kitaplar yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Container fluid>
        <div className="row">
          <div className="col-md-3">
            <LeftBar />
          </div>
          <div className="col-md-9">
            {books.length === 0 ? (
              <div>
                <p>Şu anda mevcut kitap bulunmamaktadır.</p>
              </div>
            ) : (
              <div className="d-flex flex-wrap justify-content-start">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="kutu"
                    onClick={() => navigate(`/book/${book._id}`)}
                  >
                    <img
                      src={book.bookImg}
                      className="img-thumbnail"
                      alt={book.bookName}
                    />
                    <div className="book-info">
                      <div className="kitapad">{book.bookName}</div>
                      <div className="kitapyazar">
                        {Array.isArray(book.bookCategory)
                          ? book.bookCategory.map((cat) => cat.name).join(", ")
                          : "Kategori bulunamadı"}
                      </div>
                      <div className="kitapyazar">
                        {book.authors.join(", ")}
                      </div>
                      <div className="kitapfiyat">{book.price} TL</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default HomeScreen;
