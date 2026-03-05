import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "../../Css__Admin.module.css";
import { FiSearch, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { formatPrice } from "../../../../utils/formatPrice.JS";
import { ShowToast, ToastType } from "../../../../utils/toast";
import { UpdateSevicesNo__JSON__ADMIN } from "../../../../services/updateApi";



export default function PageSlideAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [statusAdFilter, setStatusAdFilter] = useState("true");
    const [searchTerm, setSearchTerm] = useState("");


    const loadProductsAd = useCallback(async () => {
        if (!USER?._id) return;
        setError(null);

        try {
            const response = await GetAPI_Authorization(
                `${apiUrl}/api/product/admin-Select-ProductAdvertisement/${USER?._id}?statusAdvertisement=${statusAdFilter}`
            );

            if (response && response.data) {
                const filteredData = searchTerm
                    ? response.data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    : response.data;
                setProducts(filteredData);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error("Lỗi lấy dữ liệu Slide:", err);
            setError(err.message);
        }
    }, [apiUrl, USER?._id, statusAdFilter, searchTerm]);

    // Effect khởi tạo load ban đầu
    useEffect(() => {
        const initLoad = async () => {
            setIsLoading(true);
            await loadProductsAd();
            setIsLoading(false);
        };

        const delayDebounceFn = setTimeout(() => {
            initLoad();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [loadProductsAd]);


    // 2. Xử lý chuyển đổi trạng thái quảng cáo
    const handleToggleAdStatus = async (productId, currentAdStatus) => {
        setIsLoading(true);
        console.log(productId);

        try {
            const newStatus = currentAdStatus === true ? false : true;
            const response = await UpdateSevicesNo__JSON__ADMIN(
                `${apiUrl}/api/product/admin-state-Transition-ProductAdvertisement/${productId}/${USER?._id}?status=${newStatus}`,
                "PUT"
            );

            if (!response) return ShowToast('Cập nhật thất bại', ToastType.error);
            if (response.status) {
                ShowToast(response.mesage_vn, ToastType.success);
                await loadProductsAd();
            } else {
                ShowToast(response.mesage_vn, ToastType.error);
            }


        } catch (error) {
            console.error(error);
            ShowToast("Lỗi hệ thống", ToastType.error);
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
                        isLoading ? <UiLoadingComponent /> :

                            <>
                                <div className={styles.headerPage}>
                                    <h1>Quản lý Slide Quảng cáo</h1>

                                    <div className={styles.filterSection}>
                                        <div className={styles.searchBox}>
                                            <FiSearch className={styles.searchIcon} />
                                            <input
                                                type="text"
                                                placeholder="Tìm tên sản phẩm..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        <select
                                            className={styles.selectFilter}
                                            value={statusAdFilter}
                                            onChange={(e) => setStatusAdFilter(e.target.value)}
                                        >
                                            <option value="true">Đang chạy Slide</option>
                                            <option value="false">Không chạy Slide</option>
                                        </select>
                                    </div>
                                </div>

                                {error ? (
                                    <div className={styles.errorBox}>Lỗi: {error}</div>
                                ) : (
                                    <div className={styles.tableResponsive}>
                                        <table className={styles.table}>
                                            <thead>
                                                <tr>
                                                    <th>Hình ảnh</th>
                                                    <th>Thông tin sản phẩm</th>
                                                    <th>Giá gốc</th>
                                                    <th>Giảm giá</th>
                                                    <th>Trạng thái Slide</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.length > 0 ? (
                                                    products.map((product) => (
                                                        <tr key={product._id}>
                                                            <td>
                                                                <img
                                                                    src={product.img?.secure_url}
                                                                    alt={product.name}
                                                                    className={styles.productImg}
                                                                />
                                                            </td>
                                                            <td className={styles.productInfo}>
                                                                <div className={styles.productName}>{product.name}</div>
                                                                <div className={styles.smallId}>Kho: {product.remainingQuantity}</div>
                                                            </td>
                                                            <td className={styles.productPrice}>
                                                                {formatPrice(product.price)}
                                                            </td>
                                                            <td style={{ color: 'red' }}>
                                                                -{formatPrice(product.priceSale)}
                                                            </td>
                                                            <td>
                                                                <span className={product.advertisement ? styles.statusActive : styles.statusInactive}>
                                                                    {product.advertisement ? "Đang hiện" : "Đang ẩn"}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className={styles.actions}>
                                                                    <button
                                                                        className={`${styles.btnToggle} ${product.advertisement ? styles.active : styles.inactive}`}
                                                                        title={product.advertisement ? "Gỡ khỏi Slide" : "Đưa lên Slide"}
                                                                        onClick={() => handleToggleAdStatus(product._id, product.advertisement)}
                                                                    >
                                                                        {product.advertisement ? <FiToggleRight /> : <FiToggleLeft />}
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    !isLoading && (
                                                        <tr>
                                                            <td colSpan="6" className={styles.emptyTable}>
                                                                Không tìm thấy sản phẩm nào.
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                    }



                </main>



            </div>
        </>
    );
}