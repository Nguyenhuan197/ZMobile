import styles from "./footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Cột 1 */}
                <div className={styles.column}>
                    <h3 className={styles.logo}>Z Mobile</h3>
                    <p>
                        Chuyên cung cấp điện thoại và phụ kiện chính hãng,
                        giá tốt, bảo hành uy tín toàn quốc.
                    </p>
                </div>

                {/* Cột 2 */}
                <div className={styles.column}>
                    <h4>Về chúng tôi</h4>
                    <ul>
                        <li>Giới thiệu</li>
                        <li>Tuyển dụng</li>
                        <li>Tin tức</li>
                        <li>Hệ thống cửa hàng</li>
                    </ul>
                </div>

                {/* Cột 3 */}
                <div className={styles.column}>
                    <h4>Hỗ trợ khách hàng</h4>
                    <ul>
                        <li>Chính sách bảo hành</li>
                        <li>Chính sách đổi trả</li>
                        <li>Hướng dẫn mua hàng</li>
                        <li>Câu hỏi thường gặp</li>
                    </ul>
                </div>

                {/* Cột 4 */}
                <div className={styles.column}>
                    <h4>Liên hệ</h4>
                    <p>Email: support@zmobile.vn</p>
                    <p>Hotline: 0123 456 789</p>
                    <p>Địa chỉ: Hà Nội, Việt Nam</p>
                </div>

            </div>

            <div className={styles.bottom}>
                © {new Date().getFullYear()} Z Mobile. All rights reserved.
            </div>
        </footer>
    );
}
