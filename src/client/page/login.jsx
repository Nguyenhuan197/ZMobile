import { ToastContainer } from "react-toastify";
import styles from "../../App.module.css";
import LoginComponent from "../components/auth/pageUser/login";
import Header from "../components/ui/header/page";



export default function Login() {
    return (
        <div className={styles.container}>
            <Header />
            <LoginComponent />
            <ToastContainer
                position="top-left"
                autoClose={3000}
                style={{ top: '120px', marginRight: "10px" }}
            />
        </div>
    )
}