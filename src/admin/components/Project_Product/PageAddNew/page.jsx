import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../../context/useThemeContext";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import { UpdateSevices } from "../../../../services/updateApi";

import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import UiLoadingComponent from "../../../../components/loadingComponent";

import {
    FiPlus,
    FiTrash2,
    FiSave,
    FiImage,
    FiPackage,
    FiPercent,
    FiArrowLeft
} from "react-icons/fi";

import styles from "./AddProduct.module.css";

export default function AddNewProductAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { ShowToast, ToastType } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [trademarks, setTrademarks] = useState([]);

    const [formData, setFormData] = useState({
        id_Trademark: "",
        name: "",
        price: 0,
        priceSale: 1,
        describe: "",
        remainingQuantity: 0,
        present: "",
        img: { public_id: "", secure_url: "" },
        imgDetail: []
    });

    useEffect(() => {
        const fetchTrademarks = async () => {
            const res = await GetAPI_Authorization(
                `${apiUrl}/api/trademark/view?status=true`
            );
            if (res?.status) setTrademarks(res.data);
        };
        fetchTrademarks();
    }, [apiUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMainImgChange = (url) => {
        setFormData((prev) => ({
            ...prev,
            img: { ...prev.img, secure_url: url }
        }));
    };

    const addImgDetail = () => {
        setFormData((prev) => ({
            ...prev,
            imgDetail: [...prev.imgDetail, { secure_url: "" }]
        }));
    };

    const updateImgDetail = (index, url) => {
        const newDetails = [...formData.imgDetail];
        newDetails[index].secure_url = url;
        setFormData((prev) => ({ ...prev, imgDetail: newDetails }));
    };

    const removeImgDetail = (index) => {
        setFormData((prev) => ({
            ...prev,
            imgDetail: prev.imgDetail.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.id_Trademark || !formData.img.secure_url) {
            return ShowToast("Vui lòng điền đủ thông tin bắt buộc!", ToastType.info);
        }

        setLoading(true);
        try {
            const result = await UpdateSevices(
                `${apiUrl}/api/product/add`,
                formData,
                "POST"
            );

            if (result.status) {
                ShowToast("Thêm sản phẩm thành công!", ToastType.success);
                setTimeout(() => navigate("/admin/products"), 800);
            } else {
                ShowToast(result.message_vn || "Thất bại", ToastType.error);
            }
        } catch {
            ShowToast("Lỗi hệ thống!", ToastType.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <AdminHeader />
            <div className={styles.layout}>
                <AdminMenu />

                <main className={styles.content}>
                    <form onSubmit={handleSubmit}>

                        {/* HEADER */}
                        <div className={styles.topBar}>
                            <div className={styles.titleSection}>
                                <button
                                    type="button"
                                    className={styles.backBtn}
                                    onClick={() => navigate(-1)}
                                >
                                    <FiArrowLeft />
                                </button>
                                <div>
                                    <h1>Tạo sản phẩm mới</h1>
                                    <p>Niêm yết sản phẩm & quản lý tồn kho</p>
                                </div>
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                {loading ? "Đang xử lý..." : <><FiSave /> Đăng sản phẩm</>}
                            </button>
                        </div>

                        <div className={styles.grid}>
                            {/* LEFT */}
                            <div className={styles.left}>
                                <div className={styles.card}>
                                    <h3>Thông tin sản phẩm</h3>

                                    <label>Tên sản phẩm *</label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />

                                    <label>Thương hiệu *</label>
                                    <select
                                        name="id_Trademark"
                                        value={formData.id_Trademark}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn thương hiệu</option>
                                        {trademarks.map((t) => (
                                            <option key={t._id} value={t._id}>
                                                {t.name}
                                            </option>
                                        ))}
                                    </select>

                                    <label>Mô tả</label>
                                    <textarea
                                        name="describe"
                                        value={formData.describe}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div className={styles.right}>
                                <div className={styles.card}>
                                    <h3><FiPackage /> Giá & Kho</h3>

                                    <label>Giá (VNĐ)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />

                                    <label><FiPercent /> Tỉ lệ giảm</label>
                                    <input
                                        type="number"
                                        name="priceSale"
                                        value={formData.priceSale}
                                        onChange={handleChange}
                                    />

                                    <label>Số lượng nhập</label>
                                    <input
                                        type="number"
                                        name="remainingQuantity"
                                        value={formData.remainingQuantity}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={styles.card}>
                                    <h3><FiImage /> Hình ảnh</h3>

                                    <label>Ảnh chính *</label>
                                    <input
                                        placeholder="Dán link ảnh..."
                                        value={formData.img.secure_url}
                                        onChange={(e) =>
                                            handleMainImgChange(e.target.value)
                                        }
                                    />

                                    {formData.img.secure_url && (
                                        <img
                                            src={formData.img.secure_url}
                                            className={styles.preview}
                                            alt=""
                                        />
                                    )}

                                    <div className={styles.detailHeader}>
                                        <span>Ảnh chi tiết</span>
                                        <button type="button" onClick={addImgDetail}>
                                            <FiPlus />
                                        </button>
                                    </div>

                                    {formData.imgDetail.map((img, i) => (
                                        <div key={i} className={styles.detailRow}>
                                            <input
                                                value={img.secure_url}
                                                onChange={(e) =>
                                                    updateImgDetail(i, e.target.value)
                                                }
                                            />
                                            <button type="button" onClick={() => removeImgDetail(i)}>
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </form>
                </main>
            </div>

            {loading && <UiLoadingComponent />}
        </div>
    );
}