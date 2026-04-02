import React, { useEffect, useState } from 'react';
import styles from "./productSearch.module.css";
import useSWR from 'swr';
import UiLoadingComponent from '../../../components/loadingComponent';
import { Link } from 'react-router-dom';
const fetcher = (url) => fetch(url).then((res) => res.json());



export default function ProductSearchComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const [searchTerm, setSearchTerm] = useState('');
    const [pageProduct, setPageProduct] = useState(1);
    const limit = 5;


    const { data: dataProducts, isLoading, error } = useSWR(
        searchTerm.trim() === ''
            ? `${apiUrl}/api/product/view-all?limit=${limit}&page=${pageProduct}`
            : `${apiUrl}/api/product/search-Product?keySearch=${searchTerm}`
        , fetcher
    );

    const products = dataProducts?.data || [];
    const totalPages = dataProducts?.pagination?.totalPages || 1;

    const handleNext = () => {
        if (pageProduct < totalPages) setPageProduct(prev => prev + 1);
    };

    const handlePrev = () => {
        if (pageProduct > 1) setPageProduct(prev => prev - 1);
    };


    if (error) return <div>Có lỗi xảy ra...</div>;


    return (
        <div className={styles.container}>
            <div className={styles.searchHeader}>
                <h2 className={styles.title}>{searchTerm.trim() === '' ? 'Tìm kiếm sản phẩm' : 'Đăng tìm kiếm sản phẩm'}</h2>

                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Bạn đang tìm sản phẩm gì?..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {
                    searchTerm.trim() !== "" &&
                    <p className={styles.resultCount}>
                        Tìm thấy <strong>{products.length}</strong> sản phẩm
                    </p>
                }
            </div>


            {
                isLoading ? <UiLoadingComponent /> :
                    <div className={styles.productGrid}>
                        {products.map(product => (
                            <Link to={`/product/${product._id}`}
                                key={product._id}
                                className={styles.productCard}
                            >
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={product.img?.secure_url}
                                        alt={product.name}
                                        className={styles.productImage}
                                    />
                                </div>

                                <div className={styles.productInfo}>
                                    <h3 className={styles.productName}>
                                        {product.name}
                                    </h3>
                                    <p className={styles.productPrice}>
                                        {product.price?.toLocaleString()}đ
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
            }


            {
                products.length === 0 && searchTerm.trim() !== "" && (
                    <div className={styles.noResult}>
                        <p>Không tìm thấy sản phẩm phù hợp với từ khóa của bạn.</p>
                    </div>
                )
            }


            <div className={styles.paginationContainer}>
                <button
                    className={styles.navButton}
                    onClick={handlePrev}
                    disabled={pageProduct <= 1}
                >
                    &laquo;
                </button>

                <div className={styles.pageNumbers}>
                    {pageProduct > 1 && (
                        <button onClick={handlePrev} className={styles.pageButton}>
                            {pageProduct - 1}
                        </button>
                    )}

                    <button className={`${styles.pageButton} ${styles.active}`}>
                        {pageProduct}
                    </button>

                    {pageProduct < totalPages && (
                        <button onClick={handleNext} className={styles.pageButton}>
                            {pageProduct + 1}
                        </button>
                    )}
                </div>

                <button
                    className={styles.navButton}
                    onClick={handleNext}
                    disabled={pageProduct >= totalPages}
                >
                    &raquo;
                </button>
            </div>


        </div >



    );
}