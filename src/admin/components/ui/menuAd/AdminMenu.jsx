import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./AdminMenu.module.css";
import {
    FaBoxOpen,
    FaChevronDown,
    FaUser,
    FaLayerGroup,
    FaClipboardList
} from "react-icons/fa";

export default function AdminMenu() {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(null);

    // Tự động mở menu cha dựa trên URL hiện tại khi load trang hoặc chuyển trang
    useEffect(() => {
        if (location.pathname.includes("/admin-zmobile-2026/product")) {
            setOpenMenu("product");
        } else if (location.pathname.includes("/admin-zmobile-2026/category")) {
            setOpenMenu("category");
        }
    }, [location.pathname]);

    const toggleMenu = (menu) => {
        // Chỉ đóng/mở khi người dùng chủ động click vào menu cha
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
                                <FaChevronDown className={`${styles.arrow} ${openMenu === "product" ? styles.rotate : ""}`} />
                            </div>

                            {openMenu === "product" && (
                                <ul className={styles.submenu}>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/list">Danh sách sản phẩm</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/sale">Sản phẩm Sale</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/slide">Sản phẩm chạy slide</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/numberOfProductsSold">Lượt bán sản phẩm</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/addNew">Thêm sản phẩm</NavLink>
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
                                <FaChevronDown className={`${styles.arrow} ${openMenu === "category" ? styles.rotate : ""}`} />
                            </div>

                            {openMenu === "category" && (
                                <ul className={styles.submenu}>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/category" end>Danh sách danh mục</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/category/add">Thêm danh mục</NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Đơn hàng */}
                        <li>
                            <NavLink
                                to="/admin-zmobile-2026/orders" // Bạn nên đổi path thành orders cho đúng nghĩa
                                className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
                            >
                                <FaClipboardList />
                                <span>Đơn hàng</span>
                            </NavLink>
                        </li>


                        {/* ACCOUNT */}
                        <li>
                            <NavLink
                                to="/admin-zmobile-2026/account"
                                className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
                            >
                                <FaUser />
                                <span>Tài khoản</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}