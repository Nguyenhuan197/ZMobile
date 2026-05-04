import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./admin.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { UpdateSevices } from '../../../../services/updateApi';
import { ShowToast, ToastType } from '../../../../utils/toast';
import UiLoadingComponent from '../../../../components/loadingComponent';
import { ThemeContext } from '../../../../context/useThemeContext';


export default function AdminLoginComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;
    const keyRoleAdmin = import.meta.env.VITE_KEY_NAME_CHECK_ROLE_ADMIN
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { reloading } = useContext(ThemeContext);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await UpdateSevices(`${apiUrl}/api/users/login`, formData, "POST");
        ResetForm();

        if (result.status) {
            if (result.role === 'Admin') {
                ShowToast(result.message_vn, ToastType.success);
                localStorage.setItem(KEY_NAME_USER, result.token);
                localStorage.setItem(keyRoleAdmin, result.role);

                // Load lại 
                reloading();
                navigate('/admin-zmobile-2026/product/list');
                window.location.reload();
                setLoading(false);

            } else {
                return ShowToast('Bạn không có quyền truy cập ', ToastType.warn);
            }

        } else {
            ShowToast(result.message_vn, ToastType.info);
            setLoading(false);
        }
    };


    const ResetForm = () => setFormData({ email: '', password: '' });
    if (loading) return <UiLoadingComponent />


    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <div className={styles.header}>
                    <div className={styles.adminIcon}>
                        <img src="unnamed.jpg" alt="unnamed.jpg" />
                    </div>

                    <h2 className={styles.title}>Admin Panel</h2>
                    <p className={styles.subtitle}>Vui lòng xác thực quyền quản trị viên</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Tài khoản quản trị</label>
                        <input
                            ref={inputRef}
                            type="email"
                            name="email"
                            placeholder="admin@system.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Mật khẩu cấp cao</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Xác nhận đăng nhập
                    </button>
                </form>

                <div className={styles.footer}>
                    <Link to="/" className={styles.link}>← Quay lại trang chủ</Link>
                </div>
            </div>
        </div>
    );
}