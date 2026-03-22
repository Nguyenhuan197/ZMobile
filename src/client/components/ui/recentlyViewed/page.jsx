import styles from "./recentlyViewed.module.css";

const products = [
    { id: 1, name: "Điện thoại OPPO K9s", status: "Còn hàng", img: "https://cdn.tgdd.vn/Products/Images/42/252751/oppo-k9s-1-600x600.jpg" },
    { id: 2, name: "Điện thoại realme C71 4GB/128GB", status: "Còn hàng", img: "https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/42/337741/realme-c71-white-1-638833466341313873-750x500.jpg" },
    { id: 3, name: "Điện thoại Xiaomi Redmi 13x 6GB/128GB", status: "Hết hàng", img: "https://cdn.tgdd.vn/2026/02/timerseo/335755.jpg" },
];

export default function RecentlyViewed() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>
                    <span className={styles.icon}>🍉</span> Lịch sử xem
                </h3>
                <button className={styles.clearBtn}>Xóa lịch sử</button>
            </div>

            <div className={styles.grid}>
                {products.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <button className={styles.removeBtn}>×</button>
                        <div className={styles.imageBox}>
                            <img src={item.img} alt={item.name} />
                        </div>
                        <div className={styles.info}>
                            <h4 className={styles.name}>{item.name}</h4>
                            <p className={styles.status}>{item.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}