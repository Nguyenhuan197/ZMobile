import React from 'react';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {



    return (
        <header className={styles.header}>
            <div className={styles.logo}>ADMIN PANEL</div>
            <div className={styles.userProfile}>
                <span>Chào, Quản trị viên</span>
                <button className={styles.logoutBtn}>Đăng xuất</button>
            </div>
        </header>
    );
}