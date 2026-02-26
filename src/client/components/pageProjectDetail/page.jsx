import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./productDetail.module.css";
import useSWR from "swr";
import UiLoadingComponent from "../../../components/loadingComponent";
import { formatPrice } from "../../../utils/formatPrice.JS";
import { ThemeContext } from "../../../context/useThemeContext";
import { ShowToast, ToastType } from "../../../utils/toast";
const fetcher = (url) => fetch(url).then((res) => res.json());



export default function ProductDetail() {
    const navigate = useNavigate();
    const { handlePay, handleAddToCart, USER } = useContext(ThemeContext);
    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState("");
    const { data: response, error, isLoading } = useSWR(id ? `${apiUrl}/api/product/viewDetail/${id}` : null, fetcher);


    const product = response?.data;
    const similarProducts = response?.similarProducts || [];

    useEffect(() => {
        if (product?.img?.secure_url) {
            setActiveImg(product.img.secure_url);
        }
    }, [product]);


    if (isLoading) return <UiLoadingComponent />;
    if (error) return <div>Có lỗi xảy ra...</div>;
    if (!product) return null;

    const increase = () => setQuantity((prev) => prev + 1);
    const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));


    const addToCart = (name, price, quantity, activeImg, id) => {
        if (!USER) {
            ShowToast('Đăng nhập để tiếp tục mua hàng', ToastType.info);
            return navigate('/login');
        }

        handleAddToCart(name, price, quantity, activeImg, id);
    };


    const handleBuyNow = (name, price, quantity, activeImg, id) => {
        if (!USER) {
            ShowToast('Đăng nhập để tiếp tục mua hàng', ToastType.info);
            return navigate('/login');
        }
        handlePay(name, price, quantity, activeImg, id);
    };



    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* LEFT */}

                <div className={styles.left}>
                    <div className={styles.mainImageBox}>
                        <img
                            src={activeImg}
                            alt={product.name}
                            className={styles.mainImg}
                        />
                    </div>

                    <div className={styles.thumbList}>
                        {product.imgDetail?.map((imgObj, index) => (
                            <img
                                key={index}
                                src={imgObj.secure_url}
                                alt={`thumb-${index}`}
                                onClick={() => setActiveImg(imgObj.secure_url)}
                                className={`${styles.thumb} ${activeImg === imgObj.secure_url ? styles.active : ""
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className={styles.right}>
                    <p className={styles.brandName}>
                        Thương hiệu {product.id_Trademark?.name}
                    </p>

                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceBox}>
                        <span className={styles.price}>
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    <p className={styles.stock}>
                        Còn lại: <strong>{product.remainingQuantity}</strong>
                    </p>

                    <div className={styles.quantityBox}>
                        <span>Số lượng:</span>
                        <div className={styles.quantityControl}>
                            <button onClick={decrease}>-</button>
                            <input type="text" value={quantity} readOnly />
                            <button onClick={increase}>+</button>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            className={styles.addToCart}
                            onClick={() => addToCart(
                                product.name,
                                product.price,
                                quantity,
                                activeImg,
                                id
                            )}
                        >
                            🛒 Thêm vào giỏ hàng
                        </button>
                        <button
                            className={styles.buyNow}
                            onClick={() => handleBuyNow(
                                product.name,
                                product.price,
                                quantity,
                                activeImg,
                                id
                            )}
                        >
                            Mua ngay
                        </button>
                    </div>

                    <div className={styles.descBox}>
                        <h3>Mô tả sản phẩm</h3>
                        <p>{product.describe}</p>
                    </div>
                </div>


            </div>


            {similarProducts.length > 0 && (
                <div className={styles.relatedSection}>
                    <h2 className={styles.relatedTitle}>
                        Sản phẩm liên quan
                    </h2>

                    <div className={styles.relatedGrid}>
                        {similarProducts.map((item) => (
                            <div
                                key={item._id}
                                className={styles.relatedCard}
                                onClick={() => navigate(`/product/${item._id}`)}
                            >
                                <img
                                    src={item.img?.secure_url}
                                    alt={item.name}
                                    className={styles.relatedImg}
                                />
                                <p className={styles.relatedName}>
                                    {item.name}
                                </p>
                                <span className={styles.relatedPrice}>
                                    {formatPrice(item.price)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}