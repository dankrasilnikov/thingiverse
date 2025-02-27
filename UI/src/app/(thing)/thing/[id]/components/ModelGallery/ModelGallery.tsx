import React from 'react'
import styles from './modelgallery.module.scss'
import GalleryItem from '../GalleryItem'

const gallery = [
  {
    src: 'https://cdn.krasilnikov.info/medium_preview_Capture3.webp',
    alt: 'preview_1',
    id: 1,
  },
  {
    src: 'https://cdn.krasilnikov.info/medium_preview_Capture4.webp',
    alt: 'preview_2',
    id: 2,
  },
  {
    src: 'https://cdn.krasilnikov.info/medium_preview_container.webp',
    alt: 'preview_3',
    id: 3,
  },
  {
    src: 'https://cdn.krasilnikov.info/medium_preview_Capture3.webp',
    alt: 'preview_1',
    id: 4,
  },
  {
    src: 'https://cdn.krasilnikov.info/medium_preview_Capture4.webp',
    alt: 'preview_2',
    id: 5,
  },
  {
    src: 'https://cdn.krasilnikov.info/medium_preview_container.webp',
    alt: 'preview_3',
    id: 6,
  },
]

const ModelGallery: React.FC = () => (
  <div className={styles.gallery}>
    {gallery.map(({ src, alt, id }) => (
      <GalleryItem src={src} alt={alt} key={id} />
    ))}
  </div>
)

export default ModelGallery
