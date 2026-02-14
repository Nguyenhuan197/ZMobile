

import styles from "./about.module.css";

export default function ProjectAbout() {
    return (
        <div className={styles.aboutPage}>
            <div className={styles.container}>

                {/* Banner */}
                <div className={styles.banner}>
                    <h1>Về Z Mobile</h1>
                    <p>Đối tác công nghệ đáng tin cậy của bạn</p>
                </div>

                {/* Câu chuyện */}
                <section className={styles.section}>
                    <h2>Câu chuyện của chúng tôi</h2>
                    <p>
                        Z Mobile được thành lập với mong muốn mang đến cho khách hàng
                        những sản phẩm công nghệ chính hãng, giá tốt và dịch vụ tận tâm.
                        Chúng tôi luôn đặt sự hài lòng của khách hàng lên hàng đầu.
                    </p>
                </section>

                {/* Sứ mệnh - Tầm nhìn */}
                <section className={styles.gridSection}>
                    <div className={styles.card}>
                        <h3>Sứ mệnh</h3>
                        <p>
                            Cung cấp sản phẩm công nghệ chất lượng cao với giá hợp lý,
                            phục vụ nhanh chóng và chuyên nghiệp.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3>Tầm nhìn</h3>
                        <p>
                            Trở thành hệ thống bán lẻ công nghệ uy tín hàng đầu Việt Nam.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3>Giá trị cốt lõi</h3>
                        <p>
                            Uy tín – Chất lượng – Minh bạch – Tận tâm với khách hàng.
                        </p>
                    </div>
                </section>

                {/* Lý do chọn */}
                <section className={styles.section}>
                    <h2>Vì sao chọn Z Mobile?</h2>
                    <ul className={styles.list}>
                        <li>✔ Sản phẩm chính hãng 100%</li>
                        <li>✔ Bảo hành uy tín</li>
                        <li>✔ Giá cả cạnh tranh</li>
                        <li>✔ Hỗ trợ khách hàng 24/7</li>
                    </ul>
                </section>

            </div>
        </div>
    );
}
