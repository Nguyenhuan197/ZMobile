

import Header from "../components/ui/header/page";
import Footer from "../components/ui/foooter/page";
import styles from "../../App.module.css";
import RecruitmentComponent from "../components/pageRecruitment/page";


export default function Recruitment() {
    return (
        <div className={styles.container}>
            <Header></Header>
            <RecruitmentComponent></RecruitmentComponent>
            <Footer></Footer>
        </div>
    )
}