import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { FaFacebook, FaTiktok, FaStore, FaHandshake, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import { ThemeContext } from "../../../../context/useThemeContext";
import { useContext, useEffect } from "react";


export default function Footer() {
    const phone = import.meta.env.VITE_NUMBER_PHONE;
    const { USER, DataAdmin, isLoading_Admin } = useContext(ThemeContext);
    if (isLoading_Admin) return;

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3 className={styles.logo}>{DataAdmin?.data[0].nameLogo}</h3>
                    <p>
                        {DataAdmin?.data[0].slogan}
                    </p>
                </div>

                {/* Cột 2: Hỗ trợ */}
                <div className={styles.column}>
                    <h4>Hỗ trợ khách hàng</h4>
                    <ul className={styles.list}>
                        <li>Chính sách bảo hành</li>
                        <li>Chính sách đổi trả</li>
                        <li>Hướng dẫn mua hàng</li>
                        <li>Câu hỏi thường gặp</li>
                    </ul>
                </div>

                {/* Cột 3: Liên kết mạng xã hội - Có Icon */}
                <div className={styles.column}>
                    <h4>Dịch vụ liên kết</h4>
                    <ul className={styles.socialLinks}>
                        <li>
                            <FaFacebook className={styles.iconFb} />
                            <span>Page FB:</span>
                            <Link to="https://www.facebook.com/profile.php?id=61565941977491">Z Mobile</Link>
                        </li>
                        <li>
                            <FaTiktok className={styles.iconTiktok} />
                            <span>TikTok:</span>
                            <Link to="https://tiktok.com/@zmobile97">Z Mobile</Link>
                        </li>
                        <li>
                            <FaStore className={styles.iconShopee} />
                            <span>Shopee:</span>
                            <Link to="https://Shopee.vn/hunnguynnh030">Z Mobile</Link>
                        </li>
                        <li>
                            <FaHandshake className={styles.iconChotot} />
                            <span>Chợ tốt:</span>
                            <Link to="#">Nguyen Huan</Link>
                        </li>
                    </ul>
                </div>

                {/* Cột 4: Liên hệ */}
                <div className={styles.column}>
                    <h4>Liên hệ</h4>
                    <div className={styles.contactItem}>
                        <FaEnvelope /> <span>{DataAdmin?.data[0].email}</span>
                    </div>

                    <div className={styles.contactItem}>
                        <FaPhoneAlt /> <span>Hotline: {DataAdmin?.data[0].phone}</span>
                    </div>

                    <div className={styles.contactItem}>
                        <FaCalendarAlt /> <span>Ngày thành lập: T5 - 2024</span>
                    </div>

                    <div className={styles.contactItem}>
                        <FaClock /> <span>{DataAdmin?.data[0].workingHours}  </span>
                    </div>

                    <div className={styles.contactItem}>
                        <FaMapMarkerAlt /><span>CS M Bắc : {DataAdmin?.data[0].address}</span>
                    </div>

                    <div className={styles.contactItem}>
                        <FaMapMarkerAlt /><span>CS M Nam : 200 Trần Thị Hè Hiệp Thành Q12 HCM</span>
                    </div>


                    <p className={styles.adminLink}>
                        <Link to="/admin-zmobile-2026/product">Đăng nhập Admin</Link>
                    </p>
                </div>

            </div>

            <div className={styles.bottom}>
                <p>© {new Date().getFullYear()} - {DataAdmin?.data[0].nameLogo}</p>
                <p> {DataAdmin?.data[0].nameAdmin}</p>
            </div>
        </footer>
    );
}