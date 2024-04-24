import React from "react";
import "./SelectedImage.css";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "grey",
  };

const SelectedImage = ({ selectedImage, loading, status, data }) => {
    
  let [color, setColor] = useState("#ffffff");

  if (status === "processed") {
    return (
        <div className="image">
          <div className="story">
            <h2>{data.title}</h2>
            {
                data.story.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))
            }
          </div>
        </div>
      );
  } else if (status === "unprocessed") {
  return (
    <div className="image">
      <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%" }} />
      <div className="loader">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </div>
  );
}
};

export default SelectedImage;
