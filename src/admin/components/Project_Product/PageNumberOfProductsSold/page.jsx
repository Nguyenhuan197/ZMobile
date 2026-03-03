import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "../../Css__Admin.module.css";
import { FiTrendingUp, FiShoppingBag, FiStar, FiAward } from "react-icons/fi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { formatPrice } from "../../../../utils/formatPrice.JS";

export default function PageNumberOfProductsSold() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [priceSort, setPriceSort] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            if (!USER?._id) return;

            setIsLoading(true);
            setError(null);

            try {
                // Thêm sort=-remainingQuantity nếu backend hỗ trợ dấu trừ để đảo ngược
                // Ở đây mình tập trung vào việc lấy dữ liệu về trước
                let query = `status=true`;
                if (priceSort) query += `&sort=${priceSort}`;

                const response = await GetAPI_Authorization(
                    `${apiUrl}/api/product/admin-SelectAll/${USER?._id}?${query}`
                );

                if (response && response.data) {
                    // CỐ CHẤP SẮP XẾP: Luôn đưa thằng bán nhiều nhất (remainingQuantity cao nhất) lên đầu
                    // Nếu người dùng chọn lọc giá (priceSort), ta ưu tiên lọc giá của backend
                    // Nếu không lọc giá, ta mặc định sắp xếp theo lượt bán giảm dần
                    const sortedData = [...response.data];

                    if (!priceSort) {
                        sortedData.sort((a, b) => (b.remainingQuantity || 0) - (a.remainingQuantity || 0));
                    }

                    setProducts(sortedData);
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

        loadProducts();
    }, [apiUrl, USER?._id, priceSort]);

    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    <div className={styles.headerPage}>
                        <div className={styles.titleArea}>
                            <h1>
                                <FiAward style={{ marginRight: '10px', color: '#f1c40f' }} />
                                Bảng Xếp Hạng Doanh Số
                            </h1>
                            <p style={{ color: '#666', fontSize: '14px' }}>
                                Sản phẩm được sắp xếp theo hiệu suất bán hàng (Mặc định: Bán chạy nhất đứng đầu)
                            </p>
                        </div>

                        <div className={styles.filterSection}>
                            <div className={styles.selectWrapper}>
                                <label style={{ marginRight: '10px', fontSize: '14px', fontWeight: '500' }}>Sắp xếp giá:</label>
                                <select
                                    className={styles.selectFilter}
                                    value={priceSort}
                                    onChange={(e) => setPriceSort(e.target.value)}
                                >
                                    <option value="">Mặc định (Bán chạy nhất)</option>
                                    <option value="1">Giá: Thấp đến Cao</option>
                                    <option value="2">Giá: Cao đến Thấp</option>
                                </select>
                            </div>
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
                                        <th style={{ width: '50px', textAlign: 'center' }}>Top</th>
                                        <th>Thông tin sản phẩm</th>
                                        <th>Giá bán</th>
                                        <th style={{ textAlign: 'center' }}>Hiệu suất</th>
                                        <th style={{ textAlign: 'center' }}>Lượt bán ra</th>
                                        <th style={{ textAlign: 'center' }}>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length > 0 ? (
                                        products.map((product, index) => (
                                            <tr key={product._id} style={index < 3 && !priceSort ? { background: '#fffdf0' } : {}}>
                                                <td style={{ textAlign: 'center' }}>
                                                    {index === 0 && !priceSort ? <FiAward color="#f1c40f" size={20} /> : index + 1}
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                        <img
                                                            src={product.img?.secure_url}
                                                            alt={product.name}
                                                            style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover' }}
                                                        />
                                                        <div>
                                                            <div style={{ fontWeight: '600', color: '#2c3e50' }}>{product.name}</div>
                                                            <div style={{ fontSize: '10px', color: '#999' }}>ID: {product._id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                                                    {formatPrice(product.price)}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {index < 3 && !priceSort ? (
                                                        <span style={{ color: '#27ae60', fontSize: '12px', fontWeight: 'bold' }}>
                                                            <FiTrendingUp /> Hot Trend
                                                        </span>
                                                    ) : (
                                                        <span style={{ color: '#95a5a6', fontSize: '12px' }}>Ổn định</span>
                                                    )}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <div style={{
                                                        background: index < 3 && !priceSort ? '#27ae60' : '#e8f5e9',
                                                        color: index < 3 && !priceSort ? '#fff' : '#2e7d32',
                                                        padding: '6px 15px',
                                                        borderRadius: '20px',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        fontWeight: '800',
                                                        fontSize: '14px',
                                                        boxShadow: index < 3 && !priceSort ? '0 2px 5px rgba(39,174,96,0.3)' : 'none'
                                                    }}>
                                                        <FiShoppingBag style={{ marginRight: '6px' }} />
                                                        {product.remainingQuantity}
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    {product.advertisement ? (
                                                        <span style={{ color: '#3498db', fontSize: '11px', border: '1px solid #3498db', padding: '2px 6px', borderRadius: '4px' }}>AD</span>
                                                    ) : (
                                                        <span style={{ color: '#bdc3c7', fontSize: '11px' }}>Organic</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                                                Chưa có dữ liệu lượt bán.
                                            </td>
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