import HTTP from './httpConfig';

export const adminSignup = async (formData) => {
  try {
    const response = await HTTP.post("/admin/adminSignup", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Admin kaydı sırasında bir hata oluştu.");
  }
};

export const login = async (formData) => {
  try {
    const response = await HTTP.post("/admin/adminSignin", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Giriş işlemi sırasında bir hata oluştu.");
  }
};
