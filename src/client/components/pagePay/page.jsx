import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./pay.module.css";
import { formatPrice } from "../../../utils/formatPrice.JS";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/useThemeContext";
import UiLoadingComponent from "../../../components/loadingComponent";
import { UpdateSevices } from "../../../services/updateApi";
import { ShowToast, ToastType } from "../../../utils/toast";

export default function ProjectPay() {
    const apiUrl = import.meta.env.VITE_API_URL_BACKEND;
    const navigate = useNavigate();
    const qrSectionRef = useRef(null);
    const { USER, DataUser, isLoading_User } = useContext(ThemeContext);
    const [paymentMethod, setPaymentMethod] = useState("COD"); // Thống nhất dùng viết hoa
    const [cartItems, setCartItems] = useState([]);
    const [showQR, setShowQR] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        id_user: '',
        shippingInfo: {
            recipientName: "",
            phone: "",
            address: "",
            email: ""
        },
        cartItems: [],
        totalPrice: 0,
        paymentMethod: "COD"
    });

    useEffect(() => {
        if (!isLoading_User && !USER) navigate("/login");
    }, [USER, isLoading_User, navigate]);

    useEffect(() => {
        if (DataUser?.data) {
            setForm(prevForm => ({
                ...prevForm,
                id_user: DataUser.data._id,
                shippingInfo: {
                    recipientName: DataUser.data.name || "",
                    phone: DataUser.data.phone || "",
                    address: DataUser.data.deliveryAddress || "",
                    email: DataUser.data.email || "",
                }
            }));
        }
    }, [DataUser]);

    useEffect(() => {
        const raw = localStorage.getItem("data-pay-view");
        if (!raw) return;
        try {
            const data = JSON.parse(raw);
            setCartItems(Array.isArray(data) ? data : [data]);
        } catch (error) { console.error("Lỗi parse data:", error); }

        const getDataProduct = localStorage.getItem('data-pay');
        if (!getDataProduct) return;

        try {
            const parsedCart = JSON.parse(getDataProduct);
            const totalPrice = parsedCart.reduce((sum, item) => {
                return sum + (item.priceAtPurchase * item.quantity);
            }, 0);

            setForm(prevForm => ({
                ...prevForm,
                cartItems: parsedCart,
                totalPrice: totalPrice
            }));
        } catch (error) { console.error("Lỗi tính toán giỏ hàng:", error); }
    }, []);

    // Cập nhật paymentMethod vào form khi state paymentMethod thay đổi
    useEffect(() => {
        setForm(prev => ({ ...prev, paymentMethod: paymentMethod }));
    }, [paymentMethod]);

    const subTotal = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
    const shippingFee = cartItems.length > 0 ? 30000 : 0;
    const total = subTotal + shippingFee;

    // Sửa hàm handleChange để cập nhật đúng vào nested object shippingInfo
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["recipientName", "phone", "address", "email"].includes(name)) {
            setForm({
                ...form,
                shippingInfo: { ...form.shippingInfo, [name]: value }
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return alert("Giỏ hàng của bạn đang trống!");
        if (!form.shippingInfo.recipientName || !form.shippingInfo.phone || !form.shippingInfo.address) {
            return alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
        }

        if (paymentMethod === "BANK") { // Đồng bộ viết hoa
            setShowQR(true);
            setTimeout(() => {
                qrSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            setIsLoading(true);
            const result = await UpdateSevices(`${apiUrl}/api/order/add`, form, "POST");
            if (result.status) {
                ShowToast(result.mesage_vn || "Đặt hàng thành công", ToastType.success);
                finishOrder();
            } else {
                setIsLoading(false);
                ShowToast(result.mesage_vn || "Lỗi đặt hàng", ToastType.error);
            }
        }
    };

    const finishOrder = () => {
        localStorage.removeItem("data-pay");
        localStorage.removeItem("data-pay-view");
        navigate("/");
    };

    if (isLoading_User || isLoading) return <UiLoadingComponent />;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>📍 Thông tin giao hàng</h2>
                        <div className={styles.formGroup}>
                            <div className={`${styles.inputField} ${styles.fullWidth}`}>
                                <label>Họ và tên</label>
                                <input type="text" name="recipientName" value={form.shippingInfo.recipientName} onChange={handleChange} placeholder="Tên người nhận hàng" />
                            </div>
                            <div className={`${styles.inputField} ${styles.fullWidth}`}>
                                <label>Số điện thoại</label>
                                <input type="text" name="phone" value={form.shippingInfo.phone} onChange={handleChange} placeholder="Số điện thoại" />
                            </div>
                            <div className={`${styles.inputField} ${styles.fullWidth}`}>
                                <label>Email</label>
                                <input type="email" name="email" value={form.shippingInfo.email} onChange={handleChange} placeholder="Email" />
                            </div>
                            <div className={`${styles.inputField} ${styles.fullWidth}`}>
                                <label>Địa chỉ chi tiết</label>
                                <textarea rows="5" name="address" value={form.shippingInfo.address} onChange={handleChange} placeholder="Số nhà, tên đường..." />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>💳 Phương thức thanh toán</h2>
                        <div className={styles.paymentMethods}>
                            <div className={`${styles.method} ${paymentMethod === "COD" ? styles.activeMethod : ""}`}
                                onClick={() => { setPaymentMethod("COD"); setShowQR(false); }}>
                                <input type="radio" checked={paymentMethod === "COD"} readOnly />
                                <span>Thanh toán khi nhận hàng (COD)</span>
                            </div>

                            <div className={`${styles.method} ${paymentMethod === "BANK" ? styles.activeMethod : ""}`}
                                onClick={() => setPaymentMethod("BANK")}>
                                <input type="radio" checked={paymentMethod === "BANK"} readOnly />
                                <span>Chuyển khoản ngân hàng (VietQR)</span>
                            </div>
                        </div>
                    </div>

                    {showQR && (
                        <div className={styles.qrSection} ref={qrSectionRef}>
                            <div className={styles.qrBox}>
                                <p className={styles.bankName}>NGUYEN DINH HUAN</p>
                                <p className={styles.bankName}>STK 199928042005</p>
                                <img src={`https://img.vietqr.io/image/MB-199928042005-compact.jpg?amount=${total}&addInfo=THANHTOAN&accountName=NGUYEN DINH HUAN`} alt="QR" className={styles.qrImg} />
                                <div className={styles.qrDetail}>
                                    <p>Số tiền: <strong>{formatPrice(total)}</strong></p>
                                    <button onClick={finishOrder} className={styles.finishBtn}>TÔI ĐÃ CHUYỂN KHOẢN XONG</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.right}>
                    <div className={`${styles.section} ${styles.summaryBox}`}>
                        <h2 className={styles.sectionTitle}>🛒 Đơn hàng</h2>
                        <div className={styles.productList}>
                            {cartItems.map((item, idx) => (
                                <div key={idx} className={styles.productItem}>
                                    <img src={item.img} alt={item.name} className={styles.productImg} />
                                    <div className={styles.productInfo}>
                                        <p className={styles.productName}>{item.name}</p>
                                        <p className={styles.productPrice}>{formatPrice(item.price)} x {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.summaryDetail}>
                            <div className={styles.summaryRow}><span>Tổng tiền sản phẩm:</span><span>{formatPrice(subTotal)}</span></div>
                            <div className={styles.summaryRow}><span>Phí vận chuyển:</span><span>{formatPrice(shippingFee)}</span></div>
                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Tổng cộng:</span><span className={styles.totalPrice}>{formatPrice(total)}</span>
                            </div>
                        </div>
                        <button className={styles.checkoutBtn} onClick={handleCheckout}>
                            {paymentMethod === 'BANK' && !showQR ? 'TIẾP TỤC THANH TOÁN' : 'ĐẶT HÀNG NGAY'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}