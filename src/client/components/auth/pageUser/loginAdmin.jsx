import React, { useState } from 'react';
import styles from "./admin.module.css";

export default function AdminLoginComponent() {
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
        console.log("Admin Login Attempt:", formData);
        // Ở đây bạn sẽ gọi API dành riêng cho admin
    };

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
                    <a href="/" className={styles.link}>← Quay lại trang chủ</a>
                </div>
            </div>
        </div>
    );
}