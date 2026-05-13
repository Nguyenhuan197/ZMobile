

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from './CustomerReviews.module.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CustomerReviews = () => {
    const testimonials = [
        { id: 1, name: "Nguyễn Duy Hưng", source: "Website", rating: 5, comment: "Đã mua nhiều lần, máy đẹp, pin tốt, hỗ trợ tận tình. Chúc shop mua bán đắt hàng!", avatar: "https://giadinh.mediacdn.vn/296230595582509056/2024/8/12/con-trai-van-dung-5-17234487457391950335978.jpg" },
        { id: 2, name: "Trần Ngọc", source: "Google Maps", rating: 5, comment: "Mới mua Oppo F11 bên này nói chung quá chất lượng với giá, cảm ứng mượt.", avatar: "https://mautranhve.vn/wp-content/uploads/2025/10/avatar-con-trai-ngau-19.jpg" },
        { id: 3, name: "Lê Minh Tâm", source: "Facebook", rating: 5, comment: "Shop uy tín, nhân viên tư vấn nhiệt tình, máy về tay rất ưng ý.", avatar: "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg" },
        { id: 4, name: "Hoàng Anh", source: "Website", rating: 5, comment: "Chuyên sỉ số lượng lớn giá cực tốt, làm ăn lâu dài rất yên tâm.", avatar: "https://mautranhve.vn/wp-content/uploads/2025/10/hinh-anh-avatar-con-trai-ngau.jpg" },
        { id: 5, name: "Phạm Thu Thảo", source: "Zalo", rating: 4, comment: "Giao hàng nhanh, đóng gói kỹ, máy dùng ổn định.", avatar: "https://i0.wp.com/lehungphotography.com/wp-content/uploads/2022/07/0E1A9763.jpg?resize=683%2C1024&ssl=1" },
    ];

    return (
        <section className={styles.zmb_review_wrapper}>
            <div className={styles.zmb_review_header}>
                <h2>KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI</h2>
            </div>

            <div className={styles.zmb_review_container}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={15}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.review-next',
                        prevEl: '.review-prev',
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 15 },
                    }}
                    // Giới hạn Swiper không được vượt quá container cha
                    style={{ width: '100%', maxWidth: '100%' }}
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id} style={{ height: 'auto' }}>
                            <div className={styles.zmb_review_card}>
                                <div className={styles.zmb_review_avatar_box}>
                                    <img src={item.avatar} alt={item.name} loading="lazy" />
                                </div>
                                <div className={styles.zmb_review_content}>
                                    <div className={styles.zmb_review_stars}>
                                        {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                                    </div>
                                    <p className={styles.zmb_review_text}>“{item.comment}”</p>
                                    <p className={styles.zmb_review_author}>
                                        <strong>{item.name}</strong>
                                        <span className={styles.zmb_review_source}> / {item.source}</span>
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </section>
    );
};

export default CustomerReviews;

