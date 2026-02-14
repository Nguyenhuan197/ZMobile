import styles from "./home.module.css";
import data from "../../../Data/data.json";

const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + "đ";
};

export default function ProjectHome() {
    return (
        <div className={styles.container}>

            {/* SMARTPHONE */}
            <section>
                <h2 className={styles.sectionTitle}>Điện Thoại</h2>

                <div className={styles.grid}>
                    {data.smartphones.map((item) => (
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

            {/* ACCESSORIES */}
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
        </div>
    );
}
