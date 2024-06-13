import React, { useState } from 'react';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  title: string;
  description: string;
  url: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, description, url }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className={`${styles.card} ${isClicked ? styles.clicked : ''}`} onClick={handleClick}>
      <h2 className={styles.title}>{title}</h2>
      <img className={`${styles.image} ${isClicked ? styles.imageClicked : styles.imageBlur}`} src={url} alt={title} />
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ImageCard;
