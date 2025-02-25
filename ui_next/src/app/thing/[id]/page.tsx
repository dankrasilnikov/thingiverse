import styles from './modelpage.module.scss';
import {ModelView} from "@/app/thing/[id]/components/ModelView";
import ModelGallery from "@/app/thing/[id]/components/ModelGallery";

export default function Page() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.modelView}>
                <ModelView modelUrl={"https://cdn.krasilnikov.info/oiia_cat.stl"}/>

                <div className={styles.gallery}>
                    <ModelGallery/>
                </div>

            </div>

        </div>
    )
}
