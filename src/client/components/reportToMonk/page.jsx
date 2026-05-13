import React, { useState, useEffect } from "react";
import { Lock, Smartphone, Search, MapPin, Phone, CheckCircle2, RefreshCw } from "lucide-react";
import styles from "./wholesaleAdmin.module.css";
import { formatPrice } from "../../../utils/formatPrice.JS";

const MOCK_DATA = [
    { id: 1, name: "OPPO A56 5G", ram: "8/256GB", retail: "1950000", sl3: "1900000", sl5: "1850000", sl10: "1800000", sl20: "nav" },
    { id: 2, name: "OPPO Reno 4Z 5G", ram: "12/256GB", retail: "2150000", sl3: "2100000", sl5: "2100000", sl10: "2000000", sl20: "nav" },
    { id: 3, name: "OPPO Reno 6 5G", ram: "12/256GB", retail: "3500000", sl3: "3400000", sl5: "3300000", sl10: "3200000", sl20: "nav" },
    { id: 4, name: "OPPO A9 2020", ram: "8/256GB", retail: "1600000", sl3: "1550000", sl5: "1400000", sl10: "1370000", sl20: "nav" },
];

export default function WholesaleAdmin() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCheck = () => {
        if (password === "2005") {
            setIsLocked(false);
        } else {
            alert("Mật khẩu không chính xác!");
        }
    };

    const filteredData = MOCK_DATA.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.adminPage}>
            <div className={styles.wrapper}>
                {/* Top Header: Thông tin shop */}
                <header className={styles.topHeader}>
                    <div className={styles.shopBrand}>
                        <h1 className={styles.logoText}>Zalo 0369 594 026</h1>
                    </div>
                    <div className={styles.liveStatus}>
                        <RefreshCw size={14} className={styles.spinIcon} />
                        Cập nhật: {currentTime.toLocaleTimeString()} - {currentTime.toLocaleDateString('vi-VN')}
                    </div>
                </header>

                {/* Toolbar: Nhập mã và tìm kiếm chung một hàng */}
                <section className={styles.toolbar}>
                    <div className={styles.toolGroup}>
                        <div className={styles.inputWrapper}>
                            <Lock size={16} className={styles.iconIn} />
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.mainInput}
                            />
                        </div>
                        <button onClick={handleCheck} className={styles.btnCheck}>
                            Tra cứu giá sĩ
                        </button>
                    </div>

                </section>

                {/* Table Area */}
                <main className={styles.tableContainer}>
                    {isLocked ? (
                        <div className={styles.lockNotice}>
                            <div className={styles.lockIconBox}>🔒</div>
                            <h2>Bảng giá đang khóa</h2>
                            <p>Liên hệ Zalo Để Cung Cấp MK</p>
                        </div>
                    ) : (
                        <div className={styles.responsiveTable}>
                            <table className={styles.dataTable}>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Cấu hình</th>
                                        <th>Lẻ</th>
                                        <th>Sỉ 3</th>
                                        <th>Sỉ 5</th>
                                        <th>Sỉ 10</th>
                                        <th className={styles.importantCol}>Sỉ 20+</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item) => (
                                        <tr key={item.id}>
                                            <td className={styles.nameCell}>
                                                <Smartphone size={16} /> {item.name}
                                            </td>
                                            <td><span className={styles.badgeRam}>{item.ram}</span></td>
                                            <td className={styles.retailText}>{formatPrice(item.retail)}  </td>
                                            <td className={styles.priceNum}>{formatPrice(item.sl3)}</td>
                                            <td className={styles.priceNum}>{formatPrice(item.sl5)}</td>
                                            <td className={styles.priceNum}>{formatPrice(item.sl10)}</td>
                                            <td className={styles.wholesaleText}>{formatPrice(item.sl20)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>

                <footer className={styles.footer}>
                    <span style={{ color: 'red', fontSize: '15px' }}>Cuộn ngang để coi thêm {'-->'} </span>
                    <p>© 2026 Z Mobile - Hệ thống báo giá sỉ tự động</p>
                </footer>
            </div>
        </div>
    );
}