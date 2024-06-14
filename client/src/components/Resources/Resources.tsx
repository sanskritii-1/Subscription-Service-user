import React,{useState,useEffect} from 'react';
import ImageCard from '../ImageCard/ImageCard';
import axios from 'axios'; 
import styles from './Resources.module.css';
import { useNavigate } from 'react-router-dom';
import { sendData } from '../../helper/util';

const Resources: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    
    const fetchImages = async () => {
      try {
        
        const response = await sendData('GET', 'get-resources', true);
        console.log('data received resources', response)
        setImages(response); 
      } catch (error) {
        console.error('Error fetching images:', error);
        // window.alert('Error fetching resources')
        navigate('/login')
      }
    };
    fetchImages();
  }, []);

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <ImageCard 
          key={index} 
          id = {image._id}
          title={image.title} 
          description={image.description} 
          url={image.url} 
        />
      ))}
    </div>
  );
};

export default Resources;

