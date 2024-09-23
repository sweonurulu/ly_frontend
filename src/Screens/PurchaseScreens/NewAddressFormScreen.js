import React, { useState, useEffect } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import citiesData from "../../il-ilce.json"; // Şehir ve ilçe bilgileri JSON'dan geliyor

const NewAddressFormScreen = ({ onCancel, onConfirm }) => {
  const [formData, setFormData] = useState({
    title: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});
  const [districts, setDistricts] = useState([]);
  const cities = citiesData.data;

  useEffect(() => {
    const selectedCity = cities.find((city) => city.il_adi === formData.city);
    if (selectedCity) {
      setDistricts(selectedCity.ilceler.map((ilce) => ilce.ilce_adi));
    } else {
      setDistricts([]);
    }
  }, [formData.city]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Adres başlığı boş olamaz.";
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Adres satırı 1 boş olamaz.";
    }
    if (!formData.city) {
      newErrors.city = "Şehir seçmelisiniz.";
    }
    if (!formData.district) {
      newErrors.district = "İlçe seçmelisiniz.";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Posta kodu boş olamaz.";
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Posta kodu 5 haneli olmalıdır.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onConfirm(); // Adres onaylandığında kart bilgisi formunu aç
    }
  };

  return (
    <MDBContainer>
      <MDBCard className="rounded-3 shadow-lg">
        <MDBCardBody className="p-4">
          <h4 className="text-center mb-4">Yeni Adres Ekle</h4>
          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Adres Başlığı"
              name="title"
              value={formData.title}
              onChange={handleChange}
              size="md"
              className="mb-2"
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

            <MDBInput
              label="Adres Satırı 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              size="md"
              className="mb-2"
            />
            {errors.addressLine1 && <p style={{ color: "red" }}>{errors.addressLine1}</p>}

            <MDBInput
              label="Adres Satırı 2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              size="md"
              className="mb-2"
            />

            <MDBRow>
              <MDBCol size="6">
                <select
                  className="form-select mb-2"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Şehir Seçiniz</option>
                  {cities.map((city) => (
                    <option key={city.il_adi} value={city.il_adi}>
                      {city.il_adi}
                    </option>
                  ))}
                </select>
                {errors.city && <p style={{ color: "red" }}>{errors.city}</p>}
              </MDBCol>

              <MDBCol size="6">
                <select
                  className="form-select mb-2"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!formData.city}
                >
                  <option value="">İlçe Seçiniz</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && <p style={{ color: "red" }}>{errors.district}</p>}
              </MDBCol>
            </MDBRow>

            <MDBInput
              label="Posta Kodu"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              size="md"
              className="mb-2"
            />
            {errors.zipCode && <p style={{ color: "red" }}>{errors.zipCode}</p>}

            <div className="d-flex justify-content-between mt-3">
              <MDBBtn type="submit" color="primary">
                Adresi Onayla
              </MDBBtn>
              <MDBBtn type="button" color="secondary" onClick={onCancel}>
                İptal Et
              </MDBBtn>
            </div>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default NewAddressFormScreen;
