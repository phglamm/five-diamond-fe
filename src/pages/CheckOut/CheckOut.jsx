import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import './CheckOut.css';
import { routes } from "../../routes";

export default function CheckOut() {
  const location = useLocation();
  const { cartItems, finalTotal } = location.state || { cartItems: [], finalTotal: 0 };
  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({ id: "", name: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({ id: "", name: "" });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://vapi.vnappmob.com/api/province/');
        setProvinces(response.data.results);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince.id) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince.id}`);
          setDistricts(response.data.results);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict.id) {
      const fetchWards = async () => {
        try {
          const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict.id}`);
          setWards(response.data.results);
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setSelectedProvince({ id: e.target.value, name: selectedOption.text });
    setSelectedDistrict({ id: "", name: "" });
    setSelectedWard({ id: "", name: "" });
  };

  const handleDistrictChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setSelectedDistrict({ id: e.target.value, name: selectedOption.text });
    setSelectedWard({ id: "", name: "" });
  };

  const handleWardChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    setSelectedWard({ id: e.target.value, name: selectedOption.text });
  };

  const validateForm = () => {
    const formErrors = {};
    const form = document.forms[0];
    if (!form.name.value) formErrors.name = "Họ Tên là bắt buộc";
    if (!form.phone.value) formErrors.phone = "Điện Thoại là bắt buộc";
    if (!address) formErrors.address = "Địa chỉ là bắt buộc";
    if (!selectedProvince.id) formErrors.province = "Chọn Tỉnh/TP là bắt buộc";
    if (!selectedDistrict.id) formErrors.district = "Chọn Quận/Huyện là bắt buộc";
    if (!selectedWard.id) formErrors.ward = "Chọn Xã/Phường là bắt buộc";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (validateForm()) {
      const form = event.currentTarget;
      const data = {
        name: form.name.value,
        phone: form.phone.value,
        address: form.address.value,
        province: selectedProvince.name,
        district: selectedDistrict.name,
        ward: selectedWard.name,
        note: form.note.value,
        cartItems: cartItems,
      };
      try {
        const response = await axios.post('http://157.245.145.162:8080/api/wallet/vnpay', { 
          amount: finalTotal,
        });
        const paymentUrl = response.data;
        window.location.href = paymentUrl;  // Redirect to the payment URL
      } catch (error) {
        console.error('Error processing the payment:', error);
        setErrors({ api: 'Error processing the payment. Please try again.' });
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="page-container checkout-page">
      <Header />
      <Container className="container">
        <Form onSubmit={handleSubmit}>
          <Row className="Rowall">
            <Col md={8} className="Col8">
              <h4>THÔNG TIN NGƯỜI MUA</h4>
              {formSubmitted && Object.keys(errors).length > 0 && (
                <Alert variant="danger">Vui lòng kiểm tra lại các trường thông tin.</Alert>
              )}
              <Form.Group as={Row} controlId="formFullName" className="align-items-center">
                <Form.Label column md={2} className="form-label">Họ Tên:</Form.Label>
                <Col md={10}>
                  <Form.Control name="name" type="text" placeholder="Nhập họ tên" isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPhoneNumber" className="align-items-center">
                <Form.Label column md={2} className="form-label">Điện Thoại:</Form.Label>
                <Col md={10}>
                  <Form.Control name="phone" type="text" placeholder="Nhập số điện thoại" isInvalid={!!errors.phone} />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Col>
              </Form.Group>

              <h4>PHƯƠNG THỨC NHẬN HÀNG</h4>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formProvince">
                    <Form.Control as="select" value={selectedProvince.id} onChange={handleProvinceChange} name="province">
                      <option value="">Chọn Tỉnh/TP</option>
                      {provinces.map((province) => (
                        <option key={province.province_id} value={province.province_id}>
                          {province.province_name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.province}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formDistrict">
                    <Form.Control as="select" value={selectedDistrict.id} onChange={handleDistrictChange} disabled={!selectedProvince.id} name="district">
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map((district) => (
                        <option key={district.district_id} value={district.district_id}>
                          {district.district_name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.district}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formWard">
                    <Form.Control as="select" value={selectedWard.id} onChange={handleWardChange} disabled={!selectedDistrict.id} name="ward">
                      <option value="">Chọn Xã/Phường</option>
                      {wards.map((ward) => (
                        <option key={ward.ward_id} value={ward.ward_id}>
                          {ward.ward_name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.ward}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formAddress">
                <Form.Label className="form-label"></Form.Label>
                <Form.Control name="address" type="text" placeholder="Nhập địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
                {errors.address && <div className="text-danger">{errors.address}</div>}
              </Form.Group>

              <h4>HÌNH THỨC THANH TOÁN</h4>
              <Form.Group controlId="formPaymentMethod">
                <h5>•Thanh toán chuyển khoản</h5>
                <div>
                  <p>
                    Quý khách vui lòng kiểm tra sự nguyên vẹn của gói hàng và tem niêm phong, trước khi thanh toán tiền mặt và nhận hàng
                    <br />
                    + Tên tài khoản: Công ty Cổ phần 10TRACK<br />
                    + Số tài khoản: 00000000000000000000<br />
                    + Ngân hàng: Vietcombank – Chi nhánh Tân Định, TPHCM
                  </p>
                </div>
              </Form.Group>
              <div className="checkout-note">
                <h4>GHI CHÚ</h4>
                <Form.Group as={Row} controlId="formNote" className="align-items-center">
                  <Col md={10}>
                    <Form.Control as="textarea" name="note" rows={3} placeholder="Để lại lời nhắn" />
                  </Col>
                </Form.Group>
              </div>
            </Col>

            <Col md={4}>
              <h4>THÔNG TIN ĐƠN HÀNG</h4>

              {cartItems.length === 0 ? (
                <Alert variant="info">Giỏ hàng trống.</Alert>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.productLine.imgURL} alt={item.productLine.name} className="checkout-image" />
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.productLine.name}</div>
                      <div className="cart-item-quantity">Số lượng: {item.quantity}</div>
                      <div className="cart-item-price">Đơn giá: {item.productLine.price.toLocaleString()} đ</div>
                      <div className="cart-item-total">Thành tiền: {(item.productLine.price * item.quantity).toLocaleString()} đ</div>
                    </div>
                  </div>
                ))
              )}
              <h5>Tổng giá: <span style={{ color: 'red' }}>{finalTotal.toLocaleString()} VNĐ</span></h5>
            </Col>
          </Row>
          <div className="checkout-actions">
            <Button className="button-back" onClick={() => navigate(routes.cart)}>TRỞ LẠI</Button>
            <Button className="button-confirm" type="submit">HOÀN TẤT ĐẶT HÀNG</Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}
