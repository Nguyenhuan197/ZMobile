



import styles from "../../App.module.css";
import ProductSaleAdminComponent from "../components/Project_Product/PageSale/page";



export default function PageSaleAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <ProductSaleAdminComponent />
            </div>
        </div>
    )
}