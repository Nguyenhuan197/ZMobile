import React, { useEffect, useState } from 'react';
import styles from "./productSearch.module.css";
import useSWR from 'swr';
import UiLoadingComponent from '../../../components/loadingComponent';
import { Link } from 'react-router-dom';
const fetcher = (url) => fetch(url).then((res) => res.json());



export default function ProductSearchComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const [allProducts, setAllProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { data: dataProducts, isLoading, error, mutate } = useSWR(
        searchTerm.trim() === ''
            ? `${apiUrl}/api/product/view-all`
            : `${apiUrl}/api/product/search-Product?keySearch=${searchTerm}`
        , fetcher
    );

    useEffect(() => {
        const loading = () => {
            mutate();
            if (dataProducts?.data) {
                setAllProducts(dataProducts?.data);
            }
        }

        loading();

    }, [searchTerm, dataProducts]);


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

                <p className={styles.resultCount}>
                    Tìm thấy <strong>{allProducts.length}</strong> sản phẩm
                </p>
            </div>


            {
                isLoading ? <UiLoadingComponent /> :
                    <div className={styles.productGrid}>
                        {allProducts.map(product => (
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
                            </Link>
                        ))}
                    </div>
            }


            {
                allProducts.length === 0 && (
                    <div className={styles.noResult}>
                        <p>Không tìm thấy sản phẩm phù hợp với từ khóa của bạn.</p>
                    </div>
                )
            }
        </div >
    );
}