import { useContext, useEffect, useState } from "react";
import {
    Phone, Mail, MapPin, Clock, Send, CheckCircle2,
    User, MessageSquare, Smartphone
} from "lucide-react"; // Cài đặt: npm install lucide-react
import styles from "./contact.module.css";
import styles_Hieuung from "../../../App.module.css";
import { ThemeContext } from "../../../context/useThemeContext";
import { UpdateSevices } from "../../../services/updateApi";
import { ShowToast, ToastType } from "../../../utils/toast";




export default function ProjectContacts() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { DataAdmin, isLoading_Admin, DataUser } = useContext(ThemeContext);
    const admin = DataAdmin?.data[0];
    const [dataInput, setDataInput] = useState({ name: '', phone: '', email: '', content: '', idUser: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChangeInput = (e) => {
        setDataInput({ ...dataInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (DataUser?.data) {
            setDataInput(prev => ({ ...prev, idUser: DataUser.data._id }));
        }
    }, [DataUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!dataInput.name.trim() || !dataInput.email.trim() || !dataInput.phone.trim() || !dataInput.content.trim()) {
            return ShowToast('Vui lòng điền đầy đủ thông tin', ToastType.info);
        }

        setIsLoading(true);
        const result = await UpdateSevices(`${apiUrl}/api/contact/add`, dataInput, "POST");

        if (result.status) {
            ShowToast(result.mesage_vn, ToastType.success);
            setIsSuccess(true);
            setDataInput({ name: '', phone: '', email: '', content: '', idUser: DataUser?.data?._id || '' });
        } else {
            ShowToast(result.mesage_vn, ToastType.info);
        }
        setIsLoading(false);
    }

    if (isLoading_Admin) return <div className={styles.loaderCenter}><div className={styles.spinner}></div></div>;

    return (
        <div className={styles.contactPage}>

            <div className={styles_Hieuung.blob}></div>
            <div className={styles_Hieuung.blob2}></div>


            <div className={styles.header}>
                <h1 className={styles.mainTitle}>Kết Nối</h1>
                <p className={styles.subTitle}>
                    Đội ngũ <strong>{admin?.nameLogo || "Z Mobile"}</strong> luôn sẵn sàng hỗ trợ bạn 24/7
                </p>
            </div>

            <div className={styles.containerGrid}>
                {/* Cột trái: Cards thông tin */}
                <div className={styles.infoSection}>
                    <div className={styles.infoCard}>
                        <div className={`${styles.iconWrapper} ${styles.bgRed}`}>
                            <Phone size={24} />
                        </div>
                        <div>
                            <h4>Hotline Tư Vấn</h4>
                            <p>{admin?.phone || "Đang cập nhật"}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={`${styles.iconWrapper} ${styles.bgBlue}`}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4>Email Hỗ Trợ</h4>
                            <p>{admin?.email || "Đang cập nhật"}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={`${styles.iconWrapper} ${styles.bgGreen}`}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4>Địa Chỉ Cơ Sở</h4>
                            <p>{admin?.address || "Đang cập nhật"}</p>
                        </div>
                    </div>

                    <div className={styles.infoCard}>
                        <div className={`${styles.iconWrapper} ${styles.bgOrange}`}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <h4>Thời Gian Làm Việc</h4>
                            <p>{admin?.workingHours || "8:00 - 22:00"}</p>
                        </div>
                    </div>
                </div>

                {/* Cột phải: Form liên hệ */}
                <div className={styles.formSection}>
                    {isSuccess ? (
                        <div className={styles.successBox}>
                            <CheckCircle2 size={60} color="#22c55e" />
                            <h3>Gửi Thành Công!</h3>
                            <p>Chúng tôi đã nhận được thông tin và sẽ phản hồi bạn trong giây lát.</p>
                            <button onClick={() => setIsSuccess(false)} className={styles.btnReset}>Gửi yêu cầu mới</button>
                        </div>
                    ) : (
                        <form className={styles.contactForm} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <User className={styles.inputIcon} size={18} />
                                <input name="name" value={dataInput.name} onChange={handleChangeInput} type="text" placeholder="Họ và tên của bạn" required />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <Mail className={styles.inputIcon} size={18} />
                                    <input name="email" value={dataInput.email} onChange={handleChangeInput} type="email" placeholder="Địa chỉ Email" required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <Smartphone className={styles.inputIcon} size={18} />
                                    <input name="phone" value={dataInput.phone} onChange={handleChangeInput} type="tel" placeholder="Số điện thoại" required />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <MessageSquare className={styles.inputIcon} size={18} />
                                <textarea name="content" value={dataInput.content} onChange={handleChangeInput} placeholder="Nội dung bạn cần hỗ trợ..." rows="5" required />
                            </div>

                            <button className={styles.submitBtn} type="submit" disabled={isLoading}>
                                {isLoading ? "Đang xử lý..." : (
                                    <>
                                        Gửi Tin Nhắn <Send size={18} style={{ marginLeft: '8px' }} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}