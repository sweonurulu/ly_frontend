import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { listCategories, createCategory, deleteCategory, updateCategory, updateCategoryVisibility } from "../axios/categoryApi";
import { toast } from "react-hot-toast";

const CategoryEditModal = ({ showModal, handleClose }) => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [isCategoryVisible, setIsCategoryVisible] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesList = await listCategories();
                setCategories(categoriesList);
            } catch (error) {
                toast.error("Kategoriler yüklenemedi.");
            }
        };

        if (showModal) {
            fetchCategories();
        }
    }, [showModal]);

    const handleCreateCategory = async () => {
        if (!newCategory.trim()) {
            toast.error("Kategori adı boş olamaz.");
            return;
        }

        try {
            await createCategory({ name: newCategory });
            toast.success("Kategori başarıyla oluşturuldu");
            const updatedCategories = await listCategories();
            setCategories(updatedCategories);
            setNewCategory("");
        } catch (error) {
            toast.error("Kategori oluşturulamadı.");
        }
    };

    const handleToggleVisibility = async () => {
        if (!selectedCategory) {
            toast.error("Lütfen bir kategori seçin.");
            return;
        }

        try {
            await updateCategoryVisibility(selectedCategory);
            toast.success("Kategori görünürlüğü başarıyla değiştirildi");
            const updatedCategories = await listCategories();
            setCategories(updatedCategories);
            setSelectedCategory("");
            setCategoryName("");
            setIsCategoryVisible(!isCategoryVisible);
        } catch (error) {
            toast.error("Kategori görünürlüğü değiştirilemedi.");
        }
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategory) {
            toast.error("Lütfen silmek için bir kategori seçin.");
            return;
        }

        try {
            await deleteCategory(selectedCategory);
            toast.success("Kategori başarıyla silindi");
            const updatedCategories = await listCategories();
            setCategories(updatedCategories);
            setSelectedCategory("");
            setCategoryName("");
        } catch (error) {
            toast.error("Kategori silinemedi.");
        }
    };

    const handleUpdateCategory = async () => {
        if (!categoryName.trim()) {
            toast.error("Kategori adı boş olamaz.");
            return;
        }

        try {
            await updateCategory(selectedCategory, { name: categoryName });
            toast.success("Kategori başarıyla güncellendi");
            const updatedCategories = await listCategories();
            setCategories(updatedCategories);
            setSelectedCategory("");
            setCategoryName("");
        } catch (error) {
            toast.error("Kategori güncellenemedi.");
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Kategorileri Düzenle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNewCategory">
                        <Form.Label>Yeni Kategori Oluştur</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Kategori Adı"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleCreateCategory} className="mt-2">
                            Kategori Ekle
                        </Button>
                    </Form.Group>

                    <hr />

                    <Form.Group controlId="formSelectCategory">
                        <Form.Label>Kategori Seç</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={(e) => {
                                const selectedId = e.target.value;
                                setSelectedCategory(selectedId);
                                const category = categories.find((cat) => cat._id === selectedId);
                                setCategoryName(category?.name || "");
                                setIsCategoryVisible(category?.isVisible);
                            }}
                        >
                            <option value="">Kategori Seçin</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formEditCategory" className="mt-3">
                        <Form.Label>Kategori Adını Düzenle</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Kategori Adı"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <Button variant="warning" onClick={handleUpdateCategory} className="mt-2">
                            Kategori Güncelle
                        </Button>
                    </Form.Group>

                    <Button variant="danger" onClick={handleDeleteCategory} className="mt-4">
                        Kategori Sil
                    </Button>

                    <Button
                        variant={isCategoryVisible ? "secondary" : "success"}
                        onClick={handleToggleVisibility}
                        className="mt-4"
                    >
                        {isCategoryVisible ? "Kategoriyi Gizle" : "Kategoriyi Göster"}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Kapat
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoryEditModal;
