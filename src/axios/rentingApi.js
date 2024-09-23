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
export const rentBook = async ({ bookId, customerData, rentalPeriod }) => {
  try {
    const response = await HTTP.post("/renting/create-payment-session", {
      bookId,
      customerData,
      rentalPeriod
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kiralama işlemi sırasında bir hata oluştu.");
  }
};

export const getRentalsByUser = async (userId) => {
  try {
    const response = await HTTP.get(`/renting/rentals/${userId}`);
    return response.data; // Kiralamaları döndür
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kiralama listesi alınırken bir hata oluştu.");
  }
};


