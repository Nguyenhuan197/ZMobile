

import React, { useMemo } from "react";
import styles from "./home.module.css";
import { formatPrice } from "../../../utils/formatPrice.JS";
import { Link } from "react-router-dom";


const ListProduct = React.memo(({ data, dataCategory }) => {
    const dataProducts = useMemo(() => data?.data || [], [data]);

    return (
        <>
            {
                dataProducts.length > 0 &&
                <section>
                    <h2 className={styles.sectionTitle}>{dataCategory || 'Đăng cập nhật'}</h2>
                    <div className={styles.grid}>
                        {dataProducts.map((item) => (
                            <Link
                                to={`/product/${item._id}`}
                                key={item._id}
                                className={styles.card}
                            >
                                <img src={`${item.img.secure_url}`} alt={item.name} />
                                <div className={styles.blockName}>
                                    <span>{item.name}</span>
                                </div>
                                <p>{formatPrice(item.price)}</p>
                                <span className={styles.Sold}>Đã bán {item.sold}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            }
        </>


    )
});


export default ListProduct;