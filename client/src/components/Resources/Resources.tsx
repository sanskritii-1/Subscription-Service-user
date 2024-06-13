// import React, { useEffect } from 'react';
// import ImageCard from '../ImageCard/ImageCard';
// import {images} from '../../images/images';
// import styles from './Resources.module.css';
// import { sendData } from '../../helper/util';

// const Resources: React.FC = () => {
//   return (
//     <div className={styles.container}>
//       {images.map((image, index) => (
//         <ImageCard 
//           key={index} 
//           title={image.title} 
//           description={image.description} 
//           url={image.url} 
//         />
//       ))}
//     </div>
//   );
// };

// export default Resources;

import React,{useState,useEffect} from 'react';
import ImageCard from '../ImageCard/ImageCard';
import axios from 'axios'; 
import styles from './Resources.module.css';
import { useNavigate } from 'react-router-dom';

const Resources: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const fetchImages = async () => {
      try {
        
        const response = await axios.get('http://localhost:5000/api/get-resources',{
          headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        setImages(response.data); 
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

