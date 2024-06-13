import React, {useEffect, useState} from 'react'
import './Subscription.css';
    import image1 from "../asset/subscriptions/img1.png";
    import image2 from "../asset/subscriptions/img2.png";
    import image3 from "../asset/subscriptions/img3.png";
    
    
    import { FaAngleRight } from "react-icons/fa6";
    import { FaAngleLeft } from "react-icons/fa6";
    import { FaShoppingCart } from "react-icons/fa";


const AllSubscription: React.FC= () => {
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
            if(currentImage != 0){
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
            },5000)
    
            return () => clearInterval(interval);
          }, [currentImage, Images.length]);

      return (

        <div className='subscription-container'>
          <div className='BannerText'> Choose the subscription that suits you and maximise your hiring odds</div>
            <div className='subscription-slideshow'>
                <button onClick={preveImage} className='slideshow-button'>
                    <FaAngleLeft />
                </button>
                <div className='slideshow-images'>
                    {Images.map((imageUrl, index) => (
                        <div
                            className='slideshow-image'
                            key={index}
                            style={{
                                transform: `translateX(-${currentImage * 100}%)`
                            }}
                        >
                            <img src={imageUrl} alt={`image${index}`} />
                            <button className='add-to-cart-button'>Add to Cart <FaShoppingCart/></button>
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

export default AllSubscription
