import HTTP from './httpConfig';

// Metinsel içerikler
export const getContent = async () => {
    try {
        const response = await HTTP.get('/content/get-content');
        return response.data;
    } catch (error) {
        console.error("İçerik alınırken hata oluştu:", error);
        throw error;
    }
};

export const updateAboutUs = async (data) => {
    try {
        const response = await HTTP.put('/content/update-about-us', data);
        return response.data;
    } catch (error) {
        console.error("Hakkımızda içeriği güncellenirken hata oluştu:", error);
        throw error;
    }
};

export const updateCustomerService = async (data) => {
    try {
        const response = await HTTP.put('/content/update-customer-service', data);
        return response.data;
    } catch (error) {
        console.error("Müşteri Hizmetleri içeriği güncellenirken hata oluştu:", error);
        throw error;
    }
};

/*
export const updateBookOrder = async (data) => {
    try {
        const response = await HTTP.put('/content/update-book-order', data);
        return response.data;
    } catch (error) {
        console.error("Kitap sipariş içeriği güncellenirken hata oluştu:", error);
        throw error;
    }
};


// Kitap sipariş mesajını almak için API çağrısı
export const getBookOrderContent = async () => {
    try {
        const response = await HTTP.get('/content/get-book-order-content');
        return response.data;
    } catch (error) {
        console.error("Kitap sipariş içeriği alınırken hata oluştu:", error);
        throw error;
    }
};

// URL güncelleme fonksiyonları
export const updateInternationalPublicationURL = async (data) => {
    try {
        const response = await HTTP.put('/content/update-international-publication-url', data);
        return response.data;
    } catch (error) {
        console.error("Uluslararası Yayın Belgesi URL'si güncellenirken hata oluştu:", error);
        throw error;
    }
};

export const updateReferencesURL = async (data) => {
    try {
        const response = await HTTP.put('/content/update-references-url', data);
        return response.data;
    } catch (error) {
        console.error("Kaynakça URL'si güncellenirken hata oluştu:", error);
        throw error;
    }
};
*/

// Yeni PDF dosyası oluşturma fonksiyonu
export const createPdf = async (formData) => {
    try {
        const response = await HTTP.post('/content-pdf/create-pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Form verisini doğru içerik tipi ile gönder
            }
        });
        return response.data;
    } catch (error) {
        console.error("Yeni PDF dosyası oluşturulurken hata oluştu:", error);
        throw error;
    }
};

// PDF içerik yükleme (multipart/form-data)
export const updatePdf = async (formData) => {
    try {
        const response = await HTTP.put(`/content-pdf/update-pdf`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'  // Doğru içerik tipi belirtildi
            }
        });
        return response.data;
    } catch (error) {
        console.log("hata: \n" + error);
        console.error(`PDF dosyası güncellenirken hata oluştu:`, error);
        throw error;
    }
};

// PDF başlıklarını listeleme
export const listPdfTitles = async () => {
    try {
        const response = await HTTP.get(`/content-pdf/list-pdf-titles`);
        return response.data;
    } catch (error) {
        console.error("PDF başlıkları getirilirken hata oluştu:", error);
        throw error;
    }
};

// PDF silme
export const deletePdf = async (pdfName) => {
    try {
        const response = await HTTP.delete(`/content-pdf/delete-pdf/${pdfName}`);
        return response.data;
    } catch (error) {
        console.error(`PDF dosyası silinirken hata oluştu:`, error);
        throw error;
    }
};
