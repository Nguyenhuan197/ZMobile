import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../../context/useThemeContext";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "./update.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { UpdateSevicesYES__JSON__ADMIN } from "../../../../services/updateApi";
import { ShowToast, ToastType } from "../../../../utils/toast";



export default function EditCategoryComponent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [isLoadUpdate, setIsLoadUpdate] = useState(false);


    useEffect(() => {
        const fetchDetail = async () => {
            if (!id || !USER?._id) return;
            setIsLoading(true);
            try {
                const response = await GetAPI_Authorization(
                    `${apiUrl}/api/trademark/detail/${USER._id}/${id}`
                );
                if (response?.status && response.data) {
                    setName(response.data.name);
                    setPreviewImg(response.data.img?.secure_url);
                }
            } catch (err) {
                console.error("Lỗi lấy chi tiết:", err);
                toast.error("Không thể tải dữ liệu danh mục");
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [id, USER?._id, apiUrl]);


    const handleUpdate = async () => {
        setIsLoading(true);
        setIsLoadUpdate(true);
        const result = await UpdateSevicesYES__JSON__ADMIN(
            `${apiUrl}/api/trademark/update/${USER._id}/${id}`,
            { name },
            "PUT"
        );

        setIsLoading(false);
        if (result.status) {
            ShowToast(result.mesage_vn || "Cập nhật thành công", ToastType.success);
            setTimeout(() => navigate("/admin-zmobile-2026/category/list"), 1500);
        } else {
            ShowToast(result.mesage_vn || "Cập nhật thất bại", ToastType.error);
        }
    };


    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    {
                        previewImg === "" ? <div style={{ fontSize: 30, marginTop: '120px' }}>Đăng tải lên</div> :
                            <>
                                <div className={styles.headerPage}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <button onClick={() => navigate(-1)} className={styles.btnBack}>
                                            <FiArrowLeft />
                                        </button>
                                        <h1>Chỉnh sửa danh mục</h1>
                                    </div>
                                </div>



                                <div className={styles.formCard} >
                                    <div className={styles.formGroup}>
                                        <label>Tên danh mục</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Nhập tên danh mục mới..."
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Hình ảnh / Logo</label>
                                        <div className={styles.imageUploadWrapper}>
                                            <div className={styles.previewContainer}>
                                                <img
                                                    src={previewImg || "/placeholder-img.png"}
                                                    alt="Preview"
                                                    className={styles.imagePreview}
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className={styles.formActions}>
                                        {
                                            !isLoadUpdate ?
                                                <div onClick={handleUpdate} className={styles.btnSave}>Cập nhật</div>
                                                :
                                                <div className={styles.loadupdate}>Đăng cập nhật ....</div>
                                        }
                                    </div>
                                </div>
                            </>
                    }




                </main >


            </div >
        </>
    );
}