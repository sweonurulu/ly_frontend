import HTTP from './httpConfig';

// Kitapları listeleme fonksiyonu
export const listBooks = async (bookCategory) => {
  try {
    const endpoint = bookCategory ? `/book/listBooks/${bookCategory}` : `/book/listBooks`;
    const response = await HTTP.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kitap listesini alırken bir hata oluştu.");
  }
};

// Yeni kitap yaratma fonksiyonu
export const createBook = async (bookData) => {
  try {    
    const response = await HTTP.post("/book/createBook", bookData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "kitap oluştururken bir hata oluştu.");
  }
};

// Kitap ve PDF dosyasını yükleme fonksiyonu
export const uploadEbookWithDetails = async (bookData, pdfFile) => {
  try {
    console.log("Frontend'deyiz");
    
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('url', bookData.url);
    formData.append('bookCategory', bookData.bookCategory);
    formData.append('threeMonthPrice', bookData.threeMonthPrice);
    formData.append('sixMonthPrice', bookData.sixMonthPrice);
    formData.append('oneYearPrice', bookData.oneYearPrice);

    const response = await HTTP.post('/book/createBookAndUploadPDF', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Hata:', error);
    throw new Error(error.response?.data?.message || 'Kitap ve PDF yüklenirken bir hata oluştu.');
  }
};

// Fiyat güncelleme fonksiyonu
export const updateBookPrice = async (bookId, newPrice) => {
  try {
    const response = await HTTP.put(`/book/updatePrice/${bookId}`, { price: newPrice });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Fiyat güncellenirken bir hata oluştu.");
  }
};

// Kitap detaylarını alma fonksiyonu 
export const getBookById = async (bookId) => {
  try {
    const response = await HTTP.get(`/book/getBookById/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kitap bilgilerini alırken bir hata oluştu.");
  }
};

// Kitap güncelleme fonksiyonu
export const updateBookById = async (bookId, updatedBookData) => {
  try {
    const response = await HTTP.put(`/book/updateBook/${bookId}`, updatedBookData, {
      headers: {
        'Content-Type': 'multipart/form-data', // FormData olduğu için multipart
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kitap güncellenirken bir hata oluştu.");
  }
};

