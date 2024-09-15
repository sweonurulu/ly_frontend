import HTTP from './httpConfig'; // Axios yapılandırması

// Sepete kitap ekle
export const addToCart = async (userId, bookId, price) => {
  try {
    const response = await HTTP.post(`/cart/add`, { userId, bookId, price });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sepete ekleme sırasında hata oluştu.");
  }
};

// Kullanıcıya ait sepeti getir
export const getCart = async (userId) => {
  try {
    const response = await HTTP.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sepet getirilemedi.");
  }
};

// Sepetten kitap çıkar
export const removeFromCart = async (userId, bookId) => {
  try {
    const response = await HTTP.post(`/cart/remove`, { userId, bookId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Ürün sepetten çıkarılırken hata oluştu.");
  }
};

