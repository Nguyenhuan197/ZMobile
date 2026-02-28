import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import styles from "./trademarkProduct.module.css";
import UiLoadingComponent from '../../../components/loadingComponent';

const fetcher = (url) => fetch(url).then((res) => res.json());

const PRICE_FILTERS = [
    { label: 'Tất cả', min: 0, max: Infinity },
    { label: 'Dưới 1tr', min: 0, max: 1000000 },
    { label: '1tr - 1.5tr', min: 1000000, max: 1500000 },
    { label: '1.5tr - 2tr', min: 1500000, max: 2000000 },
    { label: '2tr - 3tr', min: 2000000, max: 3000000 },
    { label: '3tr - 5tr', min: 3000000, max: 5000000 },
    { label: '5tr - 10tr', min: 5000000, max: 10000000 },
    { label: 'Trên 10tr', min: 10000000, max: Infinity },
];

export default function TrademarkProductComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const [selectedPrice, setSelectedPrice] = useState(PRICE_FILTERS[0]);
    const { data: trademarkRes } = useSWR(`${apiUrl}/api/trademark/view?status=true`, fetcher);

    const productApiUrl = id
        ? `${apiUrl}/api/product/view-Trademark-Product/${id}`
        : `${apiUrl}/api/product/view-product-phone?status=true`;
    const { data: productRes, isLoading } = useSWR(productApiUrl, fetcher);


    const trademarks = trademarkRes?.data || [];
    const allProducts = productRes?.data || [];

    // Thông tin thương hiệu hiện tại (nếu không có id thì là "Tất cả")
    const currentBrand = id ? trademarks.find(t => t._id === id) : { name: "Tất cả thương hiệu", _id: null };

    const filteredProducts = allProducts.filter(p =>
        p.price >= selectedPrice.min && p.price <= selectedPrice.max
    );

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.container}>

                {/* 1. Banner Thương hiệu đang chọn */}
                <div className={styles.brandStatusBanner}>
                    <div className={styles.brandInfoMain}>
                        {currentBrand?.img?.secure_url ? (
                            <img src={currentBrand.img.secure_url} alt="" className={styles.brandLogoBig} />
                        ) : (
                            <div className={styles.brandLogoPlaceholder}>🛒</div>
                        )}
                        <div className={styles.brandTextGroup}>
                            <h1 className={styles.mainTitle}>{id ? `Thương hiệu ${currentBrand?.name}` : "Tất cả sản phẩm"}</h1>
                            <p className={styles.subCount}>Có <strong>{filteredProducts.length}</strong> sản phẩm</p>
                        </div>
                    </div>
                </div>

                {/* 2. Mobile Brand Selector */}
                <div className={styles.mobileBrandSlider}>
                    <p className={styles.mobileLabel}>Chọn thương hiệu:</p>
                    <div className={styles.brandScrollWrapper}>
                        {/* Nút "Tất cả" cho Mobile */}
                        <div
                            className={`${styles.mobileBrandChip} ${!id ? styles.activeMobileBrand : ''}`}
                            onClick={() => navigate(`/trademark-product`)}
                        >
                            <span style={{ padding: '5px 10px' }}>Tất cả</span>
                        </div>
                        {trademarks.map((item) => (
                            <div
                                key={item._id}
                                className={`${styles.mobileBrandChip} ${id === item._id ? styles.activeMobileBrand : ''}`}
                                onClick={() => navigate(`/trademark-product/${item._id}`)}
                            >
                                <img style={{ borderRadius: 8 }} src={item.img?.secure_url} alt={item.name} />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.layoutBody}>
                    {/* SIDEBAR */}
                    <aside className={styles.sidebar}>
                        <h3 className={styles.sidebarTitle}>Thương hiệu</h3>
                        <div className={styles.brandGridSidebar}>
                            {/* Nút "Tất cả" cho Sidebar Desktop */}
                            <div
                                className={`${styles.brandItem} ${!id ? styles.activeBrand : ''}`}
                                onClick={() => navigate(`/trademark-product`)}
                            >
                                <div className={styles.allIcon}>📱</div>
                                <span>Tất cả thương hiệu</span>
                            </div>
                            {trademarks.map((item) => (
                                <div
                                    key={item._id}
                                    className={`${styles.brandItem} ${id === item._id ? styles.activeBrand : ''}`}
                                    onClick={() => navigate(`/trademark-product/${item._id}`)}
                                >
                                    <img src={item.img?.secure_url} alt={item.name} />
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* CONTENT AREA */}
                    <div className={styles.contentArea}>
                        <div className={styles.filterBox}>
                            <h3 className={styles.filterHeading}>Khoảng giá sản phẩm:</h3>
                            <div className={styles.priceButtonGroup}>
                                {PRICE_FILTERS.map((range, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.priceBtn} ${selectedPrice.label === range.label ? styles.activeBtn : ''}`}
                                        onClick={() => setSelectedPrice(range)}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isLoading ? (
                            <UiLoadingComponent />
                        ) : (
                            <div className={styles.productGrid}>
                                {filteredProducts.map((product) => (
                                    <div key={product._id} className={styles.productCard}>
                                        <div className={styles.categoryTag}>ĐIỆN THOẠI</div>
                                        <div className={styles.imgBox}>
                                            <img src={product.img?.secure_url} alt={product.name} />
                                        </div>
                                        <div className={styles.pDetail}>
                                            <h3 className={styles.pName}>{product.name}</h3>
                                            <div className={styles.pPrice}>{product.price?.toLocaleString()}đ</div>
                                            <button
                                                className={styles.viewMore}
                                                onClick={() => window.location.href = `/product/${product._id}`}
                                            >
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!isLoading && filteredProducts.length === 0 && (
                            <div className={styles.emptyState}>
                                <p>Không có sản phẩm nào trong tầm giá này!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}