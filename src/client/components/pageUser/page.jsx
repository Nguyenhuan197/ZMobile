import React from "react";
import styles from "./userComponent.module.css";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function UserComponent() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                {/* HEADER */}
                <div className={styles.profileHeader}>
                    <FaUserCircle className={styles.avatar} />
                    <div>
                        <h2>Nguyễn Văn A</h2>
                        <p className={styles.role}>Thành viên</p>
                    </div>
                </div>

                {/* INFO SECTION */}
                <div className={styles.infoSection}>

                    <div className={styles.infoItem}>
                        <FaEnvelope />
                        <span>nguyenvana@gmail.com</span>
                    </div>

                    <div className={styles.infoItem}>
                        <FaPhone />
                        <span>0123 456 789</span>
                    </div>

                    <div className={styles.infoItem}>
                        <FaMapMarkerAlt />
                        <span>TP. Hồ Chí Minh</span>
                    </div>

                </div>

                {/* ACTION BUTTONS */}
                <div className={styles.actions}>
                    <button className={styles.editBtn}>
                        Chỉnh sửa hồ sơ
                    </button>
                    <button className={styles.passwordBtn}>
                        Đổi mật khẩu
                    </button>
                </div>

            </div>
        </div>
    );
}