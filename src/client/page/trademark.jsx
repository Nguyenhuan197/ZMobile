
import styles from "../../App.module.css";
import TrademarkProductComponent from "../components/pageTrademark/page";
import Footer from "../components/ui/foooter/page";
import Header from "../components/ui/header/page";


export default function Trademark() {
    return (
        <div className={styles.container}>
            <Header />
            <TrademarkProductComponent />
            <Footer />
        </div>
    )
}