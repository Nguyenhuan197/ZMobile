


import styles from "../../App.module.css";
import EmployeeListAdminComponent from "../components/Project_Recruitment/PageListWaitingTo_Apply/page";



export default function Recruitment_EmployeeListAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <EmployeeListAdminComponent />
            </div>
        </div>
    )
}

