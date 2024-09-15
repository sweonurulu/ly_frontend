import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listBooks } from '../../axios/bookApi';
import { listCategories } from '../../axios/categoryApi';
import LeftBar from '../../Components/LeftBar';
import Footer from '../../Components/Footer';
import { Container, Row, Col } from 'react-bootstrap';
import '../../styles.css';  // <-- CSS dosyasını buradan import edin

const BookCategoryScreen = () => {
    const { categoryId } = useParams();
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6; // Her sayfada gösterilecek kitap sayısı
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await listBooks(categoryId); // Kategoriye göre kitapları çekiyoruz
                setBooks(data);
                setLoading(false);
            } catch (err) {
                setError('Kitaplar yüklenirken bir hata oluştu.');
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoryList = await listCategories();
                setCategories(categoryList);

                const currentCategory = categoryList.find(cat => cat._id === categoryId);
                setCategoryName(currentCategory ? currentCategory.name : 'Kategori');
            } catch (err) {
                setError('Kategoriler yüklenirken bir hata oluştu.');
            }
        };

        fetchBooks();
        fetchCategories();
    }, [categoryId]);

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
        <Container fluid>
            <Row>
                <Col md={3}>
                    <LeftBar categories={categories} />
                </Col>
                <Col md={9}>
                    <h1>{categoryName}</h1>
                    {currentBooks.length === 0 ? (
                        <p>Bu kategoride mevcut kitap bulunmamaktadır.</p>
                    ) : (
                        <div className="row">
                            {currentBooks.map((book) => (
                                <div key={book._id} className="kutu" onClick={() => navigate(`/book/${book._id}`)}>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img src={book.bookImg} className="img-thumbnail home-img-thumbnail" alt={book.bookName} />
                                        </div>
                                        <div className="col-sm-8">
                                            <div className="kitapad">{book.bookName}</div>
                                            <div className="kitapyazar">
                                                {Array.isArray(book.bookCategory) 
                                                    ? book.bookCategory.map(cat => cat.name).join(', ') 
                                                    : 'Kategori bulunamadı'}
                                            </div>
                                            <div className="kitapyazar">{book.authors.join(', ')}</div>
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
                        <button onClick={handleNextPage} disabled={indexOfLastBook >= books.length}>
                            Sonraki
                        </button>
                    </div>
                </Col>
            </Row>
            <Footer />
        </Container>
    );
};

export default BookCategoryScreen;
