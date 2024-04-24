import React, { useState } from "react";
import "./Main.css";
import WelcomeMessage from "../../components/welcome/WelcomeMessage";
import PromptForm from "../../components/prompt/PromptForm";
import SelectedImage from "../../components/image/SelectedImage";
import Recommendations from "../../components/recommendations/Recommendations";

const Main = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("unprocessed");
  const [data, setData] = useState({});
  const tones = [
    "Tone",
    "happy",
    "sad",
    "angry",
    "surprised",
    "disgusted",
    "fearful",
    "neutral",
  ];
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState(tones[0]);

  const generateStory = (e) => {
    e.preventDefault();
    setStatus("unprocessed");
    if (!selectedImage) {
      alert("Please select an image first");
      
    } else if (!tone || tone === "Tone") {
        alert("Please select a tone first");
        
    } else {
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData({
        title: "Story heading right here",
        story: [
          "u egestas cras pellentesque suspendisse purus sit. Ut ornare non varius velit orci in ultrices. Aliquet sed tempor magnis nibh. Diam neque aliquam nibh quisque amet massa egestas iaculis. Dictum pulvinar vulputate sagittis adipiscing id fringilla lorem. Tellus pellentesque integer commodo nunc urna enim molestie ut faucibus. Magnis morbi duis ipsum nec ullamcorper lorem sodales. Dignissim semper pretium sed ultrices eget ac urna egestas hac. Diam justo semper gravida amet. Varius gravida ac felis massa. Urna proin vitae semper vitae. Erat imperdiet accumsan est in enim turpis ac enim. Dis scelerisque morbi risus id faucibus. Malesuada pellentesque sagittis facilisis mauris purus consequat. Eu euismod et mattis donec orci.",
          "Faucibus lorem sodales nec aliquet donec sed diam in. Tempor amet commodo lorem egestas.",
          "u egestas cras pellentesque suspendisse purus sit. Ut ornare non varius velit orci in ultrices. Aliquet sed tempor magnis nibh. Diam neque aliquam nibh quisque amet massa egestas iaculis. Dictum pulvinar vulputate sagittis adipiscing id fringilla lorem. Tellus pellentesque integer commodo nunc urna enim molestie ut faucibus. Magnis morbi duis ipsum nec ullamcorper lorem sodales. Dignissim semper pretium sed ultrices eget ac urna egestas hac. Diam justo semper gravida amet. Varius gravida ac felis massa. Urna proin vitae semper vitae. Erat imperdiet accumsan est in enim turpis ac enim. Dis scelerisque morbi risus id faucibus. Malesuada pellentesque sagittis facilisis mauris purus consequat. Eu euismod et mattis donec orci.",
        ],
      });
      setStatus("processed");
    }, 8000);
}
  };

  return (
    <div className="Main">
      <div className="container">
        {selectedImage ? (
          <SelectedImage
            selectedImage={selectedImage}
            loading={loading}
            data={data}
            status={status}
          />
        ) : (
          <WelcomeMessage />
        )}
        <PromptForm
          setSelectedImage={setSelectedImage}
          generateStory={generateStory}
          data={data}
          tone={tone}
            tones={tones}
            setPrompt={setPrompt}
            setTone={setTone}
            prompt={prompt}
        />
        {
            data.title? "": <Recommendations setPrompt={setPrompt} />
        }
      </div>
    </div>
  );
};

export default Main;
