


import styles from "../../App.module.css";
import ListUsersAdminComponent from "../components/Project_Users/ListUsers/page";


export default function ListUserAdmin() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <ListUsersAdminComponent />
            </div>
        </div>
    )
}