import { useContext } from "react";
import { ThemeContext } from "../../../context/useThemeContext";
import AdminHeader from "../ui/headerAd/AdminHeader";
import AdminMenu from "../ui/menuAd/AdminMenu";
import styles from "./ProductAdmin.module.css";
import useSWR from "swr";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi"; // Thêm icon thao tác
const fetcher = (url) => fetch(url).then((res) => res.json());


export default function ProductAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const { data, error, isLoading } = useSWR(
        USER?._id ? `${apiUrl}/api/product/view?status=true` : null,
        fetcher
    );

    // Hàm định dạng tiền tệ VNĐ
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    <div className={styles.headerPage}>
                        <h1>Danh sách sản phẩm</h1>
                        <button className={styles.btnAdd}>
                            <FiPlus /> Thêm sản phẩm mới
                        </button>
                    </div>

                    {isLoading ? (
                        <div className={styles.loading}>Đang tải dữ liệu...</div>
                    ) : error ? (
                        <div className={styles.error}>Lỗi tải dữ liệu!</div>
                    ) : (
                        <div className={styles.tableResponsive}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Hình ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá bán</th>
                                        <th>Mã ID</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.map((product) => (
                                        <tr key={product._id}>
                                            <td>
                                                <img
                                                    src={product.img.secure_url}
                                                    alt={product.name}
                                                    className={styles.productImg}
                                                />
                                            </td>
                                            <td className={styles.productName}>{product.name}</td>
                                            <td className={styles.productPrice}>{formatPrice(product.price)}</td>
                                            <td className={styles.productId}><code>{product._id}</code></td>
                                            <td>
                                                <div className={styles.actions}>
                                                    <button className={styles.btnEdit} title="Sửa"><FiEdit /></button>
                                                    <button className={styles.btnDelete} title="Xóa"><FiTrash2 /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}