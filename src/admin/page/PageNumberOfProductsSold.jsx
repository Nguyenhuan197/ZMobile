

import styles from "../../App.module.css";
import PageNumberOfProductsSold from "../components/Project_Product/PageNumberOfProductsSold/page";

export default function NumberOfProductsSold() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <PageNumberOfProductsSold />
            </div>
        </div>
    )
}