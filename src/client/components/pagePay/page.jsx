import React, { useEffect, useState } from 'react';
import styles from './pay.module.css';
import { formatPrice } from '../../../utils/formatPrice.JS';

export default function ProjectPay() {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [cartItems, setCartItems] = useState([]);

    // 🔥 Load dữ liệu từ localStorage
    useEffect(() => {
        const raw = localStorage.getItem("data-pay");

        if (!raw) return;

        try {
            const data = JSON.parse(raw);
            setCartItems([
                {
                    id: Date.now(),
                    name: data.name,
                    price: Number(data.price),
                    quantity: Number(data.quantity),
                    img: data.activeImg
                }
            ]);
        } catch (error) {
            console.error("Lỗi parse localStorage:", error);
        }
    }, []);

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const shippingFee = cartItems.length > 0 ? 30000 : 0;
    const total = subTotal + shippingFee;

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Không có sản phẩm để thanh toán!");
            return;
        }

        alert("Đặt hàng thành công 🎉");
        localStorage.removeItem("data-pay");
        setCartItems([]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>

                {/* LEFT */}
                <div className={styles.left}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>📍 Thông tin giao hàng</h2>

                        <div className={styles.formGroup}>
                            <div className={`${styles.inputField} ${styles.fullWidth}`}>
                                <label>Họ và tên</label>
                                <input type="text" placeholder="Nhập tên người nhận" />
                            </div>

                            <div className={styles.inputField}>
                                <label>Số điện thoại</label>
                                <input type="text" placeholder="Số điện thoại" />
                            </div>

                            <div className={styles.inputField}>
                                <label>Email</label>
                                <input type="email" placeholder="Địa chỉ email (không bắt buộc)" />
                            </div>

                            <div className={`${styles.inputField} ${styles.fullWidth}`}>
                                <label>Địa chỉ cụ thể</label>
                                <textarea
                                    rows="4"
                                    placeholder="Số nhà, tên đường, phường/xã..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>💳 Phương thức thanh toán</h2>

                        <div className={styles.paymentMethods}>
                            <div
                                className={`${styles.method} ${paymentMethod === 'cod' ? styles.activeMethod : ''}`}
                                onClick={() => setPaymentMethod('cod')}
                            >
                                <input type="radio" checked={paymentMethod === 'cod'} readOnly />
                                <span>Thanh toán khi nhận hàng (COD)</span>
                            </div>

                            <div
                                className={`${styles.method} ${paymentMethod === 'bank' ? styles.activeMethod : ''}`}
                                onClick={() => setPaymentMethod('bank')}
                            >
                                <input type="radio" checked={paymentMethod === 'bank'} readOnly />
                                <span>Chuyển khoản ngân hàng (QR Code)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className={styles.right}>
                    <div className={`${styles.section} ${styles.summaryBox}`}>
                        <h2 className={styles.sectionTitle}>🛒 Đơn hàng của bạn</h2>

                        <div className={styles.productList}>
                            {cartItems.length === 0 ? (
                                <p>Không có sản phẩm nào.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className={styles.productItem}>
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className={styles.productImg}
                                        />
                                        <div className={styles.productInfo}>
                                            <p className={styles.productName}>{item.name}</p>
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