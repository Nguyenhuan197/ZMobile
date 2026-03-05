



import styles from "../../App.module.css";
import ListCategoryAdminComponent from "../components/Project_Category/PageList/page";



export default function CategoryAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <ListCategoryAdminComponent />
            </div>
        </div>
    )
}

// ListCategoryAdminComponent