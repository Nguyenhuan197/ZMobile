import React from "react";
import styles from "./Maintenance.module.css";
import { Facebook, PhoneCall } from "lucide-react";

const Maintenance = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>

                <div className={styles.logoText}>
                    <span>Z Mobile</span>
                </div>

                <h3 className={styles.title}>
                    Hệ thống đang bảo trì
                </h3>

                <p className={styles.message}>
                    Vui lòng quay lại sau ít phút.
                </p>

                <div className={styles.socialGroup}>
                    <a
                        href="#"
                        className={styles.iconItem}
                        aria-label="Facebook"
                    >
                        <div className={`${styles.iconCircle} ${styles.fb}`}>
                            <Facebook size={28} strokeWidth={2.2} />
                        </div>
                        <span>Facebook</span>
                    </a>

                    {/* ZALO */}
                    <a
                        href="https://zalo.me/0369594026"
                        className={styles.iconItem}
                        aria-label="Zalo"
                    >
                        <div className={`${styles.iconCircle} ${styles.zalo}`}>
                            Z
                        </div>

                        <span>Zalo</span>
                    </a>

                    {/* HOTLINE */}
                    <a
                        href="tel:0369594026"
                        className={styles.iconItem}
                        aria-label="Hotline"
                    >
                        <div className={`${styles.iconCircle} ${styles.phone}`}>
                            <PhoneCall size={26} strokeWidth={2} />
                        </div>
                        <span>Hotline</span>
                    </a>
                </div>


            </div>
        </div>
    );
};

export default Maintenance;