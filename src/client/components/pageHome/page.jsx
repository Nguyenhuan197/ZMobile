import styles from "./home.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UiLoadingComponent from '../../../components/loadingComponent';
import { ThemeContext } from "../../../context/useThemeContext";
import useSWR from "swr";
import Banner from "../ui/banner/page";
import FlashSaleProduct from "../ui/sale/page";
import { formatPrice } from "../../../utils/formatPrice.JS";
const fetcher = (url) => fetch(url).then((res) => res.json());


export default function ProjectHome() {
    const HTTP = import.meta.env.VITE_API_URL;
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { USER } = useContext(ThemeContext);
    const { data: dataProducts, isLoading } = useSWR(`${apiUrl}/api/product/view-product-phone?status=true`, fetcher);
    const { data: dataAccessory, isLoadingAccessory } = useSWR(`${apiUrl}/api/product/view-product-accessory?status=true`, fetcher);
    const { data: dataAdvertisement, isLoading: isLoadingNew } = useSWR(`${apiUrl}/api/product/view-advertisement`, fetcher);
    const { data: dataNews, isLoadingNews } = useSWR(`${apiUrl}/api/news/view`, fetcher);
    const { data: dataBranch, isLoadingBranch } = useSWR(`${apiUrl}/api/trademark/view?status=true`, fetcher);
    const { data: dataSale, isLoadingSale } = useSWR(`${apiUrl}/api/product/view-sale`, fetcher);


    if (isLoading || isLoadingAccessory || isLoadingNew || isLoadingNews || isLoadingBranch || isLoadingSale) return <UiLoadingComponent />


    return (
        <>
            <Banner data={dataAdvertisement} />
            <FlashSaleProduct dataProducts={dataSale} />

            <div className={styles.container}>

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
                                            Đã bán {item.remainingQuantity}
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
                                            Đã bán {item.remainingQuantity}
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



                {/* <NewsSection data={dataNews} /> */}

                {/* <RecentlyViewed /> */}


            </div>
        </>


    );
}
