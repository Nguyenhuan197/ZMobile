
import styles from "../../App.module.css";
import ProductSearchComponent from "../components/pageSearch/page";
import ContactQuickly from "../components/ui/contact/page";
import Footer from "../components/ui/foooter/page";
import Header from "../components/ui/header/page";


export default function Search() {
    return (
        <div className={styles.container}>
            <Header />
            <ProductSearchComponent />
            <Footer />
            <ContactQuickly />
        </div>
    )
}