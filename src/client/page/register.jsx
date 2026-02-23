import styles from "../../App.module.css";
import RegisterComponent from "../components/auth/pageUser/register";
import Header from "../components/ui/header/page";
import { ToastContainer } from 'react-toastify'


export default function Register() {
    return (
        <div className={styles.container}>
            <Header />
            <RegisterComponent />
            <ToastContainer
                position="top-left"
                autoClose={3000}
                style={{ top: '120px', marginRight: "10px" }}
            />
        </div>
    )
}