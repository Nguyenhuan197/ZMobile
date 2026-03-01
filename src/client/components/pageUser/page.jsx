import React, { useContext, useEffect, useState } from "react";
import styles from "./userComponent.module.css";
import {
    FaUserCircle, FaClipboardList, FaSearchLocation,
    FaUserEdit, FaLock, FaSignOutAlt, FaShoppingBag,
    FaCheckCircle, FaTimesCircle
} from "react-icons/fa";
import { ThemeContext } from "../../../context/useThemeContext";
import UiLoadingComponent from "../../../components/loadingComponent";
import { Link, useNavigate } from "react-router-dom";
import { UpdateSevices } from "../../../services/updateApi";
import { ShowToast, ToastType } from "../../../utils/toast";




export default function UserComponent() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER, signOutUser, DataUser, isLoading_User, seloadAPI__USER } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);


    // Update User
    const [dataUpdateUser, setDataUpdateUser] = useState({ name: '', phone: '', deliveryAddress: '' });
    useEffect(() => {
        setDataUpdateUser({
            name: DataUser?.data?.name,
            phone: DataUser?.data?.phone,
            deliveryAddress: DataUser?.data?.deliveryAddress,
        })
    }, [DataUser])


    const handleUpdateUser = async () => {
        setLoading(true);
        const result = await UpdateSevices(`${apiUrl}/api/users/update-user/${DataUser.data._id}`, dataUpdateUser, "PUT");
        setLoading(false);

        if (result.status) {
            seloadAPI__USER();
            ShowToast(result.mesage_vn, ToastType.success)
            setTimeout(() => {
                setActiveTab("profile")
            }, 100);
        } else {
            ShowToast(result.mesage_vn, ToastType.info);
        }
    }

    const ResetForm = () => useState({ name: '', phone: '', deliveryAddress: '' });



    if (!USER) return navigate('/login');
    if (loading) return < UiLoadingComponent />


    const renderMainContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.cardHeader}>
                            <h2>Hồ sơ của tôi</h2>
                            <p>Thông tin chi tiết tài khoản cá nhân</p>
                        </div>

                        <div className={styles.infoGrid}>
                            <div className={styles.infoBox}><label>Họ và tên</label><div className={styles.infoValue}>{DataUser.data.name}</div></div>
                            <div className={styles.infoBox}><label>Email</label><div className={styles.infoValue}>{DataUser.data.email}</div></div>
                            <div className={styles.infoBox}><label>Số điện thoại</label><div className={styles.infoValue}>{DataUser.data.phone}</div></div>
                            <div className={styles.infoBox}><label>Địa chỉ</label><div className={styles.infoValue}>{DataUser.data.deliveryAddress}</div></div>
                        </div>
                        <div className={styles.actionArea}>
                            <button className={styles.primaryBtn} onClick={() => setActiveTab("edit-profile")}>
                                <FaUserEdit /> Chỉnh sửa hồ sơ
                            </button>
                        </div>
                    </div>
                );

            case "edit-profile":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.cardHeader}>
                            <h2>Cập nhật thông tin</h2>
                            <p>Thay đổi thông tin cá nhân của bạn</p>
                        </div>
                        <div className={styles.editGrid}>
                            <div className={styles.infoBox}>
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    className={styles.infoInput}
                                    value={dataUpdateUser.name}
                                    onChange={(e) => setDataUpdateUser({
                                        ...dataUpdateUser,
                                        name: e.target.value
                                    })}
                                />
                            </div>

                            <div className={styles.infoBox}>
                                <label>Số điện thoại</label>
                                <input type="text"
                                    className={styles.infoInput}
                                    // defaultValue={DataUser.data.phone}
                                    value={dataUpdateUser.phone}
                                    onChange={(e) => setDataUpdateUser({
                                        ...dataUpdateUser,
                                        phone: e.target.value
                                    })}
                                />
                            </div>

                            <div className={styles.infoBoxFull}>
                                <label>Địa chỉ giao hàng</label>
                                <textarea
                                    className={styles.infoTextarea}
                                    value={dataUpdateUser.deliveryAddress}
                                    onChange={(e) => setDataUpdateUser({
                                        ...dataUpdateUser,
                                        deliveryAddress: e.target.value
                                    })}
                                >
                                </textarea>
                            </div>

                        </div>
                        <div className={styles.actionAreaGroup}>
                            <button onClick={handleUpdateUser} className={styles.saveBtn}><FaCheckCircle /> Lưu cập nhật</button>
                            <button className={styles.cancelBtn} onClick={() => setActiveTab("profile")}><FaTimesCircle /> Hủy bỏ</button>
                        </div>
                    </div>
                );

            case "orders":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.cardHeader}>
                            <h2>Đơn hàng của bạn</h2>
                            <p>Danh sách các sản phẩm bạn đã đặt mua</p>
                        </div>
                        <div className={styles.emptyState}>
                            <FaShoppingBag size={60} color="#f1f5f9" />
                            <p>Lịch sử đơn hàng trống</p>
                            <Link to="/" className={styles.primaryBtn}>Khám phá sản phẩm</Link>
                        </div>
                    </div>
                );

            case "password":
                return (
                    <div className={styles.tabContent}>
                        <div className={styles.cardHeader}>
                            <h2>Bảo mật tài khoản</h2>
                            <p>Thay đổi mật khẩu định kỳ để tăng tính bảo mật</p>
                        </div>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoBox}>
                                <label>Mật khẩu mới</label>
                                <input type="text" className={styles.infoInput} placeholder="Nhập mật khẩu mới" />
                            </div>
                            <div className={styles.infoBox}>
                                <label>Xác nhận mật khẩu</label>
                                <input type="text" className={styles.infoInput} placeholder="Nhập lại mật khẩu" />
                            </div>
                        </div>
                        <div className={styles.actionArea}>
                            <button className={styles.primaryBtn}><FaLock /> Cập nhật mật khẩu mới</button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className={styles.wrapper}>
            {isLoading_User ? <UiLoadingComponent /> :
                <div className={styles.container}>
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarHeader}>
                            <div className={styles.avatarContainer}>
                                <img src={`${apiUrl}/${DataUser.data.image}`} alt="Avatar" className={styles.userImg} />
                            </div>

                            <h3>{DataUser.data.name}</h3>
                            <p className={styles.userEmail}>{DataUser.data.email}</p>
                        </div>

                        <nav className={styles.navMenu}>
                            <div className={`${styles.navItem} ${activeTab === "profile" || activeTab === "edit-profile" ? styles.active : ""}`}
                                onClick={() => setActiveTab("profile")}>
                                <FaUserCircle /> Hồ sơ cá nhân
                            </div>

                            <div className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
                                onClick={() => setActiveTab("orders")}>
                                <FaClipboardList /> Quản lý đơn hàng
                            </div>

                            <Link to='/orderLookup' className={styles.navItem}>
                                <FaSearchLocation /> Tra cứu đơn hàng
                            </Link>

                            <hr className={styles.divider} />

                            <div className={`${styles.navItem} ${activeTab === "password" ? styles.active : ""}`}
                                onClick={() => setActiveTab("password")}>
                                <FaLock /> Đổi mật khẩu
                            </div>

                            <button className={`${styles.navItem} ${styles.logout}`} onClick={() => signOutUser()}>
                                <FaSignOutAlt /> Đăng xuất
                            </button>
                        </nav>
                    </aside>

                    <main className={styles.mainContent}>
                        {renderMainContent()}
                    </main>
                </div>
            }
        </div>
    );
}