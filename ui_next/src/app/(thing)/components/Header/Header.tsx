import React from "react";
import styles from './header.module.scss';
import ButtonHistoryBack from "@/components/common/ButtonHIstoryBack";
import ButtonThreeDots from "@/components/common/ButtonThreeDots";
import Search from "@/components/common/Search/Search";

const Header: React.FC<{}> = () => {
    return (
        <header className={styles.header}>
            <ButtonHistoryBack/>
            <Search/>
            <ButtonThreeDots/>
        </header>
    );
}

export default Header;
