import React, { useState } from 'react';
import styles from './ImageCard.module.css';
import { sendData } from '../../helper/util';
import axios from "axios";

interface ImageCardProps {
  id: string,
  title: string;
  description: string;
  url: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ id, title, description, url }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [img_url, setUrl] = useState(url);

  const handleClick = async () => {
    console.log('clicked');
    try {
      
      const response = await sendData('POST', 'access-resource', true, {imageId: id});
        setIsClicked(true);
        setUrl(response.url);
      } catch (error) {
        console.error('Error fetching image:', error);
        window.alert(error)
      }
  };

  return (
    <div 
    className={`${styles.card} ${isClicked ? styles.clicked : ''}`} 
    onClick={handleClick}
    style={{ pointerEvents: isClicked ? 'none' : 'auto' }}
    >
      <h2 className={styles.title}>{title}</h2>
      <img className={`${styles.image}`} src={img_url} alt={title} />
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ImageCard;
