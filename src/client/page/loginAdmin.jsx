import styles from "../../App.module.css";
import AdminLoginComponent from "../components/auth/pageUser/loginAdmin";


export default function LoginAdmin() {
    return (
        <div className={styles.container}>
            <AdminLoginComponent />
        </div>
    )
}