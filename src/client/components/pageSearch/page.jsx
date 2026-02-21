import React, { useState } from 'react';
import styles from "./productSearch.module.css";

export default function ProductSearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');


    // Giả lập danh sách sản phẩm từ API
    const allProducts = [
        { id: 1, name: "iPhone 15 Pro Max", price: "28.990.000đ", image: "https://cdn.mobilecity.vn/mobilecity-vn/images/2025/10/vivo-x300-pro-nau.jpg", category: "Điện thoại" },
        { id: 2, name: "Samsung Galaxy S24 Ultra", price: "25.500.000đ", image: "https://product.hstatic.net/1000063620/product/s24-ultra-vang_c7504973f8864a5cbed476739fca996a.jpg", category: "Điện thoại" },
    ];

    // Lọc sản phẩm theo từ khóa
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

            {/* Danh sách sản phẩm (Hiển thị hàng ngang) */}
            <div className={styles.productGrid}>
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className={styles.productCard}
                        onClick={() => window.location.href = `/product/${product.id}`} // Chuyển trang chi tiết
                    >
                        <div className={styles.imageWrapper}>
                            <img src={product.image} alt={product.name} className={styles.productImage} />
                            <span className={styles.categoryBadge}>{product.category}</span>
                        </div>
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>{product.name}</h3>
                            <p className={styles.productPrice}>{product.price}</p>
                            <button className={styles.detailBtn}>Xem chi tiết</button>
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