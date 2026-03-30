
import styles from "../../App.module.css";
import UpdateCategoryAdminComponent from "../components/Project_Category/PageUpdate/page";



export default function UpdateCategoryAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <UpdateCategoryAdminComponent />
            </div>
        </div>
    )
}

// ListCategoryAdminComponent