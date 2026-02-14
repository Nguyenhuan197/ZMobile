import styles from "./contact.module.css";

export default function ProjectContacts() {
    return (
        <div className={styles.contactPage}>
            <div className={styles.container}>

                <h1 className={styles.title}>Liên Hệ Với Chúng Tôi</h1>
                <p className={styles.subtitle}>
                    Z Mobile luôn sẵn sàng hỗ trợ và tư vấn cho bạn.
                </p>

                <div className={styles.content}>
                    {/* Thông tin bên trái */}
                    <div className={styles.info}>
                        <h3>Thông tin liên hệ</h3>
                        <p><strong>Hotline:</strong> 0369 594 026</p>
                        <p><strong>Email:</strong> huannguyendinh14@gmail.com</p>
                        <p><strong>Địa chỉ:</strong> Nông Cống Thanh Hoá</p>
                        <p>
                            Chúng tôi hoạt động từ 8:00 - 21:00 tất cả các ngày trong tuần.
                        </p>
                    </div>

                    {/* Form bên phải */}
                    <form className={styles.form}>
                        <input type="text" placeholder="Họ và tên" required />
                        <input type="email" placeholder="Email" required />
                        <input type="tel" placeholder="Số điện thoại" required />
                        <textarea placeholder="Nội dung liên hệ" rows="5" required />
                        <button type="submit">Gửi Tin Nhắn</button>
                    </form>

                </div>
            </div>
        </div>
    );
}
