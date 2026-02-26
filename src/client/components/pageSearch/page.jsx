import React, { useState } from 'react';
import styles from "./productSearch.module.css";
import useSWR from 'swr';
import UiLoadingComponent from '../../../components/loadingComponent';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductSearchComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;

    const [searchTerm, setSearchTerm] = useState('');
    const { data: dataProducts, isLoading, error } = useSWR(
        `${apiUrl}/api/product/view-product-phone?status=true`,
        fetcher
    );


    if (isLoading) return <UiLoadingComponent />;
    if (error) return <div>Có lỗi xảy ra...</div>;
    const allProducts = dataProducts?.data || [];

    // Lọc theo từ khóa
    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            {/* Thanh tìm kiếm */}
            <div className={styles.searchHeader}>
                <h2 className={styles.title}>Tìm kiếm sản phẩm</h2>

                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Bạn đang tìm sản phẩm gì?..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <p className={styles.resultCount}>
                    Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm
                </p>
            </div>

            {/* Danh sách sản phẩm */}
            <div className={styles.productGrid}>
                {filteredProducts.map(product => (
                    <div
                        key={product._id}
                        className={styles.productCard}
                        onClick={() => window.location.href = `/product/${product._id}`}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                src={product.img?.secure_url}
                                alt={product.name}
                                className={styles.productImage}
                            />
                            <span className={styles.categoryBadge}>
                                Điện thoại
                            </span>
                        </div>

                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>
                                {product.name}
                            </h3>
                            <p className={styles.productPrice}>
                                {product.price?.toLocaleString()}đ
                            </p>
                            <button className={styles.detailBtn}>
                                Xem chi tiết
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className={styles.noResult}>
                    <p>Không tìm thấy sản phẩm phù hợp với từ khóa của bạn.</p>
                </div>
            )}
        </div>
    );
}