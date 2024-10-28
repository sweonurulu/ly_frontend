import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { BsSearch, BsPerson, BsBag, BsBell, BsBook  } from "react-icons/bs"; // Çan ikonu için BsBell eklendi
import { Link, useNavigate } from "react-router-dom";
import { getProfile, logout } from "../axios/userApi";
import logo from "../ustlogo.png";

const SearchBar = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Arama sorgusu için state
  const navigate = useNavigate();

  // Kullanıcı profilini almak için useEffect kullanıyoruz
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfile(); // Profil bilgilerini al
        if (profileData) {
          setUser(profileData); // Kullanıcı giriş yapmışsa profili state'e ata
        }
      } catch (error) {
        console.error("Profil alınırken hata oluştu:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Sunucuya logout isteği gönder ve token'ı sil
      setUser(null); // Kullanıcıyı state'den temizle
      navigate("/signin"); // Çıkış yaptıktan sonra giriş sayfasına yönlendir
    } catch (error) {
      console.error("Çıkış yaparken bir hata oluştu:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/searchResults?query=${searchQuery}`); // Arama sonuçları sayfasına yönlendir
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter tuşuna basıldığında arama işlemini gerçekleştir
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "10px" }}>
      {/* Logo ve arama kutusu */}
      <Row className="justify-content-center align-items-center">
        <Col xs="auto">
          <Link to="/home">
            <img alt="Logo" src={logo} className="d-inline-block align-top" />
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center mt-2">
        <Col xs={12} md={{ span: 6, offset: 1 }} style={{ flex: 1 }}>
          <InputGroup>
            <Form.Control
              placeholder="Ürün Ara..."
              aria-label="Ürün Ara"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Arama kutusundaki değişikliği yakala
              onKeyPress={handleKeyPress} // Enter tuşunu dinle
              style={{ borderRadius: "20px 0 0 20px" }}
            />
            <Button
              variant="primary"
              id="search-button"
              style={{ borderRadius: "0 20px 20px 0" }}
              onClick={handleSearch} // Arama butonuna tıklandığında
            >
              <BsSearch />
            </Button>
          </InputGroup>
        </Col>

        {/* Profil, Sepet ve Bildirim Simgeleri */}
        <Col
          xs="auto"
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          {" "}
          {/* Burada sağa boşluk ekledik */}
          {user ? (
            <>
              {/* Bildirim simgesi */}
              {/*<Button
                variant="link"
                style={{ color: "#000", marginRight: "10px" }}
                onClick={() => navigate("/notifications")}
              >
                <BsBell size={24} />
              </Button>*/}

              {/* Kitap simgesi (My Rentals sayfasına yönlendirir) */}
              <Button
                variant="link"
                style={{ color: "#000", marginRight: "10px" }}
              >
                <Link
                  to="/my-rentals"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <BsBook size={24} /> {/* Kitap simgesi */}
                </Link>
              </Button>

              <Link
                to="/profile"
                style={{ marginRight: "10px", color: "#000" }}
              >
                <Button variant="link" style={{ color: "#000" }}>
                  <BsPerson size={24} /> {/* Profil simgesi */}
                </Button>
              </Link>

              <Button
                variant="link"
                style={{ color: "#000", marginRight: "10px" }}
              >
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <BsBag size={24} />
                </Link>
              </Button>

              <Button variant="dark" onClick={handleLogout}>
                Çıkış yap
              </Button>
            </>
          ) : (
            <>
              <Col
                xs="auto"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "20px",
                }}
              >
                <Button
                  variant="primary"
                  as={Link}
                  to="/signup"
                  style={{ marginRight: "10px" }} // Butonlar arasında boşluk için margin
                >
                  Kayıt Ol
                </Button>
                <Button variant="primary" as={Link} to="/signin">
                  Giriş Yap
                </Button>
              </Col>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
