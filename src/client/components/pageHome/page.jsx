import styles from "./home.module.css";
import { Link } from "react-router-dom";
import UiLoadingComponent from '../../../components/loadingComponent';
import useSWR from "swr";
import Banner from "../ui/banner/page";
import FlashSaleProduct from "../ui/sale/page";
import { formatPrice } from "../../../utils/formatPrice.JS";
const fetcher = (url) => fetch(url).then((res) => res.json());


export default function ProjectHome() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { data: dataProducts, isLoading } = useSWR(`${apiUrl}/api/product/view-product-phone?status=true`, fetcher);
    const { data: dataAccessory, isLoadingAccessory } = useSWR(`${apiUrl}/api/product/view-product-accessory?status=true`, fetcher);
    const { data: dataAdvertisement, isLoading: isLoadingNew } = useSWR(`${apiUrl}/api/product/view-advertisement`, fetcher);
    const { data: dataNews, isLoadingNews } = useSWR(`${apiUrl}/api/news/view`, fetcher);
    const { data: dataBranch, isLoadingBranch } = useSWR(`${apiUrl}/api/trademark/view?status=true`, fetcher);
    const { data: dataSale, isLoadingSale } = useSWR(`${apiUrl}/api/product/view-sale`, fetcher);
    if (isLoading || isLoadingAccessory || isLoadingNew || isLoadingNews || isLoadingBranch || isLoadingSale) return <UiLoadingComponent />

    const dataOurSolution = [
        { name: 'Viettel Post', img: 'src/assets/unnamed.png' },
        { name: 'J&T', img: 'src/assets/fff869acb13c6d17372da8ba1d7800c2_icon.png' },
        { name: 'GHN', img: 'src/assets/qz94eJDcTCdGJkQVsmdFBqCSpyvOZpLW_1720079830____eca1434e640fb3ad8ba86524bbe03c2c.jpg' },
        { name: 'MB Bank', img: 'src/assets/mbbank-logo-5.png' },
        { name: 'GHTK', img: 'src/assets/Om87xjP3QBHy94raCDKG8cIY3RRkrJZL_1749021703____7c0e1052051a711a12f9b1ffbb96a878.webp' },
    ];


    return (
        <>
            <Banner data={dataAdvertisement} />

            <div className={styles.container}>
                <FlashSaleProduct dataProducts={dataSale} />

                {
                    dataProducts.data.length > 0 &&
                    <section>
                        <h2 className={styles.sectionTitle}>Điện Thoại</h2>
                        <div className={styles.grid}>
                            {dataProducts?.data?.map((item) => (
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
                                            Đã bán {item.sold}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                }



                {
                    dataAccessory?.data.length > 0 &&
                    <section style={{ marginTop: 40 }}>
                        <h2 className={styles.sectionTitle}>Phụ Kiện</h2>

                        <div className={styles.grid}>
                            {dataAccessory?.data?.map((item) => (
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
                                            Đã bán {item.sold}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                }


                <section style={{ marginTop: 40 }}>
                    <h2 className={styles.sectionTitle}>Các thương hiệu </h2>
                    <div className={styles.gridBranch}>
                        {
                            dataBranch?.data?.map((item) => (
                                <Link to={`/trademark-product/${item._id}`} key={item._id} className={styles.logoBranch}>
                                    <img src={item.img.secure_url} alt={item.name} />
                                    <span>{item.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                </section>

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


                {/* <NewsSection data={dataNews} /> */}

                {/* <RecentlyViewed /> */}

            </div>
        </>


    );
}
