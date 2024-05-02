import React, { useState } from "react";
import "./Main.css";
import WelcomeMessage from "../../components/welcome/WelcomeMessage";
import PromptForm from "../../components/prompt/PromptForm";
import SelectedImage from "../../components/image/SelectedImage";
import Recommendations from "../../components/recommendations/Recommendations";
import PixelImages from "../../components/pixels/PixelImages";

const Main = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPixelUrl, setSelectedPixelUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("unprocessed");
  const [data, setData] = useState({});
  const [PixelModal,setPixelModal] = useState(false);
  const [audio, setAudio] = useState(null);
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
    setStatus("unprocessed");
    if (!(selectedImage || selectedPixelUrl)) {
      alert("Please select an image first");
      
    } else if (!tone || tone === "Tone") {
        alert("Please select a tone first"); 
    } 
    else {
    
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setData({
    //     title: "Story heading right here",
    //     story: [
    //       "u egestas cras pellentesque suspendisse purus sit. Ut ornare non varius velit orci in ultrices. Aliquet sed tempor magnis nibh. Diam neque aliquam nibh quisque amet massa egestas iaculis. Dictum pulvinar vulputate sagittis adipiscing id fringilla lorem. Tellus pellentesque integer commodo nunc urna enim molestie ut faucibus. Magnis morbi duis ipsum nec ullamcorper lorem sodales. Dignissim semper pretium sed ultrices eget ac urna egestas hac. Diam justo semper gravida amet. Varius gravida ac felis massa. Urna proin vitae semper vitae. Erat imperdiet accumsan est in enim turpis ac enim. Dis scelerisque morbi risus id faucibus. Malesuada pellentesque sagittis facilisis mauris purus consequat. Eu euismod et mattis donec orci.",
    //       "Faucibus lorem sodales nec aliquet donec sed diam in. Tempor amet commodo lorem egestas.",
    //       "u egestas cras pellentesque suspendisse purus sit. Ut ornare non varius velit orci in ultrices. Aliquet sed tempor magnis nibh. Diam neque aliquam nibh quisque amet massa egestas iaculis. Dictum pulvinar vulputate sagittis adipiscing id fringilla lorem. Tellus pellentesque integer commodo nunc urna enim molestie ut faucibus. Magnis morbi duis ipsum nec ullamcorper lorem sodales. Dignissim semper pretium sed ultrices eget ac urna egestas hac. Diam justo semper gravida amet. Varius gravida ac felis massa. Urna proin vitae semper vitae. Erat imperdiet accumsan est in enim turpis ac enim. Dis scelerisque morbi risus id faucibus. Malesuada pellentesque sagittis facilisis mauris purus consequat. Eu euismod et mattis donec orci.",
    //     ],
    //   });
    //   setStatus("processed");
    // }, 8000);
    const formdata = new FormData();
    formdata.append("url", selectedPixelUrl);
    
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };
    
    fetch("https://taka-1.onrender.com/stories/url/", requestOptions)
    .then((response) => {
      console.log(response);
      response.headers.forEach((value, name) => {
        console.log(`${name}: ${value}`);
      });
      let data = response.headers.get('story'); 
      console.log(typeof data)
      const decodedString = decodeURIComponent(data);
      console.log(decodedString);
      setData({
        title:"title",
        story:[decodedString]
      })
      return response.blob();
    })
    .then((audioBlob) => {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      setAudio(audio);  
      setStatus("processed");
    })
    .catch((error) => console.error(error));
  };
  }

  return (
    <div className="Main">
      <div className="container">
        <button onClick={()=>audio.play()}>play audio</button>
        {selectedImage || selectedPixelUrl ? (
        <SelectedImage
          selectedImage={selectedImage || selectedPixelUrl}
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
            setPixel={setPixelModal}
        />
        {
            data.title? "": <Recommendations setPrompt={setPrompt} />
        }
      </div>
      {
        PixelModal? (
          <div className="pixelModal">
            <div className="closeContainer"><button id="close" onClick={() => setPixelModal(false)}>x</button></div>
            <PixelImages onImageSelect={setSelectedPixelUrl}/>
          </div>
        ) : null
      }
    
    </div>
  );
};

export default Main;
