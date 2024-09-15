import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Alert } from "react-bootstrap";
import { listCategories } from "../../axios/categoryApi"; // Kategorileri listelemek için
import CategoryEditModal from "../../Components/CategoryEditModal"; // CategoryEditModal bileşenini import et

const RequiredFieldsScreen = ({ formData, setFormData, setBookImg, setPreviewPdf, setEbookPdf }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal için state ekle
  const [selectedCategories, setSelectedCategories] = useState(formData.bookCategory || []); // Mevcut kategorilerle doldurulacak state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch (error) {
        setError("Kategoriler yüklenemedi.");
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedOptions);
    setFormData({
      ...formData,
      bookCategory: selectedOptions, // Seçilen kategorileri formData'ya ekliyoruz
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-2" controlId="formBasicBookName">
              <Form.Label>Kitap Adı</Form.Label>
              <Form.Control
                value={formData.bookName || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({ ...formData, bookName: e.target.value })
                }
                type="text"
                placeholder="Kitap Adını Giriniz"
              />
            </Form.Group>
            
            <Form.Group className="mb-2" controlId="formBasicBookCategory">
              <Form.Label>Kitap Kategorisi</Form.Label>
              <Form.Control
                as="select"
                multiple // Birden fazla kategori seçimi için multiple ekliyoruz
                value={selectedCategories} // Seçilen kategoriler
                onChange={handleCategoryChange} // Kategori değişimi fonksiyonu
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                Birden fazla kategori seçmek için Ctrl (veya Cmd) tuşuna basılı tutun.
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-2" controlId="formBasicPrice">
              <Form.Label>Fiyat (TL)</Form.Label>
              <Form.Control
                value={formData.price || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                type="number"
                placeholder="Kitap Fiyatını Giriniz"
                step="0.01" // Float sayıları kabul etmek için step özelliği
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicAuthors">
              <Form.Label>Editörler</Form.Label>
              <Form.Control
                value={formData.authors || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({ ...formData, authors: e.target.value })
                }
                type="text"
                placeholder="Yazarları virgülle ayırarak giriniz"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicBookImg">
              <Form.Label>Kitap Görseli</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setBookImg(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPreviewPdf">
              <Form.Label>İçindekiler PDF Dosyası</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={(e) => setPreviewPdf(e.target.files[0])} // Önizleme PDF dosyasını set et
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicEbookPdf">
              <Form.Label>E-Kitap PDF Dosyası</Form.Label>
              <Form.Control
                type="file"
                accept="application/pdf"
                onChange={(e) => setEbookPdf(e.target.files[0])} // E-Kitap PDF dosyasını set et
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      
      {/* CategoryEditModal'ı ekle */}
      <CategoryEditModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default RequiredFieldsScreen;
