import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import {images} from '../../images/images';
import styles from './Resources.module.css';

const Resources: React.FC = () => {
  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <ImageCard 
          key={index} 
          title={image.title} 
          description={image.description} 
          url={image.url} 
        />
      ))}
    </div>
  );
};

export default Resources;

// import React,{useState,useEffect} from 'react';
// import ImageCard from '../components/ImageCard';
// import axios from 'axios'; 
// import styles from './Resources.module.css';

// const ResourcePage: React.FC = () => {
//   const [images, setImages] = useState<any[]>([]);

//   useEffect(() => {
//     
//     const fetchImages = async () => {
//       try {
//         
//         const response = await axios.get('/api/get-resources');
//         setImages(response.data); 
//       } catch (error) {
//         console.error('Error fetching images:', error);
//   
//       }
//     };
//     fetchImages();
//   }, []);

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

