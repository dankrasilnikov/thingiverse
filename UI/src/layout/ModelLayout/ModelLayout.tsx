import React from "react";
import styles from './modellayout.module.scss';


const ModelLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <div className={styles.modelLayout}>
            <div className={styles.modelLayoutWrapper}>
                <div className={styles.modelLayoutControls}></div>
                {children}
            </div>
        </div>
    );
}

export default ModelLayout;
