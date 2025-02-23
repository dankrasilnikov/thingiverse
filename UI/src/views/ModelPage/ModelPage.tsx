import React from "react";
import styles from './modelpage.module.scss';
import ModelLayout from "@/layout/ModelLayout";
import ModelGallery from "@/views/ModelPage/components/ModelGallery";
import {ModelView} from "@/views/ModelPage/components/ModelView";


const ModelPage: React.FC<{}> = () => {
    return (
        <ModelLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.modelView}>
                    <ModelView/>

                    <div className={styles.gallery}>
                        <ModelGallery/>
                    </div>

                </div>
            </div>
        </ModelLayout>
    );
}

export default ModelPage;
