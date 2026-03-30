


import styles from "../../App.module.css";
import ContactSupportComponent from "../components/Project_Users/ContactSupport/page";


export default function ContactSupport() {
    return (
        <div className={styles.container}>
            <div className={styles.adminContainer}>
                <ContactSupportComponent />
            </div>
        </div>
    )
}