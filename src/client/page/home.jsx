import ProjectHome from "../components/pageHome/page";
import Header from "../components/ui/header/page";
import styles from "../../App.module.css";
import Footer from "../components/ui/foooter/page";



export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.starBackground}></div>
            <Header />
            <ProjectHome />
            <Footer />
        </div>
    )

}