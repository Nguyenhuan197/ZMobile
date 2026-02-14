import ProjectAbout from "../components/pageAbout/page";
import Header from "../components/ui/header/page";
import Footer from "../components/ui/foooter/page";
import styles from "../../App.module.css";

export default function About() {
    return (
        <div className={styles.container}>
            <Header></Header>
            <ProjectAbout></ProjectAbout>
            <Footer></Footer>
        </div>
    )
}