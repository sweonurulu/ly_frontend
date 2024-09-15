import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProfile, setProfile } from "../../axios/userApi";

const EditProfileScreen = () => {
  const [profile, setProfileState] = useState({
    username: '',
    email: '',
    name: '',
    surname: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileState(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setProfile({
        name: profile.name,
        surname: profile.surname,
        phoneNumber: profile.phoneNumber
      });
      navigate('/profile');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <h1>Profili Düzenle</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Kullanıcı Adı</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={profile.username}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>E-posta</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={profile.email}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Ad</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="surname">
          <Form.Label>Soyad</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={profile.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Telefon Numarası</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Güncelle
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfileScreen;
