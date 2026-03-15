
import styles from "../../App.module.css";
import ListRecruitmentAdminComponent from "../components/Project_Recruitment/PageListOf_Applicants/page";



export default function Recruitment_waitingListAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <ListRecruitmentAdminComponent />
            </div>
        </div>
    )
}
