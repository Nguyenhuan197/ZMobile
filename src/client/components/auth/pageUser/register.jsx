
import React, { useState } from 'react';
import styles from "./user.module.css";

export default function RegisterComponent() {
    const [formData, setFormData] = useState({
        name: '',
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
        console.log("Dữ liệu đăng ký:", formData);
        alert("Đăng ký thành công!");
    };

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
                    <a href="/login" className={styles.link}>Đăng nhập</a>
                </div>
            </div>
        </div>
    );
}