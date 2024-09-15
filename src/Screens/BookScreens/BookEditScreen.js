import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, updateBookById } from "../../axios/bookApi"; // Kitap bilgilerini ve güncelleme API'si
import { Container, Form, Button, Row, Col, Accordion } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import RequiredFieldsScreen from "./RequiredFieldsScreen"; // Zorunlu alanlar bileşeni
import OptionalFieldsScreen from "./OptionalFieldsScreen"; // Opsiyonel alanlar bileşeni

const BookEditScreen = () => {
  const { bookId } = useParams(); // URL parametresinden kitap ID'sini al
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    bookName: "",
    bookCategory: "",
    price: "",
    authors: "",
    isbn: "",
    publisher: "",
    pageCount: "",
    publishDate: "",
    bindingType: "",
    edition: "",
    language: "Türkçe",
    dimensions: "",
    bookDescription: "",
  });
  const [bookImg, setBookImg] = useState(null); // Kitap görseli
  const [previewPdf, setPreviewPdf] = useState(null); // Önizleme PDF
  const [ebookPdf, setEbookPdf] = useState(null); // E-Kitap PDF
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getBookById(bookId); // Kitap verisini API'den al
        setBookData({
          bookName: book.bookName,
          bookCategory: book.bookCategory,
          price: book.price,
          authors: book.authors,
          isbn: book.isbn,
          publisher: book.publisher,
          pageCount: book.pageCount,
          publishDate: book.publishDate,
          bindingType: book.bindingType,
          edition: book.edition,
          language: book.language,
          dimensions: book.dimensions,
          bookDescription: book.bookDescription,
        });
        setLoading(false);
      } catch (err) {
        setError("Kitap bilgileri yüklenirken hata oluştu.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookFormData = new FormData();
    for (const key in bookData) {
      if (bookData[key]) {
        bookFormData.append(key, bookData[key]);
      }
    }
    if (bookImg) {
      bookFormData.append("bookImg", bookImg);
    }
    if (previewPdf) {
      bookFormData.append("previewPdf", previewPdf);
    }
    if (ebookPdf) {
      bookFormData.append("ebookPdf", ebookPdf);
    }

    try {
      await updateBookById(bookId, bookFormData); // Kitap bilgilerini güncelle
      toast.success("Kitap başarıyla güncellendi!");
      navigate(`/book/${bookId}`); // Güncelleme tamamlandığında kitap sayfasına geri dön
    } catch (error) {
      toast.error("Kitap bilgileri güncellenirken bir hata oluştu.");
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
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <h3>Kitap Bilgilerini Düzenle</h3>
              <RequiredFieldsScreen
                formData={bookData}
                setFormData={setBookData}
                setBookImg={setBookImg}
                setPreviewPdf={setPreviewPdf}
                setEbookPdf={setEbookPdf}
              />
              <Accordion className="mt-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Opsiyonel Alanlar</Accordion.Header>
                  <Accordion.Body>
                    <OptionalFieldsScreen
                      formData={bookData}
                      setFormData={setBookData}
                      bookImg={bookImg}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-4"
                  style={{ width: "50%" }}
                >
                  Kitap Bilgilerini Güncelle
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
      <Toaster />
    </>
  );
};

export default BookEditScreen;
