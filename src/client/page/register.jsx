import styles from "../../App.module.css";
import RegisterComponent from "../components/auth/pageUser/register";
import ContactQuickly from "../components/ui/contact/page";
import Header from "../components/ui/header/page";


export default function Register() {
    return (
        <div className={styles.container}>
            <Header />
            <RegisterComponent />
            {/* <ContactQuickly /> */}
        </div>
    )
}