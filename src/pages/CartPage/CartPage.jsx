import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Image,
} from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ImCart } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import cartItemsData from "./cartItems";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // This would normally fetch data from an API or local storage
  //   const initialCartItems = [
  //     // {
  //     //   id: "AFEC000459D2DA1",
  //     //   name: "Bông tai kim cương",
  //     //   price: 38050000,
  //     //   quantity: 1,
  //     //   image:
  //     //     "https://tnj.vn/75169-large_default/nhan-bac-nu-dinh-da-10mm-nn0440.jpg",
  //     //   description:
  //     //     "Bông tai kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
  //     //   code: "AFEC000459D2DA1",
  //     // },
  //     // {
  //     //   id: "AFPB001948F2HA1",
  //     //   name: "Mặt dây nữ kim cương",
  //     //   price: 17370000,
  //     //   quantity: 1,
  //     //   image:
  //     //     "https://lili.vn/wp-content/uploads/2022/10/Day-chuyen-bac-unisex-dinh-kim-cuong-Moissanite-dang-chuoi-da-LILI_054275_2.jpg",
  //     //   description:
  //     //     "Mặt dây nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
  //     //   code: "AFPB001948F2HA1",
  //     // },
  //     // {
  //     //   id: "AFPB001948F8BA1",
  //     //   name: "Dây chuyền nữ kim cương",
  //     //   price: 27790000,
  //     //   quantity: 1,
  //     //   image:
  //     //     "https://lili.vn/wp-content/uploads/2022/06/Mat-day-chuyen-bac-nu-dinh-kim-cuong-Moissanite-tron-cach-dieu-LILI_413898_6-150x150.jpg",
  //     //   description:
  //     //     "Dây chuyền nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.",
  //     //   code: "AFPB001948F8BA1",
  //     // },
  //   ];
  //   setCartItems(initialCartItems);
  // }, []);
  useEffect(() => {
    setCartItems(cartItemsData);
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shippingCost = 0; // Miễn phí vận chuyển

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) => {
      return prevItems.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const handleClick = () => {
    navigate(routes.home);
  };
  return (
    <div className="page-container">
      <Header />
      <Container className="container">
        <Row>
          <Col md={8} className="Col8 col-md-8">
            <h4>
              <ImCart /> Giỏ hàng ({totalItems} sản phẩm)
            </h4>
            <div className="continue-btn">
              <Button variant="light" className="w-100 mt-2" type="button">
                <IoMdArrowRoundBack /> Tiếp tục mua hàng
              </Button>
            </div>

            <Card>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="order-item">
                    <div className="product-details">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="product-image"
                      />
                      <div className="order-item-details">
                        <h5>{item.name}</h5>
                        <p>MSP: {item.code}</p>
                        <div className="quantity-control">
                          {/* <ButtonGroup>
                          <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                          <span className="quantity">{item.quantity}</span>
                          <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                          </ButtonGroup> */}
                        </div>
                        <div>
                          <span className="price-text">
                            Giá tiền:{" "}
                            <span style={{ color: "red" }}>
                              {item.price.toLocaleString()}đ
                            </span>
                          </span>
                          <span>
                            Tạm tính:{" "}
                            <span style={{ color: "red" }}>
                              {(item.price * item.quantity).toLocaleString()}đ
                            </span>
                          </span>
                        </div>
                        <span>
                          Thành tiền:{" "}
                          <span style={{ color: "red" }}>
                            {(item.price * item.quantity).toLocaleString()}đ
                          </span>
                        </span>
                        <p>Mô tả: {item.description}</p>
                        <span
                          style={{
                            color: "#ce0303",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => removeItem(item.id)}
                        >
                          Xóa
                        </span>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col md={4} className="col-md-4">
            <div className="Col4">
              <Card>
                <Card.Header>
                  <h4>Tổng Tiền</h4>
                </Card.Header>
                <Card.Body>
                  <h5>
                    Tạm tính:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      {total.toLocaleString()} VNĐ
                    </span>
                  </h5>
                  <hr class="solid"></hr>
                  <h5>
                    Vận chuyển:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      Miễn phí vận chuyển
                    </span>
                  </h5>
                  <hr className="solid"></hr>
                  <h5>
                    Thanh toán:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      {total.toLocaleString()} VNĐ
                    </span>
                  </h5>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control mr-2"
                      placeholder="Mã giảm giá/Quà tặng"
                    />
                    <Button
                      style={{ background: "#614A4A" }}
                      className="apply-button"
                    >
                      Áp dụng
                    </Button>
                  </div>
                  <Button
                    style={{ background: "#ce0303", marginTop: "15px" }}
                    className="w-100 btn-proceed-to-checkout"
                    type="submit"
                  >
                    Tiến hành đặt hàng
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
