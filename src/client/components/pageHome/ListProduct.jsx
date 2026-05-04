

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
                                <div className={styles.imageBox}>
                                    <img src={`${item.img.secure_url}`} alt={item.img.secure_url} />
                                </div>

                                <div className={styles.info}>
                                    <p className={styles.name}>{item.name}</p>
                                    <p className={styles.price}> {formatPrice(item.price)}</p>
                                    <p className={styles.sold}> Đã bán {item.sold} </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            }
        </>


    )
});

export default ListProduct;