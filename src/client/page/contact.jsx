import ProjectContact from "../components/pageContact/page";
import Header from "../components/ui/header/page";
import styles from "../../App.module.css";

export default function Contact() {
    return (
        <div className={styles.container}>
            <Header />
            <ProjectContact />
        </div>
    )
}