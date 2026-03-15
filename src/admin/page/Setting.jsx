




import styles from "../../App.module.css";
import AdminProfileComponent from "../components/Project_System/PageSetting/page";


export default function SettingAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <AdminProfileComponent />
            </div>
        </div>
    )
}