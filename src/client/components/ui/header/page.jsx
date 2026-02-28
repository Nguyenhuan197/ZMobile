import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import styles from "./header.module.css";
import { ThemeContext } from "../../../../context/useThemeContext";


export default function Header() {
    const [open, setOpen] = useState(false);
    const [cartCount, setCountCart] = useState(0);
    const { USER,
        DataAdmin, isLoading_Admin,
        loadingCart
    } = useContext(ThemeContext);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);


    useEffect(() => {
        const loadding = () => {
            const data = loadingCart();
            setCountCart(data.count);
        }

        loadding();
    }, [loadingCart])


    useEffect(() => {
        const checks = () => {
            if (!USER) {
                setIsUserLoggedIn(false);
            } else {
                setIsUserLoggedIn(true);
            }
        }
        checks();
    }, [USER]);


    if (isLoading_Admin) return null;


    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>{DataAdmin?.data[0].nameLogo}</Link>

                <div className={styles.rightSection}>
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
                            to="/search"
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Tìm kiếm sản phẩm
                        </NavLink>

                        <NavLink
                            to="/trademark-product"
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Thương hiệu
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
                    </nav>

                    {
                        isUserLoggedIn ?
                            <>
                                {/* <div>Xin chào {data.data.name}</div> */}

                                <Link to="/cart" className={styles.cart}>
                                    <FiShoppingCart size={27} />
                                    {cartCount > 0 && (
                                        <span className={styles.badge}>
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                <Link to="/user" className={styles.cart}>
                                    <FiUser size={27} />

                                </Link>
                            </>

                            :

                            <Link to="/login" className={styles.loginBt}>
                                Đăng nhập
                            </Link>
                    }



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
