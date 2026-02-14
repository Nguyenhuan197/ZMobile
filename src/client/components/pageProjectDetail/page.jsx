import { useParams } from "react-router-dom";
import { useState } from "react";
import data from "../../../Data/data.json";
import styles from "./productDetail.module.css";
import { formatPrice } from "../../../utils/formatPrice.JS";

export default function ProductDetail() {
    const { id } = useParams();
    const HTTP = import.meta.env.VITE_API_URL;


    const allProducts = [
        ...data.smartphones,
        ...data.accessories,
    ];

    const product = allProducts.find(
        (item) => item.id === Number(id)
    );

    const [activeImg, setActiveImg] = useState(
        product?.detailImg?.[0]
    );

    const [quantity, setQuantity] = useState(1);

    if (!product) return <h2>Không tìm thấy sản phẩm</h2>;

    const increase = () => setQuantity((prev) => prev + 1);
    const decrease = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        console.log("Thêm giỏ:", product, quantity);
    };

    const handleBuyNow = () => {
        console.log("Mua ngay:", product, quantity);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* LEFT */}
                <div className={styles.left}>
                    <div className={styles.mainImageBox}>
                        <img
                            src={`${HTTP}/${activeImg}`}
                            alt={product.name}
                            className={styles.mainImg}
                        />
                    </div>

                    <div className={styles.thumbList}>
                        {product.detailImg.map((img, index) => (
                            <img
                                key={index}
                                src={`${HTTP}/${img}`}
                                alt="thumb"
                                onClick={() => setActiveImg(img)}
                                className={`${styles.thumb} ${activeImg === img ? styles.active : ""
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className={styles.right}>
                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceBox}>
                        <span className={styles.price}>
                            {formatPrice(product.price)}
                        </span>
                    </div>

                    <p className={styles.sold}>
                        Đã bán {product.sold}
                    </p>

                    {/* Quantity */}
                    <div className={styles.quantityBox}>
                        <span>Số lượng:</span>
                        <div className={styles.quantityControl}>
                            <button onClick={decrease}>-</button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                            />
                            <button onClick={increase}>+</button>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className={styles.buttonGroup}>
                        <button
                            className={styles.addToCart}
                            onClick={handleAddToCart}
                        >
                            🛒 Thêm vào giỏ hàng
                        </button>

                        <button
                            className={styles.buyNow}
                            onClick={handleBuyNow}
                        >
                            Mua ngay
                        </button>
                    </div>

                    {/* Description */}
                    <div className={styles.descBox}>
                        <h3>Mô tả sản phẩm</h3>
                        <p>{product.Describe}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
