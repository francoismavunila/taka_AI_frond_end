import React from "react";
import "./PromptForm.css";
import { FaArrowRight, FaImage } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";

const PromptForm = ({ setSelectedImage, generateStory, data, tones, tone, setPrompt, prompt, setTone }) => {
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="prompt">
      <form className="prompt-form" onSubmit={(e) => generateStory(e)}>
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
              value={tone}
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
            <button type="button" className="icon">
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

            <button type="submit" className="icon">
                {data.title ? <IoMdRefresh /> : <FaArrowRight />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
