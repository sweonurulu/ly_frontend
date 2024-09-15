import React from "react";

const BookInfo = ({ book }) => {
  return (
    <div className="book-info">
      <div className="row">
        <div className="col-sm-4">
          <img src={book.bookImg} className="img-thumbnail home-img-thumbnail" alt={book.bookName} />
        </div>
        <div className="col-sm-8">
          <div className="kitapad">{book.bookName}</div>
          <div className="kitapyazar">
            {Array.isArray(book.bookCategory) 
              ? book.bookCategory.map(cat => cat.name).join(", ") 
              : "Kategori bulunamadı"}
          </div>
          <div className="kitapyazar">{book.authors.join(", ")}</div>
          <div className="kitapfiyat">{book.price} TL</div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
