import styles from "./home.module.css";
import data from "../../../Data/data.json";
import { formatPrice } from "../../../utils/formatPrice.JS";
import { Link } from "react-router-dom";
import RecentlyViewed from "../ui/recentlyViewed/page";


export default function ProjectHome() {
    const HTTP = import.meta.env.VITE_API_URL;

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.sectionTitle}>Điện Thoại New 99%</h2>

                <div className={styles.grid}>
                    {data.smartphones.map((item) => (
                        <Link
                            to={`/product/${item.id}`}
                            key={item.id}
                            className={styles.card}
                        >
                            <div className={styles.imageBox}>
                                <img src={`${HTTP}/${item.img}`} alt={item.name} />
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
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className={styles.sectionTitle}>Phụ Kiện</h2>

                <div className={styles.grid}>
                    {data.accessories.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.imageBox}>
                                <img src={`${HTTP}/${item.img}`} alt={item.name} />
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
                        <img src={`${HTTP}/xiaomi (1).jpg`} alt={`${HTTP}/xiaomi (1).jpg`} />
                        <span>Xiaomi</span>
                    </div>

                    <div className={styles.logoBranch}>
                        <img src={`${HTTP}/realme.jpg`} alt={`${HTTP}/realme.jpg`} />
                        <span>Realme</span>
                    </div>

                    <div className={styles.logoBranch}>
                        <img src={`${HTTP}/oppo.jpg`} alt={`${HTTP}/oppo.jpg`} />
                        <span>Oppo</span>
                    </div>

                    <div className={styles.logoBranch}>
                        <img src={`${HTTP}/vivo.jpg`} alt={`${HTTP}/vivo.jpg`} />
                        <span>Vivo</span>
                    </div>
                </div>
            </section>

            <RecentlyViewed />
        </div>
    );
}
