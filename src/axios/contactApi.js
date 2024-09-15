// axios/contactApi.js
import HTTP from './httpConfig';

export const contact = async (formData) => {
  try {
    const response = await HTTP.post("/contact/send-message", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "İletişim formu gönderilirken bir hata oluştu.");
  }
};

export const listMessages = async () => {
  try {
    const response = await HTTP.get("/contact/admin-messages");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Mesajlar listelenirken bir hata oluştu.");
  }
};
