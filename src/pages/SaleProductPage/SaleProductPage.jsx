// import React, { useState } from "react";
// import { Container } from "react-bootstrap";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import { Dropdown, Menu, Pagination } from 'antd';
// import "./SaleProductPage.css";
// import { saleProducts } from "./ListOfSaleProducts";
// import Banner from "../../components/Banner/banner";
// import banner1 from "../../../public/assets/images/Banner/banner1.jpg";
// import banner2 from "../../../public/assets/images/Banner/banner2.jpg";
// import banner3 from "../../../public/assets/images/Banner/banner3.jpg";
// import banner4 from "../../../public/assets/images/Banner/banner4.jpg";

// const SaleProductPage = () => {
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const pageSize = 18; // Number of items per page

//     // Pagination handler
//     const onChange = (pageNumber) => {
//         console.log('Page: ', pageNumber);
//         setCurrentPage(pageNumber);
//     };

//     // Calculate the index range for the current page
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;

//     // Filter products by category
//     const filteredProducts = selectedCategory ? saleProducts.filter(product => product.category === selectedCategory) : saleProducts;

//     // Slice the products array based on the current page and page size
//     const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

//     // Generate menu items for the dropdown
//     const menu = (
//         <Menu onClick={({ key }) => setSelectedCategory(key === "all" ? null : key)}>
//             <Menu.Item key="all">All</Menu.Item>
//             <Menu.Item key="ring">Rings</Menu.Item>
//             <Menu.Item key="necklace">Necklaces</Menu.Item>
//             <Menu.Item key="bracelet">Bracelets</Menu.Item>
//         </Menu>
//     );

//     return (
//         <div>
//             <Header />
//             <Container>
//                 <Banner
//                     className="sale-product-banner"
//                     pic1={banner1}
//                     pic2={banner2}
//                     pic3={banner3}
//                     pic4={banner4}
//                 ></Banner>
//                 <div>
//                     <div className="sale-content">
//                         <p>NHẪN ƯU ĐÃI ĐẾN 20%</p>
//                         <p>VÒNG CỔ ƯU ĐÃI ĐẾN 40%</p>
//                         <p>KIM CƯƠNG ƯU ĐÃI 2%</p>
//                     </div>
//                     {/* Category dropdown */}
//                     <Dropdown overlay={menu} trigger={['hover']}>
//                         <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
//                             Filter by Category
//                         </a>
//                     </Dropdown>
//                     <div className='sale-product-card'>
//                         {paginatedProducts.map((product) => (
//                             <div className='col-2' key={product.id}>
//                                 <div className='card' >
//                                     <img src={product.img} alt={product.name} />
//                                     <h3>{product.name}</h3>
//                                     <h3>{product.price}</h3>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 {/* Pagination */}
//                 <Pagination
//                     className="pagination"
//                     current={currentPage}
//                     onChange={onChange}
//                     total={filteredProducts.length} // Total number of products, not just paginated
//                     pageSize={pageSize}
//                 />
//             </Container>
//             <Footer />
//         </div>
//     );
// }

// export default SaleProductPage;

import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Dropdown, Menu, Pagination } from 'antd';
import "./SaleProductPage.css";
import { saleProducts } from "./ListOfSaleProducts";
import Banner from "../../components/Banner/banner";
import banner1 from "../../../public/assets/images/Banner/banner1.jpg";
import banner2 from "../../../public/assets/images/Banner/banner2.jpg";
import banner3 from "../../../public/assets/images/Banner/banner3.jpg";
import banner4 from "../../../public/assets/images/Banner/banner4.jpg";

const SaleProductPage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 18; // Number of items per page

    // Pagination handler
    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
        setCurrentPage(pageNumber);
        history.push(`/san-pham-giam-gia/page-${pageNumber}`);
    };

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Filter products by category
    const filteredProducts = selectedCategory ? saleProducts.filter(product => product.category === selectedCategory) : saleProducts;

    // Slice the products array based on the current page and page size
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Generate menu items for the dropdown
    const menu = (
        <Menu onClick={({ key }) => setSelectedCategory(key === "all" ? null : key)}>
            <Menu.Item key="all">All</Menu.Item>
            <Menu.Item key="ring">Rings</Menu.Item>
            <Menu.Item key="necklace">Necklaces</Menu.Item>
            <Menu.Item key="bracelet">Bracelets</Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Header />
            <Container>
                <Banner
                    className="sale-product-banner"
                    pic1={banner1}
                    pic2={banner2}
                    pic3={banner3}
                    pic4={banner4}
                ></Banner>
                <div>
                    <div className="sale-content">
                        <p>NHẪN ƯU ĐÃI ĐẾN 20%</p>
                        <p>VÒNG CỔ ƯU ĐÃI ĐẾN 40%</p>
                        <p>KIM CƯƠNG ƯU ĐÃI 2%</p>
                    </div>
                    {/* Category dropdown */}
                    <Dropdown overlay={menu} trigger={['hover']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Filter by Category
                        </a>
                    </Dropdown>
                    <div className='sale-product-card'>
                        {paginatedProducts.map((product) => (
                            <div className='col-2' key={product.id}>
                                <div className='card' >
                                    <img src={product.img} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <h3>{product.price}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Pagination */}
                <Pagination
                    className="pagination"
                    current={currentPage}
                    onChange={onChange}
                    total={filteredProducts.length} // Total number of products, not just paginated
                    pageSize={pageSize}
                />
                {/* Display page number in URL for page 2 and onwards */}
                {currentPage > 1 && (
                    <Link to={`/san-pham-giam-gia/page-${currentPage}`} className="page-link">{currentPage}</Link>
                )}
            </Container>
            <Footer />
        </div>
    );
}

export default SaleProductPage;
