
import ProjectDetail from "../components/pageProjectDetail/page";
import Header from "../components/ui/header/page";
import styles from "../../App.module.css";
import Footer from "../components/ui/foooter/page";


export default function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <ProjectDetail />
            <Footer></Footer>
        </div>
    )

}