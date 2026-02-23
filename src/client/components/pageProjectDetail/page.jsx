import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./productDetail.module.css";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());
import UiLoadingComponent from '../../../components/loadingComponent';


export default function ProductDetail() {
    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState("");
    const { data: response, error, isLoading } = useSWR(id ? `${apiUrl}/api/product/viewDetail/${id}` : null, fetcher);
    const product = response?.data?.[0];



    // Cập nhật ảnh đại diện khi dữ liệu tải xong
    useEffect(() => {
        if (product?.img?.secure_url) {
            setActiveImg(product.img.secure_url);
        }
    }, [product]);

    // Hàm định dạng tiền tệ nội bộ (nếu bạn không dùng file utils)
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    if (isLoading) return <div className={styles.loading}>Đang tải thông tin sản phẩm...</div>;
    if (error || !product) return <h2 className={styles.error}>Không tìm thấy sản phẩm!</h2>;

    const increase = () => setQuantity((prev) => prev + 1);
    const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        console.log("Thêm giỏ:", product.name, "Số lượng:", quantity);
        // Logic thêm vào localStorage hoặc Context giỏ hàng ở đây
        navigate("/cart");
    };

    const handleBuyNow = () => {
        navigate("/pay", { state: { product, quantity } });
    };

    if (isLoading) return <UiLoadingComponent />


    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* LEFT: Hình ảnh */}
                <div className={styles.left}>
                    <div className={styles.mainImageBox}>
                        <img
                            src={activeImg}
                            alt={product.name}
                            className={styles.mainImg}
                        />
                    </div>

                    <div className={styles.thumbList}>
                        {/* Ảnh chính cũng nằm trong list thumb */}


                        {/* Các ảnh chi tiết */}
                        {product.imgDetail?.map((imgObj, index) => (
                            <img
                                key={index}
                                src={imgObj.secure_url}
                                alt={`thumb-${index}`}
                                onClick={() => setActiveImg(imgObj.secure_url)}
                                className={`${styles.thumb} ${activeImg === imgObj.secure_url ? styles.active : ""}`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT: Thông tin */}
                <div className={styles.right}>
                    <p className={styles.brandName}>
                        Thương hiệu
                        {` ${product.id_Trademark?.name}`}
                    </p>
                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceBox}>
                        <span className={styles.price}>
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    <p className={styles.stock}>
                        Còn lại: <strong>{product.remainingQuantity}</strong> sản phẩm
                    </p>

                    {/* Quantity Control */}
                    <div className={styles.quantityBox}>
                        <span>Số lượng:</span>
                        <div className={styles.quantityControl}>
                            <button onClick={decrease}>-</button>
                            <input type="text" value={quantity} readOnly />
                            <button onClick={increase}>+</button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.buttonGroup}>
                        <button className={styles.addToCart} onClick={handleAddToCart}>
                            🛒 Thêm vào giỏ hàng
                        </button>
                        <button className={styles.buyNow} onClick={handleBuyNow}>
                            Mua ngay
                        </button>
                    </div>

                    {/* Description */}
                    <div className={styles.descBox}>
                        <h3>Mô tả sản phẩm</h3>
                        <p>{product.describe}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}