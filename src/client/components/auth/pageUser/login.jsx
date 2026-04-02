import React, { useContext, useState } from 'react';
import styles from "./user.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { ShowToast, ToastType } from '../../../../utils/toast';
import { UpdateSevices } from '../../../../services/updateApi';
import { ThemeContext } from '../../../../context/useThemeContext';
import { Eye, EyeOff } from "lucide-react";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';


function LoginForm() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { reloading } = useContext(ThemeContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await UpdateSevices(`${apiUrl}/api/users/login`, formData, "POST");

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

    // Logic Login Google
    const loginGoogle = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            if (codeResponse.code) {
                setLoading(true);

                const result = await UpdateSevices(
                    `${apiUrl}/api/google/google-login`,
                    { code: codeResponse.code },
                    "POST"
                );

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
                    <h2 className={styles.title}>Đăng nhập</h2>
                    <p className={styles.subtitle}>Chào mừng bạn quay trở lại!</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
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

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </form>


                {/* Nút Đăng nhập Google */}
                <button className={styles.googleBtn} onClick={() => loginGoogle()}>
                    <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google" className={styles.googleIcon} />
                    Tiếp tục với Google
                </button>

                <div className={styles.footer}>
                    <span>Chưa có tài khoản? </span>
                    <Link to='/register' className={styles.link}>Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
}

// Wrap Component bằng Provider
export default function LoginComponent() {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <LoginForm />
        </GoogleOAuthProvider>
    );
}