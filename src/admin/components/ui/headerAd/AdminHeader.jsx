import React, { useContext } from 'react';
import styles from './AdminHeader.module.css';
import { ThemeContext } from '../../../../context/useThemeContext';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminHeader() {
    const keyRoleAdmin = import.meta.env.VITE_KEY_NAME_CHECK_ROLE_ADMIN;
    const navigate = useNavigate();
    const { USER, signOutUser } = useContext(ThemeContext);


    const logOut = () => {
        localStorage.removeItem(keyRoleAdmin);
        navigate('/');
        window.location.reload();
    }

    return (
        <header className={styles.header}>
            <div className={styles.logoAdmin}>HUAN ADMIN PANEL</div>


            <div className={styles.userProfile}>
                <span className={styles.wellcom}>Chào Mừng Admin Đã Quay Lại</span>

                <button
                    className={styles.logoutBtn}
                    onClick={() => logOut()}
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