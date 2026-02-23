

import styles from "../../App.module.css";
import UserComponent from "../components/pageUser/page";
import ContactQuickly from "../components/ui/contact/page";
import Footer from "../components/ui/foooter/page";
import Header from "../components/ui/header/page";



export default function User() {
    return (
        <div className={styles.container}>
            <Header />
            <UserComponent />
            <Footer />
            <ContactQuickly />
        </div>
    )
}