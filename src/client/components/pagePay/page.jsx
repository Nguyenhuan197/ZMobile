import React, { useContext, useEffect, useState } from "react";
import styles from "./pay.module.css";
import { formatPrice } from "../../../utils/formatPrice.JS";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/useThemeContext";
import UiLoadingComponent from "../../../components/loadingComponent";

export default function ProjectPay() {
    const navigate = useNavigate();
    const { USER, DataUser, isLoading_User } = useContext(ThemeContext);

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [cartItems, setCartItems] = useState([]);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    /* =============================
       REDIRECT IF NOT LOGIN
    ============================== */
    useEffect(() => {
        if (!isLoading_User && !USER) {
            navigate("/login");
        }
    }, [USER, isLoading_User, navigate]);

    /* =============================
       LOAD USER INFO INTO FORM
    ============================== */
    useEffect(() => {
        if (DataUser?.data) {
            setForm({
                name: DataUser.data.name || "",
                phone: DataUser.data.phone || "",
                email: DataUser.data.email || "",
                address: DataUser.data.deliveryAddress || ""
            });
        }
    }, [DataUser]);

    /* =============================
       LOAD PAYMENT DATA
    ============================== */
    useEffect(() => {
        const raw = localStorage.getItem("data-pay");
        if (!raw) return;

        try {
            const data = JSON.parse(raw);
            setCartItems(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("Parse error:", error);
        }
    }, []);

    /* =============================
       CALCULATE TOTAL
    ============================== */
    const subTotal = cartItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
    );

    const shippingFee = cartItems.length > 0 ? 30000 : 0;
    const total = subTotal + shippingFee;

    /* =============================
       HANDLE FORM CHANGE
    ============================== */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /* =============================
       VALIDATE
    ============================== */
    const validateForm = () => {
        if (!form.name.trim()) return "Vui lòng nhập họ tên";
        if (!form.phone.trim()) return "Vui lòng nhập số điện thoại";
        if (!form.address.trim()) return "Vui lòng nhập địa chỉ";
        return null;
    };

    /* =============================
       HANDLE CHECKOUT
    ============================== */
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Không có sản phẩm để thanh toán!");
            return;
        }

        const error = validateForm();
        if (error) {
            alert(error);
            return;
        }

        alert("Đặt hàng thành công 🎉");

        localStorage.removeItem("data-pay");
        navigate("/");
    };

    /* =============================
       LOADING STATE
    ============================== */
    if (isLoading_User) return <UiLoadingComponent />;

    /* =============================
       JSX RENDER
    ============================== */
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>

                {/* LEFT */}
                <div className={styles.left}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            📍 Thông tin giao hàng
                        </h2>

                        <div className={styles.formGroup}>
                            <div className={`${styles.inputField} ${styles.fullWidth}`}>
                                <label>Họ và tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.inputField}>
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.inputField}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={`${styles.inputField} ${styles.fullWidth}`}>
                                <label>Địa chỉ cụ thể</label>
                                <textarea
                                    rows="4"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>
                            💳 Phương thức thanh toán
                        </h2>

                        <div className={styles.paymentMethods}>
                            {["cod", "bank"].map(method => (
                                <div
                                    key={method}
                                    className={`${styles.method} ${paymentMethod === method ? styles.activeMethod : ""
                                        }`}
                                    onClick={() => setPaymentMethod(method)}
                                >
                                    <input
                                        type="radio"
                                        checked={paymentMethod === method}
                                        readOnly
                                    />
                                    <span>
                                        {method === "cod"
                                            ? "Thanh toán khi nhận hàng (COD)"
                                            : "Chuyển khoản ngân hàng (QR Code)"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className={styles.right}>
                    <div className={`${styles.section} ${styles.summaryBox}`}>
                        <h2 className={styles.sectionTitle}>
                            🛒 Đơn hàng của bạn
                        </h2>

                        <div className={styles.productList}>
                            {cartItems.length === 0 ? (
                                <p>Không có sản phẩm nào.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div
                                        key={item.id}
                                        className={styles.productItem}
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className={styles.productImg}
                                        />
                                        <div className={styles.productInfo}>
                                            <p className={styles.productName}>
                                                {item.name}
                                            </p>
                                            <p className={styles.productPrice}>
                                                {formatPrice(item.price)} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className={styles.summaryDetail}>
                            <div className={styles.summaryRow}>
                                <span>Tạm tính:</span>
                                <span>{formatPrice(subTotal)}</span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span>Phí vận chuyển:</span>
                                <span>{formatPrice(shippingFee)}</span>
                            </div>

                            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                                <span>Tổng cộng:</span>
                                <span className={styles.totalPrice}>
                                    {formatPrice(total)}
                                </span>
                            </div>
                        </div>

                        <button
                            className={styles.checkoutBtn}
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                        >
                            ĐẶT HÀNG NGAY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}