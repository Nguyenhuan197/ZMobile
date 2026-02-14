import styles from "./home.module.css";
import data from "../../../Data/data.json";
import { formatPrice } from "../../../utils/formatPrice.JS";


export default function ProjectHome() {
    const HTTP = import.meta.env.VITE_API_URL;

    return (
        <div className={styles.container}>

            {/* SMARTPHONE */}
            <section>
                <h2 className={styles.sectionTitle}>Điện Thoại</h2>

                <div className={styles.grid}>
                    {data.smartphones.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.imageBox}>
                                <img src={`${HTTP}${item.img}`} alt={item.name} />
                            </div>

                            <div className={styles.info}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.price}>
                                    {formatPrice(item.price)}
                                </p>
                                <p className={styles.sold}>
                                    Đã bán {item.sold}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className={styles.sectionTitle}>Phụ Kiện</h2>

                <div className={styles.grid}>
                    {data.accessories.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.imageBox}>
                                <img src={item.img} alt={item.name} />
                            </div>

                            <div className={styles.info}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.price}>
                                    {formatPrice(item.price)}
                                </p>
                                <p className={styles.sold}>
                                    Đã bán {item.sold}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className={styles.sectionTitle}>Các thương hiệu </h2>

                <div className={styles.gridBranch}>
                    <div className={styles.logoBranch}>
                        <img src={`${HTTP}/xiaomi (1).jpg`} alt={HTTP} />
                        <span>Xiaomi</span>
                    </div>

                    <div className={styles.logoBranch}>
                        <img src="http://localhost:5173/realme.jpg" alt="" />
                        <span>Realme</span>
                    </div>


                </div>
            </section>


        </div>
    );
}
