import React, { useContext } from 'react';
import styles from './AdminHeader.module.css';
import { ThemeContext } from '../../../../context/useThemeContext';

export default function AdminHeader() {
    const { USER, signOutUser } = useContext(ThemeContext);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>ADMIN PANEL</div>
            <div className={styles.userProfile}>
                <span>Chào, Quản trị viên</span>
                <button
                    className={styles.logoutBtn}
                    onClick={() => signOutUser()}
                >
                    Đăng xuất
                </button>
            </div>
        </header>
    );
}