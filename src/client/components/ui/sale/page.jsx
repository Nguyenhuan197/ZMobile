import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from "./flashSaleProduct.module.css";
import fireIcon from "../../../../assets/lửa.gif";
import { formatPrice } from '../../../../utils/formatPrice.JS';
import stylesHome from "../../pageHome/home.module.css";




const FlashSaleProduct = React.memo(({ dataProducts }) => {
    const products = useMemo(() => dataProducts?.data || [], [dataProducts]);
    const [timeLeft, setTimeLeft] = useState(98.1 * 60); // 70 phút tính bằng giây


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 0 ? 70 * 60 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return {
            h: h.toString().padStart(2, '0'),
            m: m.toString().padStart(2, '0'),
            s: s.toString().padStart(2, '0')
        };
    };

    const time = formatTime(timeLeft);



    if (products.length === 0) return null;

    return (
        <section className={styles.flashSaleContainer}>
            <div className={styles.headerSale}>
                <div className={styles.headerLeft}>
                    <div className={styles.titleWrapper}>
                        <img src={fireIcon} alt="fire" className={styles.fireTitle} />
                        <h2 className={styles.title}>GIỜ VÀNG GIÁ SỐC</h2>
                    </div>
                    <div className={styles.countdown}>
                        <span className={styles.timeBox}>{time.h}</span>
                        <span className={styles.colon}>:</span>
                        <span className={styles.timeBox}>{time.m}</span>
                        <span className={styles.colon}>:</span>
                        <span className={styles.timeBox}>{time.s}</span>
                    </div>
                </div>

                {/* <Link to="#" className={styles.viewAll}>Xem tất cả {'>'}</Link> */}
            </div>


            <div className={stylesHome.grid}>
                {products.map((item) => {
                    const hasSale = item.priceSale > 0;
                    const discount = item.price - item.priceSale;
                    const percent = hasSale ? Math.round((discount / item.price) * 100) : 0;

                    // Tính % dựa trên mốc 100 đơn hàng
                    const soldCount = item.sold || 0;
                    const soldPercentage = Math.min((soldCount / 100) * 100, 100);

                    return (
                        <Link to={`/product/${item._id}`} key={item._id} className={stylesHome.card}>

                            <img src={`${item.img.secure_url}`} alt={item.name} />
                            <div className={stylesHome.blockName}>
                                <span>{item.name}</span>
                            </div>
                            <p>Sale còn:  {formatPrice(item.price)}</p>
                            <div className={stylesHome.priceSale}>
                                <span>{formatPrice(item.price + item.priceSale)}</span> <br />
                                {/* Tiết kiệm {formatPrice(item.priceSale)} */}
                            </div>
                            <span className={stylesHome.Sold}>Đã bán {item.sold}</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
});


export default FlashSaleProduct;