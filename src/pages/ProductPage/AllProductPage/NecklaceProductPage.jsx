import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
import Banner from "../../../components/Banner/banner";
import api from "../../../config/axios";

export default function NecklaceProductPage() {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Placeholder for filter and sort state
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  // Handle filter change
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
  };

  // Handle sort change
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSort(value);
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    navigate(`?page=${value}`);
  };

  async function fetchProduct() {
    try {
      const response = await api.get("product-line/available");
      setProduct(response.data);
      setFilteredProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    let updatedProducts = [...product];

    // Apply filter
    if (filter) {
      updatedProducts = updatedProducts.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Apply sort
    if (sort) {
      if (sort === "price-asc") {
        updatedProducts.sort((a, b) => a.finalPrice - b.finalPrice);
      } else if (sort === "price-desc") {
        updatedProducts.sort((a, b) => b.finalPrice - a.finalPrice);
      } else if (sort === "name-asc") {
        updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "name-desc") {
        updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    setFilteredProducts(updatedProducts);
  }, [filter, sort, product]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPage = Math.ceil(filteredProducts.length / pageSize);

  // Lấy 15 sản phẩm đầu tiên
  const firstFifteenProducts = product.slice(0, 15);
  const specialpro = firstFifteenProducts.filter(
    (itemSpecial) => !itemSpecial.deleted
  );

  return (
    <div>
      <Header />
      <Container>
        <Banner
          className="necklace-product-banner"
          pic1={
            "https://drive.google.com/thumbnail?id=1AJRpQgCI7U_pS0Mf8-29fECsxFIhHtSQ&sz=w1000"
          }
          pic2={
            "https://drive.google.com/thumbnail?id=1BcUeVKp1EDUb__MfsxNktaNBROq3hn0F&sz=w1000"
          }
          pic3={
            "https://drive.google.com/thumbnail?id=1dfp8TyCr-IY2IFCi8DUHD_Hq3N6J0bVa&sz=w1000"
          }
          pic4={
            "https://drive.google.com/thumbnail?id=1AJRpQgCI7U_pS0Mf8-29fECsxFIhHtSQ&sz=w1000"
          }
        />

        <div className="filter-sort-container">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={filter}
            onChange={handleFilterChange}
          />
          <Form.Select value={sort} onChange={handleSortChange}>
            <option value="">Lọc theo</option>
            <option value="price-asc">Giá: Thấp tới Cao</option>
            <option value="price-desc">Giá: Cao tới Thấp</option>
            <option value="name-asc">A-Z</option>
            <option value="name-desc">Z-A</option>
          </Form.Select>
        </div>

        <Row>
          {paginatedProducts.map((item, index) => (
            <Col key={index} className="product-card-item">
              <ProductCard
                img={item.imgURL}
                text={item.name}
                price={item.finalPrice.toLocaleString() + "đ"}
                pageType="guest-page"
                id={item.id}
              />
            </Col>
          ))}
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <BasicPagination
            count={totalPage}
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
