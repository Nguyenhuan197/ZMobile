



import styles from "../../App.module.css";
import SerachAdminComponent from "../components/Project_Orders/SearchOrder/page";



export default function SearchOrderAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <SerachAdminComponent />
            </div>
        </div>
    )
}