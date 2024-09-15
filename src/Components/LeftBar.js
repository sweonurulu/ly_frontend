import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap'; // React-Bootstrap bileşenlerini import edin
import { Link } from 'react-router-dom';
import { listCategories } from '../axios/categoryApi'; // categoryApi'den listCategories fonksiyonunu import edin

const LeftBar = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kategorileri getiren fonksiyon
    const fetchCategories = async () => {
      try {
        const response = await listCategories();
        setCategories(response);
      } catch (error) {
        setError('Kategoriler yüklenirken bir hata oluştu.');
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ListGroup variant="flush">
      {categories.length === 0 ? (
        <ListGroup.Item>Mevcut kategori bulunmamaktadır.</ListGroup.Item>
      ) : (
        categories.map(category => (
          <ListGroup.Item key={category._id}>
            <Link to={`/books/category/${category._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {category.name}
            </Link>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};

export default LeftBar;
