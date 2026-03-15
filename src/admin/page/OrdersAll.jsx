




import styles from "../../App.module.css";
import ListOrderAdminComponent from "../components/Project_Orders/PageListOrder/page";


export default function ListOrderAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <ListOrderAdminComponent />
            </div>
        </div>
    )
}