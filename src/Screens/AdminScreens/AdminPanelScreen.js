import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import { listCategories } from "../../axios/categoryApi"; // Kategorileri listeleme fonksiyonu
import CategoryEditModal from "../../Components/CategoryEditModal"; // Kategori Düzenleme Modali
import UploadBookModal from "../../Components/UploadEbookModal"; // Yeni oluşturduğumuz kitap PDF modalı
import RentalPriceModal from "../../Components/RentalPriceModal"; // Kiralama Fiyatlarını Düzenleme Modali
import EditContentModal from "../../Components/EditContentModal"; // Sayfa İçeriklerini Düzenleme Modalı

function AdminPanelScreen() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showCategoryEditModal, setShowCategoryEditModal] = useState(false);
  const [showRentalPriceModal, setShowRentalPriceModal] = useState(false); // Kiralama fiyat modal state
  const [showContentModal, setShowContentModal] = useState(false); // İçerik düzenleme modal state
  const [selectedBookId, setSelectedBookId] = useState(null); // Seçili kitap ID'si
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList = await listCategories();
        setCategories(categoriesList);
      } catch (error) {
        console.error("Kategoriler yüklenemedi: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleViewMessages = () => {
    navigate("/admin/messages"); // Mesajları görüntüleme sayfasına yönlendirme
  };

  const handleCreateBook = () => {
    navigate("/create-book"); // Yeni kitap oluşturma sayfasına yönlendirme
  };

  const handleCreateEbook = () => {
    setShowModal(true); // Kitap PDF ekleme modalını aç
  };

  const handleEditCategories = () => {
    setShowCategoryEditModal(true); // Kategori düzenleme modalını aç
  };

  const handleRentalPriceChange = (bookId) => {
    setSelectedBookId(bookId); // Seçili kitap ID'sini ayarla
    setShowRentalPriceModal(true); // Kiralama fiyat modalını aç
  };

  const handleEditContent = () => {
    setShowContentModal(true); // Sayfa içeriklerini düzenleme modalını aç
  };

  const handleCloseModal = () => {
    setShowModal(false); // Modalı kapat
  };

  const handleCloseCategoryEditModal = () => {
    setShowCategoryEditModal(false); // Kategori düzenleme modalını kapat
  };

  const handleCloseRentalPriceModal = () => {
    setShowRentalPriceModal(false); // Kiralama fiyat modalını kapat
  };

  const handleCloseContentModal = () => {
    setShowContentModal(false); // İçerik düzenleme modalını kapat
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button
        onClick={handleViewMessages}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Gelen Mesajları Görüntüle
      </button>
      <button
        onClick={handleEditContent} // İçerik düzenleme modalını açar
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Sayfa İçeriklerini Düzenle
      </button>
      <button
        onClick={handleCreateBook}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Yeni Kitap Oluştur
      </button>
      <button
        onClick={() => handleRentalPriceChange("bookId123")} // Buraya dinamik kitap ID'si gelebilir
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Kiralama Fiyatlarını Düzenle
      </button>
      <button
        onClick={handleEditCategories}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Kategorileri Düzenle
      </button>

      {/* Kitap PDF Ekleme Modalı */}
      <UploadBookModal
        showModal={showModal}
        handleClose={handleCloseModal}
        categories={categories}
      />

      {/* Kategori Düzenleme Modalı */}
      <CategoryEditModal
        showModal={showCategoryEditModal}
        handleClose={handleCloseCategoryEditModal}
      />

      {/* Kiralama Fiyatları Düzenleme Modalı */}
      <RentalPriceModal
        showModal={showRentalPriceModal}
        handleClose={handleCloseRentalPriceModal}
        bookId={selectedBookId} // Modal'a kitap ID'sini geçir
      />

      {/* Sayfa İçeriklerini Düzenleme Modalı */}
      <EditContentModal
        showModal={showContentModal}
        handleClose={handleCloseContentModal} // İçerik düzenleme modalını kapat
      />

      <Footer />
    </div>
  );
}

export default AdminPanelScreen;
