import HTTP from './httpConfig'; // API için HTTP ayarı

// Kitap kiralama işlemi
export const rentBook = async (rentalData) => {
  try {
    console.log("asfadsg");
    const response = await HTTP.post("/payment/rentBook", rentalData); // Backend'e kiralama talebi gönder
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kiralama işlemi başarısız oldu.");
  }
};

export const purchaseBook = async (paymentData) => {
  try {
    const response = await HTTP.post("/payment/payments/purchaseBook", paymentData);
    return response.data;
  } catch (error) {
    console.error("Payment Error:", error);
    throw error;
  }
};
