import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./AdminMenu.module.css";
import {
    FaChartLine,
    FaBoxOpen,
    FaShoppingCart,
    FaCog,
    FaUser,
    FaLayerGroup,
    FaChevronDown
} from "react-icons/fa";

export default function AdminMenu() {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    const isActiveParent = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <aside className={styles.sidebar}>

            <div className={styles.bodyMenu}>
                <nav className={styles.nav}>
                    <ul>
                        {/* PRODUCT */}
                        <li>
                            <div
                                className={`${styles.item} ${isActiveParent("/admin-zmobile-2026/product") ? styles.active : ""}`}
                                onClick={() => toggleMenu("product")}
                            >
                                <FaBoxOpen />
                                <span>Sản phẩm</span>
                                <FaChevronDown className={styles.arrow} />
                            </div>

                            {openMenu === "product" && (
                                <ul className={styles.submenu}>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product">
                                            Danh sách sản phẩm
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/sold">
                                            Lượt bán sản phẩm
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/add">
                                            Thêm sản phẩm
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* CATEGORY */}
                        <li>
                            <div
                                className={`${styles.item} ${isActiveParent("/admin-zmobile-2026/category") ? styles.active : ""}`}
                                onClick={() => toggleMenu("category")}
                            >
                                <FaLayerGroup />
                                <span>Danh mục</span>
                                <FaChevronDown className={styles.arrow} />
                            </div>

                            {openMenu === "category" && (
                                <ul className={styles.submenu}>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/category">
                                            Danh sách danh mục
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/category/add">
                                            Thêm danh mục
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* ORDER */}
                        <li>
                            <div
                                className={`${styles.item} ${isActiveParent("/admin-zmobile-2026/order") ? styles.active : ""}`}
                                onClick={() => toggleMenu("order")}
                            >
                                <FaShoppingCart />
                                <span>Đơn hàng</span>
                                <FaChevronDown className={styles.arrow} />
                            </div>

                            {openMenu === "order" && (
                                <ul className={styles.submenu}>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/order">
                                            Danh sách đơn hàng
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/order/province">
                                            Đơn hàng tỉnh thành
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/order/revenue">
                                            Doanh thu
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* ACCOUNT */}
                        <li>
                            <NavLink
                                to="/admin-zmobile-2026/account"
                                className={({ isActive }) =>
                                    `${styles.item} ${isActive ? styles.active : ""}`
                                }
                            >
                                <FaUser />
                                <span>Tài khoản</span>
                            </NavLink>
                        </li>

                        {/* Dashboard */}
                        <li>
                            <NavLink
                                to="/admin-zmobile-2026/dashboard"
                                className={({ isActive }) =>
                                    `${styles.item} ${isActive ? styles.active : ""}`
                                }
                            >
                                <FaChartLine />
                                <span>Bảng điều khiển</span>
                            </NavLink>
                        </li>

                        {/* SETTING */}
                        <li>
                            <NavLink
                                to="/admin-zmobile-2026/setting"
                                className={({ isActive }) =>
                                    `${styles.item} ${isActive ? styles.active : ""}`
                                }
                            >
                                <FaCog />
                                <span>Cài đặt</span>
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>
    );
}