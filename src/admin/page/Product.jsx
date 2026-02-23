
import styles from "../../App.module.css";
import ProductAdminComponent from "../components/PageProducts/ProductAdmin";

export default function ProductAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <ProductAdminComponent />
            </div>
        </div>
    )
}