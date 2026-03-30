import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "../../Css__Admin.module.css";
import { FiSearch } from "react-icons/fi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';
import { UpdateSevicesNo__JSON__ADMIN } from "../../../../services/updateApi";
import { ShowToast, ToastType } from "../../../../utils/toast";


export default function ContactSupportComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(false);


    const loadUsers = useCallback(async () => {
        if (!USER?._id) return;
        setIsLoading(true);
        try {
            const response = await GetAPI_Authorization(`${apiUrl}/api/contact/view-admin/${USER._id}?status=${statusFilter}`);
            console.log(response.data);

            if (response && response.status && response.data) {
                setUsers(response.data);
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.error("Lỗi lấy dữ liệu người dùng:", err);
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl, USER?._id, statusFilter]);


    useEffect(() => {
        loadUsers();
    }, [loadUsers]);



    const handleConversion = async (_id) => {
        if (!_id) return;
        setIsLoading(true);
        const result = await UpdateSevicesNo__JSON__ADMIN(
            `${apiUrl}/api/contact/stateTransition-admin/${USER._id}/${_id}?status=${true}`,
            'PUT'
        );

        if (result.status) {
            ShowToast(result.mesage_vn || "Chuyển đổi trạng thái thành công", ToastType.success);
            loadUsers();
            setIsLoading(false);
        } else {
            ShowToast(result.mesage_vn || "Chuyển đổi trạng thái thất bại", ToastType.warn);
        }
    }


    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    {isLoading ? <UiLoadingComponent /> : (
                        <section className={styles.wrapperContainer}>
                            <div className={styles.headerPage}>
                                <div>
                                    <h1 className={styles.titlePage}>
                                        {
                                            statusFilter ? `${users.length} Danh sách khách hàng đã được hỗ trợ` : `${users.length} Danh sách khách hàng chưa được hỗ trợ`
                                        }
                                    </h1>
                                    <p className={styles.subTitle}>Hệ thống hỗ trợ khách hàng</p>
                                </div>

                                <div className={styles.filterSection}>
                                    <div className={styles.searchBox}>
                                        <FiSearch className={styles.searchIcon} />
                                        <input
                                            type="text"
                                            placeholder="Tìm tên, email..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    <select
                                        className={styles.selectFilter}
                                        value={statusFilter}
                                        onChange={() => setStatusFilter(!statusFilter)}
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value={true}>Khách hàng đã được hỗ trợ</option>
                                        <option value={true}>Khách hàng chưa được hỗ trợ</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.tableResponsive}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Họ Tên Khách Hàng</th>
                                            <th>Email</th>
                                            <th>SĐT</th>
                                            <th>Nội dung hỗ trợ</th>
                                            <th style={{ textAlign: 'center' }}>Trạng thái</th>
                                            {
                                                !statusFilter && <th style={{ textAlign: 'center' }}>Hành động</th>
                                            }

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((item) => (
                                                <tr key={item._id} className={!item.status ? styles.rowDisabled : ""}>

                                                    <td>
                                                        <span className={styles.userNameText}>{item.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className={styles.emailText}>{item.email}</span>
                                                    </td>
                                                    <td>
                                                        <span className={styles.phoneText}>0{item.phone}</span>
                                                    </td>

                                                    <td>
                                                        <span className={styles.phoneText}>{item.content}</span>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div className={item.status ? styles.statusActiveBox : styles.statusLockedBox}>
                                                            {item.status ? "Đã được hỗ trợ" : "Chưa được hỗ trợ"}
                                                        </div>
                                                    </td>

                                                    {
                                                        !statusFilter &&

                                                        <td style={{ textAlign: 'center' }}>
                                                            <div className={styles.actionsGroup} style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <button
                                                                    onClick={() => console.log("Toggle user:", item._id)}
                                                                    title={item.status ? "Chuyển đổi trạng thái" : "Chuyển đổi tài khoản"}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        gap: '8px',
                                                                        padding: '6px 14px',
                                                                        minWidth: '110px',
                                                                        cursor: 'pointer',

                                                                        // Font & Chữ
                                                                        fontSize: '13px',
                                                                        fontWeight: '600',
                                                                        border: 'none',
                                                                        borderRadius: '8px',

                                                                        // Màu sắc thay đổi theo trạng thái (Status logic)
                                                                        backgroundColor: '#028002', // Nền nhạt
                                                                        color: item.status ? '#ffffff' : '#f5f5f5',           // Chữ đậm
                                                                        border: `1px solid ${item.status ? '#ffa39e' : '#b7eb8f'}`,

                                                                        transition: 'all 0.3s ease',
                                                                        boxShadow: '0 2px 0 rgba(0,0,0,0.015)',
                                                                    }}
                                                                >
                                                                    <span onClick={() => handleConversion(item._id)} style={{ whiteSpace: 'nowrap' }}>
                                                                        Phê duyệt
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    }




                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className={styles.emptyData}>Không tìm thấy người dùng nào</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </section>
                    )}
                </main>
            </div>
        </>
    );
}