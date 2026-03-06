import styles from "./contactQuickly.module.css";

export default function ContactQuickly() {
    const phone = import.meta.env.VITE_NUMBER_PHONE;
    const zaloLink = `https://zalo.me/${phone}`;

    return (
        <div className={styles.wrapper}>

            {/* NÚT ZALO - CHỈ HIỆN CHỮ VÀ BOX */}
            <div style={{ position: 'relative', pointerEvents: 'auto' }}>
                <div className={`${styles.pulseNode} ${styles.zaloPulse}`}></div>
                <a href={zaloLink} target="_blank" rel="noopener noreferrer" className={`${styles.block} ${styles.zaloBlock}`}>
                    <span className={styles.phoneNumber}>Chat Zalo</span>
                    {/* Đã xóa iconCircle ở đây */}
                </a>
            </div>

            {/* NÚT GỌI - GIỮ NGUYÊN GIAO DIỆN CỦA BẠN */}
            <div style={{ position: 'relative', pointerEvents: 'auto' }}>
                <div className={styles.pulseNode}></div>
                <a href={`tel:${phone}`} className={styles.block}>
                    <span className={styles.phoneNumber}>{phone}</span>
                    <div className={styles.iconCircle}>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                    </div>
                </a>
            </div>

        </div>
    );
}