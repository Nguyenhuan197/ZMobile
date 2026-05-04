import styles from "./home.module.css";
import { Link } from "react-router-dom";
import UiLoadingComponent from '../../../components/loadingComponent';
import useSWR from "swr";
import Banner from "../ui/banner/page";
import FlashSaleProduct from "../ui/sale/page";
const fetcher = (url) => fetch(url).then((res) => res.json());
import ListProduct from "./ListProduct";
import OurPartnersComponent from "./OurPartners";


export default function ProjectHome() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const { data: dataProducts, isLoading } = useSWR(`${apiUrl}/api/product/view-product-phone?status=true`, fetcher);
    const { data: dataAccessory, isLoadingAccessory } = useSWR(`${apiUrl}/api/product/view-product-accessory?status=true`, fetcher);
    const { data: dataAdvertisement, isLoading: isLoadingNew } = useSWR(`${apiUrl}/api/product/view-advertisement`, fetcher);
    const { data: dataBranch, isLoadingBranch } = useSWR(`${apiUrl}/api/trademark/view?status=true`, fetcher);
    const { data: dataSale, isLoadingSale } = useSWR(`${apiUrl}/api/product/view-sale`, fetcher);
    if (isLoading || isLoadingAccessory || isLoadingNew || isLoadingBranch || isLoadingSale) return <UiLoadingComponent />


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



                {/* <OurPartnersComponent /> */}


                {/* <NewsSection data={dataNews} /> */}

                {/* <RecentlyViewed /> */}

            </div>
        </>


    );
}