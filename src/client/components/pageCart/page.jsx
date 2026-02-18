import { useState } from "react";
import styles from "./cart.module.css";



export default function ProjectCart() {
    const [cart, setCart] = useState([
        {
            id: 1,
            name: "iPhone 15 Pro",
            price: 25990000,
            quantity: 1,
            img: "https://cdn.phuckhangmobile.com/image/iphone-15-pro-mau-titanium-1-29704j.jpg",
            checked: true
        },
        {
            id: 2,
            name: "AirPods Pro 2",
            price: 5500000,
            quantity: 2,
            img: "https://sonpixel.vn/wp-content/uploads/2025/01/redmi-note-13-9.webp",
            checked: true
        }
    ]);

    const updateQuantity = (id, type) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                if (type === "inc") item.quantity += 1;
                if (type === "dec" && item.quantity > 1) item.quantity -= 1;
            }
            return { ...item };
        }));
    };

    const toggleCheck = (id) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const total = cart
        .filter(item => item.checked)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.cartPage}>
            <div className={styles.container}>
                <h2>Giỏ Hàng</h2>

                <div className={styles.cartList}>
                    {cart.map(item => (
                        <div key={item.id} className={styles.cartItem}>

                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => toggleCheck(item.id)}
                            />

                            <img src={item.img} alt={item.name} />

                            <div className={styles.info}>
                                <p>{item.name}</p>
                                <span>Giá bán {item.price.toLocaleString()}đ</span>
                            </div>

                            <div className={styles.quantity}>
                                <button onClick={() => updateQuantity(item.id, "dec")}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
                            </div>

                            <div className={styles.subtotal}>
                                Tổng tiền {(item.price * item.quantity).toLocaleString()}đ
                            </div>

                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className={styles.summary}>
                    <h3>Tổng thanh toán: {total.toLocaleString()}đ</h3>
                    <button>Thanh Toán Đơn Hàng</button>
                </div>

            </div>
        </div>
    );
}
