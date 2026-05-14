"use client"
import styles from "./about.module.css";
import styles_Hieuung from "../../../App.module.css";
import { FaStar } from "react-icons/fa";


export default function ProjectAbout() {
    return (
        <div className={styles.wrapper}>
            {/* Background Blur Elements - Tạo chiều sâu cho UI */}

            <div className={styles_Hieuung.blob}></div>
            <div className={styles_Hieuung.blob2}></div>



            <header className={styles.heroSection}>
                <div className={styles.container}>
                    <div className={styles.heroBadge}>Khát vọng vươn tầm</div>
                    <h1 className={styles.heroTitle}>
                        Z Mobile <br /><br />
                        <span className={styles.gradientText}>Công Nghệ 2026</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Chúng tôi không chỉ bán sản phẩm, chúng tôi kiến tạo niềm tin thông qua những giải pháp di động hàng đầu.
                    </p>
                </div>
            </header>

            <main className={styles.container}>
                <section className={styles.valueSection}>
                    <h2 className={styles.sectionTitle}>Giá trị cốt lõi</h2>
                    <div className={styles.glassGrid}>
                        {[
                            { title: "Uy tín", desc: "Nền tảng của mọi giao dịch.", icon: "💎" },
                            { title: "Tận tâm", desc: "Hỗ trợ khách hàng như người thân.", icon: "🤝" },
                            { title: "Đổi mới", desc: "Luôn cập nhật xu hướng mới nhất.", icon: "🚀" },
                        ].map((item, index) => (
                            <div key={index} className={styles.glassCard}>
                                <div className={styles.glassIcon}>{item.icon}</div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mobile Optimized Stats */}
                <section className={styles.statsBanner}>
                    <div className={styles.statBox}>
                        <span className={styles.number}>629</span>
                        <span className={styles.label}>Khách hàng</span>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.statBox}>
                        <span className={styles.number}>99.2%</span>
                        <span className={styles.label}>Độ hài lòng khách hàng</span>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.statBox}>
                        <span className={styles.number}>24/7</span>
                        <span className={styles.label}>Dịch vụ hỗ trợ</span>
                    </div>
                    <div className={styles.statBox}>
                        <span className={styles.number}>4.9
                            <FaStar style={{
                                fontSize: 20,
                                marginLeft: 10
                            }} />
                        </span>
                        <span className={styles.label}>TB Lượt đánh giá</span>
                    </div>
                </section>
            </main>
        </div>
    );
}