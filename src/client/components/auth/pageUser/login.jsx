import React, { useContext, useState } from 'react';
import styles from "./user.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { UpdateSevices } from '../../../../services/updateApi';
import UiLoadingComponent from '../../../../components/loadingComponent';
import { ShowToast, ToastType } from '../../../../utils/toast';
import { ThemeContext } from '../../../../context/useThemeContext';
import { Eye, EyeOff } from "lucide-react"; // Đảm bảo đã npm install lucide-react

export default function LoginComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false); // State ẩn/hiện
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
        const result = await UpdateSevices(`${apiUrl}/api/users/login`, formData, "POST");

        if (result.status) {
            ShowToast(result.message_vn, ToastType.success);
            localStorage.setItem(KEY_NAME_USER, result.token);
            reloading();
            ResetForm();
            setLoading(false);
            setTimeout(() => {
                navigate('/user');
            }, 1000);
        } else {
            setLoading(false);
            ShowToast(result.message_vn, ToastType.info);
        }
    };

    const ResetForm = () => {
        setFormData({ email: '', password: '' });
    }

    return (
        <>
            {loading ? <UiLoadingComponent /> : (
                <div className={styles.container}>
                    <div className={styles.authCard}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Đăng nhập</h2>
                            <p className={styles.subtitle}>Chào mừng bạn quay trở lại với chúng tôi</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
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
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Đăng nhập
                            </button>
                        </form>

                        <div className={styles.footer}>
                            <span>Chưa có tài khoản? </span>
                            <Link to='/register' className={styles.link}>Đăng ký ngay</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}