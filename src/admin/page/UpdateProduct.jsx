

import styles from "../../App.module.css";
import UpdateProductAdminComponent from "../components/Project_Product/PageUpdateProduct/page";


export default function UpdateProductAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <UpdateProductAdminComponent />
            </div>
        </div>
    )
}