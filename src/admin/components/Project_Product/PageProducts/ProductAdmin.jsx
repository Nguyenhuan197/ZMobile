import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "./ProductAdmin.module.css";
import { FiEdit, FiTrash2, FiSearch, FiFilter } from "react-icons/fi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { formatPrice } from "../../../../utils/formatPrice.JS";

export default function ProductAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);

    // Khởi tạo state
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // State cho bộ lọc
    const [statusFilter, setStatusFilter] = useState("true"); // Mặc định true (đang bán)
    const [priceSort, setPriceSort] = useState(""); // 1: Thấp->Cao, 2: Cao->Thấp
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            if (!USER?._id) return;

            setIsLoading(true);
            setError(null);

            try {
                // Xây dựng query string dựa trên yêu cầu
                let query = `status=${statusFilter}`;
                if (priceSort) query += `&sort=${priceSort}`;
                if (searchTerm) query += `&search=${searchTerm}`;

                const response = await GetAPI_Authorization(
                    `${apiUrl}/api/product/admin-SelectAll/${USER?._id}?${query}`
                );

                if (response && response.data) {
                    setProducts(response.data);
                } else {
                    setError("Không có dữ liệu trả về.");
                }
            } catch (err) {
                console.error("Lỗi lấy dữ liệu:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        // Kỹ thuật debounce nhẹ cho ô search để tránh spam API
        const delayDebounceFn = setTimeout(() => {
            loadProducts();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [apiUrl, USER?._id, statusFilter, priceSort, searchTerm]);

    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    <div className={styles.headerPage}>
                        <h1>Danh sách sản phẩm</h1>

                        <div className={styles.filterSection}>
                            {/* Ô tìm kiếm */}
                            <div className={styles.searchBox}>
                                <FiSearch className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Tìm tên sản phẩm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Lọc trạng thái */}
                            <select
                                className={styles.selectFilter}
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="true">Đang bán</option>
                                <option value="false">Dừng bán</option>
                            </select>

                            {/* Sắp xếp giá */}
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

                    {isLoading ? (
                        <UiLoadingComponent />
                    ) : error ? (
                        <div className={styles.error}>Lỗi: {error}</div>
                    ) : (
                        <div className={styles.tableResponsive}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Hình ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá bán</th>
                                        <th>Trạng thái</th>
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
                                                <td className={styles.productName}>
                                                    {product.name}
                                                    <div className={styles.smallId}>ID: {product._id}</div>
                                                </td>
                                                <td className={styles.productPrice}>{formatPrice(product.price)}</td>
                                                <td>
                                                    <span className={product.status ? styles.statusActive : styles.statusInactive}>
                                                        {product.status ? "Đang bán" : "Dừng bán"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className={styles.actions}>
                                                        <button className={styles.btnEdit} title="Sửa"><FiEdit /></button>
                                                        <button className={styles.btnDelete} title="Xóa"><FiTrash2 /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>Không có sản phẩm nào phù hợp.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}