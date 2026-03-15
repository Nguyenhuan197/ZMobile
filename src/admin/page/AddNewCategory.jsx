




import styles from "../../App.module.css";
import AddCategoryAdminComponent from "../components/Project_Category/PageAddNew/page";


export default function AddNewCategoryAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <AddCategoryAdminComponent />
            </div>
        </div>
    )
}