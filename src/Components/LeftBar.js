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
        
        // API'den dönen veriyi konsolda görüntüleyelim
        console.log(response);
        
        // Eğer response bir array değilse varsayılan olarak boş bir array atanır
        setCategories(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error(error); // Hatanın detayını konsola yazdır
        setError('Kategoriler yüklenirken bir hata oluştu.');
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div > {/* Arka plan rengi mavi */}
      <h4 >Tüm Kategoriler</h4> {/* Başlık eklendi */}
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
    </div>
  );
};

export default LeftBar;
