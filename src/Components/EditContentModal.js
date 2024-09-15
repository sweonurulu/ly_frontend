import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { updateAboutUs, updateCustomerService, updatePdf, listPdfTitles, createPdf, deletePdf } from '../axios/contentApi';
import { toast } from "react-hot-toast";

const EditContentModal = ({ showModal, handleClose }) => {
    const [aboutUsContent, setAboutUsContent] = useState(""); // Hakkımızda içeriği
    const [customerServiceContent, setCustomerServiceContent] = useState(""); // Müşteri hizmetleri içeriği
    const [pdfName, setPdfName] = useState(""); // PDF adı
    const [pdfFile, setPdfFile] = useState(null); // PDF dosyası
    const [pdfTitles, setPdfTitles] = useState([]); // PDF başlıkları
    const [selectedPdf, setSelectedPdf] = useState(""); // Seçilen PDF başlığı

    // Modal açıldığında PDF başlıklarını getirmek için useEffect kullanılıyor
    useEffect(() => {
        const fetchPdfTitles = async () => {
            try {
                const titles = await listPdfTitles();
                setPdfTitles(titles);
            } catch (error) {
                toast.error('PDF başlıkları getirilemedi.');
            }
        };
        fetchPdfTitles();
    }, [showModal]);

    // PDF dosyasını ve adını yüklemek için handler
    const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
    };

    const handlePdfNameChange = (e) => {
        setPdfName(e.target.value);
    };

    // Hakkımızda ve Müşteri Hizmetleri içeriği güncelleme fonksiyonu
    const handleUpdateContent = async (updateFunction, contentData, successMessage) => {
        try {
            await updateFunction(contentData);
            toast.success(`${successMessage} başarıyla güncellendi.`);
        } catch (error) {
            console.error(`Error updating content:`, error);
            toast.error(`${successMessage} güncellenemedi.`);
        }
    };

    // PDF güncelleme işlemi
    const handleUpdatePdf = async () => {
        if (!pdfFile || !pdfName) {
            toast.error('PDF dosyası ve isim bilgisi gereklidir.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('name', pdfName);

        try {
            await updatePdf(formData);
            toast.success(`${pdfName} PDF başarıyla güncellendi.`);
        } catch (error) {
            console.error(`Error updating ${pdfName} PDF:`, error);
            toast.error(`${pdfName} PDF güncellenemedi.`);
        }
    };

    // Yeni PDF oluşturma işlemi
    const handleCreatePdf = async () => {
        if (!pdfFile || !pdfName) {
            toast.error('PDF dosyası ve isim bilgisi gereklidir.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('name', pdfName);

        try {
            await createPdf(formData);
            toast.success(`${pdfName} PDF başarıyla oluşturuldu.`);
            // Yeni oluşturulan PDF listesini güncelle
            const updatedTitles = await listPdfTitles();
            setPdfTitles(updatedTitles);
        } catch (error) {
            console.error(`Error creating ${pdfName} PDF:`, error);
            toast.error(`${pdfName} PDF oluşturulamadı.`);
        }
    };

    // PDF silme işlemi
    const handleDeletePdf = async () => {
        if (!selectedPdf) {
            toast.error('Lütfen silmek istediğiniz PDF dosyasını seçin.');
            return;
        }

        try {
            await deletePdf(selectedPdf);
            toast.success(`${selectedPdf} PDF başarıyla silindi.`);
            // Silinen PDF listesini güncelle
            const updatedTitles = await listPdfTitles();
            setPdfTitles(updatedTitles);
            setSelectedPdf(""); // Seçimi temizle
        } catch (error) {
            console.error(`Error deleting ${selectedPdf} PDF:`, error);
            toast.error(`${selectedPdf} PDF silinemedi.`);
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Sayfa İçeriklerini Düzenle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Hakkımızda İçeriği */}
                    <Form.Group controlId="formAboutUs">
                        <Form.Label>Hakkımızda İçeriği</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={aboutUsContent}
                            onChange={(e) => setAboutUsContent(e.target.value)}
                            placeholder="Hakkımızda içeriğini düzenleyin"
                        />
                        <Button onClick={() => handleUpdateContent(updateAboutUs, { aboutUsContent }, 'Hakkımızda içeriği')} className="mt-2">
                            Hakkımızda Güncelle
                        </Button>
                    </Form.Group>

                    {/* Müşteri Hizmetleri İçeriği */}
                    <Form.Group controlId="formCustomerService" className="mt-4">
                        <Form.Label>Müşteri Hizmetleri İçeriği</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={customerServiceContent}
                            onChange={(e) => setCustomerServiceContent(e.target.value)}
                            placeholder="Müşteri Hizmetleri içeriğini düzenleyin"
                        />
                        <Button onClick={() => handleUpdateContent(updateCustomerService, { customerServiceContent }, 'Müşteri Hizmetleri içeriği')} className="mt-2">
                            Müşteri Hizmetleri Güncelle
                        </Button>
                    </Form.Group>

                    {/* PDF Dosya Yükleme ve Dropdown Listesi */}
                    <Form.Group controlId="formPdfSelect" className="mt-4">
                        <Form.Label>Mevcut PDF Seç</Form.Label>
                        <Form.Control as="select" value={selectedPdf} onChange={(e) => setSelectedPdf(e.target.value)}>
                            <option value="">Bir PDF Seçin</option>
                            {pdfTitles.map((pdf, index) => (
                                <option key={index} value={pdf.name}>
                                    {pdf.name} {pdf.isHidden && "(Gizli)"}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPdfUpload" className="mt-4">
                        <Form.Label>PDF Dosyası Yükle</Form.Label>
                        <Form.Control type="file" onChange={handlePdfUpload} />
                    </Form.Group>

                    <Form.Group controlId="formPdfName" className="mt-4">
                        <Form.Label>PDF İsmi</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="PDF ismini girin"
                            value={pdfName}
                            onChange={handlePdfNameChange}
                        />
                    </Form.Group>

                    {/* Mevcut PDF Güncelle Butonu */}
                    <Button onClick={handleUpdatePdf} className="mt-3">
                        Mevcut PDF Güncelle
                    </Button>

                    {/* Yeni PDF Oluştur Butonu */}
                    <Button onClick={handleCreatePdf} className="mt-3 ml-3" variant="success">
                        Yeni PDF Oluştur
                    </Button>

                    {/* PDF Silme Butonu */}
                    <Button onClick={handleDeletePdf} className="mt-3 ml-3" variant="danger">
                        PDF Sil
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Kapat
                </Button>
            </Modal.Footer>

            {/* ToastContainer */}
            <Toast />
        </Modal>
    );
};

export default EditContentModal;
