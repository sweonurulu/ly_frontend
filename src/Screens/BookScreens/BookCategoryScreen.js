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
                    {books.length === 0 ? (
                        <p>Bu kategoride mevcut kitap bulunmamaktadır.</p>
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
                </Col>
            </Row>
            <Footer />
        </Container>
    );
};

export default BookCategoryScreen;
