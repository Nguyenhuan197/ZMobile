import { useContext, useEffect, useState } from "react";
import styles from "./cart.module.css";
import { ThemeContext } from "../../../context/useThemeContext";
import { useNavigate } from "react-router-dom";


export default function ProjectCart() {
    const navigate = useNavigate();
    const { loadingCart, removeFromCart } = useContext(ThemeContext);
    const [cart, setCart] = useState(() => {
        const data = loadingCart();
        if (data && data.status) {
            return data.data.map(item => ({
                ...item,
                checked: true
            }));
        }
        return [];
    });


    // 🔥 Đồng bộ lại localStorage khi thay đổi số lượng
    useEffect(() => {
        const pureCart = cart.map(({ checked, ...rest }) => rest);
        localStorage.setItem("data-cart", JSON.stringify(pureCart));
    }, [cart]);

    // 🔹 Tăng giảm số lượng
    const updateQuantity = (id, type) => {
        setCart(prev =>
            prev.map(item => {
                if (item.id === id) {
                    if (type === "inc")
                        return { ...item, quantity: item.quantity + 1 };

                    if (type === "dec" && item.quantity > 1)
                        return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
        );
    };

    // 🔹 Check sản phẩm
    const toggleCheck = (id) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    // 🔹 Xoá sản phẩm (gọi từ context)
    const handleRemove = (id) => {
        removeFromCart(id);
        setCart(prev => prev.filter(item => item.id !== id));
    };


    // thanh toán sản phẩm
    const handleCheckoutCart = () => {
        const selectedItems = cart
            .filter(item => item.checked)
            .map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                img: item.activeImg
            }));

        if (selectedItems.length === 0) {
            alert("Vui lòng chọn sản phẩm để thanh toán");
            return;
        }


        // data add new Pay
        const dataPay = cart
            .filter(item => item.checked)
            .map(item => ({
                id_product: item.id,
                priceAtPurchase: item.price,
                quantity: item.quantity,
                variant: item.name
            }));

        localStorage.setItem("data-pay", JSON.stringify(dataPay));
        localStorage.setItem("data-pay-view", JSON.stringify(selectedItems));
        navigate("/pay");
    };


    const total = cart
        .filter(item => item.checked)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.cartPage}>
            <div className={styles.container}>
                <h2>Giỏ Hàng ({cart.length})</h2>

                <div className={styles.cartList}>
                    {cart.map(item => (
                        <div key={item.id} className={styles.cartItem}>

                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => toggleCheck(item.id)}
                            />

                            <img src={item.activeImg} alt={item.name} />

                            <div className={styles.info}>
                                <p>{item.name}</p>
                                <span>
                                    Giá bán {item.price.toLocaleString()}đ
                                </span>
                            </div>



                            <div className={styles.quantity}>
                                <button onClick={() => updateQuantity(item.id, "dec")}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
                            </div>

                            <div className={styles.subtotal}>
                                {(item.price * item.quantity).toLocaleString()}đ
                            </div>


                            <div
                                className={styles.delete}
                                onClick={() => handleRemove(item.id)}
                            >
                                Delete
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <h3>Tổng thanh toán: {total.toLocaleString()}đ</h3>
                    <button onClick={handleCheckoutCart}>Thanh Toán Đơn Hàng</button>
                </div>

            </div>
        </div>
    );
}