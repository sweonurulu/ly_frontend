import React, { useEffect, useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProfile, changePassword } from "../../axios/userApi"; // changePassword fonksiyonunu ekledik
import Footer from "../../Components/Footer"; // Footer bileşenini import

const ProfileScreen = ({ user }) => {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false); // Şifre formu görünürlüğü için state
  const [passwordFormData, setPasswordFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      setLoading(true);
      const fetchProfile = async () => {
        try {
          const data = await getProfile();
          setProfile(data);
        } catch (error) {
          setError(error.message);
          navigate("/signin");
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [profile, navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = passwordFormData;

    if (newPassword !== confirmPassword) {
      setPasswordError("Yeni şifreler eşleşmiyor.");
      return;
    }

    try {
      await changePassword({ oldPassword, newPassword });
      setPasswordSuccess("Şifre başarıyla güncellendi.");
      setPasswordError(null); // Başarıyla değiştiği için hata sıfırlanır
    } catch (error) {
      setPasswordError(
        error.message || "Şifre güncellenirken bir hata oluştu."
      );
      setPasswordSuccess(null);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Container>
        {profile ? (
          <Card>
            <Card.Body>
              <Card.Title>Profil Bilgileri</Card.Title>
              <Card.Text>
                <strong>Ad:</strong> {profile.name}
                <br />
                <strong>Email:</strong> {profile.email}
                <br />
                <strong>Telefon Numarası:</strong> {profile.phoneNumber}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate("/editProfile")}
              >
                Profili Düzenle
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  navigate("/address", {
                    state: { userId: profile._id },
                  })
                }
              >
                Adres Bilgileri
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Şifremi Güncelle
              </Button>

              {/* Admin kullanıcılarına "Admin Paneli" butonu */}
              {profile.userType === "ADMIN" && (
                <Button variant="warning" onClick={() => navigate("/admin")}>
                  Admin Paneline Git
                </Button>
              )}
              {/* Admin kullanıcılarına "Admin Paneli" butonu */}
              {/*<Button variant="warning" onClick={() => navigate("/my-rentals")}>
                Kiraladığım kitaplar
              </Button>*/}

              {showPasswordForm && (
                <Form onSubmit={handlePasswordChange} className="mt-3">
                  {passwordError && (
                    <Alert variant="danger">{passwordError}</Alert>
                  )}
                  {passwordSuccess && (
                    <Alert variant="success">{passwordSuccess}</Alert>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Eski Şifre</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordFormData.oldPassword}
                      onChange={(e) =>
                        setPasswordFormData({
                          ...passwordFormData,
                          oldPassword: e.target.value,
                        })
                      }
                      placeholder="Eski Şifre"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Yeni Şifre</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordFormData.newPassword}
                      onChange={(e) =>
                        setPasswordFormData({
                          ...passwordFormData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Yeni Şifre"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Yeni Şifreyi Onayla</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordFormData.confirmPassword}
                      onChange={(e) =>
                        setPasswordFormData({
                          ...passwordFormData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Yeni Şifreyi Onayla"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Şifreyi Kaydet
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        ) : (
          <div>Profil bilgileri bulunamadı.</div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ProfileScreen;
