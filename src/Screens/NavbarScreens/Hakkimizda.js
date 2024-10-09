import React from 'react';
import Footer from '../../Components/Footer';
import LeftBar from '../../Components/LeftBar';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Hakkimizda = () => {
  return (
    <>
      <Container fluid>
        <Row>
          {/* Sol Bar */}
          <Col md={3}>
            <LeftBar />
          </Col>

          {/* Hakkımızda İçeriği */}
          <Col md={9}>
            <div className="hakkimizda-container">
              <h1>Hakkımızda</h1>
              <p>
                <strong>Lisans Yayıncılık</strong>, bilgiye ve eğitime olan katkımızı en üst düzeye çıkarmak amacıyla kurulmuş bir yayınevi olarak, her yaştan ve her seviyeden okuyucuya hitap eden kitaplar, eğitim materyalleri ve akademik kaynaklar sunmaktadır. Amacımız, kaliteli ve özgün içeriklerle Türkiye'deki eğitim ve kültür hayatına katkı sağlamaktır.
              </p>
              <h2>Misyonumuz</h2>
              <p>
                Eğitim, kültür ve bilim alanındaki gelişmeleri yakından takip ederek, bu alanlarda toplumun bilgiye erişimini artırmak ve her bireyin gelişimine katkı sağlayacak yayınlar üretmektir. İleri teknolojiyi kullanarak dijital yayıncılık hizmetleri sunuyor ve okuyucularımıza hem basılı hem de dijital formatlarda en iyi içerikleri sunmayı hedefliyoruz.
              </p>
              <h2>Vizyonumuz</h2>
              <p>
                Geleceğin yayınevi olma hedefiyle, yayıncılık sektöründeki en son yenilikleri takip eden, dijital çözümleri ile Türkiye’de öncü bir konuma ulaşmayı amaçlayan bir yayınevi olarak, okurlarımızın ve eğitim kurumlarının güvenilir bir iş ortağı olmaktır.
              </p>
              <h2>Değerlerimiz</h2>
              <ul>
                <li><strong>Kalite:</strong> Yüksek standartlarda içerik üretmek ve her yaştan okuyucuya en doğru bilgiyi sunmak.</li>
                <li><strong>Yenilikçilik:</strong> Yayıncılık alanında yeni teknolojilere öncülük etmek ve dijital dönüşümde aktif rol almak.</li>
                <li><strong>Güvenilirlik:</strong> Eğitimciler, öğrenciler ve akademisyenler için güvenilir bilgi kaynağı olmak.</li>
                <li><strong>Erişilebilirlik:</strong> Tüm okurlarımıza her yerde ve her zaman bilgiye erişim fırsatı sunmak.</li>
              </ul>
              <h2>Hizmetlerimiz</h2>
              <ul>
                <li>Eğitim Kitapları</li>
                <li>Akademik Yayınlar</li>
                <li>Dijital Yayınlar</li>
                <li>Özel Yayınlar</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Hakkimizda;
