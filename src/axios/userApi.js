// axios/userApi.js
import HTTP from './httpConfig';
import Cookies from 'js-cookie';

export const login = async (formData) => {
  try {
    const response = await HTTP.post("/users/signin", formData);
    if (!response || !response.data) {
      throw new Error("Sunucudan beklenen veri alınamadı.");
    }
    Cookies.set('token', response.data.token); // Token'ı js-cookie ile sakla
    return response.data;
  } catch (error) {
    // Bu kısımda hatanın ayrıntısını kontrol edelim
    console.error("Login error:", error);
    throw new Error(error.response?.data?.message || "Giriş işlemi sırasında bir hata oluştu.");
  }
};

export const register = async (formData) => {
  try {
    const response = await HTTP.post("/users/signup", formData);
    return response.data; // API çağrısı başarılı olursa, yanıtı döndür
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Kayıt işlemi sırasında bir hata oluştu.";
    throw new Error(errorMessage); // Hata mesajını atan bir Error objesi oluştur ve fırlat
  }
};

// Logout fonksiyonu
export const logout = async () => {
  try {
    const response = await HTTP.post("/users/logout"); // Sunucuya logout isteği gönder
    Cookies.remove('token'); // js-cookie üzerinden token'ı sil
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error(error.response?.data?.message || 'Çıkış işlemi sırasında bir hata oluştu.');
  }
};

export const getProfile = async () => {
  const token = Cookies.get('token'); // Token'ı al
  if (!token) {
    return null; // Giriş yapılmamışsa null döndür
  }

  try {
    const response = await HTTP.get('/users/getProfile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Profil bilgileri alınırken bir hata oluştu.');
  }
};

export const setProfile = async (formData) => {
  const token = Cookies.get('token'); // Token'ı doğru anahtar ile al
  if (!token) {
    throw new Error('Token bulunamadı');
  }

  try {
    const response = await HTTP.put('/users/setProfile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Profil güncellenirken bir hata oluştu.');
  }
};

export const sendResetCode = async (email) => {
  try {
      const response = await HTTP.post('/users/sendResetCode', { email });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || "Şifre sıfırlama kodu gönderilemedi.");
  }
};

export const resetPassword = async (resetCode, newPassword) => {
  try {
      const response = await HTTP.post('/users/resetPassword', { resetCode, newPassword });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || "Şifre güncellenemedi.");
  }
};

