import React from "react";
import Image from "next/image";
import styles from "./galleryitem.module.scss";


const GalleryItem: React.FC<{ src: string; alt: string }> = ({src, alt}) => {
    return (
        <div className={styles.galleryItem}>
            <Image width={130} height={130} src={src} alt={alt} priority={false} placeholder='empty'/>
        </div>
    );
}

export default GalleryItem;
