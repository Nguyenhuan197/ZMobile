


import styles from "../../App.module.css";
import AddNewProductAdminComponent from "../components/Project_Product/PageAddNew/page";


export default function AddNewProductAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <AddNewProductAdminComponent />
            </div>
        </div>
    )
}