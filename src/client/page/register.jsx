import styles from "../../App.module.css";
import RegisterComponent from "../components/auth/pageUser/register";
import Header from "../components/ui/header/page";


export default function Register() {
    return (
        <div className={styles.container}>
            <Header />
            <RegisterComponent />
        </div>
    )
}