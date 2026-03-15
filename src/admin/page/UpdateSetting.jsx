

import styles from "../../App.module.css";
import AdminUpdateComponent from "../components/Project_System/PageUpdateSertting/page";


export default function UpdateSettingAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <AdminUpdateComponent />
            </div>
        </div>
    )
}