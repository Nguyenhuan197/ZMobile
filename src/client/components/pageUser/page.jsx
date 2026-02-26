import React, { useContext, useEffect } from "react";
import styles from "./userComponent.module.css";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClipboardList, FaSearchLocation, FaUserEdit, FaLock, FaSignOutAlt } from "react-icons/fa";
import { ThemeContext } from "../../../context/useThemeContext";
import UiLoadingComponent from "../../../components/loadingComponent";
import { Link, useNavigate } from "react-router-dom";



export default function UserComponent() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER, signOutUser, DataUser, isLoading_User } = useContext(ThemeContext);
    if (!USER) {
        return navigate('/login');
    }

    return (
        <>
            {
                isLoading_User ? < UiLoadingComponent /> :
                    <div className={styles.wrapper}>
                        <div className={styles.container}>

                            {/* SIDEBAR - Thanh điều hướng */}
                            <aside className={styles.sidebar}>
                                <div className={styles.sidebarHeader}>
                                    <div className={styles.avatarWrapper}>
                                        <img src={`${apiUrl}/${DataUser.data.image}`} alt="Avatar" className={styles.userImg} />
                                    </div>
                                    <h3>{DataUser.data.name}</h3>
                                    <p>ID: {DataUser.data._id.substring(0, 50)}</p>
                                </div>

                                <nav className={styles.navMenu}>
                                    <button className={`${styles.navItem} ${styles.active}`}>
                                        <FaUserCircle /> Hồ sơ cá nhân
                                    </button>

                                    <Link to='#' className={styles.navItem}>
                                        <FaClipboardList /> Quản lý đơn hàng
                                    </Link>

                                    <Link to='/orderLookup' className={styles.navItem}>
                                        <FaSearchLocation /> Tra cứu đơn hàng
                                    </Link>

                                    <hr className={styles.divider} />
                                    <button className={styles.navItem}>
                                        <FaLock /> Đổi mật khẩu
                                    </button>
                                    <button
                                        className={`${styles.navItem} ${styles.logout}`}
                                        onClick={() => signOutUser()}
                                    >
                                        <FaSignOutAlt /> Đăng xuất
                                    </button>
                                </nav>
                            </aside>

                            {/* MAIN CONTENT - Nội dung hiển thị */}
                            <main className={styles.mainContent}>
                                <div className={styles.cardHeader}>
                                    <h2>Thông tin tài khoản</h2>
                                    <p>Quản lý thông tin cá nhân để bảo mật tài khoản</p>
                                </div>

                                <div className={styles.infoGrid}>
                                    <div className={styles.infoBox}>
                                        <label>Họ và tên</label>
                                        <div className={styles.infoValue}>{DataUser.data.name}</div>
                                    </div>

                                    <div className={styles.infoBox}>
                                        <label>Email</label>
                                        <div className={styles.infoValue}>{DataUser.data.email}</div>
                                    </div>

                                    <div className={styles.infoBox}>
                                        <label>Số điện thoại</label>
                                        <div className={styles.infoValue}>{DataUser.data.phone}</div>
                                    </div>

                                    <div className={styles.infoBox}>
                                        <label>Địa chỉ</label>
                                        <div className={styles.infoValue}>{DataUser.data.deliveryAddress}</div>
                                    </div>
                                </div>

                                <div className={styles.actionArea}>
                                    <button className={styles.primaryBtn}>
                                        <FaUserEdit /> Cập nhật thông tin
                                    </button>
                                </div>
                            </main>

                        </div>
                    </div>
            }
        </>


    );
}