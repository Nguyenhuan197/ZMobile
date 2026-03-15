import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import { FiArrowLeft, FiSave, FiInfo, FiShoppingBag } from "react-icons/fi";
import styles from "./UpdateProduct.module.css";
import { ShowToast, ToastType } from "../../../../utils/toast";
import UiLoadingComponent from "../../../../components/loadingComponent";
import { UpdateSevicesYES__JSON__ADMIN } from "../../../../services/updateApi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";

// Hàm format tiền tệ VNĐ
const formatPrice = (price) => {
    if (!price || isNaN(price)) return "0 ₫";
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

export default function UpdateProductAdminComponent() {
    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const navigate = useNavigate();
    const USER = JSON.parse(localStorage.getItem('USER_INFO'));
    const [loading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        priceSale: 0,
        describe: "",
        remainingQuantity: "",
        present: ""
    });

    useEffect(() => {
        const fetchDetail = async () => {
            setIsLoading(true);
            try {
                // Giữ nguyên logic gọi API của bạn
                const response = await GetAPI_Authorization(`${apiUrl}/api/product/admin-Detail/${id}/6999b03b8ebf1e4f0dd57d18`);
                if (response.status) {
                    const p = response.data[0];
                    setProductData({
                        name: p.name || "",
                        price: p.price || "",
                        priceSale: p.priceSale || 0, // Giá trị tiền giảm từ DB
                        describe: p.describe || "",
                        remainingQuantity: p.remainingQuantity || "",
                        present: p.present || ""
                    });
                }
            } catch (error) {
                console.error("Lỗi load detail:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [apiUrl, id, USER?._id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        // Validate đơn giản trước khi gửi
        if (Number(productData.priceSale) >= Number(productData.price)) {
            return ShowToast("Số tiền giảm không thể lớn hơn giá gốc!", ToastType.error);
        }

        setIsLoading(true);
        const payload = {
            name: productData.name,
            price: Number(productData.price),
            priceSale: Number(productData.priceSale),
            describe: productData.describe,
            remainingQuantity: Number(productData.remainingQuantity),
            present: productData.present
        };

        const result = await UpdateSevicesYES__JSON__ADMIN(
            `${apiUrl}/api/product/admin-Product-Edit/${id}/6999b03b8ebf1e4f0dd57d18`,
            payload,
            "PUT"
        );

        setIsLoading(false);
        if (result.status) {
            ShowToast(result.mesage_vn || "Cập nhật thành công", ToastType.success);
            setTimeout(() => navigate("/admin-zmobile-2026/product/list"), 1500);
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
                        loading ? <UiLoadingComponent /> :
                            <>
                                <div className={styles.headerPage}>
                                    <div className={styles.titleGroup}>
                                        <button className={styles.btnBack} onClick={() => navigate(-1)}>
                                            <FiArrowLeft />
                                        </button>
                                        <h1>Cập nhật: {productData.name}</h1>
                                    </div>
                                </div>

                                <div className={styles.formContainer}>
                                    <div className={styles.leftCol}>
                                        <div className={styles.card}>
                                            <div className={styles.cardTitle}><FiInfo /> Nội dung sản phẩm</div>
                                            <div className={styles.inputGroup}>
                                                <label>Tên</label>
                                                <input type="text" name="name" value={productData.name} onChange={handleInputChange} />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label>Mô tả</label>
                                                <textarea name="describe" value={productData.describe} onChange={handleInputChange} rows="20" />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label>Quà tặng</label>
                                                <input type="text" name="present" value={productData.present} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.rightCol}>
                                        <div className={styles.card}>
                                            <div className={styles.cardTitle}><FiShoppingBag /> Kho & Giá</div>

                                            {/* GIÁ GỐC */}
                                            <div className={styles.inputGroup}>
                                                <label>Giá niêm yết (VNĐ) *</label>
                                                <input type="number" name="price" value={productData.price} onChange={handleInputChange} />
                                                <div className={styles.pricePreview}>
                                                    Giá gốc: <span>{formatPrice(productData.price)}</span>
                                                </div>
                                            </div>

                                            {/* SỐ TIỀN GIẢM */}
                                            <div className={styles.inputGroup}>
                                                <label>Số tiền giảm (VNĐ)</label>
                                                <input type="number" name="priceSale" value={productData.priceSale} onChange={handleInputChange} />
                                                <div className={styles.pricePreview}>
                                                    Giá thực tế: <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                                                        {formatPrice(Number(productData.price) - Number(productData.priceSale))}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label>Số lượng kho</label>
                                                <input type="number" name="remainingQuantity" value={productData.remainingQuantity} onChange={handleInputChange} />
                                            </div>

                                            <button onClick={handleUpdate} className={styles.btnSave}>
                                                Cập nhật sản phẩm
                                            </button>
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