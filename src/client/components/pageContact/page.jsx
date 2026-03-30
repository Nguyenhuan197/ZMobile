import { useContext, useEffect, useState } from "react";
import styles from "./contact.module.css";
import { ThemeContext } from "../../../context/useThemeContext";
import { UpdateSevices } from "../../../services/updateApi";
import { ShowToast, ToastType } from "../../../utils/toast";



export default function ProjectContacts() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { DataAdmin, isLoading_Admin, DataUser } = useContext(ThemeContext);
    const admin = DataAdmin?.data[0];
    const [dataInput, setDataInput] = useState({ name: '', phone: '', email: '', content: '', idUser: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [support, setSupport] = useState(false);


    const handleChangeInput = (e) => {
        setDataInput({ ...dataInput, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const load = () => {
            if (DataUser.data) {
                setDataInput({ ...dataInput, ['idUser']: DataUser.data._id });
            }
        }

        if (DataUser) {
            load();
        }

    }, [DataUser])



    const handleSubmit = async () => {
        if (!dataInput.name.trim() || !dataInput.email.trim() || !dataInput.phone.trim() || !dataInput.content.trim()) return ShowToast('Vui lòng nhập đủ Form', ToastType.info);

        setIsLoading(true);
        console.log(dataInput);
        const result = await UpdateSevices(`${apiUrl}/api/contact/add`, dataInput, "POST");
        setDataInput({ name: '', phone: '', email: '', content: '', idUser: '' });

        if (result.status) {
            ShowToast(result.mesage_vn, ToastType.success);
            setSupport(true);
        } else {
            ShowToast(result.mesage_vn, ToastType.info);
        }
        setIsLoading(false);
    }


    if (isLoading_Admin) return <div className={styles.loading}>Đang tải...</div>;

    return (
        <div className={styles.contactPage}>
            <div className={styles.container}>

                <h1 className={styles.title}>Liên Hệ Với Chúng Tôi</h1>
                <p className={styles.subtitle}>
                    {admin?.nameLogo || "Z Mobile"} luôn sẵn sàng hỗ trợ và tư vấn cho bạn.
                </p>

                <div className={styles.content}>
                    <div className={styles.info}>
                        <h3>Thông tin liên hệ</h3>
                        <p><strong>Hotline:</strong> {admin?.phone || "Đang cập nhật"}</p>
                        <p><strong>Email:</strong> {admin?.email || "Đang cập nhật"}</p>
                        <p><strong>Địa chỉ CS1:</strong> {admin?.address || "Đang cập nhật"}</p>
                        <p><strong>Địa chỉ CS2:</strong> 200 Trần Thị Hè Hiệp Thành Q12 HCM</p>
                        <p>
                            Chúng tôi hoạt động: <strong>{admin?.workingHours}</strong>
                        </p>
                    </div>

                    {/* Form bên phải */}
                    <div className={styles.form} >
                        <input onChange={handleChangeInput} name="name" value={dataInput.name} type="text" placeholder="Họ và tên" required />
                        <input onChange={handleChangeInput} name="email" value={dataInput.email} type="email" placeholder="Email" required />
                        <input onChange={handleChangeInput} name="phone" value={dataInput.phone} type="tel" placeholder="Số điện thoại" required />
                        <textarea onChange={handleChangeInput} name="content" value={dataInput.content} placeholder="Nội dung liên hệ" rows="5" required />

                        {
                            support ?
                                <div className={styles.supportButton} >
                                    <span>Bạn đã gửi thành công vui lòng chờ bộ phận hỗ trợ</span>
                                </div>

                                :

                                <button onClick={handleSubmit} type="submit">
                                    {isLoading ? 'Đăng xử lý' : 'Gửi Tin Nhắn'}
                                </button>
                        }

                    </div>

                </div>
            </div>
        </div>
    );
}