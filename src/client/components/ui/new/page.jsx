import React from "react";
import styles from "./newsSection.module.css";

export default function NewsSection({ data }) {

    // Nếu chưa có data thì không render
    if (!data || !data.data || data.data.length === 0) return null;

    const newsList = data.data;

    return (
        <section className={styles.newsContainer}>
            <div className={styles.header}>
                <h3 className={styles.mainTitle}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png"
                        alt="icon"
                        className={styles.logoIcon}
                    />
                    Tin tức Z Mobile
                </h3>
            </div>

            <div className={styles.newsGrid}>
                {newsList.map((news) => (
                    <a
                        href={`/news/${news._id}`}
                        key={news._id}
                        className={styles.newsCard}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                src={news.img.secure_url}
                                alt={news.name}
                                className={styles.newsImage}
                            />
                        </div>
                        <h4 className={styles.newsTitle}>
                            {news.name}
                        </h4>
                        <p className={styles.newsDesc}>
                            {news.describe}
                        </p>
                    </a>
                ))}
            </div>

            <div className={styles.footer}>
                <a href="/news" className={styles.viewMore}>
                    Xem thêm <span className={styles.arrow}>›</span>
                </a>
            </div>
        </section>
    );
}