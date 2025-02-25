import React from "react";
import styles from './button.module.scss'

const ButtonPrintNow: React.FC<{ fileName: string }> = ({fileName}) => {
    return (
        <a href={`curademo://open?file?file=https://cdn.krasilnikov.info/${fileName}`}
           rel="noreferrer"
           target="_blank"
           className={styles.button}>Print Now</a>
    );
}

export default ButtonPrintNow;
