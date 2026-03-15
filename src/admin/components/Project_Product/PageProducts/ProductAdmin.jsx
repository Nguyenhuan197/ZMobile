import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "./ProductAdmin.module.css";
import { FiEdit, FiSearch, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { formatPrice } from "../../../../utils/formatPrice.JS";
import { ShowToast, ToastType } from "../../../../utils/toast";
import { UpdateSevicesNo__JSON } from "../../../../services/updateApi";
import { useNavigate } from "react-router-dom";




export default function ProductAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("true");
    const [priceSort, setPriceSort] = useState("");
    const [searchTerm, setSearchTerm] = useState("");



    // Đưa hàm load vào useCallback để có thể tái sử dụng trong handleToggleStatus
    const loadProducts = useCallback(async () => {
        if (!USER?._id) return;

        setIsLoading(true);
        setError(null);

        try {
            let query = `status=${statusFilter}`;
            if (priceSort) query += `&sort=${priceSort}`;
            if (searchTerm) query += `&search=${searchTerm}`;

            const response = await GetAPI_Authorization(
                `${apiUrl}/api/product/admin-SelectAll/${USER?._id}?${query}`
            );

            if (response && response.data) {
                setProducts(response.data);
            } else {
                setProducts([]); // Tránh lỗi map khi data rỗng
            }
        } catch (err) {
            console.error("Lỗi lấy dữ liệu:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl, USER?._id, statusFilter, priceSort, searchTerm]);



    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            loadProducts();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [loadProducts]);



    // Xử lý chuyển đổi trạng thái
    const handleToggleStatus = async (id, currentStatus) => {
        // Bật loading ngay khi nhấn nút để người dùng không thao tác trùng lặp
        setIsLoading(true);

        try {
            // Đảo ngược trạng thái hiện tại
            const newStatus = !currentStatus;

            const response = await UpdateSevicesNo__JSON(
                `${apiUrl}/api/product/state-Transition/${id}?status=${newStatus}`,
                "PUT"
            );

            if (response.status) {
                ShowToast("Cập nhật trạng thái thành công", ToastType.success);
                // Gọi lại loadProducts để fetch data mới và tắt loading sau khi hoàn tất
                await loadProducts();
            } else {
                ShowToast(response.message || "Cập nhật thất bại", ToastType.error);
                setIsLoading(false); // Tắt loading nếu API cập nhật lỗi
            }
        } catch (error) {
            console.error(error);
            ShowToast("Lỗi hệ thống", ToastType.error);
            setIsLoading(false); // Tắt loading nếu có lỗi kết nối
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
                                    <h1>Quản lý sản phẩm</h1>

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
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value="true">Đang bán</option>
                                            <option value="false">Dừng bán</option>
                                        </select>

                                        <select
                                            className={styles.selectFilter}
                                            value={priceSort}
                                            onChange={(e) => setPriceSort(e.target.value)}
                                        >
                                            <option value="">Sắp xếp giá</option>
                                            <option value="1">Giá: Thấp đến Cao</option>
                                            <option value="2">Giá: Cao đến Thấp</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.tableResponsive}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Hình ảnh</th>
                                                <th>Thông tin sản phẩm</th>
                                                <th>Giá bán</th>
                                                <th>Trạng thái</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {products.length > 0 ? (
                                                products.map((product) => (
                                                    <tr key={product._id} className={!product.status ? styles.rowDisabled : ""}>
                                                        <td>
                                                            <img
                                                                src={product.img?.secure_url}
                                                                alt={product.name}
                                                                className={styles.productImg}
                                                            />
                                                        </td>
                                                        <td className={styles.productInfo}>
                                                            <div className={styles.productName}>{product.name}</div>
                                                            <div className={styles.smallId}>ID: {product._id}</div>
                                                        </td>
                                                        <td className={styles.productPrice}>
                                                            {formatPrice(product.price)}
                                                        </td>
                                                        <td>
                                                            <span className={product.status ? styles.statusActive : styles.statusInactive}>
                                                                {product.status ? "Đang bán" : "Dừng bán"}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <div className={styles.actions}>
                                                                <button
                                                                    onClick={() => navigate(`/admin-zmobile-2026/product/update/${product._id}`)}
                                                                    className={styles.btnEdit} title="Chỉnh sửa">
                                                                    <FiEdit />
                                                                </button>

                                                                <button
                                                                    className={`${styles.btnToggle} ${product.status ? styles.active : styles.inactive}`}
                                                                    title={product.status ? "Tạm dừng bán" : "Kích hoạt bán"}
                                                                    onClick={() => handleToggleStatus(product._id, product.status)}
                                                                >
                                                                    {product.status ? <FiToggleRight /> : <FiToggleLeft />}
                                                                </button>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className={styles.emptyTable}>
                                                        Không tìm thấy sản phẩm nào.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                    }

                </main>

            </div>
        </>
    );
}