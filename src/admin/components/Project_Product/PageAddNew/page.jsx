import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import { FiPlus, FiTrash2, FiImage, FiInfo, FiTag, FiShoppingBag } from "react-icons/fi";
import styles from "./AddProduct.module.css";
import { uploadImage } from "../../../../services/UpdateImage";
import { ShowToast, ToastType } from "../../../../utils/toast";
import { UpdateSevicesYES__JSON__ADMIN } from "../../../../services/updateApi";
import UiLoadingComponent from "../../../../components/loadingComponent";
import { formatPrice } from "../../../../utils/formatPrice.JS";
import useSWR from "swr";
import heic2any from "heic2any";
import { ThemeContext } from "../../../../context/useThemeContext";
const fetcher = (url) => fetch(url).then((res) => res.json());




export default function AddNewProductAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const navigate = useNavigate();
    const { DataUser } = useContext(ThemeContext);
    const { data: dataCategory, isLoading } = useSWR(`${apiUrl}/api/trademark/view?status=true`, fetcher);
    const [loading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [trademarks, setTrademarks] = useState([]);
    const [productData, setProductData] = useState({ id_Trademark: "", name: "", price: "", priceSale: 0, describe: "", remainingQuantity: "", present: "" });


    // Load danh sách thương hiệu
    useEffect(() => {
        const fetchTrademarks = async () => {
            try {
                if (dataCategory.status) {
                    setTrademarks(dataCategory.data);
                }
            } catch (error) {
                console.error("Lỗi load thương hiệu:", error);
            }
        };

        fetchTrademarks();
    }, [apiUrl, dataCategory]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý ảnh cũ khi thêm vào - nhưng không nhận đuôi ảnh của IP 
    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     const newImages = files.map(file => ({
    //         file,
    //         preview: URL.createObjectURL(file)
    //     }));
    //     setImages(prev => [...prev, ...newImages]);
    // };



    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);

        // Sử dụng Promise.all vì việc convert ảnh cần thời gian xử lý
        const processedImages = await Promise.all(
            files.map(async (file) => {
                let fileToProcess = file;

                // Kiểm tra nếu định dạng là HEIC hoặc HEIF
                if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
                    try {
                        // Thực hiện chuyển đổi sang blob JPEG
                        const convertedBlob = await heic2any({
                            blob: file,
                            toType: "image/jpeg",
                            quality: 0.9 // Nén chất lượng 90% để giảm dung lượng
                        });

                        // Tạo lại đối tượng File mới từ Blob đã convert
                        fileToProcess = new File(
                            [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
                            file.name.replace(/\.[^/.]+$/, ".jpg"),
                            { type: "image/jpeg" }
                        );
                    } catch (error) {
                        console.error("Lỗi khi chuyển đổi file HEIC:", error);
                    }
                }

                return {
                    file: fileToProcess,
                    preview: URL.createObjectURL(fileToProcess)
                };
            })
        );

        setImages(prev => [...prev, ...processedImages]);
    };






    const removeImage = (index) => {
        const newImages = [...images];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleAddNew = async () => {
        if (!productData.name || !productData.id_Trademark || !productData.price) return ShowToast("Vui lòng nhập đầy đủ tên, giá và thương hiệu!", ToastType.info);
        if (images.length === 0) return ShowToast("Vui lòng chọn ít nhất 1 ảnh!", ToastType.info);
        if (Number(productData.priceSale) >= Number(productData.price)) return ShowToast("Số tiền giảm không được lớn hơn hoặc bằng giá bán!", ToastType.error);
        setIsLoading(true);

        try {
            const uploadPromises = images.map(imgObj => uploadImage(imgObj.file));
            const remoteUrls = await Promise.all(uploadPromises);
            const successfulUrls = remoteUrls.filter(url => url !== null);

            if (successfulUrls.length === 0) {
                throw new Error("Không có ảnh nào được tải lên thành công.");
            }

            // 2. Chuẩn bị cấu trúc ảnh theo yêu cầu Backend
            const mainImageData = {
                public_id: `products/main_${Date.now()}`,
                secure_url: successfulUrls[0]
            };

            const detailImagesData = successfulUrls.map((url, index) => ({
                public_id: `products/detail_${index}_${Date.now()}`,
                secure_url: url
            }));

            // 3. Gom dữ liệu cuối cùng
            const finalData = {
                ...productData,
                price: Number(productData.price),
                priceSale: Number(productData.priceSale), // Số tiền giảm thuần VNĐ
                remainingQuantity: Number(productData.remainingQuantity),
                describe: productData.describe.replace(/\n/g, "\n"),
                img: mainImageData,
                imgDetail: detailImagesData
            };

            const response = await UpdateSevicesYES__JSON__ADMIN(
                `${apiUrl}/api/product/add/${DataUser.data._id}`,
                finalData,
                "POST"
            );

            if (response.status) {
                ShowToast(response.message_vn, ToastType.success);
                setTimeout(() => navigate("/admin-zmobile-2026/product/list"), 1500);
            } else {
                ShowToast(response.message_vn || "Thêm thất bại", ToastType.error);
            }

        } catch (error) {
            console.error("Lỗi:", error);
            ShowToast("Lỗi hệ thống hoặc lỗi upload ảnh!", ToastType.error);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) return <UiLoadingComponent />;


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
                                    <div className={styles.titleGroup}><h1>Thêm sản phẩm mới</h1></div>
                                    <button onClick={handleAddNew} className={styles.btnSave}>  Đăng sản phẩm</button>
                                </div>

                                <div className={styles.formContainer}>
                                    <div className={styles.leftCol}>
                                        <div className={styles.card}>
                                            <div className={styles.cardTitle}><FiInfo /> Thông tin cơ bản</div>
                                            <div className={styles.inputGroup}>
                                                <label>Tên sản phẩm *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={productData.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Nhập tên sản phẩm..."
                                                />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label>Quà tặng kèm (Present)</label>
                                                <input
                                                    type="text"
                                                    name="present"
                                                    value={productData.present}
                                                    onChange={handleInputChange}
                                                    placeholder="Ví dụ: Sạc dự phòng, ốp lưng..."
                                                />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label>Mô tả chi tiết</label>
                                                <textarea
                                                    name="describe"
                                                    value={productData.describe}
                                                    onChange={handleInputChange}
                                                    placeholder="Viết nội dung sản phẩm..."
                                                    rows="10"
                                                    className={styles.textareaDescription}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className={styles.card}>
                                            <div className={styles.cardTitle}><FiImage /> Hình ảnh sản phẩm</div>
                                            <div className={styles.uploadWrapper}>
                                                <label className={styles.dropzone}>
                                                    <input type="file" multiple accept="image/*" onChange={handleImageChange} hidden />
                                                    <div className={styles.uploadPlaceholder}>
                                                        <div className={styles.uploadIcon}><FiPlus /></div>
                                                        <p>Thêm nhiều ảnh cùng lúc</p>
                                                    </div>
                                                </label>
                                                <div className={styles.imageGrid}>
                                                    {images.map((img, index) => (
                                                        <div key={index} className={styles.imageItem}>
                                                            <img src={img.preview} alt="preview" />
                                                            <button className={styles.removeBtn} onClick={() => removeImage(index)}><FiTrash2 /></button>
                                                            {index === 0 && <div className={styles.mainTag}>Ảnh bìa</div>}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CỘT PHẢI: Phân loại & Giá */}
                                    <div className={styles.rightCol}>
                                        <div className={styles.card}>
                                            <div className={styles.cardTitle}><FiTag /> Phân loại</div>
                                            <div className={styles.inputGroup}>
                                                <label>Thương hiệu *</label>
                                                <select
                                                    name="id_Trademark"
                                                    value={productData.id_Trademark}
                                                    onChange={handleInputChange}
                                                    className={styles.selectCustom}
                                                >
                                                    <option value="">Chọn thương hiệu</option>
                                                    {trademarks.map(item => (
                                                        <option key={item._id} value={item._id}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.card}>
                                            <div className={styles.cardTitle}><FiShoppingBag /> Giá & Kho hàng</div>
                                            <div className={styles.inputGroup}>
                                                <label>Giá niêm yết (VNĐ) *</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={productData.price}
                                                    onChange={handleInputChange}
                                                    placeholder="0"
                                                />
                                                <div className={styles.pricePreview}>
                                                    Giá gốc: <span>{formatPrice(productData.price)}</span>
                                                </div>
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label>Số tiền giảm (VNĐ)</label>
                                                <input
                                                    type="number"
                                                    name="priceSale"
                                                    value={productData.priceSale}
                                                    onChange={handleInputChange}
                                                    placeholder="Nhập số tiền muốn giảm..."
                                                />
                                                <div className={styles.pricePreview}>
                                                    Giá thực tế: <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                                                        {formatPrice(Number(productData.price) - Number(productData.priceSale))}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label>Số lượng kho</label>
                                                <input
                                                    type="number"
                                                    name="remainingQuantity"
                                                    value={productData.remainingQuantity}
                                                    onChange={handleInputChange}
                                                    placeholder="0"
                                                />
                                            </div>
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