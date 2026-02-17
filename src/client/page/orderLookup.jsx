import ProjectHome from "../components/pageHome/page";
import Header from "../components/ui/header/page";
import styles from "../../App.module.css";
import Footer from "../components/ui/foooter/page";
import ContactQuickly from "../components/ui/contact/page";
import ProjectOrderLookup from "../components/pageOrderLookup/page";


export default function OrderLookup() {
    return (
        <div className={styles.container}>
            <div className={styles.starBackground}></div>
            <Header />
            <ProjectOrderLookup />
            <Footer />
            <ContactQuickly />
        </div>
    )

}