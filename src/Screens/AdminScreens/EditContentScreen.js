import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { updateAboutUs, updateCustomerService, updateBookOrder, updateInternationalPublicationURL, updateReferencesURL } from '../../axios/contentApi';

const EditContentScreen = () => {
    const [aboutUsContent, setAboutUsContent] = useState("");
    const [customerServiceContent, setCustomerServiceContent] = useState("");
    const [bookOrderContent, setBookOrderContent] = useState("");
    const [internationalPublicationURL, setInternationalPublicationURL] = useState("");
    const [referencesURL, setReferencesURL] = useState("");
    const [message, setMessage] = useState(null);

    const handleUpdateAboutUs = async () => {
        try {
            await updateAboutUs({ aboutUsContent });
            setMessage('Hakkımızda içeriği güncellendi.');
        } catch (error) {
            console.error("Error updating about us content:", error);
            setMessage('Hakkımızda içeriği güncellenemedi.');
        }
    };

    const handleUpdateCustomerService = async () => {
        try {
            await updateCustomerService({ customerServiceContent });
            setMessage('Müşteri Hizmetleri içeriği güncellendi.');
        } catch (error) {
            console.error("Error updating customer service content:", error);
            setMessage('Müşteri Hizmetleri içeriği güncellenemedi.');
        }
    };

    const handleUpdateBookOrder = async () => {
        try {
            await updateBookOrder({ bookOrderContent });
            setMessage('Kitap sipariş içeriği güncellendi.');
        } catch (error) {
            console.error("Error updating book order content:", error);
            setMessage('Kitap sipariş içeriği güncellenemedi.');
        }
    };

    const handleUpdateInternationalPublicationURL = async () => {
        try {
            await updateInternationalPublicationURL({ internationalPublicationURL });
            setMessage('Uluslararası Yayın Belgesi URL\'si güncellendi.');
        } catch (error) {
            console.error("Error updating URL:", error);
            setMessage('Uluslararası Yayın Belgesi URL\'si güncellenemedi.');
        }
    };

    const handleUpdateReferencesURL = async () => {
        try {
            await updateReferencesURL({ referencesURL });
            setMessage('Kaynakça URL\'si güncellendi.');
        } catch (error) {
            console.error("Error updating URL:", error);
            setMessage('Kaynakça URL\'si güncellenemedi.');
        }
    };

    return (
        <Container>
            <h1>Sayfa İçeriklerini Düzenle</h1>
            {message && <Alert variant="info">{message}</Alert>}
            <Form>
                <Form.Group controlId="formAboutUs">
                    <Form.Label>Hakkımızda İçeriği</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={aboutUsContent}
                        onChange={(e) => setAboutUsContent(e.target.value)}
                        placeholder="Hakkımızda içeriğini düzenleyin"
                    />
                    <Button onClick={handleUpdateAboutUs} className="mt-2">Güncelle</Button>
                </Form.Group>

                <Form.Group controlId="formCustomerService" className="mt-4">
                    <Form.Label>Müşteri Hizmetleri İçeriği</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={customerServiceContent}
                        onChange={(e) => setCustomerServiceContent(e.target.value)}
                        placeholder="Müşteri Hizmetleri içeriğini düzenleyin"
                    />
                    <Button onClick={handleUpdateCustomerService} className="mt-2">Güncelle</Button>
                </Form.Group>

                <Form.Group controlId="formBookOrderContent" className="mt-4">
                    <Form.Label>Kitap Sipariş İçeriği</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={bookOrderContent}
                        onChange={(e) => setBookOrderContent(e.target.value)}
                        placeholder="Kitap sipariş içeriğini düzenleyin"
                    />
                    <Button onClick={handleUpdateBookOrder} className="mt-2">Güncelle</Button>
                </Form.Group>

                <Form.Group controlId="formInternationalPublicationURL" className="mt-4">
                    <Form.Label>Uluslararası Yayın Belgesi URL</Form.Label>
                    <Form.Control
                        type="text"
                        value={internationalPublicationURL}
                        onChange={(e) => setInternationalPublicationURL(e.target.value)}
                        placeholder="Uluslararası Yayın Belgesi URL'sini girin"
                    />
                    <Button onClick={handleUpdateInternationalPublicationURL} className="mt-2">Güncelle</Button>
                </Form.Group>

                <Form.Group controlId="formReferencesURL" className="mt-4">
                    <Form.Label>Kaynakça URL</Form.Label>
                    <Form.Control
                        type="text"
                        value={referencesURL}
                        onChange={(e) => setReferencesURL(e.target.value)}
                        placeholder="Kaynakça URL'sini girin"
                    />
                    <Button onClick={handleUpdateReferencesURL} className="mt-2">Güncelle</Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default EditContentScreen;
