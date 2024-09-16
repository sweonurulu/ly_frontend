import React from "react";
import { Modal, Button } from "react-bootstrap";

const TeslimatIadeModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Teslimat ve İade Koşulları</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "500px", overflowY: "scroll" }}>
        <h5>TÜKETİCİ HAKLARI – CAYMA – İPTAL İADE KOŞULLARI</h5>
        <p><strong>GENEL:</strong></p>
        <p>
          1. Kullanmakta olduğunuz web sitesi üzerinden elektronik ortamda
          sipariş verdiğiniz takdirde, size sunulan ön bilgilendirme formunu ve
          mesafeli satış sözleşmesini kabul etmiş sayılırsınız.
        </p>
        <p>
          2. Alıcılar, satın aldıkları ürünün satış ve teslimi ile ilgili olarak
          6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
          Sözleşmeler Yönetmeliği (RG:27.11.2014/29188) hükümleri ile
          yürürlükteki diğer yasalara tabidir.
        </p>
        <p>
          3. Ürün sevkiyat masrafı olan kargo ücretleri, aksi belirtilmemişse,
          alıcılar tarafından ödenecektir.
        </p>
        <p>
          4. Satın alınan her bir ürün, 30 günlük yasal süreyi aşmamak kaydı ile
          alıcının gösterdiği adresteki kişi ve/veya kuruluşa teslim edilir. Bu
          süre içinde ürün teslim edilmez ise Alıcılar sözleşmeyi sona
          erdirebilir.
        </p>
        <p>
          5. Satın alınan ürünün satılmasının imkansızlaşması durumunda satıcı
          bu durumu öğrendiğinden itibaren 3 gün içinde yazılı olarak alıcıya bu
          durumu bildirmek zorundadır. 14 gün içinde de toplam bedel Alıcı’ya
          iade edilmek zorundadır.
        </p>
        <p><strong>SATIN ALINAN ÜRÜN BEDELİ ÖDENMEZ İSE:</strong></p>
        <p>
          6. Alıcı, satın aldığı ürün bedelini ödemez veya banka kayıtlarında
          iptal ederse, Satıcının ürünü teslim yükümlülüğü sona erer.
        </p>
        <p><strong>KREDİ KARTININ YETKİSİZ KULLANIMI İLE YAPILAN ALIŞVERİŞLER:</strong></p>
        <p>
          7. Ürün teslim edildikten sonra, alıcının ödeme yaptığı kredi kartının
          yetkisiz kişiler tarafından haksız olarak kullanıldığı tespit edilirse
          ve satılan ürün bedeli ilgili banka veya finans kuruluşu tarafından
          Satıcı’ya ödenmez ise; alıcı sözleşme konusu ürünü 3 gün içerisinde
          nakliye gideri Satıcı’ya ait olacak şekilde Satıcı’ya iade etmek
          zorundadır.
        </p>
        <p><strong>ÖNGÖRÜLEMEYEN SEBEPLERLE ÜRÜN SÜRESİNDE TESLİM EDİLEMEZ İSE:</strong></p>
        <p>
          8. Satıcı’nın öngöremeyeceği mücbir sebepler oluşursa ve ürün süresinde
          teslim edilemez ise, durum Alıcı’ya bildirilir. Alıcı siparişin iptalini,
          ürünün benzeri ile değiştirilmesini veya engel ortadan kalkana dek
          teslimatın ertelenmesini talep edebilir. Alıcı siparişi iptal ederse;
          ödemeyi nakit ile yapmış ise iptalinden itibaren 14 gün içinde kendisine
          nakden bu ücret ödenir. Alıcı, ödemeyi kredi kartı ile yapmış ise ve
          iptal ederse, bu iptalden itibaren yine 14 gün içinde ürün bedeli bankaya
          iade edilir, ancak bankanın alıcının hesabına 2-3 hafta içerisinde
          aktarması olasıdır.
        </p>
        <p><strong>ALICININ ÜRÜNÜ KONTROL ETME YÜKÜMLÜLÜĞÜ:</strong></p>
        <p>
          9. Alıcı, sözleşme konusu mal/hizmeti teslim almadan önce muayene edecek;
          ezik, kırık, ambalajı yırtılmış vb. hasarlı ve ayıplı mal/hizmeti kargo
          şirketinden teslim almayacaktır. Teslim alınan mal/hizmetin hasarsız ve
          sağlam olduğu kabul edilecektir.
        </p>
        <p><strong>CAYMA HAKKI:</strong></p>
        <p>
          10. Alıcı; satın aldığı ürünün kendisine veya gösterdiği adresteki
          kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde
          Satıcı’ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk
          üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek
          sözleşmeden cayma hakkını kullanabilir.
        </p>
        <p>11. SATICININ CAYMA HAKKI BİLDİRİMİ YAPILACAK İLETİŞİM BİLGİLERİ:</p>
        <p>
          ŞİRKET<br />
          ADI/UNVANI: <br />
          ADRES: <br />
          EPOSTA: <br />
          TEL: <br />
          FAKS: <br />
          CAYMA HAKKININ SÜRESİ:
        </p>

        <p>12. Alıcı, satın aldığı eğer bir hizmet ise, bu 14 günlük süre sözleşmenin imzalandığı tarihten itibaren başlar. Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile hizmetin ifasına başlanan hizmet sözleşmelerinde cayma hakkı kullanılamaz.</p>
        <p>13. Cayma hakkının kullanımından kaynaklanan masraflar SATICI’ya aittir.</p>
        <p>14. Cayma hakkının kullanılması için 14 (ondört) günlük süre içinde SATICI’ya iadeli taahhütlü posta, faks veya eposta ile yazılı bildirimde bulunulması ve ürünün işbu sözleşmede düzenlenen “Cayma Hakkı Kullanılamayacak Ürünler” hükümleri çerçevesinde kullanılmamış olması şarttır.</p>
        <p><strong>CAYMA HAKKININ KULLANIMI:</strong></p>
        <p>
          15. 3. kişiye veya ALICI’ ya teslim edilen ürünün faturası, (İade edilmek istenen ürünün faturası kurumsal ise, iade ederken kurumun düzenlemiş olduğu iade faturası ile birlikte gönderilmesi gerekmektedir. Faturası kurumlar adına düzenlenen sipariş iadeleri İADE FATURASI kesilmediği takdirde tamamlanamayacaktır.)
        </p>
        <p>
          16. İade formu, iade edilecek ürünlerin kutusu, ambalajı, varsa standart aksesuarları ile birlikte eksiksiz ve hasarsız olarak teslim edilmesi gerekmektedir.
        </p>

        <p><strong>İADE KOŞULLARI:</strong></p>
        <p>
          17. SATICI, cayma bildiriminin kendisine ulaşmasından itibaren en geç 10 günlük süre içerisinde toplam bedeli ve ALICI’yı borç altına sokan belgeleri ALICI’ ya iade etmek ve 20 günlük süre içerisinde malı iade almakla yükümlüdür.
        </p>
        <p>
          18. ALICI’nın kusurundan kaynaklanan bir nedenle malın değerinde bir azalma olursa veya iade imkânsızlaşırsa, ALICI kusuru oranında SATICI’nın zararlarını tazmin etmekle yükümlüdür. Ancak cayma hakkı süresi içinde malın veya ürünün usulüne uygun kullanılması sebebiyle meydana gelen değişiklik ve bozulmalardan ALICI sorumlu değildir.
        </p>
        <p>
          19. Cayma hakkının kullanılması nedeniyle SATICI tarafından düzenlenen kampanya limit tutarının altına düşülmesi halinde kampanya kapsamında faydalanılan indirim miktarı iptal edilir.
        </p>
        <p><strong>TEMERRÜT HALİ VE HUKUKİ SONUÇLARI</strong></p>
        <p>
          20. ALICI, ödeme işlemlerini kredi kartı ile yaptığı durumda temerrüde düştüğü takdirde, kart sahibi banka ile arasındaki kredi kartı sözleşmesi çerçevesinde faiz ödeyeceğini ve bankaya karşı sorumlu olacağını kabul, beyan ve taahhüt eder. Bu durumda ilgili banka hukuki yollara başvurabilir; doğacak masrafları ve vekâlet ücretini ALICI’dan talep edebilir ve her koşulda ALICI’nın borcundan dolayı temerrüde düşmesi halinde, ALICI, borcun gecikmeli ifasından dolayı SATICI’nın uğradığı zarar ve ziyanını ödeyeceğini kabul eder.
        </p>

        <p><strong>ÖDEME VE TESLİMAT</strong></p>
        <p>
          21. Banka Havalesi veya EFT (Elektronik Fon Transferi) yaparak; Türkiye İş Bankası, _______ – Şube Kodu: _____ Hesap No: _______ – LİSANS YAYINCILIK SAN. VE TİC. LTD. ŞTİ.  (IBAN: _____________________) bankası hesaplarımızdan (TL) herhangi birine yapabilirsiniz.
        </p>
        <p>
          22. Sitemiz üzerinden kredi kartlarınız ile, Her türlü kredi kartınıza online tek ödeme ya da online taksit imkânlarından yararlanabilirsiniz. Online ödemelerinizde siparişiniz sonunda kredi kartınızdan tutar çekim işlemi gerçekleşecektir.
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

export default TeslimatIadeModal;
