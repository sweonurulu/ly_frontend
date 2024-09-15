import React, { useEffect, useState } from 'react';
import PdfViewer from './BookPdfViewer';
import { getRentedPdfUrl } from '../../axios/pdfApi'; // PDF dosyasının URL'sini getiren API

const BookScreen = ({ bookId }) => {
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        // PDF dosyasının URL'sini almak için API çağrısı
        const fetchPdfUrl = async () => {
            try {
                const url = await getRentedPdfUrl(bookId); // Kiralanmış PDF URL'si
                setPdfUrl(url);
            } catch (error) {
                console.error("PDF URL'si alınırken hata oluştu:", error);
            }
        };

        fetchPdfUrl();
    }, [bookId]);

    return (
        <div>
            {pdfUrl ? (
                <PdfViewer fileUrl={pdfUrl} />
            ) : (
                <p>PDF yükleniyor veya kiralama süresi dolmuş.</p>
            )}
        </div>
    );
};

export default BookScreen;
