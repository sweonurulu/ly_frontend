import React, { useEffect, useState } from 'react';
import { listMessages } from '../../axios/contactApi';
import { Table, Container, Alert } from 'react-bootstrap';
import Footer from '../../Components/Footer';

const AdminMessagesScreen = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await listMessages();
        setMessages(data);
      } catch (err) {
        setError('Mesajlar listelenirken bir hata oluştu.');
      }
    };

    fetchMessages();
  }, []);

  return (
    <Container>
      <h1>Kullanıcı Mesajları</h1>
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>İsim</th>
              <th>Soyisim</th>
              <th>Email</th>
              <th>Telefon Numarası</th>
              <th>Mesaj</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">Hiç mesaj bulunamadı.</td>
              </tr>
            ) : (
              messages.map((message, index) => (
                <tr key={message._id}>
                  <td>{index + 1}</td>
                  <td>{message.name}</td>
                  <td>{message.surname}</td>
                  <td>{message.email}</td>
                  <td>{message.phoneNumber}</td>
                  <td>{message.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
      <Footer />
    </Container>
  );
};

export default AdminMessagesScreen;
