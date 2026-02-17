import { Link } from "react-router-dom";
import styles from "./footer.module.css";

export default function Footer() {
    const phone = import.meta.env.VITE_NUMBER_PHONE;

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Cột 1 */}
                <div className={styles.column}>
                    <h3 className={styles.logo}>Z Mobile</h3>
                    <p>
                        Chuyên cung cấp điện thoại
                        và phụ kiện chính hãng giá tốt bảo hành uy tín toàn quốc.
                    </p>
                </div>

                {/* Cột 2 */}
                <div className={styles.column}>
                    <h4>Hỗ trợ khách hàng</h4>
                    <ul>
                        <li>Chính sách bảo hành</li>
                        <li>Chính sách đổi trả</li>
                        <li>Hướng dẫn mua hàng</li>
                        <li>Câu hỏi thường gặp</li>
                    </ul>
                </div>

                {/* Cột 3 */}
                <div className={styles.column}>
                    <h4>Dịch vụ liên kết</h4>
                    <ul>
                        <p>
                            Page FB
                            <Link to="https://www.facebook.com/profile.php?id=61565941977491"
                                style={{
                                    color: 'white',
                                    marginLeft: 10,
                                    textDecoration: 'none'
                                }}>
                                Z Mobile
                            </Link>
                        </p>

                        <p>
                            Ticktock
                            <Link to="Tiktok.com/@zmobile97"
                                style={{
                                    color: 'white',
                                    marginLeft: 10,
                                    textDecoration: 'none'
                                }}>
                                Z Mobile
                            </Link>
                        </p>

                        <p>
                            Shopee
                            <Link to="https://Shopee.vn/hunnguynnh030"
                                style={{
                                    color: 'white',
                                    marginLeft: 10,
                                    textDecoration: 'none'
                                }}>
                                Z Mobile
                            </Link>
                        </p>
                    </ul>
                </div>

                {/* Cột 4 */}
                <div className={styles.column}>
                    <h4>Liên hệ</h4>
                    <p>Email: huannguyendinh14@gmail.com</p>
                    <p>Hotline: {phone}</p>
                    <p>Địa chỉ: Trường Văn Nông Cống Thanh Hoá</p>
                    <p>Giờ làm việc bắt đầu 7h00 - 21h00 hàng ngày</p>
                </div>

            </div>

            <div className={styles.bottom}>
                © {new Date().getFullYear()} Z Mobile. All rights reserved
                <p>Nguyen Dinh Huan.</p>
                <p>Phiên bản lần cuối V26.02.15</p>
            </div>
        </footer>
    );
}
