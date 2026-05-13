import React, { useState, useEffect } from "react";
import { Lock, Smartphone, Search, MapPin, Phone, CheckCircle2, RefreshCw } from "lucide-react";
import styles from "./wholesaleAdmin.module.css";

const MOCK_DATA = [
    { id: 1, name: "OPPO K10S", ram: "8/128GB", retail: "3.500", sl3: "3.200", sl5: "3.100", sl10: "3.000", sl20: "2.900" },
    { id: 2, name: "Realme V20", ram: "4/128GB", retail: "2.200", sl3: "1.950", sl5: "1.900", sl10: "1.850", sl20: "1.800" },
    { id: 3, name: "iPhone 11 Pro", ram: "64GB", retail: "6.500", sl3: "6.100", sl5: "6.000", sl10: "5.900", sl20: "5.800" },
    { id: 4, name: "Redmi Note 12", ram: "6/128GB", retail: "3.800", sl3: "3.500", sl5: "3.400", sl10: "3.350", sl20: "3.300" },
    { id: 5, name: "Samsung A54", ram: "8/256GB", retail: "7.200", sl3: "6.800", sl5: "6.700", sl10: "6.600", sl20: "6.500" },
    { id: 6, name: "Vivo Y35", ram: "8/128GB", retail: "4.100", sl3: "3.800", sl5: "3.750", sl10: "3.700", sl20: "3.650" },
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
                        <h2 className={styles.logoText}>Báo giá sĩ</h2>
                        <h1 className={styles.logoText}>ZALO 0369 594 026</h1>
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
                            Tra cứu
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
                                            <td className={styles.retailText}>{item.retail}</td>
                                            <td className={styles.priceNum}>{item.sl3}</td>
                                            <td className={styles.priceNum}>{item.sl5}</td>
                                            <td className={styles.priceNum}>{item.sl10}</td>
                                            <td className={styles.wholesaleText}>{item.sl20}</td>
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