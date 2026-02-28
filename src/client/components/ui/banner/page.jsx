import { useState, useEffect } from "react";
import styles from "./banner.module.css";
import { Link } from "react-router-dom";

export default function Banner({ data }) {
    const [current, setCurrent] = useState(0);
    if (!data || !data.data || data.data.length === 0) return null;

    const slides = data.data;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    const formatPrice = (price) => {
        return price.toLocaleString("vi-VN") + "đ";
    };

    const currentItem = slides[current];
    const newPrice = currentItem.price - (currentItem.priceSale || 0);

    return (
        <div className={styles.bannerContainer}>
            <button className={styles.prev} onClick={prevSlide}>❮</button>
            <button className={styles.next} onClick={nextSlide}>❯</button>

            <Link to={`/product/${currentItem._id}`} className={styles.content}>
                <div className={styles.left}>
                    <h2>{currentItem.name}</h2>
                    <p className={styles.subtitle}>
                        Giảm ngay {formatPrice(currentItem.priceSale || 0)}
                    </p>
                    <p className={styles.desc}>
                        Sản phẩm chính hãng - Bảo hành 6 tháng
                    </p>

                    <div className={styles.priceRow}>
                        <span className={styles.oldPrice}>
                            {formatPrice(currentItem.price)}
                        </span>
                        <span className={styles.price}>
                            {formatPrice(newPrice)}
                        </span>
                    </div>
                </div>

                <div className={styles.right}>
                    <img
                        src={currentItem.img.secure_url}
                        alt={currentItem.name}
                        className={styles.productImage}
                    />
                </div>
            </Link>

            <div className={styles.pagination}>
                {slides.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`${styles.dot} ${current === index ? styles.active : ""
                            }`}
                    ></span>
                ))}
            </div>
        </div>
    );
}