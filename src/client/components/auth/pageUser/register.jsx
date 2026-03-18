import React, { useContext, useState } from 'react';
import styles from "./user.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { ShowToast, ToastType } from '../../../../utils/toast';
import { UpdateSevices } from '../../../../services/updateApi';
import { ThemeContext } from '../../../../context/useThemeContext';
import { Eye, EyeOff } from "lucide-react";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';


function RegisterForm() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { reloading } = useContext(ThemeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleAuthAction(`${apiUrl}/api/users/add`, formData);
    };

    // Hàm dùng chung để xử lý Token & Điều hướng
    const handleAuthAction = async (url, data) => {
        setLoading(true);
        const result = await UpdateSevices(url, data, "POST");
        if (result.status) {
            ShowToast(result.message_vn, ToastType.success);
            localStorage.setItem(KEY_NAME_USER, result.token);
            reloading();
            setTimeout(() => navigate('/user'), 1000);
        } else {
            ShowToast(result.message_vn, ToastType.info);
        }
        setLoading(false);
    };


    // Logic Login Google (Lấy Auth Code và gửi cho Backend)
    const loginGoogle = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            if (codeResponse.code) {
                setLoading(true);
                const result = await UpdateSevices(
                    `${apiUrl}/api/google/google-register`,
                    { code: codeResponse.code },
                    "POST"
                );

                if (result.mesage_vn === 'Tài khoản đã tồn tại') {
                    setLoading(false);
                    ShowToast(result.mesage_vn, ToastType.info);
                    setTimeout(() => navigate('/login'), 1000);
                }

                setLoading(false);
                if (result.status) {
                    ShowToast(result.message_vn, ToastType.success);
                    localStorage.setItem(KEY_NAME_USER, result.token);
                    reloading();
                    setTimeout(() => navigate('/user'), 1000);
                } else {
                    ShowToast(result.message_vn, ToastType.info);
                }
            }
        },

        flow: 'auth-code',
        onError: (errorResponse) => {
            console.error("Google Login Error:", errorResponse);
            ShowToast("Đăng nhập Google thất bại", ToastType.error);
        },
    });


    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Tạo tài khoản</h2>
                    <p className={styles.subtitle}>Cùng bắt đầu hành trình mua sắm của bạn</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Họ và tên</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập họ và tên..."
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className={`${styles.input} ${styles.inputPassword}`}
                                required
                            />
                            <button
                                type="button"
                                className={styles.eyeIcon}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {loading ? "Đang xử lý..." : " Đăng ký ngay"}
                    </button>

                    <button className={styles.googleBtn} onClick={() => loginGoogle()}>
                        <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google" className={styles.googleIcon} />
                        Tiếp tục với Google
                    </button>
                </form>

                <div className={styles.footer}>
                    <span>Đã có tài khoản? </span>
                    <Link to='/login' className={styles.link}>Đăng nhập</Link>
                </div>


            </div>
        </div>
    );
}

// Wrap Component bằng Provider
export default function RegisterComponent() {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <RegisterForm />
        </GoogleOAuthProvider>
    );
}