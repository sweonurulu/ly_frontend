import HTTP from './httpConfig';

// Kategorileri listeleme fonksiyonu
export const listCategories = async () => {
  try {
    const response = await HTTP.get("/category/listCategories");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kategorileri alırken bir hata oluştu.");
  }
};

// Kategori görünürlüğünü değiştirme fonksiyonu
export const updateCategoryVisibility = async (categoryId) => {
  try {
    const response = await HTTP.put(`/category/toggleVisibility/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kategori görünürlüğü güncellenirken bir hata oluştu.");
  }
};


// Kategori oluşturma fonksiyonu
export const createCategory = async (categoryData) => {
  try {
    const response = await HTTP.post("/category/createCategory", categoryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kategori oluşturulurken bir hata oluştu.");
  }
};

// Kategori silme fonksiyonu
export const deleteCategory = async (categoryId) => {
  try {
    const response = await HTTP.delete(`/category/deleteCategory/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kategori silinirken bir hata oluştu.");
  }
};

// Kategori güncelleme fonksiyonu
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await HTTP.put(`/category/updateCategory/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Kategori güncellenirken bir hata oluştu.");
  }
};
