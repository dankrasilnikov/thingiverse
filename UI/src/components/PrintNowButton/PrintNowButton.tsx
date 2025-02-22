import React from "react";
import styles from './button.module.scss'

type Props = {
    fileName: string;
}

const PrintNowButton = ({fileName}: Props) => {
    return (
        <a href={`cura://print?file=https://cdn.krasilnikov.info/${fileName}&settings=high_quality`}
           rel="noreferrer"
           target="_blank"
           className={styles.button}>Print Now</a>
    );
}

export default PrintNowButton;
