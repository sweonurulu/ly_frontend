import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../axios/userApi";
import toast from "react-hot-toast";
import Footer from "../../Components/Footer"; // Footer bileşenini import edin

function SigninScreen({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false, // Beni Hatırla durumu için yeni state
  });

  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                login(formData)
                  .then((res) => {
                    if (res && res.user) {
                      setUser(res.user);
                      if (formData.rememberMe) {
                        localStorage.setItem("user", JSON.stringify(res.user)); // Kullanıcıyı localStorage'da sakla
                      }
                      navigate("/");
                    } else {
                      throw new Error("Sunucudan beklenen veri alınamadı.");
                    }
                  })
                  .catch((err) => {
                    // Hata mesajını gösterirken undefined hatalarını engelleyelim
                    toast.error(
                      err.message || "Giriş işlemi sırasında bir hata oluştu."
                    );
                  });
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmailOrUsername">
                <Form.Label>E-posta veya Kullanıcı Adı</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emailOrUsername: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="E-posta veya Kullanıcı Adı"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Şifre</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="password"
                  placeholder="Şifre"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Beni Hatırla"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                />
              </Form.Group>
              <Form.Group className="d-grid">
                <Button
                  disabled={
                    formData.emailOrUsername === "" || formData.password === ""
                  }
                  variant="primary"
                  size="lg"
                  type="submit"
                >
                  Giriş Yap
                </Button>
                <Form.Text className="text-center mt-2">
                  <Link to="/forgot-password">Şifremi Unuttum</Link> {/* Şifre sıfırlama sayfasına yönlendirme */}
                </Form.Text>
              </Form.Group>

              <hr />

              <Form.Group className="d-grid">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate("/signup")} // Kayıt ol sayfasına yönlendirme
                >
                  Kayıt Ol
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer /> {/* Footer bileşenini ekledik */}
    </div>
  );
}

export default SigninScreen;
