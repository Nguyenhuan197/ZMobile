

import ProjectHome from "../components/pageHome/page";
import Header from "../components/ui/header/page";
import styles from "../../App.module.css";
import Footer from "../components/ui/foooter/page";
import ProjectCart from "../components/pageCart/page";


export default function PageCart() {
    return (
        <div className={styles.container}>
            <Header />
            <ProjectCart />
            <Footer></Footer>
        </div>
    )

}