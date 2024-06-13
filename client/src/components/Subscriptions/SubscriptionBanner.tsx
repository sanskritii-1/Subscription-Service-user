import React, {useEffect, useState} from 'react'
import './Subscription.css';
    import image1 from "../asset/subscriptions/img1.png";
    import image2 from "../asset/subscriptions/img2.png";
    import image3 from '../asset/subscriptions/img3.png';
    
    
    import { FaAngleRight } from "react-icons/fa6";
    import { FaAngleLeft } from "react-icons/fa6";


const SubscriptionBanner: React.FC= () => {
  const [currentImage,setCurrentImage] = useState(0)
    
        const Images = [
            image1,
            image2,
            image3,
            image1,
            image2,
            image3,
            image1,
            image2,
            image3,
        ]
    
        const nextImage = () =>{
            if(Images.length - 1 > currentImage){
                setCurrentImage(preve => preve + 1)
            }
        }
    
        const preveImage = () =>{
            if(currentImage !== 0){
                setCurrentImage(preve => preve - 1)
            }
        }
    
    
        useEffect(()=>{
            const interval = setInterval(()=>{
                if(Images.length - 1 > currentImage){
                    nextImage()
                }else{
                    setCurrentImage(0)
                }
            },3000)
    
            return () => clearInterval(interval);
          }, [currentImage, Images.length]);

      return (

        <div className='subscription-banner'>
          <div className='BannerText'> Choose among wide variety of subscriptions and maximise your hiring odds</div>
            <div className='subscription-slideshow'>
                <button onClick={preveImage} className='slideshow-button'>
                    <FaAngleLeft />
                </button>
                <div className='slideshow-images'>
                    {Images.map((imgUrl, index) => (
                        <div
                            className='slideshow-image'
                            key={index}
                            style={{
                                transform: `translateX(-${currentImage * 100}%)`
                            }}
                        >
                            <img src={imgUrl} alt={`img${index}`} />
                        </div>
                    ))}
                </div>
                <button onClick={nextImage} className='slideshow-button'>
                    <FaAngleRight />
                </button>
            </div>
            
        </div>
      )
    }

export default SubscriptionBanner
