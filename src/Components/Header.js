import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../ustlogo.png"; // Resmin yolunu kontrol edin ve import edin
import { Row, Col } from "react-bootstrap";
import { logout } from "../axios/userApi"; // Çıkış yapma fonksiyonunu import et
import { getPdfTitles } from "../axios/pdfApi"; // PDF başlıklarını almak için

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
        setPdfTitles(titles.filter((pdf) => !pdf.isHidden)); // isHidden: false olanları filtrele
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
      <Row className="justify-content-center align-items-center">
        <Col xs="auto">
          <Navbar.Brand>
            <Link to="/home">
              <img alt="Logo" src={logo} className="d-inline-block align-top" />{" "}
            </Link>
          </Navbar.Brand>
        </Col>
      </Row>
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
                  to="/info"
                  active={location.pathname === "/info"}
                  style={
                    location.pathname === "/info"
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
                <Nav.Link
                  as={Link}
                  to="/price-list"
                  active={location.pathname === "/price-list"}
                  style={
                    location.pathname === "/price-list"
                      ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                      : {}
                  }
                >
                  Fiyat Listesi
                </Nav.Link>

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

                {/* Kullanıcı giriş yapmışsa Profil ve Admin linkleri */}
                {user && (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/profile"
                      active={location.pathname === "/profile"}
                      style={
                        location.pathname === "/profile"
                          ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                          : {}
                      }
                    >
                      Profil
                    </Nav.Link>

                    {user.userType === "ADMIN" && (
                      <Nav.Link
                        as={Link}
                        to="/admin"
                        active={location.pathname === "/admin"}
                        style={
                          location.pathname === "/admin"
                            ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                            : {}
                        }
                      >
                        Admin Paneli
                      </Nav.Link>
                    )}
                  </>
                )}

                {/* Sepet linki */}
                <Nav.Link
                  as={Link}
                  to="/cart"
                  active={location.pathname === "/cart"}
                  style={
                    location.pathname === "/cart"
                      ? { backgroundColor: "rgba(111, 111, 128, .3)" }
                      : {}
                  }
                >
                  Sepet
                </Nav.Link>
              </Nav>

              {/* Giriş ve Kayıt Butonları */}
              {user ? (
                <Button
                  variant="dark"
                  onClick={() => {
                    localStorage.removeItem("user");
                    setUser(null);
                    navigate("/signin");
                  }}
                >
                  Çıkış yap
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/signup")}
                  >
                    Kayıt Ol
                  </Button>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => navigate("/signin")}
                  >
                    Giriş Yap
                  </Button>
                </>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </>
  );
}

export default Header;
