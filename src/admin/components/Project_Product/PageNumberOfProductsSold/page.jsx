import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "../../Css__Admin.module.css";
import { FiTrendingUp, FiShoppingBag, FiAward } from "react-icons/fi";
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

    // Hàm lấy dữ liệu được tách riêng để quản lý tốt hơn
    const loadProducts = useCallback(async () => {
        if (!USER?._id) return;

        setIsLoading(true);
        setError(null);

        try {
            // Logic: Nếu chọn sắp xếp giá, ta gửi query cho server. 
            // Nếu để "Mặc định", ta sẽ lấy data về và tự sort theo 'sold' ở client để đảm bảo độ chính xác.
            let query = `status=NAV`;
            if (priceSort) query += `&sort=${priceSort}`;

            const response = await GetAPI_Authorization(`${apiUrl}/api/product/admin-SelectAll/${USER?._id}?${query}`);

            if (response && response.data) {
                let sortedData = [...response.data];

                // Nếu KHÔNG chọn sắp xếp theo giá (Mặc định) -> Ưu tiên sắp xếp theo số lượng bán (sold)
                if (!priceSort) {
                    sortedData.sort((a, b) => (b.sold || 0) - (a.sold || 0));
                }

                setProducts(sortedData);
            } else {
                setError("Không có dữ liệu trả về.");
            }
        } catch (err) {
            console.error("Lỗi lấy dữ liệu:", err);
            setError("Không thể kết nối đến máy chủ.");
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl, USER?._id, priceSort]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

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
                                {!priceSort
                                    ? "Đang hiển thị: Sản phẩm bán chạy nhất đứng đầu"
                                    : `Đang hiển thị: Sắp xếp theo giá ${priceSort === "1" ? "tăng dần" : "giảm dần"}`}
                            </p>
                        </div>

                        <div className={styles.filterSection}>
                            <div className={styles.selectWrapper}>
                                <label style={{ marginRight: '10px', fontSize: '14px', fontWeight: '600' }}>Chế độ hiển thị:</label>
                                <select
                                    className={styles.selectFilter}
                                    value={priceSort}
                                    onChange={(e) => setPriceSort(e.target.value)}
                                    style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                                >
                                    <option value="">🔥 Bán chạy nhất (Mặc định)</option>
                                    <option value="1">💰 Giá: Cao đến Thấp</option>
                                    <option value="2">💰 Giá: Thấp đến Cao</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    {isLoading ? (
                        <UiLoadingComponent />
                    ) : error ? (
                        <div className={styles.error} style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</div>
                    ) : (
                        <div className={styles.tableResponsive}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '60px', textAlign: 'center' }}>Thứ hạng</th>
                                        <th>Thông tin sản phẩm</th>
                                        <th>Trạng thái</th>
                                        <th>Giá niêm yết</th>
                                        <th style={{ textAlign: 'center' }}>Lượt bán</th>
                                        <th style={{ textAlign: 'center' }}>Tồn kho</th>
                                        <th style={{ textAlign: 'center' }}>Phân loại</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length > 0 ? (
                                        products.map((product, index) => {
                                            // Chỉ hiển thị Top Badge khi ở chế độ "Bán chạy nhất"
                                            const isTopTrend = !priceSort && index < 3;

                                            return (
                                                <tr key={product._id} style={isTopTrend ? { background: '#fffdf0' } : {}}>
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                        {isTopTrend ? (
                                                            <div style={{ position: 'relative' }}>
                                                                <FiAward color={index === 0 ? "#f1c40f" : index === 1 ? "#95a5a6" : "#cd7f32"} size={24} />
                                                                <span style={{ fontSize: '10px', position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)', color: '#fff' }}>{index + 1}</span>
                                                            </div>
                                                        ) : (
                                                            index + 1
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                            <img
                                                                src={product.img?.secure_url}
                                                                alt={product.name}
                                                                style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #eee' }}
                                                            />
                                                            <div>
                                                                <div style={{ fontWeight: '700', color: '#2c3e50', fontSize: '14px' }}>{product.name}</div>
                                                                <div style={{ fontSize: '11px', color: '#999' }}>ID: {product._id.slice(-8).toUpperCase()}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span style={{
                                                            color: product.status ? '#27ae60' : '#e74c3c',
                                                            fontSize: '12px', fontWeight: '600',
                                                            background: product.status ? '#ebfbee' : '#fff5f5',
                                                            padding: '4px 8px', borderRadius: '6px'
                                                        }}>
                                                            {product.status ? 'Đang bán' : 'Tạm ẩn'}
                                                        </span>
                                                    </td>
                                                    <td style={{ color: '#e74c3c', fontWeight: '800' }}>
                                                        {formatPrice(product.price)}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div style={{ fontWeight: '800', color: '#2c3e50' }}>
                                                            {product.sold || 0}
                                                        </div>
                                                        {isTopTrend && (
                                                            <div style={{ color: '#27ae60', fontSize: '10px', fontWeight: 'bold' }}>
                                                                <FiTrendingUp /> Tăng trưởng tốt
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div style={{
                                                            background: '#f8fafc', color: '#64748b',
                                                            padding: '4px 10px', borderRadius: '12px',
                                                            display: 'inline-flex', alignItems: 'center', fontSize: '13px', fontWeight: '600'
                                                        }}>
                                                            <FiShoppingBag style={{ marginRight: '5px' }} />
                                                            {product.remainingQuantity || 0}
                                                        </div>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        {product.advertisement ? (
                                                            <span style={{ backgroundColor: '#3498db', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>ADS</span>
                                                        ) : (
                                                            <span style={{ color: '#bdc3c7', fontSize: '11px' }}>Tự nhiên</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: 'center', padding: '100px', color: '#94a3b8' }}>
                                                <FiShoppingBag size={48} style={{ marginBottom: '10px', opacity: 0.2 }} />
                                                <p>Không tìm thấy sản phẩm nào phù hợp.</p>
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