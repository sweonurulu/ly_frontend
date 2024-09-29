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
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6; // Her sayfada gösterilecek kitap sayısı
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await listBooks();
        // response'ın dizi olup olmadığını kontrol et, değilse boş bir dizi ata
        setBooks(Array.isArray(response) ? response : []);
        setLoading(false);
      } catch (err) {
        setError("Kitaplar yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        <div className="row">
          <div className="col-md-3">
            <LeftBar />
          </div>
          <div className="col-md-9">
            {currentBooks.length === 0 ? (
              <div>
                <p>Şu anda mevcut kitap bulunmamaktadır.</p>
              </div>
            ) : (
              <div className="row">
                {currentBooks.map((book) => (
                  <div
                    key={book._id}
                    className="kutu"
                    onClick={() => navigate(`/book/${book._id}`)}
                  >
                    <div className="row">
                      <div className="col-sm-4">
                        <img
                          src={book.bookImg}
                          className="img-thumbnail home-img-thumbnail"
                          alt={book.bookName}
                        />
                      </div>
                      <div className="col-sm-8">
                        <div className="kitapad">{book.bookName}</div>
                        <div className="kitapyazar">
                          {Array.isArray(book.bookCategory)
                            ? book.bookCategory
                                .map((cat) => cat.name)
                                .join(", ")
                            : "Kategori bulunamadı"}
                        </div>
                        <div className="kitapyazar">
                          {book.authors.join(", ")}
                        </div>
                        <div className="kitapfiyat">{book.price} TL</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="d-flex justify-content-between mt-4">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Önceki
              </button>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastBook >= books.length}
              >
                Sonraki
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default HomeScreen;
