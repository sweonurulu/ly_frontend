import HTTP from './httpConfig';

export const search  = async () => {
  try {
    const response = await HTTP.get("/search/search");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "listeyi alırken bir hata oluştu.");
  }
};