import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import { logout } from "../axios/userApi"; // Çıkış yapma fonksiyonunu import et
import { getPdfTitles } from "../axios/pdfApi"; // PDF başlıklarını almak için
import SearchBar from "./SearchBar";

function Header({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [pdfTitles, setPdfTitles] = useState([]); // PDF başlıklarını tutan state

  // Sayfa yenilendiğinde localStorage'dan kullanıcı bilgilerini çek
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user, setUser]);

  // Veritabanından isHidden: false olan PDF başlıklarını çek
  useEffect(() => {
    const fetchPdfTitles = async () => {
      try {
        const titles = await getPdfTitles(); // Veritabanından PDF başlıklarını getir
        setPdfTitles(
          Array.isArray(titles) ? titles.filter((pdf) => !pdf.isHidden) : []
        );
      } catch (error) {
        console.error("PDF başlıkları alınırken hata oluştu:", error);
      }
    };

    fetchPdfTitles();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Logout fonksiyonunu çalıştır
      setUser(null); // Kullanıcıyı state'den temizle
      navigate("/signin"); // Çıkış yaptıktan sonra giriş sayfasına yönlendir
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <SearchBar />
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary py-3">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav variant="pills" className="me-auto">
                <Nav.Link
                  as={Link}
                  to="/home"
                  active={location.pathname === "/home"}
                  style={
                    location.pathname === "/home"
                      ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                      : {}
                  }
                >
                  Anasayfa
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/hakkimizda" // Hakkımızda sayfası için güncel bağlantı
                  active={location.pathname === "/hakkimizda"}
                  style={
                    location.pathname === "/hakkimizda"
                      ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                      : {}
                  }
                >
                  Hakkımızda
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  active={location.pathname === "/contact"}
                  style={
                    location.pathname === "/contact"
                      ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                      : {}
                  }
                >
                  Müşteri Hizmetleri
                </Nav.Link>
                
                {/* Fiyat Listesi sayfasını inaktif etme */}
                {/* Eğer bu sayfayı inaktif etmek isterseniz yorum satırı haline getirin */}
                {/*
                <Nav.Link
                  as={Link}
                  to="/price-list-v2"
                  active={location.pathname === "/price-list"}
                  style={
                    location.pathname === "/price-list"
                      ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                      : {}
                  }
                >
                  Fiyat Listesi
                </Nav.Link>
                */}

                {/* Veritabanından PDF başlıkları */}
                {pdfTitles.map((pdf) => (
                  <Nav.Link
                    key={pdf._id}
                    as={Link}
                    to={`/pdf-viewer/${pdf._id}`} // PDF viewer sayfasına yönlendirme
                    style={
                      location.pathname === `/pdf-viewer/${pdf._id}`
                        ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                        : {}
                    }
                  >
                    {pdf.name} {/* PDF başlığı */}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </>
  );
}

export default Header;
