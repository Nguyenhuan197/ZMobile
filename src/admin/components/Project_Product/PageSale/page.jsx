import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "./ProductSaleAdmin.module.css";
import { FiEdit, FiTrash2, FiSearch, FiPercent } from "react-icons/fi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { formatPrice } from "../../../../utils/formatPrice.JS";

export default function ProductSaleAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filter state: SALE hoặc NO-SALE
    const [saleFilter, setSaleFilter] = useState("SALE");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            if (!USER?._id) return;

            setIsLoading(true);
            setError(null);

            try {
                // Sử dụng API mới: admin-Select-ProductSale&No-Sale
                let url = `${apiUrl}/api/product/admin-Select-ProductSale&No-Sale/${USER?._id}?statusSale=${saleFilter}`;

                if (searchTerm) url += `&search=${searchTerm}`;

                const response = await GetAPI_Authorization(url);

                if (response && response.data) {
                    setProducts(response.data);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Lỗi lấy dữ liệu:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            loadProducts();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [apiUrl, USER?._id, saleFilter, searchTerm]);

    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    <div className={styles.headerPage}>
                        <h1>Quản lý Sản phẩm Sale</h1>

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

                            {/* Lọc theo trạng thái Sale */}
                            <select
                                className={styles.selectFilter}
                                value={saleFilter}
                                onChange={(e) => setSaleFilter(e.target.value)}
                            >
                                <option value="SALE">Đang giảm giá (Sale)</option>
                                <option value="NO-SALE">Không giảm giá</option>
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
                                        <th>Giá gốc</th>
                                        <th>Mức giảm</th>
                                        <th>Giá sau giảm</th>
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
                                                    <div className={styles.stockInfo}>Tồn kho: {product.remainingQuantity}</div>
                                                </td>
                                                <td className={styles.oldPrice}>{formatPrice(product.price)}</td>
                                                <td>
                                                    <span className={styles.saleBadge}>
                                                        -{formatPrice(product.priceSale)}
                                                    </span>
                                                </td>
                                                <td className={styles.finalPrice}>
                                                    {formatPrice(product.price - product.priceSale)}
                                                </td>
                                                <td>
                                                    <div className={styles.actions}>
                                                        <button className={styles.btnEdit} title="Sửa khuyến mãi"><FiEdit /></button>
                                                        <button className={styles.btnDelete} title="Gỡ Sale"><FiTrash2 /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className={styles.emptyRow}>Không tìm thấy sản phẩm nào.</td>
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