import HTTP from './httpConfig'; // HTTP yapılandırması (axios)

export const searchBooks = async (query) => {
  try {
    const response = await HTTP.get(`/search/searchBooks`, {
      params: { query }, // Sorgu parametresini gönderiyoruz
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Arama sonuçlarını getirirken bir hata oluştu."
    );
  }
};
