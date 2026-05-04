import styles from "./home.module.css";
import { Link } from "react-router-dom";
import UiLoadingComponent from '../../../components/loadingComponent';
import useSWR from "swr";
import Banner from "../ui/banner/page";
import FlashSaleProduct from "../ui/sale/page";
const fetcher = (url) => fetch(url).then((res) => res.json());
import ViettelPost from "../../../assets/unnamed.png";
import JVT from "../../../assets/fff869acb13c6d17372da8ba1d7800c2_icon.png";
import GHN from "../../../assets/qz94eJDcTCdGJkQVsmdFBqCSpyvOZpLW_1720079830____eca1434e640fb3ad8ba86524bbe03c2c.jpg";
import GHTK from "../../../assets/Om87xjP3QBHy94raCDKG8cIY3RRkrJZL_1749021703____7c0e1052051a711a12f9b1ffbb96a878.webp";
import MB from "../../../assets/mbbank-logo-5.png";
import ListProduct from "./ListProduct";


export default function ProjectHome() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { data: dataProducts, isLoading } = useSWR(`${apiUrl}/api/product/view-product-phone?status=true`, fetcher);
    const { data: dataAccessory, isLoadingAccessory } = useSWR(`${apiUrl}/api/product/view-product-accessory?status=true`, fetcher);
    const { data: dataAdvertisement, isLoading: isLoadingNew } = useSWR(`${apiUrl}/api/product/view-advertisement`, fetcher);
    const { data: dataBranch, isLoadingBranch } = useSWR(`${apiUrl}/api/trademark/view?status=true`, fetcher);
    const { data: dataSale, isLoadingSale } = useSWR(`${apiUrl}/api/product/view-sale`, fetcher);
    if (isLoading || isLoadingAccessory || isLoadingNew || isLoadingBranch || isLoadingSale) return <UiLoadingComponent />

    const dataOurSolution = [
        { name: 'Viettel Post', img: ViettelPost },
        { name: 'J&T', img: JVT },
        { name: 'GHN', img: GHN },
        { name: 'MB Bank', img: MB },
        { name: 'GHTK', img: GHTK },
    ];

    return (
        <>
            <Banner data={dataAdvertisement} />
            <div className={styles.container}>
                <FlashSaleProduct dataProducts={dataSale} />
                <ListProduct data={dataProducts} dataCategory={"Điện thoại"} />
                <ListProduct data={dataAccessory} dataCategory={"Phụ kiện"} />

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