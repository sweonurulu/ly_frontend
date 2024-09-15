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
      responseType: 'arraybuffer', // PDF verisi buffer olarak dönecek
    });
    return response.data;
  } catch (error) {
    console.error('PDF verisi alınırken hata oluştu:', error);
    throw error;
  }
};
