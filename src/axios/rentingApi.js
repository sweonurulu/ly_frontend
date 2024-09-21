// axios/rentingApi.js
import HTTP from './httpConfig';

// Genel kiralama oranlarını alma fonksiyonu
export const getGeneralRentedPrice = async () => {
  try {
    const response = await HTTP.get(`/renting/list-rental-prices`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Kiralama oranları alınırken bir hata oluştu.");
  }
};

// Genel kiralama oranlarını güncelleme fonksiyonu
export const updateGeneralRentedPrice = async (priceData) => {
  try {
    const response = await HTTP.put(`/renting/change-rental-prices`, priceData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Kiralama oranları güncellenirken bir hata oluştu.");
  }
};

// Kitap kiralama ve ödeme işlemi
export const rentBook = async ({ bookId, customerData, rentalPeriod, paymentDetails }) => {
  try {
    const response = await HTTP.post("/renting/create-payment-session", {
      bookId,         // Kitap ID'sini gönderiyoruz
      customerData,   // Müşteri bilgilerini gönderiyoruz
      rentalPeriod,   // Kiralama süresini gönderiyoruz
      paymentDetails, // Ödeme bilgilerini gönderiyoruz
    });
    return response.data; // Backend'den gelen yanıtı dönüyoruz
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kiralama işlemi sırasında bir hata oluştu.");
  }
};

