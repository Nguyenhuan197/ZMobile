import React, { useState } from 'react';
import styles from "./admin.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { UpdateSevices } from '../../../../services/updateApi';
import { ShowToast, ToastType } from '../../../../utils/toast';
import UiLoadingComponent from '../../../../components/loadingComponent';


export default function AdminLoginComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

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
        setLoading(false);

        if (result.status) {
            if (result.role === 'Admin') {
                ShowToast(result.message_vn, ToastType.success);
                localStorage.setItem(KEY_NAME_USER, result.token);

                // phải dùng cái này load lại trang sau khi đăng nhập
                // nguyên nhân để load lại cho các Context hoat động lại
                setTimeout(() => {
                    window.location.href = "/admin-zmobile-2026/product";
                }, 1000);
            } else {
                return ShowToast('Bạn không có quyền truy cập ', ToastType.warn);
            }


        } else {
            ShowToast(result.message_vn, ToastType.info);
        }
    };

    const ResetForm = () => {
        setFormData({ email: '', password: '' });
    }


    if (loading) return <UiLoadingComponent />


    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <div className={styles.header}>
                    <div className={styles.adminIcon}>
                        <img src="https://scontent.fthd1-1.fna.fbcdn.net/v/t39.30808-6/532445447_122170327910531399_1406581920273154993_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=xePRpM5RgB4Q7kNvwFHVxiz&_nc_oc=AdkAPxN6CtIGZ7O3gUUk1MzyIyCzOF3UEGYLQ-nTmdnoOu8fkuzswtA3B3VR9g2LwRnkVUJX2omqNCV3j9ECkZI7&_nc_zt=23&_nc_ht=scontent.fthd1-1.fna&_nc_gid=dUAGYpb-aC5K9V8eSt1hSA&oh=00_AfuLwAYRvj9gTWy-m76RsL36gz335R_aImQ0nlxVBalunA&oe=699F8D1E" alt="" />
                    </div>

                    <h2 className={styles.title}>Admin Panel</h2>
                    <p className={styles.subtitle}>Vui lòng xác thực quyền quản trị viên</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Tài khoản quản trị</label>
                        <input
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