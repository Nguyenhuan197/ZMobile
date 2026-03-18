
import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "../../Css__Admin.module.css";
import { FiSearch } from "react-icons/fi";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import { UpdateSevicesNo__JSON__ADMIN } from "../../../../services/updateApi";
import { ShowToast, ToastType } from "../../../../utils/toast";


export default function ListRecruitmentAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");



    const loaddingData = async () => {
        if (!USER?._id) return;
        setIsLoading(true);

        try {
            const result = await GetAPI_Authorization(`${apiUrl}/api/recruitment/view/6999b03b8ebf1e4f0dd57d18?status=false`);
            if (result && result.data) {
                setApplicants(result.data);
            } else {
                setApplicants([]);
            }
        } catch (err) {
            console.error("Lỗi lấy dữ liệu ứng tuyển:", err);
            setApplicants([]);
        } finally {
            setIsLoading(false);
        }
    }

    const loadApplicants = useCallback(async () => {
        loaddingData();
    }, []);


    useEffect(() => {
        loadApplicants();
    }, [loadApplicants]);


    // Lọc dữ liệu theo tên hoặc số điện thoại tại client
    const filteredApplicants = applicants.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.toString().includes(searchTerm)
    );


    const handlePersonnelApproval = async (_id) => {
        if (!_id) return;
        setIsLoading(true);
        const result = await UpdateSevicesNo__JSON__ADMIN(
            `${apiUrl}/api/recruitment/stateTransition/${_id}/6999b03b8ebf1e4f0dd57d18?status=true`,
            'PUT'
        );

        if (result.status) {
            ShowToast(result.mesage_vn || "Chuyển đổi trạng thái thành công", ToastType.success);
            loaddingData();
            setIsLoading(false);
        } else {
            ShowToast(result.mesage_vn || "Chuyển đổi trạng thái thất bại", ToastType.warn);
        }
    }

    const handleDelete = async (_id) => {
        if (!_id) return;
        setIsLoading(true);
        const result = await UpdateSevicesNo__JSON__ADMIN(
            `${apiUrl}/api/recruitment/delete/${_id}/6999b03b8ebf1e4f0dd57d18`,
            'DELETE'
        );

        if (result.status) {
            ShowToast(result.mesage_vn || "Xoá thành công", ToastType.success);
            loaddingData();
            setIsLoading(false);
        } else {
            ShowToast(result.mesage_vn || "Xoá thất bại", ToastType.warn);
        }
    }


    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    {isLoading ? <UiLoadingComponent /> : (
                        <>
                            <div className={styles.headerPage}>
                                <h1>Danh sách ứng tuyển CTV</h1>

                                <div className={styles.filterSection}>
                                    <div className={styles.searchBox}>
                                        <FiSearch className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Tìm tên hoặc số điện thoại..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.tableResponsive}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Họ và Tên</th>
                                            <th>Giới tính</th>
                                            <th>Tuổi</th>
                                            <th>Số điện thoại</th>
                                            <th>Thành phố</th>
                                            <th>Trạng thái</th>
                                            <th style={{ textAlign: 'center', width: '300px' }}>Thao tác</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredApplicants.length > 0 ? (
                                            filteredApplicants.map((item) => (
                                                <tr key={item._id}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>{item.sex}</td>
                                                    <td>{item.age}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            0{item.phone}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                            {item.city}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={item.status ? styles.statusActive : styles.statusInactive}>
                                                            {item.status ? "Đã duyệt" : "Mới đăng ký"}
                                                        </span>
                                                    </td>

                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            gap: '10px',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}>
                                                            {/* Nút Phê Duyệt */}
                                                            <div
                                                                onClick={() => handlePersonnelApproval(item._id)}
                                                                style={{
                                                                    padding: '6px 12px',
                                                                    borderRadius: '6px',
                                                                    fontSize: '12px',
                                                                    fontWeight: '600',
                                                                    cursor: 'pointer',
                                                                    backgroundColor: '#e6f4ea',
                                                                    color: '#1e7e34',
                                                                    border: '1px solid #c3e6cb',
                                                                    transition: 'all 0.2s ease',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}
                                                                onMouseOver={(e) => {
                                                                    e.currentTarget.style.backgroundColor = '#1e7e34';
                                                                    e.currentTarget.style.color = '#fff';
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.currentTarget.style.backgroundColor = '#e6f4ea';
                                                                    e.currentTarget.style.color = '#1e7e34';
                                                                }}

                                                            >
                                                                <span style={{ fontSize: '14px' }}>✓</span> Phê duyệt
                                                            </div>

                                                            {/* Nút Từ Chối */}
                                                            <div
                                                                onClick={() => handleDelete(item._id)}
                                                                style={{
                                                                    padding: '6px 12px',
                                                                    borderRadius: '6px',
                                                                    fontSize: '12px',
                                                                    fontWeight: '600',
                                                                    cursor: 'pointer',
                                                                    backgroundColor: '#fdecea',
                                                                    color: '#d93025',
                                                                    border: '1px solid #f5c6cb',
                                                                    transition: 'all 0.2s ease',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '4px'
                                                                }}
                                                                onMouseOver={(e) => {
                                                                    e.currentTarget.style.backgroundColor = '#d93025';
                                                                    e.currentTarget.style.color = '#fff';
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.currentTarget.style.backgroundColor = '#fdecea';
                                                                    e.currentTarget.style.color = '#d93025';
                                                                }}
                                                            >
                                                                <span style={{ fontSize: '14px' }}>✕</span> Từ chối
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className={styles.emptyTable}>
                                                    Chưa có hồ sơ ứng tuyển nào.
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