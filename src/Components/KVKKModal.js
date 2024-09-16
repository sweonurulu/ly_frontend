import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const KVKKModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Gizlilik Politikası</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <p>
          <strong>LİSANS YAYINCILIK SANAYİ VE TİCARET LTD. ŞTİ. GİZLİLİK POLİTİKASI</strong>
        </p>
        <p>
          <strong>Giriş</strong><br />
          Lisans Yayıncılık Sanayi ve Ticaret Limited Şirket (“Lisans Yayıncılık” veya “Şirket”) olarak kişisel verilerinizin gizliliğine önem verdiğimiz ve bizimle paylaştığınız bilgilerin kişisel ve gizli olduğunu kabul ettiğimiz için bu hususa hassasiyetle yaklaşıyoruz.
        </p>
        <p>
          İşbu Gizlilik Politikası’nı (“Politika”) Şirket olarak yönettiğimiz internet sitesi (“Platformlar”) üzerinden toplanan kişisel verilerinizin gizliliği ve güvenliği hakkında internet sitemizi ve mobil uygulamamızı ziyaret eden kullanıcılarımızı 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında bilgilendirmek amacıyla oluşturduk. Kişisel verileriniz işbu Politika çerçevesinde yalnızca size daha iyi bir hizmet sunmak amacıyla kullanılacaktır.
        </p>
        <p>
          <strong>Politika’nın Kapsamı</strong><br />
          Doğan Yayınları olarak yönettiğimiz platformlarımıza erişiminiz sırasında topladığımız verilerinizin gizliliği ve güvenliği işbu Politika’nın kapsamındadır.
          Lisans Yayıncılık tarafından yönetilmeyen bir sitede Lisans Yayıncılık’a ait bir logonun işaret vb. bir görselin bulunması işbu Politika’nın o site için geçerli olduğu anlamına gelmemektedir. Bu tür siteler ile kişisel veri paylaşımı gerçekleştirirken işbu Politika’da yer alan güvencelerden faydalanabilmeniz için söz konusu sitenin Lisans Yayıncılık‘a ait bir site olduğundan emin olmanız gerekmektedir.
        </p>
        <p>
          <strong>Kişisel Verilerin Korunması</strong><br />
          KVKK kapsamında kişisel verilerinizin veri sorumlusu sıfatı ile Lisans Yayıncılık tarafından işlenmesi kişisel verilerinize ilişkin haklarınız hakkında ve kişisel verilerinizi korumak için aldığımız teknik ve idari tedbirler ile ilgili detaylı bilgi almak için lütfen Aydınlatma Metnimizi ve Kişisel Verilerin Korunması Politikamızı okuyunuz.
        </p>
        <p>
          <strong>İnternet Sitemizde Toplanan Veriler</strong><br />
          <u>İletişim Formu Vasıtasıyla Toplanan Kişisel Veriler</u><br />
          Bizlere talep ve şikâyetlerinizi iletebilmenizi sağlayan iletişim formumuz vasıtasıyla; isim soy isim, gönderilen ileti ve elektronik posta adresi bilgilerinizi toplamaktayız.
        </p>
        <p>
          <u>Üyelik Formu Vasıtasıyla Toplanan Kişisel Veriler</u><br />
          Lisans Yayıncılık’a üye olmanızı sağlayan üyelik formumuz vasıtasıyla; isim soy isim ve elektronik posta adresi bilgilerinizi kanuni yükümlülüklerimiz gereği mecburen toplamaktayız. Doğum tarihi, adres ve telefon numarası bilgilerinizi ise sizlerin talebine bağlı olarak toplamaktayız. Ek olarak talebiniz üzerine ve onay vermeniz halinde elektronik posta adresinize e-bülten iletileri göndermekteyiz.
        </p>
        <p>
          <u>Cihaz Bilgisi</u><br />
          Hizmetlerimizden faydalanırken kullandığınız elektronik cihazlarınıza (bilgisayarlar, tabletler, akıllı telefonlar, akıllı televizyonlar vb.) ait IP adresi vb. bilgiler toplanmaktadır. Ayrıca internet sitemiz aracılığıyla sizlere anlık bildirimler gönderebiliriz. Cihazınızın işletim sisteminin içerisindeki ayarları değiştirerek bu iletileri almayı reddedebilirsiniz.
        </p>
        <p>
          <u>Çerezler Vasıtasıyla Toplanan Veriler</u><br />
          Çerezler bir internet sitesi ziyaret edildiğinde ziyaretçinin cihazında (örneğin bilgisayar veya telefon) depolanan ve isim-değer formatında veri barındırabilen küçük metin dosyalarıdır. Bu vesileyle internet sitesine/sitelerine ziyaretin gerçekleştirildiği cihaz ve ilgili kullanıcı hakkında çeşitli bilgiler elde edilebilmektedir. İnternet sitemizde çerez kullanılmaktadır. İnternet sitemizdeki çerez kullanımı hakkında detaylı bilgi almak için lütfen Çerez Politikamızı okuyunuz.
        </p>
        <p>
          <u>Sunucularımıza Eriştiğinizde Otomatik Olarak Topladığımız Veriler</u><br />
          İnternet sitemizi kullanmanız halinde müşterilerimizin bireysel veya kurumsal taleplerini ve ihtiyaçlarını karşılayabilmek, teknik alt yapımızı geliştirmek ve denetlemek, kullandığımız donanım ve yazılım teknolojilerini ve diğer hizmetlerimizi geliştirmek ve hukuki yükümlülüklerimizi yerine getirmek amaçlarıyla size ait cihaz log kayıtları vb. kişisel verileri toplayabiliriz.
        </p>
        <p>
          <strong>Üçüncü Taraf İnternet Sitelerine Verilen Linkler</strong><br />
          Sitemiz özel istihdam büroları gibi üçüncü tarafların internet sitelerine ait bağlantılar içerebilir. Bu gibi hallerde üçüncü taraflarca veri toplanması, işlenmesi, paylaşılması veya aktarımı sorumluluğumuzun dışındadır. Üçüncü taraf siteleri kullanımınız ve bu sitelerle veri paylaşımınız, bu sitelerdeki gizlilik politikası ve kullanım şartlarına tabi olup işbu Politika’nın kapsamı dışındadır.
        </p>
        <p>
          <strong>Politika’nın Güncellenmesi</strong><br />
          İşbu Politika’nın hükümleri kısmen veya tamamen internet sitemizde yayımlandığı tarihte yürürlüğe girmek üzere değiştirilebilir ya da yenilenebilir. Politika’daki değişiklikleri takip edebilmeniz adına internet sitemizi belirli aralıklarla kontrol etmenizi tavsiye etmekteyiz.
        </p>
        <p>
          <strong>Bize Ulaşın</strong><br />
          İşbu Politika’nın yorumlanması veya uygulanması ile ilgili sorularınızı, çekincelerinizi veya şikayetlerinizi; lisansyayincilik@gmail.com elektronik posta adresine veya Tahtakale Mahallesi Hicret Sokak No: 8 / A Avcılar / İSTANBUL adresine iletebilirsiniz.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KVKKModal;
