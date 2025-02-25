import styles from './modelpage.module.scss';
import ModelView from "@/app/thing/[id]/components/ModelView";
import ModelGallery from "@/app/thing/[id]/components/ModelGallery";

export default function Page() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.modelView}>
                <ModelView modelUrl={"https://cdn.krasilnikov.info/oiia_cat.stl"} placeholderAlt={'preview'}
                           placeholderSrc={'https://cdn.krasilnikov.info/large_display_Oiia_cat_spinner.webp'}/>

                <ModelGallery/>
            </div>

        </div>
    )
}
