import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "../../Css__Admin.module.css";
import { FiEdit, FiSearch } from "react-icons/fi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { useNavigate } from "react-router-dom";



export default function ListCategoryAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]); // Đổi từ products thành categories
    const [isLoading, setIsLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("true"); // Mặc định xem các mục đang hoạt động
    const [searchTerm, setSearchTerm] = useState("");

    // Hàm lấy danh sách danh mục
    const loadCategories = useCallback(async () => {
        if (!USER?._id) return;

        setIsLoading(true);
        try {
            // API endpoint theo cấu trúc bạn cung cấp
            // query: status=true hoặc false
            let query = `status=${statusFilter}`;
            if (searchTerm) query += `&search=${searchTerm}`;

            const response = await GetAPI_Authorization(
                `${apiUrl}/api/trademark/view?${query}`
            );

            if (response && response.status && response.data) {
                setCategories(response.data);
            } else {
                setCategories([]);
            }
        } catch (err) {
            console.error("Lỗi lấy dữ liệu danh mục:", err);
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl, USER?._id, statusFilter, searchTerm]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            loadCategories();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [loadCategories]);




    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    {isLoading ? <UiLoadingComponent /> : (
                        <>
                            <div className={styles.headerPage}>
                                <h1>Quản lý danh mục</h1>

                                <div className={styles.filterSection}>
                                    <div className={styles.searchBox}>
                                        <FiSearch className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Tìm tên danh mục..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Bộ lọc trạng thái True/False */}
                                    <select
                                        className={styles.selectFilter}
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="true">Đang hoạt động</option>
                                        <option value="false">Đã tạm ẩn</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.tableResponsive}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Logo</th>
                                            <th>Tên danh mục</th>
                                            <th>Mã định danh (ID)</th>
                                            <th>Trạng thái</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {categories.length > 0 ? (
                                            categories.map((item) => (
                                                <tr key={item._id} className={statusFilter === "false" ? styles.rowDisabled : ""}>
                                                    <td>
                                                        <img
                                                            src={item.img?.secure_url}
                                                            alt={item.name}
                                                            className={styles.productImg}
                                                            style={{ objectFit: 'contain', backgroundColor: '#f9f9f9' }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className={styles.productName} style={{ fontWeight: 'bold' }}>
                                                            {item.name}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={styles.smallId}>{item._id}</span>
                                                    </td>
                                                    <td>
                                                        <span className={statusFilter === "true" ? styles.statusActive : styles.statusInactive}>
                                                            {statusFilter === "true" ? "Hiển thị" : "Đang ẩn"}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <div className={styles.actions}>
                                                            <button
                                                                onClick={() => navigate(`/admin-zmobile-2026/category/update/${item._id}`)}
                                                                className={styles.btnEdit} title="Chỉnh sửa">
                                                                <FiEdit />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className={styles.emptyTable}>
                                                    Không tìm thấy danh mục nào.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}