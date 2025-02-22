import React from "react";
import styles from './button.module.scss'

type Props = {
    fileName: string;
}

const PrintNowButton = ({fileName}: Props) => {
    return (
        <a href={`cura://print?file=https://cdn.krasilnikov.info/${fileName}&settings=high_quality`}
           target="_blank"
           rel="noreferrer"
           className={styles.button}>Print Now</a>
    );
}

export default PrintNowButton;
