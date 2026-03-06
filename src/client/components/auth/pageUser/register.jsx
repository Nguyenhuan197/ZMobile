import React, { useContext, useState } from 'react';
import styles from "./user.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { ShowToast, ToastType } from '../../../../utils/toast';
import UiLoadingComponent from '../../../../components/loadingComponent';
import { UpdateSevices } from '../../../../services/updateApi';
import { ThemeContext } from '../../../../context/useThemeContext';
// Thêm icon từ lucide-react
import { Eye, EyeOff } from "lucide-react";

export default function RegisterComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State ẩn hiện mật khẩu

    const navigate = useNavigate();
    const { reloading } = useContext(ThemeContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await UpdateSevices(`${apiUrl}/api/users/add`, formData, "POST");

        if (result.status) {
            ShowToast(result.message_vn, ToastType.success);
            localStorage.setItem(KEY_NAME_USER, result.token);

            reloading();
            setLoading(false);
            setTimeout(() => {
                navigate('/user');
            }, 1000);
        } else {
            setLoading(false);
            ShowToast(result.message_vn, ToastType.info);
        }
    };

    return (
        <>
            {loading ? (
                <UiLoadingComponent />
            ) : (
                <div className={styles.container}>
                    <div className={styles.authCard}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Tạo tài khoản</h2>
                            <p className={styles.subtitle}>Cùng bắt đầu hành trình mua sắm của bạn</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            {/* Họ và tên */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Họ và tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nhập họ và tên..."
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            {/* Mật khẩu có nút mắt */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Mật khẩu</label>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`${styles.input} ${styles.inputPassword}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className={styles.eyeIcon}
                                        onClick={togglePasswordVisibility}
                                        tabIndex="-1"
                                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Đăng ký ngay
                            </button>
                        </form>

                        <div className={styles.footer}>
                            <span>Đã có tài khoản? </span>
                            <Link to='/login' className={styles.link}>Đăng nhập</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}