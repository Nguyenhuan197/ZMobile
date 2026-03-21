import { useContext, useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../../../../context/useThemeContext";
import AdminHeader from "../../ui/headerAd/AdminHeader";
import AdminMenu from "../../ui/menuAd/AdminMenu";
import styles from "../../Css__Admin.module.css";
import { FiSearch, FiMail, FiPhone, FiHash, FiRefreshCw, FiUser } from "react-icons/fi";
import { GetAPI_Authorization } from "../../../../services/getTockenAdmin";
import UiLoadingComponent from '../../../../components/loadingComponent';


export default function ListUsersAdminComponent() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const loadUsers = useCallback(async () => {
        if (!USER?._id) return;
        setIsLoading(true);
        try {
            const response = await GetAPI_Authorization(`${apiUrl}/api/users/view-All/${USER._id}`);
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
    }, [apiUrl, USER?._id]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm);

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" ? user.status === true : user.status === false);

        return matchesSearch && matchesStatus;
    });

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
                                    <h1 className={styles.titlePage}>Quản lý người dùng</h1>
                                    <p className={styles.subTitle}>Hệ thống quản lý tài khoản thành viên</p>
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
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value="active">Đang hoạt động</option>
                                        <option value="blocked">Đã bị khóa</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles.tableResponsive}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '70px' }}>Ảnh</th>
                                            <th>Họ và Tên</th>
                                            <th><FiHash /> ID</th>
                                            <th><FiMail /> Email</th>
                                            <th><FiPhone /> SĐT</th>
                                            <th style={{ textAlign: 'center' }}>Trạng thái</th>
                                            <th style={{ textAlign: 'center' }}>Hành động</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((item) => (
                                                <tr key={item._id} className={!item.status ? styles.rowDisabled : ""}>
                                                    <td>
                                                        <div className={styles.avatarBox}>
                                                            <img
                                                                src={item.image === "imageDefault.png"
                                                                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=EBF4FF&color=7F9CF5&bold=true`
                                                                    : item.image}
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={styles.userNameText}>{item.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className={styles.idCodeText}>{item._id}</span>
                                                    </td>
                                                    <td>
                                                        <span className={styles.emailText}>{item.email}</span>
                                                    </td>
                                                    <td>
                                                        <span className={styles.phoneText}>{item.phone}</span>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <div className={item.status ? styles.statusActiveBox : styles.statusLockedBox}>
                                                            {item.status ? "Hoạt động" : "Bị khóa"}
                                                        </div>
                                                    </td>


                                                    <td style={{ textAlign: 'center' }}>
                                                        <div className={styles.actionsGroup} style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <button
                                                                onClick={() => console.log("Toggle user:", item._id)}
                                                                title={item.status ? "Click để khóa tài khoản" : "Click để kích hoạt tài khoản"}
                                                                style={{
                                                                    // Cấu trúc Box
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
                                                                    backgroundColor: item.status ? '#fff1f0' : '#f6ffed', // Nền nhạt
                                                                    color: item.status ? '#cf1322' : '#389e0d',           // Chữ đậm
                                                                    border: `1px solid ${item.status ? '#ffa39e' : '#b7eb8f'}`,

                                                                    // Hiệu ứng mượt mà
                                                                    transition: 'all 0.3s ease',
                                                                    boxShadow: '0 2px 0 rgba(0,0,0,0.015)',
                                                                }}
                                                                // Thêm hiệu ứng hover nhẹ bằng cách inline (hoặc dùng class)
                                                                onMouseOver={(e) => {
                                                                    e.currentTarget.style.backgroundColor = item.status ? '#ffccc7' : '#d9f7be';
                                                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                                                }}
                                                                onMouseOut={(e) => {
                                                                    e.currentTarget.style.backgroundColor = item.status ? '#fff1f0' : '#f6ffed';
                                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                                    e.currentTarget.style.boxShadow = 'none';
                                                                }}
                                                            >
                                                                <FiRefreshCw
                                                                    style={{
                                                                        fontSize: '14px',
                                                                        // Tạo hiệu ứng xoay nhẹ cho icon
                                                                        transition: 'transform 0.5s ease'
                                                                    }}
                                                                    className={styles.rotateIcon}
                                                                />
                                                                <span style={{ whiteSpace: 'nowrap' }}>
                                                                    {item.status ? "Khóa lại" : "Kích hoạt"}
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </td>


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

                            <div className={styles.tableFooter}>
                                <span>Hiển thị <b>{filteredUsers.length}</b> kết quả</span>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </>
    );
}