
import React, { useContext, useState } from 'react';
import styles from "./user.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { ShowToast, ToastType } from '../../../../utils/toast';
import UiLoadingComponent from '../../../../components/loadingComponent';
import { UpdateSevices } from '../../../../services/updateApi';
import { ThemeContext } from '../../../../context/useThemeContext';



export default function RegisterComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const KEY_NAME_USER = import.meta.env.VITE_KEY_NAME_USER;

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { reloading } = useContext(ThemeContext);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await UpdateSevices(`${apiUrl}/api/users/add`, formData, "POST");
        setLoading(false);

        if (result.status) {
            ShowToast(result.message_vn, ToastType.success);
            localStorage.setItem(KEY_NAME_USER, result.token);


            // Load lại 
            reloading();
            setTimeout(() => {
                navigate('/user');
            }, 1000);


        } else {
            ShowToast(result.message_vn, ToastType.info);
        }
    };


    return (

        <>
            {
                loading ? < UiLoadingComponent /> :
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Mật khẩu</label>
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
                                    Đăng ký ngay
                                </button>
                            </form>

                            <div className={styles.footer}>
                                <span>Đã có tài khoản? </span>
                                <Link to='/login' className={styles.link}>Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
            }



        </>
    );
}