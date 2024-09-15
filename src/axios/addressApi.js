import HTTP from './httpConfig'; // Axios yapılandırması

export const addAddress = async (userId, addressData) => {
  try {
    const response = await HTTP.post(`/address/${userId}/add`, addressData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Adres ekleme sırasında hata oluştu.");
  }
};

export const updateAddress = async (userId, addressData) => {
  try {
    const response = await HTTP.put(`/address/${userId}/update/${addressData._id}`, addressData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Adres güncelleme sırasında hata oluştu.");
  }
};

export const deleteAddress = async (userId, addressId) => {
  try {
    const response = await HTTP.delete(`/address/${userId}/delete/${addressId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Adres silme sırasında hata oluştu.");
  }
};

export const getAddresses = async (userId) => {
    try {
      const response = await HTTP.get(`/address/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Adresler alınırken hata oluştu.");
    }
  };