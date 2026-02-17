import React from 'react';
import styles from "./newsSection.module.css";

const newsData = [
    {
        id: 1,
        title: "Tết đến vi vu thả ga không lo hết data với các gói cước 5G Viettel 1 - 3 - 7 ngày này",
        image: "https://cdnv2.tgdd.vn/mwg-static/common/Common/ios-26-4-ra-mat-co-gi-moi-thumb.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Cách tạo và cài nhạc chuông Tết cho iPhone 2026 không cần máy tính",
        image: "https://cdnv2.tgdd.vn/mwg-static/common/Common/ios-26-4-ra-mat-co-gi-moi-thumb.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "Tổng hợp các chương trình khuyến mãi Kredivo tháng 02, thoả sức mua sắm Tết",
        image: "https://cdnv2.tgdd.vn/mwg-static/common/Common/ios-26-4-ra-mat-co-gi-moi-thumb.jpg",
        link: "#"
    },
    {
        id: 4,
        title: "iOS 26.4 beta 1 ra mắt có gì mới? Cách cập nhật, Có trên iPhone nào?",
        image: "https://cdnv2.tgdd.vn/mwg-static/common/Common/ios-26-4-ra-mat-co-gi-moi-thumb.jpg",
        link: "#"
    }
];

export default function NewsSection() {
    return (
        <section className={styles.newsContainer}>
            <div className={styles.header}>
                <h3 className={styles.mainTitle}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3652/3652191.png" alt="icon" className={styles.logoIcon} />
                    Tin tức Z Mobile
                </h3>
            </div>

            <div className={styles.newsGrid}>
                {newsData.map((news) => (
                    <a href={news.link} key={news.id} className={styles.newsCard}>
                        <div className={styles.imageWrapper}>
                            <img src={news.image} alt={news.title} className={styles.newsImage} />
                        </div>
                        <h4 className={styles.newsTitle}>{news.title}</h4>
                    </a>
                ))}
            </div>

            <div className={styles.footer}>
                <a href="#" className={styles.viewMore}>
                    Xem thêm <span className={styles.arrow}>›</span>
                </a>
            </div>
        </section>
    );
}