import React from "react";
import styles from './button.module.scss'

type Props = {
    fileName: string;
}

const PrintNowButton = ({fileName}: Props) => {
    return (
        <a href={`curademo://open?file?file=https://cdn.krasilnikov.info/${fileName}`}
           rel="noreferrer"
           target="_blank"
           className={styles.button}>Print Now</a>
    );
}

export default PrintNowButton;
