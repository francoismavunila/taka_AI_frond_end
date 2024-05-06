import React, { useState } from "react";
import "./PromptForm.css";
import { FaArrowRight, FaImage } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

const PromptForm = ({ setSelectedImage, generateStory, data, tones, tone, setPrompt, prompt, setTone, fetchStory ,setPixel, currentSelection, audio}) => {

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    currentSelection("image")
    setSelectedImage(file);
    console.log("image selected", file);

    // const reader = new FileReader();
    // currentSelection("image")
    // reader.onloadend = () => {
    //   console.log("image selected", reader.result);
    //   setSelectedImage(reader.result);
    // };

    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  };

  const [playing, setPlaying] = useState(false);
  return (
    <div className="prompt">
      <form className="prompt-form" >
        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            id="prompt"
            placeholder="A picture is worth a thousand words. Start writing yours"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div className="flex-space">
          <div className="form-group">
            <select
              className="form-control"
              value="tone"
              onChange={(e) => setTone(e.target.value)}
            >
              {tones.map((tone, index) => (
                <option key={index} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
            {tone !== "Tone" && <p>{tone}</p>}
          </div>
          <div className="flex-row">
            {data.title? <>
            {
              playing? <button type="button" className="icon" onClick={() => {audio.pause(); setPlaying(false)}}>
              <FaPauseCircle />
              </button>: <button type="button" className="icon" onClick={() => {audio.play(); setPlaying(true)}}>
            <FaPlayCircle />
            </button>
            }
            </> : null}
            
            <button type="button" className="icon" onClick={() => setPixel(true)}>
              <FaPix />
            </button>

            <input
              type="file"
              accept="image/*"
              id="image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="image" className="icon">
              <FaImage />
            </label>

            <button type="button" className="icon" onClick={() => fetchStory()} >
                {data.title ? <IoMdRefresh /> : <FaArrowRight />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
