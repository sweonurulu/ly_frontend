// ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile } from "../../axios/userApi";
import Footer from '../../Components/Footer'; // Footer bileşenini import

const ProfileScreen = ({ user }) => {
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      setLoading(true);
      const fetchProfile = async () => {
        try {
          const data = await getProfile(); // axios/index.js'den getProfile fonksiyonunu çağır
          setProfile(data);
        } catch (error) {
          setError(error.message);
          navigate('/signin'); // Hata durumunda giriş sayfasına yönlendir
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [profile, navigate]);

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
                <strong>Ad:</strong> {profile.name}<br />
                <strong>Email:</strong> {profile.email}<br />
                <strong>Telefon Numarası:</strong> {profile.phoneNumber}
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/editProfile')}>Profili Düzenle</Button>
              <Button
                variant="primary"
                onClick={() =>
                  navigate("/address", {
                    state: { userId: profile._id }
                  })
                }
              >
                Adres Bilgileri
              </Button>
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
