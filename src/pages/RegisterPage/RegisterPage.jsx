import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./RegisterPage.css";

import registerbanner from "../../../public/assets/images/LoginBanner/registerbanner.jpg";
import logo from "../../../public/assets/images/Logo/logo.png";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { Option } from "antd/es/mentions";
import { useState } from "react";

function RegisterPageCard() {
  const [form] = useForm();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
    }
  };

  async function handleSubmit(value) {
    console.log(value);
    const response = await axios.post(
      "http://157.245.145.162:8080/api/register",
      value
    );
    console.log(response);
  }

  function hanldeClickSubmit() {
    form.submit();
  }

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={registerbanner}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <Link to={routes.home} className="form-comeback">
                <i
                  className="pi pi-arrow-circle-left"
                  style={{ fontSize: "2rem" }}
                ></i>
                <span className="">Quay Lại Trang Chủ</span>
              </Link>
              <div className="d-flex flex-row mt-2 form-header">
                <img src={logo} alt="" className="form-logo" />
                <span className="h1 fw-bold mb-0">Five Diamond</span>
              </div>

              <h5
                className="fw-normal my-0 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Đăng Ký
              </h5>
              <div className="form">
                <Form
                  form={form}
                  onFinish={handleSubmit}
                  id="form"
                  className="form-main"
                >
                  <Form.Item
                    required
                    label="Họ"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập Họ của bạn",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    required
                    label="Tên"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập Tên của bạn",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>

                  <Form.Item
                    required
                    label="Số Điện Thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập số điện thoại của bạn",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    required
                    label="Địa Chỉ"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập địa chỉ của bạn",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    required
                    label="Giới Tính"
                    name="gender"
                    rules={[
                      { required: true, message: "Chọn Giới Tính của bạn" },
                    ]}
                  >
                    <Select placeholder="Chọn Giới Tính của bạn">
                      <Option value="male">Nam</Option>
                      <Option value="female">Nữ</Option>
                      <Option value="other">khác</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    required
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Hãy Nhập Email của bạn",
                      },
                      {
                        type: "email",
                        message: "Hãy Nhập đúng Email",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    required
                    label="Mật Khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập Mật Khẩu của bạn!",
                      },
                    ]}
                  >
                    <Input type="password" />
                  </Form.Item>
                  <Form.Item
                    dependencies={["password"]}
                    required
                    label="Xác nhận mật khẩu"
                    name="confirm"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Hãy Xác Nhận lại mật khẩu của bạn",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật Khẩu xác nhận bạn nhập sai")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input type="password" required />
                  </Form.Item>
                  <Button onClick={hanldeClickSubmit} className="form-button">
                    Đăng Ký
                  </Button>
                </Form>
              </div>
              <p className="mb-1 pb-lg-2" style={{ color: "#393f81" }}>
                Bạn đã có tài khoản ?{" "}
                <Link to={routes.login} style={{ color: "#393f81" }}>
                  Đăng Nhập Ngay
                </Link>
              </p>

              {/* <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div> */}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default RegisterPageCard;
