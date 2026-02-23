import AdminHeader from "../ui/headerAd/AdminHeader";
import AdminMenu from "../ui/menuAd/AdminMenu";
import styles from "./ProductAdmin.module.css";

export default function ProductAdminComponent() {
    return (
        <>
            <AdminHeader />
            <div style={{ display: 'flex', width: '100%' }}>
                <AdminMenu />

                <main className={styles.mainContent}>
                    <h1>Trang Chính Sản Phẩm Admin</h1>
                    <p>Nội dung quản lý sản phẩm sẽ hiển thị tại đây...</p>
                </main>

            </div>
        </>
    );
}