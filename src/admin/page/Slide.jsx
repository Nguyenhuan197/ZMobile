
import styles from "../../App.module.css";
import PageSlideAdminComponent from "../components/Project_Product/PageSlide/page";



export default function PagecSlideAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <PageSlideAdminComponent />
            </div>
        </div>
    )
}