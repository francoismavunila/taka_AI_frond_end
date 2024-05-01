import React,{useEffect, useState} from 'react';

const PixelImages = ({onImageSelect }) => {
    const [images, setImages] = useState([]);
  
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    const handleImageClick = (imageUrl) => {
        onImageSelect(imageUrl)
        setSelectedImageUrl(imageUrl);
        console.log(imageUrl);
    };
  
  const fetchImages = async (url, allImages = []) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    const images = [...allImages, ...data.photos.map(image => image)];
  
    // if (data.next_page) {
    //   return fetchImages(data.next_page, images);
    // } else {
    //   return images;
    // }
    return images;
  };
  
  useEffect(() => {
    fetchImages('https://taka-1.onrender.com/media/populars/')
      .then(images => {
        console.log("the image",images)
        setImages(images);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  return (
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  {images && images.length > 0 && images.map((image, index) => (
        //   <img 
        //   src={image?.src?.original} 
        //   alt={image.alt ? image.alt : `image-${index}`} 
        //   style={{ width: '40%', height: 'auto',margin: '5px 1px', }} 
        // />
    <div 
      key={index} 
      style={{ 
        width: '40%', 
        margin: '10px 5%', 
        border: '1px solid #ccc', 
        borderRadius: '5px', 
        padding: '10px', 
        boxSizing: 'border-box',
        '@media (max-width: 600px)': {
          width: '90%',
          margin: '10px 5%',
        }
      }}
    >
      <img 
        src={image?.src?.original} 
        alt={image.alt ? image.alt : `image-${index}`} 
        style={{ 
            width: '100%', 
            height: 'auto', 
            border: selectedImageUrl === image?.src?.original ? '2px solid blue' : 'none' 
          }} 
          onClick={() => handleImageClick(image?.src?.original)}
      />
    </div>
  ))}
</div>
  );
};

export default PixelImages;