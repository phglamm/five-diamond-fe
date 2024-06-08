import { Link } from "react-router-dom";
import "./SideBar.css";
import logo from "../../../public/assets/images/Logo/logo.png";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import CategoryIcon from "@mui/icons-material/Category";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import { routes } from "../../routes";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
export default function SideBar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="sidenav">
      <div className="sidenav-header">
        <img src={logo} alt="" />

        <span>Five Diamond</span>
      </div>
      <hr className="rounded" />
      <h1>Admin DashBoard</h1>
      <hr className="rounded" />

      <li>
        <StackedLineChartIcon
          color="info"
          fontSize="large"
        ></StackedLineChartIcon>
        <Link to="">Thống Kê</Link>
      </li>
      <li>
        <BarChartIcon color="info" fontSize="large"></BarChartIcon>
        <Link to="">Biểu Đồ</Link>
      </li>
      <li>
        <ShoppingCartIcon color="info" fontSize="large"></ShoppingCartIcon>
        <Link to={routes.adminmanageorder}>Quản Lý Đơn Hàng</Link>
      </li>
      <li>
        <DiamondIcon color="info" fontSize="large"></DiamondIcon>
        <Link to={routes.adminProduct}>Quản Lý Sản Phẩm</Link>
      </li>
      <li>
        <DiamondIcon color="info" fontSize="large"></DiamondIcon>
        <Link to={routes.adminDiamond}>Quản Lý Kim Cương</Link>
      </li>
      <li>
        <CategoryIcon color="info" fontSize="large"></CategoryIcon>
        <Link to={routes.adminDiamondshell}>Quản Lý Vỏ Kim Cương</Link>
      </li>
      <li>
        <CategoryIcon color="info" fontSize="large"></CategoryIcon>
        <Link to={routes.adminCategory}>Quản Lý Danh Mục</Link>
      </li>
      <li>
        <PersonIcon color="info" fontSize="large"></PersonIcon>
        <Link to="">Quản Lý Khách Hàng</Link>
      </li>
      <li>
        <EventIcon color="info" fontSize="large"></EventIcon>
        <Link to="">Quản Lý Sự Kiện Sale</Link>
      </li>

      {/* <Link to={routes.login}>
        <BasicButton
          text={"Đăng Xuất"}
          icon={"pi pi-sign-in"}
          onClick={handleLogout}
          className="admin-button-logout"
        ></BasicButton>
      </Link> */}

      <li>
        <LogoutIcon color="info" fontSize="large"></LogoutIcon>
        <Link onClick={handleLogout} to={routes.login}>
          Đăng Xuất
        </Link>
      </li>
    </div>
  );
}
