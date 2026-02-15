import { useState, useEffect } from "react";
import styles from "./banner.module.css";

const slides = [
    {
        title: "iPhone 15 Pro Max",
        subtitle: "Giảm ngay 3.000.000đ",
        desc: "Trả góp 0% - Bảo hành 12 tháng",
        price: "27.990.000đ",
        oldPrice: "30.990.000đ",
        image: "https://vcdn1-sohoa.vnecdn.net/2023/09/22/a1-5884-1695372065.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=U87hG0YGG5_q-v-BME2MmA"
    },
    {
        title: "Samsung S24 Ultra",
        subtitle: "Tặng quà 2.000.000đ",
        desc: "Thu cũ đổi mới trợ giá cao",
        price: "24.990.000đ",
        oldPrice: "27.490.000đ",
        image: "https://cdn.phuckhangmobile.com/image/galaxy-s24-ultra-chinh-thuc-ra-mat-30498j.jpg"
    }

];

export default function Banner() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [current]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        );
    };

    return (
        <div className={styles.bannerContainer}>
            <button className={styles.prev} onClick={prevSlide}>❮</button>
            <button className={styles.next} onClick={nextSlide}>❯</button>

            <div className={styles.content}>
                <div className={styles.left}>
                    <h2>{slides[current].title}</h2>
                    <p className={styles.subtitle}>{slides[current].subtitle}</p>
                    <p className={styles.desc}>{slides[current].desc}</p>
                    <div className={styles.priceRow}>
                        <span className={styles.oldPrice}>
                            {slides[current].oldPrice}
                        </span>
                        <span className={styles.price}>
                            {slides[current].price}
                        </span>
                    </div>
                    <button className={styles.btn}>MUA NGAY</button>
                </div>

                <div className={styles.right}>
                    <img
                        src={slides[current].image}
                        alt="product"
                        className={styles.productImage}
                    />
                </div>
            </div>

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
