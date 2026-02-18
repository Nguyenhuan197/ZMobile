import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import styles from "./header.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


export default function Header() {
    const [open, setOpen] = useState(false);
    const cartCount = 3;

    return (
        <header className={styles.header}>
            <div className={styles.container}>

                {/* Logo */}
                <Link to="/" className={styles.logo}>
                    Z Mobile
                </Link>

                <div className={styles.rightSection}>

                    {/* Menu */}
                    <nav className={`${styles.nav} ${open ? styles.show : ""}`}>

                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Trang chủ
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Về chúng tôi
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Liên hệ
                        </NavLink>


                        <NavLink
                            to="/orderLookup"
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Tra cứu đơn hàng
                        </NavLink>

                    </nav>

                    <Link to="/search" className={styles.cart}>
                        <HiOutlineMagnifyingGlass size={27} />
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className={styles.cart}>
                        <FiShoppingCart size={27} />
                        {cartCount > 0 && (
                            <span className={styles.badge}>
                                {cartCount}
                            </span>
                        )}
                    </Link>


                    {/* Hamburger */}
                    <div
                        className={styles.menuIcon}
                        onClick={() => setOpen(!open)}
                    >
                        <HiOutlineMenu size={26} />
                    </div>

                </div>
            </div>
        </header>
    );
}
