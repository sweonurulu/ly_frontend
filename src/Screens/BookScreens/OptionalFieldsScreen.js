import React, { useState } from "react";
import { Container, Form, Row, Col, Alert } from "react-bootstrap";

const OptionalFieldsScreen = ({ formData, setFormData }) => {
  const [error] = useState(null); // Hata durumu (gerekirse güncellenebilir)

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-2" controlId="formBasicBookDescription">
              <Form.Label>Kitap Açıklaması</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.bookDescription || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bookDescription: e.target.value,
                  })
                }
                placeholder="Kitap Açıklamasını Giriniz"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicIsbn">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                value={formData.isbn || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({ ...formData, isbn: e.target.value })
                }
                type="text"
                placeholder="ISBN Giriniz"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPublisher">
              <Form.Label>Yayınevi</Form.Label>
              <Form.Control
                value={formData.publisher || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({ ...formData, publisher: e.target.value })
                }
                type="text"
                placeholder="Yayınevi Adını Giriniz"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPageCount">
              <Form.Label>Sayfa Sayısı</Form.Label>
              <Form.Control
                value={formData.pageCount || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({ ...formData, pageCount: e.target.value })
                }
                type="number"
                placeholder="Sayfa Sayısını Giriniz"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPublishDate">
              <Form.Label>Basım Tarihi</Form.Label>
              <Form.Control
                value={formData.publishDate || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    publishDate: e.target.value,
                  })
                }
                type="number"
                placeholder="Basım Yılını Giriniz"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicBindingType">
              <Form.Label>Cilt Bilgisi</Form.Label>
              <Form.Control
                value={formData.bindingType || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bindingType: e.target.value,
                  })
                }
                type="text"
                placeholder="Cilt Bilgisi Giriniz"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicEdition">
              <Form.Label>Baskı Sayısı</Form.Label>
              <Form.Control
                value={formData.edition || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({ ...formData, edition: e.target.value })
                }
                type="text"
                placeholder="Baskı Sayısını Giriniz"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicLanguage">
              <Form.Label>Yayın Dili</Form.Label>
              <Form.Control
                value={formData.language || ""} // Varsayılan değer Türkçe
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                type="text"
                placeholder="Yayın Dilini Giriniz (Varsayılan: Türkçe)"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicDimensions">
              <Form.Label>Kitap Boyutu (13.5 x 19.5 cm)</Form.Label>
              <Form.Control
                value={formData.dimensions || ""} // Mevcut veri ile doldurulacak
                onChange={(e) =>
                  setFormData({ ...formData, dimensions: e.target.value })
                }
                type="text"
                placeholder="Kitap Boyutunu Giriniz"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OptionalFieldsScreen;
  