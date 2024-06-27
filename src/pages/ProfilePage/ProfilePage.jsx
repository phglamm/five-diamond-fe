import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUser } from "../../redux/features/counterSlice";
import { Modal, Button, Input, DatePicker, Form } from "antd";
import api from "../../config/axios";
import dayjs from "dayjs";

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      dispatch(updateUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setImage(file);
    // Đoạn này bạn có thể thực hiện các xử lý khác như upload file lên server
  };

  const handleUpdateClick = () => {
    // Xử lý cập nhật hình ảnh và logic tương tự ở đây
  };

  const handleEditInfoClick = () => {
    setVisible(true);
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  const handleModalOk = async () => {
    try {
      await api.put(`/api/user/${user.id}`, user);
      setVisible(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const dateOnChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateUser({ ...user, [name]: value }));
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return (
    <div>
      <Header />
      <div className="avatar-user">
        <div onClick={handleImageClick} className="img-avt">
          {console.log(user.gender === "MALE")}
          {console.log(user.gender)}
          {user.gender === "MALE" ? (
            <img
              id="avt-img"
              src="https://drive.google.com/thumbnail?id=1qbgOEeSmZUjLlvazltYvqIWl58ds3Rwr&sz=w1000"
              alt="Male Avatar"
            />
          ) : (
            <img
              id="avt-img"
              src="https://drive.google.com/thumbnail?id=1-TZW7Js2ujLNyIXbYEEeiJfegVGgpjfd&sz=w1000"
              alt="Female Avatar"
            />
          )}
          {/* {image ? (
            <img id="avt-img" src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img id="avt-img" src="https://drive.google.com/thumbnail?id=1qbgOEeSmZUjLlvazltYvqIWl58ds3Rwr&sz=w1000" alt="Default Avatar" />
            <img id="avt-img" src="https://drive.google.com/thumbnail?id=1qbgOEeSmZUjLlvazltYvqIWl58ds3Rwr&sz=w1000" alt="Default Avatar" />
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          /> */}
        </div>
        <button className="update-img-btn" onClick={handleUpdateClick}>
          Cập nhật
        </button>
      </div>

      {/* useEffect(() => {
    const savedImage = localStorage.getItem('userImage');
    if (savedImage) {
      setDefaultImage(savedImage);
    } else {
      setDefaultImage(Ninja);
    }
  }, []);
  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  const handleUpdateClick = () => {
    if (image) {
      const newDefaultImage = URL.createObjectURL(image);
      setDefaultImage(newDefaultImage);
      localStorage.setItem('userImage', newDefaultImage);
      setImage(null);
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <div>
      <Header></Header>
      <div className="avatar-user">
        <div onClick={handleImageClick} className="img-avt">
          <img id="avt-img" src={image ? URL.createObjectURL(image) : defaultImage} alt="Avatar" />
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <button className="update-img-btn" onClick={handleUpdateClick}>Cập nhật</button>
      </div> */}

      <div className="info">
        <div className="info-text">
          <h3>Thông tin cá nhân</h3>
          <div>
            <p>Họ và tên:{" " + user.firstname + " " + user.lastname}</p>
            <p>Giới tính:{" " + user.gender}</p>
            <p>Số điện thoại:{" " + user.phone}</p>
            <p>Ngày sinh:{" " + formatDate(user.dob)}</p>
            <p>Địa chỉ:{" " + user.address}</p>
          </div>
        </div>

        <Button type="primary" onClick={handleEditInfoClick}>
          Chỉnh sửa thông tin
        </Button>
      </div>

      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        visible={visible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Lưu
          </Button>,
        ]}
      >
        <div className="info-edit-form">
          <Form
            layout="horizontal"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 20 }}
            style={{ width: "100%" }}
          >
            <Form.Item label="Họ và tên" style={{ width: "100%" }}>
              <Input
                placeholder="Họ và tên"
                defaultValue={user.firstname + " " + user.lastname}
              />
            </Form.Item>
            <Form.Item label="Giới tính">
              <Input placeholder="Giới tính" defaultValue={user.gender} />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input placeholder="Số điện thoại" defaultValue={user.phone} />
            </Form.Item>
            <Form.Item label="Ngày sinh">
              <DatePicker
                style={{ width: "100%", marginBottom: "5px" }}
                onChange={dateOnChange}
                defaultValue={dayjs(user.dob)}
              />
            </Form.Item>
            <Form.Item label="Địa chỉ">
              <Input placeholder="Địa chỉ" defaultValue={user.address} />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <div className="info">
        <div>
          <h3>Thông tin tài khoản</h3>
        </div>
        <Link to="">
          <Button text={"Đổi mật khẩu"} />
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
