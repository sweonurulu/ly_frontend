import HTTP from './httpConfig';

// PDF verisini backend'den almak için axios çağrısı
export const getBookPreviewPdf = async (bookId) => {
  try {
    const response = await HTTP.get(`/pdf/review-pdfviewer/${bookId}`, {
      responseType: 'arraybuffer', // PDF verisi buffer olarak dönecek
    });
    return response.data; // PDF verisi arraybuffer formatında dönecek
  } catch (error) {
    console.error('PDF verisi alınırken hata oluştu:', error);
    throw error;
  }
};

// PDF başlıklarını almak için axios çağrısı
export const getPdfTitles = async () => {
  try {
    const response = await HTTP.get('/content-pdf/list-pdf-titles'); // PDF başlıklarını getir
    return response.data;
  } catch (error) {
    console.error('PDF başlıkları alınırken hata oluştu:', error);
    throw error;
  }
};

// PDF içeriğini MongoDB'deki `_id` ile almak için axios çağrısı
export const getPdfContent = async (pdfId) => {
  try {
    const response = await HTTP.get(`/content-pdf/get-pdf/${pdfId}`, {
      responseType: 'arraybuffer',  // PDF verisi buffer olarak dönecek
    });
    return response.data;  // PDF verisi arraybuffer formatında dönecek
  } catch (error) {
    console.error('PDF verisi alınırken hata oluştu:', error);
    throw error;
  }
};


export const getBookPdf = async (bookId, token) => {
  try {
    const response = await HTTP.get(`/pdf/books/pdf/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // PDF dosyasını blob olarak alıyoruz
    });

    return URL.createObjectURL(response.data); // PDF blob'dan bir URL oluşturup döndürüyoruz
  } catch (error) {
    console.error("PDF dosyası alınırken bir hata oluştu:", error);
    throw error;
  }
};
