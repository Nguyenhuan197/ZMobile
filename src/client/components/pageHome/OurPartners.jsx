

import styles from "./home.module.css";
import { Link } from "react-router-dom";
import ViettelPost from "../../../assets/unnamed.png";
import JVT from "../../../assets/fff869acb13c6d17372da8ba1d7800c2_icon.png";
import GHN from "../../../assets/qz94eJDcTCdGJkQVsmdFBqCSpyvOZpLW_1720079830____eca1434e640fb3ad8ba86524bbe03c2c.jpg";
import GHTK from "../../../assets/Om87xjP3QBHy94raCDKG8cIY3RRkrJZL_1749021703____7c0e1052051a711a12f9b1ffbb96a878.webp";
import MB from "../../../assets/mbbank-logo-5.png";

const dataOurSolution = [
    { name: 'Viettel Post', img: ViettelPost },
    { name: 'J&T', img: JVT },
    { name: 'GHN', img: GHN },
    { name: 'MB Bank', img: MB },
    { name: 'GHTK', img: GHTK },
];

export default function OurPartnersComponent() {
    return (
        <section style={{ marginTop: 40 }}>
            <h2 className={styles.sectionTitle}>Đối tác của chúng tôi</h2>
            <div className={styles.gridBranch}>
                {
                    dataOurSolution.map((item, key) => (
                        <div key={key} className={styles.logoOurSolution}>
                            <img src={item.img} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}