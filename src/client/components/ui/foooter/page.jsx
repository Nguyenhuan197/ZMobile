import { Link } from "react-router-dom";
import styles from "./footer.module.css";
import { FaFacebookF, FaTiktok, FaYoutube, FaPhoneAlt, FaRegComments, FaGlobe, FaStore, FaHandshake } from "react-icons/fa";
import { ThemeContext } from "../../../../context/useThemeContext";
import { useContext } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function Footer() {
    const { DataAdmin, isLoading_Admin } = useContext(ThemeContext);
    const logoBocongthuong = 'src/assets/bo-cong-thuong.png';
    if (isLoading_Admin) return null;
    const admin = DataAdmin?.data[0];

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.socialSection}>
                    <h4>THEO DÕI {admin?.nameLogo}</h4>
                    <div className={styles.socialIcons}>
                        <Link to={admin?.pageFB} target="_blank" rel="noreferrer"><FaFacebookF /></Link>
                        <Link to={admin?.ticktock} target="_blank" rel="noreferrer"><FaTiktok /></Link>
                        <Link to={admin?.shopee} target="_blank" rel="noreferrer"><FaStore /></Link>
                        <Link to={admin?.chotot} target="_blank" rel="noreferrer"><FaHandshake /></Link>
                        <Link to="#" target="_blank" rel="noreferrer"><FaYoutube /></Link>
                    </div>
                </div>

                <hr className={styles.divider} />

                {/* Phần 2: Dịch vụ khách hàng */}
                <div className={styles.serviceSection}>
                    <h4>Dịch vụ khách hàng</h4>
                    <div className={styles.serviceButtons}>
                        <div className={styles.btnService}>
                            <FaRegComments /> <span>Trò chuyện trực tiếp</span>
                        </div>
                        <div className={styles.btnService}>
                            <FaPhoneAlt /> <span>{admin?.phone}</span>
                        </div>
                    </div>
                </div>

                {/* Phần 3: Đăng ký nhận tin */}
                <div className={styles.newsletterSection}>
                    <p>Nhập địa chỉ email của bạn để đăng ký nhận thông tin</p>
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder="Nhập địa chỉ Email" />
                        <button><IoArrowForwardOutline /></button>
                    </div>
                </div>

                {/* Phần 4: Link phụ */}
                <div className={styles.utilityLinks}>
                    <div className={styles.rowLinks}>
                        <span>Cài đặt Cookie</span> | <span>Chính sách cookie</span>
                    </div>
                    <p>Sơ đồ trang web</p>
                    <p className={styles.language}>
                        Việt Nam / Tiếng Việt <FaGlobe />
                    </p>
                </div>

                <hr className={styles.divider} />

                {/* Phần 5: Thông tin công ty & Pháp lý */}
                <div className={styles.companyInfo}>
                    <div className={styles.legalDetails}>
                        <p className={styles.companyName}>{admin?.nameLogo.toUpperCase()} VIỆT NAM</p>
                        <p>CS1 - Miền Bắc: {admin?.address}</p>
                        <p>CS2 - Miền Nam: 200 Trần Thị Hè, Hiệp Thành, Q12, HCM</p>
                        <p>Email: {admin?.email}</p>
                        <p>Người đại diện: {admin?.nameAdmin}</p>
                        <p>Đối tác giao hàng: {admin?.partnerDelivery}</p>
                        <p>Ngân hàng: MB Bank - NGUYEN DINH HUAN</p>
                        <p>Thời gian làm việc: {admin?.workingHours}</p>
                    </div>

                    <div className={styles.bctBadge}>
                        <img
                            src={logoBocongthuong}
                            alt="Đã thông báo Bộ Công Thương"
                        />
                    </div>

                    <Link to="/admin-zmobile-2026/product/list" className={styles.adminAccess}>
                        Đăng nhập Admin
                    </Link>

                    <div className={styles.bottom}>
                        <p>© {DataAdmin?.data[0].nameLogo}  2024 - {new Date().getFullYear()}  </p>
                    </div>
                    <p>Version 26.05.04 - Developer Huan IT</p>
                </div>
            </div>
        </footer>
    );
}