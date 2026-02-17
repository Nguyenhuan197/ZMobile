

import Header from "../components/ui/header/page";
import styles from "../../App.module.css";
import Footer from "../components/ui/foooter/page";
import ContactQuickly from "../components/ui/contact/page";
import ProjectPay from "../components/pagePay/page";


export default function Pay() {
    return (
        <div className={styles.container}>
            <div className={styles.starBackground}></div>
            <Header />
            <ProjectPay />
            <Footer />
            <ContactQuickly />
        </div>
    )

}