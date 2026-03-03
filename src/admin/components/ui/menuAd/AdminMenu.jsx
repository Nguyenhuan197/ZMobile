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
                                        <NavLink to="/admin-zmobile-2026/product/list" end>
                                            Danh sách sản phẩm
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/sale" end>
                                            Sản phẩm Sale
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/numberOfProductsSold" end>
                                            Lượt bán sản phẩm
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/product/addNew" end>
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
                                        <NavLink to="/admin-zmobile-2026/category" end>
                                            Danh sách danh mục
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin-zmobile-2026/category/add" end>
                                            Thêm danh mục
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Các mục khác giữ nguyên cấu trúc NavLink */}
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