import styles from "../../App.module.css";
import LoginComponent from "../components/auth/pageUser/login";
import ContactQuickly from "../components/ui/contact/page";
import Header from "../components/ui/header/page";


export default function Login() {
    return (
        <div className={styles.container}>
            <Header />
            <LoginComponent />
            {/* <ContactQuickly /> */}
        </div>
    )
}