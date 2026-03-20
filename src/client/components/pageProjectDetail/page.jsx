import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./productDetail.module.css";
import useSWR from "swr";
import UiLoadingComponent from "../../../components/loadingComponent";
import { formatPrice } from "../../../utils/formatPrice.JS";
import { ThemeContext } from "../../../context/useThemeContext";
import { ShowToast, ToastType } from "../../../utils/toast";
import { Helmet } from "react-helmet-async";
const fetcher = (url) => fetch(url).then((res) => res.json());
import iconShare from "../../../assets/s1.png";
import iconFB from "../../../assets/FBS.webp";



export default function ProductDetail() {
    const navigate = useNavigate();
    const { handlePay, handleAddToCart, USER } = useContext(ThemeContext);
    const { id } = useParams();
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState("");
    const { data: response, error, isLoading } = useSWR(id ? `${apiUrl}/api/product/viewDetail/${id}` : null, fetcher);


    const product = response?.data;
    const similarProducts = response?.similarProducts || [];

    useEffect(() => {
        if (product?.img?.secure_url) {
            setActiveImg(product.img.secure_url);
        }
    }, [product]);



    const shareProduct = (platform) => {
        const productUrl = window.location.href;
        const title = encodeURIComponent(product?.name || "Sản phẩm cực hot tại Z Mobile!");
        const description = encodeURIComponent(product?.describe?.substring(0, 100) || "");

        let shareUrl = "";

        if (platform === "facebook") {
            // Facebook chủ yếu dựa vào link, thẻ meta sẽ quyết định ảnh
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        } else if (platform === "zalo") {
            // Zalo hỗ trợ truyền thêm tiêu đề và mô tả trong một số trường hợp
            shareUrl = `https://sp.zalo.me/share_inline?url=${encodeURIComponent(productUrl)}&title=${title}&description=${description}`;
        }

        window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
    };



    if (isLoading) return <UiLoadingComponent />;
    if (error) return <div>Có lỗi xảy ra...</div>;
    if (!product) return null;

    const increase = () => setQuantity((prev) => prev + 1);
    const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));


    const addToCart = (name, price, quantity, activeImg, id) => {
        if (!USER) {
            ShowToast('Đăng nhập để tiếp tục mua hàng', ToastType.info);
            return navigate('/login');
        }

        handleAddToCart(name, price, quantity, activeImg, id);
    };


    const handleBuyNow = (name, price, quantity, activeImg, id) => {
        if (!USER) {
            ShowToast('Đăng nhập để tiếp tục mua hàng', ToastType.info);
            return navigate('/login');
        }
        handlePay(name, price, quantity, activeImg, id);
    };


    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Đã sao chép liên kết sản phẩm!");
    }


    return (
        <div className={styles.container}>
            {/* Thêm đoạn Helmet này vào đầu */}

            <Helmet>
                <title>{product.name} | Z Mobile</title>
                <meta name="description" content={product.describe?.substring(0, 150)} />

                {/* Facebook & Zalo (Open Graph) */}
                <meta property="og:type" content="product" />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.describe?.substring(0, 150)} />
                <meta property="og:image" content={product.img?.secure_url} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Zalo Specific */}
                <meta property="zalo:title" content={product.name} />
                <meta property="zalo:description" content={product.describe?.substring(0, 150)} />
                <meta property="zalo:image" content={product.img?.secure_url} />

                {/* Script báo hiệu cho Prerender.io - Đã sửa lỗi cú pháp */}
                <script type="text/javascript">
                    {`
            window.prerenderReady = false;
            if (${!!product}) {
                window.prerenderReady = true;
            }
        `}
                </script>
            </Helmet>




            <div className={styles.wrapper}>
                {/* LEFT */}

                <div className={styles.left}>
                    <div className={styles.mainImageBox}>
                        <img
                            src={activeImg}
                            alt={product.name}
                            className={styles.mainImg}
                        />
                    </div>

                    <div className={styles.thumbList}>
                        {product.imgDetail?.map((imgObj, index) => (
                            <img
                                key={index}
                                src={imgObj.secure_url}
                                alt={`thumb-${index}`}
                                onClick={() => setActiveImg(imgObj.secure_url)}
                                className={`${styles.thumb} ${activeImg === imgObj.secure_url ? styles.active : ""
                                    }`}
                            />
                        ))}
                    </div>

                    <div
                        style={{
                            width: 'auto', display: 'flex', alignItems: 'center', gap: '5px',
                            marginTop: '12px'
                        }}>
                        <p style={{ margin: 0, fontSize: '18px' }}>Chia sẻ với </p>

                        <div onClick={() => shareProduct('facebook')} className={styles.share}>
                            <img src={iconFB} alt="" />
                        </div>

                        <div onClick={() => copyToClipboard()} className={styles.share}>
                            <img src={iconShare} alt="" />
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className={styles.right}>


                    <p className={styles.brandName}>
                        Thương hiệu {product.id_Trademark?.name}
                    </p>

                    <h1 className={styles.title}>{product.name}</h1>

                    <div className={styles.priceBox}>
                        <span className={styles.price}>
                            {formatPrice(product.price - product.priceSale)}
                        </span>
                    </div>

                    <p className={styles.stock}>
                        Đã bán : <strong>{product.remainingQuantity}</strong>
                    </p>






                    <div className={styles.quantityBox}>
                        <span>Số lượng:</span>
                        <div className={styles.quantityControl}>
                            <button onClick={decrease}>-</button>
                            <input type="text" value={quantity} readOnly />
                            <button onClick={increase}>+</button>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            className={styles.addToCart}
                            onClick={() => addToCart(
                                product.name,
                                product.price,
                                quantity,
                                activeImg,
                                id
                            )}
                        >
                            🛒 Thêm vào giỏ hàng
                        </button>
                        <button
                            className={styles.buyNow}
                            onClick={() => handleBuyNow(
                                product.name,
                                product.price,
                                quantity,
                                activeImg,
                                id
                            )}
                        >
                            Mua ngay
                        </button>
                    </div>

                    <div className={styles.descBox}>
                        <h3>Mô tả sản phẩm</h3>
                        <p>{product.describe}</p>
                    </div>
                </div>


            </div>


            {similarProducts.length > 0 && (
                <div className={styles.relatedSection}>
                    <h2 className={styles.relatedTitle}>
                        Sản phẩm liên quan
                    </h2>

                    <div className={styles.relatedGrid}>
                        {similarProducts.map((item) => (
                            <div
                                key={item._id}
                                className={styles.relatedCard}
                                onClick={() => navigate(`/product/${item._id}`)}
                            >
                                <img
                                    src={item.img?.secure_url}
                                    alt={item.name}
                                    className={styles.relatedImg}
                                />
                                <p className={styles.relatedName}>
                                    {item.name}
                                </p>
                                <span className={styles.relatedPrice}>
                                    {formatPrice(item.price)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}