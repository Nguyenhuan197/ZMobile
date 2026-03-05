import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./AdminMenu.module.css";
import {
    FaBoxOpen,
    FaChevronDown,
    FaUser,
    FaLayerGroup,
    FaClipboardList,
    FaUsers,
    FaCogs,
    FaUserShield
} from "react-icons/fa";

export default function AdminMenu() {
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(null);

    // Tự động mở menu cha dựa trên URL hiện tại
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("/admin-zmobile-2026/product")) {
            setOpenMenu("product");
        } else if (path.includes("/admin-zmobile-2026/category")) {
            setOpenMenu("category");
        } else if (path.includes("/admin-zmobile-2026/orders")) {
            setOpenMenu("orders");
        } else if (path.includes("/admin-zmobile-2026/users")) {
            setOpenMenu("users");
        } else if (path.includes("/admin-zmobile-2026/system")) {
            setOpenMenu("system");
        } else if (path.includes("/admin-zmobile-2026/account")) {
            setOpenMenu("account");
        }
    }, [location.pathname]);

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
                        {/* 1. SẢN PHẨM */}
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
                                    <li><NavLink to="/admin-zmobile-2026/product/list">Danh sách sản phẩm</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/product/sale">Sản phẩm Sale</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/product/slide">Sản phẩm chạy slide</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/product/numberOfProductsSold">Lượt bán sản phẩm</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/product/addNew">Thêm sản phẩm</NavLink></li>
                                </ul>
                            )}
                        </li>

                        {/* 2. DANH MỤC */}
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
                                    <li><NavLink to="/admin-zmobile-2026/category" end>Danh sách danh mục</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/category/add">Thêm danh mục</NavLink></li>
                                </ul>
                            )}
                        </li>

                        {/* 3. ĐƠN HÀNG */}
                        <li>
                            <div
                                className={`${styles.item} ${isActiveParent("/admin-zmobile-2026/orders") ? styles.active : ""}`}
                                onClick={() => toggleMenu("orders")}
                            >
                                <FaClipboardList />
                                <span>Đơn hàng</span>
                                <FaChevronDown className={`${styles.arrow} ${openMenu === "orders" ? styles.rotate : ""}`} />
                            </div>
                            {openMenu === "orders" && (
                                <ul className={styles.submenu}>
                                    <li><NavLink to="/admin-zmobile-2026/orders/all">Tất cả đơn hàng</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/orders/pending">Đơn chờ xác nhận</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/orders/shipping">Đơn đang vận chuyển</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/orders/success">Đơn giao thành công</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/orders/stats-day">Thống kê theo ngày</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/orders/stats-month">Thống kê theo tháng</NavLink></li>
                                </ul>
                            )}
                        </li>

                        {/* 4. NGƯỜI DÙNG */}
                        <li>
                            <div
                                className={`${styles.item} ${isActiveParent("/admin-zmobile-2026/users") ? styles.active : ""}`}
                                onClick={() => toggleMenu("users")}
                            >
                                <FaUsers />
                                <span>Người dùng</span>
                                <FaChevronDown className={`${styles.arrow} ${openMenu === "users" ? styles.rotate : ""}`} />
                            </div>
                            {openMenu === "users" && (
                                <ul className={styles.submenu}>
                                    <li><NavLink to="/admin-zmobile-2026/users/list">Danh sách người dùng</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/users/analytics">Lượt truy cập</NavLink></li>
                                </ul>
                            )}
                        </li>

                        {/* 5. HỆ THỐNG */}
                        <li>
                            <div
                                className={`${styles.item} ${isActiveParent("/admin-zmobile-2026/system") ? styles.active : ""}`}
                                onClick={() => toggleMenu("system")}
                            >
                                <FaCogs />
                                <span>Hệ thống</span>
                                <FaChevronDown className={`${styles.arrow} ${openMenu === "system" ? styles.rotate : ""}`} />
                            </div>
                            {openMenu === "system" && (
                                <ul className={styles.submenu}>
                                    <li><NavLink to="/admin-zmobile-2026/system/settings">Quản lý hệ thống</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/system/sale-config">Quản lý Sale</NavLink></li>
                                </ul>
                            )}
                        </li>

                        {/* 6. TÀI KHOẢN (Đã cập nhật menu con quản trị) */}
                        <li>
                            <div
                                className={`${styles.item} ${isActiveParent("/admin-zmobile-2026/account") ? styles.active : ""}`}
                                onClick={() => toggleMenu("account")}
                            >
                                <FaUserShield />
                                <span>Tài khoản</span>
                                <FaChevronDown className={`${styles.arrow} ${openMenu === "account" ? styles.rotate : ""}`} />
                            </div>
                            {openMenu === "account" && (
                                <ul className={styles.submenu}>
                                    <li><NavLink to="/admin-zmobile-2026/account/list">Danh sách người quản trị</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/account/add">Thêm người quản trị</NavLink></li>
                                    <li><NavLink to="/admin-zmobile-2026/account/profile">Thông tin cá nhân</NavLink></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}