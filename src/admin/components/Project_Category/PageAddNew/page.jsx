

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import { FiPlus, FiTrash2, FiImage, FiInfo } from "react-icons/fi";
import styles from "./AddCategory.module.css";
import { uploadImage } from "../../../../services/UpdateImage";
import { ShowToast, ToastType } from "../../../../utils/toast";
import { UpdateSevicesYES__JSON__ADMIN } from "../../../../services/updateApi";
import UiLoadingComponent from "../../../../components/loadingComponent";
import heic2any from "heic2any";



export default function AddCategoryAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const navigate = useNavigate();
    const [loading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null); // Danh mục thường chỉ cần 1 logo
    const [categoryName, setCategoryName] = useState("");

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        let fileToProcess = file;
        setIsLoading(true);

        try {
            if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.8
                });
                fileToProcess = new File(
                    [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
                    file.name.replace(/\.[^/.]+$/, ".jpg"),
                    { type: "image/jpeg" }
                );
            }

            setImage({
                file: fileToProcess,
                preview: URL.createObjectURL(fileToProcess)
            });
        } catch (error) {
            console.error("Lỗi chuyển đổi ảnh:", error);
            ShowToast("Không thể xử lý định dạng ảnh này", ToastType.error);
        } finally {
            setIsLoading(false);
        }
    };


    const removeImage = () => {
        if (image) URL.revokeObjectURL(image.preview);
        setImage(null);
    };

    const handleAddNew = async () => {
        if (!categoryName.trim()) return ShowToast("Vui lòng nhập tên danh mục!", ToastType.info);
        if (!image) return ShowToast("Vui lòng chọn logo cho danh mục!", ToastType.info);

        setIsLoading(true);
        try {
            const remoteUrl = await uploadImage(image.file);
            if (!remoteUrl) throw new Error("Upload ảnh thất bại");

            // 2. Chuẩn bị Data theo đúng format API bạn cung cấp
            const finalData = {
                name: categoryName,
                img: {
                    public_id: `trademarks/${Date.now()}_logo`,
                    secure_url: remoteUrl
                }
            };

            const response = await UpdateSevicesYES__JSON__ADMIN(
                `${apiUrl}/api/trademark/add/6999b03b8ebf1e4f0dd57d18`,
                finalData,
                "POST"
            );

            if (response.status) {
                ShowToast("Thêm danh mục thành công!", ToastType.success);
                setTimeout(() => navigate("/admin-zmobile-2026/category/list"), 1500);
            } else {
                ShowToast(response.message_vn || "Thêm thất bại", ToastType.error);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            ShowToast("Lỗi hệ thống không thể thêm danh mục", ToastType.error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />
                <main className={styles.mainContent}>
                    {
                        loading ? <UiLoadingComponent /> :
                            <>
                                <div className={styles.headerPage}>
                                    <h1>Thêm danh mục mới</h1>
                                    <button onClick={handleAddNew} className={styles.btnSave}>
                                        Thêm mới danh mục
                                    </button>
                                </div>

                                <div className={styles.formContainer}>
                                    {/* Thông tin tên danh mục */}
                                    <div className={styles.card}>
                                        <div className={styles.cardTitle}><FiInfo /> Tên thương hiệu / Danh mục</div>
                                        <div className={styles.inputGroup}>
                                            <label>Tên hiển thị *</label>
                                            <input
                                                type="text"
                                                value={categoryName}
                                                onChange={(e) => setCategoryName(e.target.value)}
                                                placeholder="Ví dụ: Apple, Samsung, Oppo..."
                                            />
                                        </div>
                                    </div>

                                    {/* Upload Logo */}
                                    <div className={styles.card}>
                                        <div className={styles.cardTitle}><FiImage /> Logo danh mục</div>
                                        <div className={styles.uploadWrapper}>
                                            {!image ? (
                                                <label className={styles.dropzone}>
                                                    <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                                                    <div className={styles.uploadPlaceholder}>
                                                        <div className={styles.uploadIcon}><FiPlus /></div>
                                                        <p>Tải ảnh logo lên</p>
                                                    </div>
                                                </label>
                                            ) : (
                                                <div className={styles.imagePreviewBox}>
                                                    <img src={image.preview} alt="preview" />
                                                    <button className={styles.removeBtn} onClick={removeImage}>
                                                        Xóa ảnh
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                    }



                </main>
            </div>
        </>
    );
}