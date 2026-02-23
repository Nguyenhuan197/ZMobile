import styles from "./home.module.css";
import { Link } from "react-router-dom";
import RecentlyViewed from "../ui/recentlyViewed/page";
import ServicePolicy from "../ui/servicePolicy/page";
import NewsSection from "../ui/new/page";
import { useContext } from "react";
import { ThemeContext } from "../../../context/useThemeContext";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());


export default function ProjectHome() {
    const HTTP = import.meta.env.VITE_API_URL;
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const { data, error, isLoading } = useSWR(
        USER?._id ? `${apiUrl}/api/product/view?status=true` : null,
        fetcher
    );

    // Hàm định dạng tiền tệ VNĐ
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className={styles.container}>
            <section>
                <h2 className={styles.sectionTitle}>Điện Thoại New 99%</h2>

                <div className={styles.grid}>
                    {data?.data?.map((item) => (
                        <Link
                            to={`/product/${item._id}`}
                            key={item._id}
                            className={styles.card}
                        >
                            <div className={styles.imageBox}>
                                <img src={`${item.img.secure_url}`} alt={item.img.secure_url} />
                            </div>

                            <div className={styles.info}>
                                <p className={styles.name}>{item.name}</p>
                                <p className={styles.price}>
                                    {formatPrice(item.price)}
                                </p>

                                <p className={styles.sold}>
                                    Đã bán 99
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>


            <section>
                {/* <h2 className={styles.sectionTitle}>Phụ Kiện</h2> */}

                <div className={styles.grid}>
                    {/* {data.accessories.map((item) => (
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
                    ))} */}
                </div>
            </section>

            <ServicePolicy />

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

            <NewsSection />

            <RecentlyViewed />
        </div>
    );
}
