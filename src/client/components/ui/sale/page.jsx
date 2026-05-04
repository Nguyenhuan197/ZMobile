import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from "./flashSaleProduct.module.css";
import fireIcon from "../../../../assets/lửa.gif";
import { formatPrice } from '../../../../utils/formatPrice.JS';





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


            <div className={styles.grid}>
                {products.map((item) => {
                    const hasSale = item.priceSale > 0;
                    const discount = item.price - item.priceSale;
                    const percent = hasSale ? Math.round((discount / item.price) * 100) : 0;

                    // Tính % dựa trên mốc 100 đơn hàng
                    const soldCount = item.sold || 0;
                    const soldPercentage = Math.min((soldCount / 100) * 100, 100);

                    return (
                        <Link to={`/product/${item._id}`} key={item._id} className={styles.card}>
                            <div className={styles.imageBox}>
                                <img src={item.img?.secure_url} alt={item.name} loading="lazy" />
                            </div>

                            <div className={styles.info}>
                                <h3 className={styles.name}>{item.name}</h3>

                                <div className={styles.priceGroup}>
                                    <span className={styles.currentPrice}>
                                        {formatPrice(hasSale ? item.price - item.priceSale : item.price)}
                                    </span>

                                    {hasSale && (
                                        <span className={styles.oldPrice}>{formatPrice(item.price)}</span>
                                    )}
                                </div>

                                <div className={styles.soldStatus}>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${soldPercentage}%` }}
                                        ></div>
                                        <div className={styles.soldText}>
                                            <img src={fireIcon} alt="hot" className={styles.miniFire} />
                                            Đã Bán {soldCount}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
});


export default FlashSaleProduct;