import React, { useContext } from 'react';
import styles from './AdminHeader.module.css';
import { ThemeContext } from '../../../../context/useThemeContext';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
    const { USER, signOutUser } = useContext(ThemeContext);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>ADMIN PANEL</div>
            <div className={styles.userProfile}>
                <span className={styles.wellcom}>Chào Mừng Admin Đã Quay Lại</span>

                <button
                    className={styles.logoutBtn}
                    onClick={() => signOutUser()}
                >
                    Đăng xuất Admin
                </button>

                <Link to={'/'}
                    className={styles.logoutBtnBack}
                >
                    Quay lại với User Cline
                </Link>
            </div>
        </header>
    );
}