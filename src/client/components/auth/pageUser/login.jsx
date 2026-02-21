import React, { useState } from 'react';
import styles from "./user.module.css";


export default function LoginComponent() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic đăng nhập tại đây
        console.log("Dữ liệu đăng nhập:", formData);
        alert("Đang xử lý đăng nhập...");
    };

    return (
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
                        <div className={styles.labelWrapper}>
                            <label className={styles.label}>Mật khẩu</label>
                        </div>
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
                        Đăng nhập
                    </button>
                </form>

                <div className={styles.footer}>
                    <span>Chưa có tài khoản? </span>
                    <a href="/register" className={styles.link}>Đăng ký ngay</a>
                </div>
            </div>
        </div>
    );
}