import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FaSearch } from "react-icons/fa";
import './PixelImages.css';

const PixelImages = ({ onImageSelect, currentSelection, setPixelModal }) => {
  const [images, setImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchText, setSearchText] = useState("populars");
  const [nextPageUrl, setNextPageUrl] = useState('https://taka-1.onrender.com/media/populars/');
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastImageElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && nextPageUrl) {
        console.log("called")
        fetchImages(nextPageUrl);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, nextPageUrl]);

  const fetchImages = async (url) => {
    setLoading(true);
    let response;
    try {
      response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error("error at fetching",error);
    }
    console.log(url)
    console.log("37")
    console.log(response)
    console.log("39")
    if (response && response.ok) {
      const data = await response.json();
      console.log("42")
      const newImages = data.photos.map(image => image);
      console.log("44")
      // Update state with new images
      setImages(prevImages => [...prevImages, ...newImages]);
      console.log("47")
      setNextPageUrl(data.next_page);
      console.log("49")
      setLoading(false);
      console.log("51")
      console.log(data.next_page)
    } else {
      // Handle error
      console.error('Error fetching images');
    //   setTimeout(() => fetchImages(url), 5000);
    }
  };

  // Call fetchImages when the component mounts
  useEffect(() => {
    console.log("called from usefeect")
    fetchImages(nextPageUrl);
    console.log("after")
  }, []);

  const handleSearch = () => {
    const url = `https://taka-1.onrender.com/media/photos/${searchTerm}`;
    setImages([]); // Clear the current images
    setSearchText(searchTerm); // Update the search text
    fetchImages(url); // Fetch images immediately
  };

  const handleImageClick = (imageUrl) => {
    onImageSelect(imageUrl)
    setSelectedImageUrl(imageUrl);
    setPixelModal(false);
    currentSelection("url")
    console.log(imageUrl);
  };

  return (
    <div>
      <div id='search'>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          placeholder="Search images..." 
        />
        <button className='search-btn' onClick={handleSearch}>
        <FaSearch />
        </button>
      </div>
      {/* <div id='searchText'><h6>{searchText}</h6></div> */}
      <div id='imagesContainer'>
        {images && images.length > 0 && images.map((image, index) => (
          <img 
            ref={index === images.length - 1 ? lastImageElementRef : null}
            src={image?.src?.original} 
            alt={image.alt ? image.alt : `image-${index}`} 
            style={{ 
              width: '44%', 
              height: 'auto',
              padding:'1px', 
              border: selectedImageUrl === image?.src?.original ? '2px solid #D94FD5' : 'none' 
            }} 
            onClick={() => handleImageClick(image?.src?.original)}
            key={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default PixelImages;