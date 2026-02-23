import React from "react";
import styles from "../App.module.css";


export default function UiLoadingComponent() {
    return (
        <div className={styles.loadingWrapper}>
            <div className={styles.spinner}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
            </div>
        </div>
    );
}
