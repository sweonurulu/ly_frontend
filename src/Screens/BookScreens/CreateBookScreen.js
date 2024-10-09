import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Accordion } from "react-bootstrap";
import RequiredFieldsScreen from "./RequiredFieldsScreen";
import OptionalFieldsScreen from "./OptionalFieldsScreen";
import Footer from "../../Components/Footer";
import { createBook } from "../../axios/bookApi"; // Kitap oluşturma API çağrısı
import toast from "react-hot-toast"; // Toast bildirimlerini göstermek için

const CreateBookScreen = () => {
  const [formData, setFormData] = useState({
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
    language: "",
    dimensions: "",
    bookDescription: "",
  });
  const [bookImg, setBookImg] = useState(null); // Kitap görseli
  const [previewPdf, setPreviewPdf] = useState(null); // Önizleme PDF
  const [ebookPdf, setEbookPdf] = useState(null); // E-Kitap PDF (zorunlu değil)

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        bookData.append(key, formData[key]);
      }
    }
    if (bookImg) {
      bookData.append("bookImg", bookImg);
    }
    if (previewPdf) {
      bookData.append("previewPdf", previewPdf);
    }
    if (ebookPdf) {
      bookData.append("ebookPdf", ebookPdf); // E-Kitap PDF dosyası opsiyonel
    }

    createBook(bookData)
      .then((response) => {
        toast.success("Kitap başarıyla eklendi");

        // Form verilerini sıfırla
        setFormData({
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
        setBookImg(null);
        setPreviewPdf(null);
        setEbookPdf(null);
      })
      .catch((err) => {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Kitap eklenemedi. Lütfen tekrar deneyin.";
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <h3>Yeni Kitap Oluştur veya Kitap Bilgilerini Güncelle</h3>
              <RequiredFieldsScreen
                formData={formData}
                setFormData={setFormData}
                setBookImg={setBookImg}
                setPreviewPdf={setPreviewPdf} // Props olarak geçiriyoruz
                setEbookPdf={setEbookPdf} // E-Kitap opsiyonel
              />
              <Accordion className="mt-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Opsiyonel Alanlar</Accordion.Header>
                  <Accordion.Body>
                    <OptionalFieldsScreen
                      formData={formData}
                      setFormData={setFormData}
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
                  Kitap Ekle
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default CreateBookScreen;
