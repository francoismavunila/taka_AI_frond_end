import React, { useRef, useState } from "react"; 
import "./Main.css";
import WelcomeMessage from "../../components/welcome/WelcomeMessage";
import PromptForm from "../../components/prompt/PromptForm";
import SelectedImage from "../../components/image/SelectedImage";
import Recommendations from "../../components/recommendations/Recommendations";
import generateStory from "../../api_calls/generateStory";
import PixelImages from "../../components/pixels/PixelImages";

const Main = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPixelUrl, setSelectedPixelUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("unprocessed");
  const [data, setData] = useState({});
  const [PixelModal,setPixelModal] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentSelection, setCurrentSelection] = useState(null);
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
  const contRef = useRef(null);

//   const generateStory = (e) => {
//     e.preventDefault();
//     setStatus("unprocessed");
//     if (!selectedImage) {
//       alert("Please select an image first");

  const generateStoryy = (e) => {
    e.preventDefault();
    setStatus("unprocessed");
    if (!(selectedImage || selectedPixelUrl)) {
      alert("Please select an image first");
      
    } else if (!tone || tone === "Tone") {
        alert("Please select a tone first"); 
    } 
    else {
    setLoading(true);

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
      // response.headers.forEach((value, name) => {
      //   console.log(`${name}: ${value}`);
      // });
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

  const fetchStory = async () => {
    // e.preventDefault();
    //check whethet setSelecetdImage or selectedPixelUrl is set and give a flag that says image or url
    // if (selectedImage) {
    //     alert("image selcetd");
    // }
    // if(selectedPixelUrl){
    //     alert("url selected");
    // }
    
    setStatus("unprocessed");
    setLoading(true);
    generateStory(tone, selectedImage,selectedPixelUrl, prompt, currentSelection)
    .then(result => {
        if (result.audioBlob) {
            const audioUrl = URL.createObjectURL(result.audioBlob);
            const audio = new Audio(audioUrl);
            setAudio(audio);  
        } 

        result.storyText? setData({title:"title",story:[result.storyText]}): setData({title:"title",story:["No story generated"]});
        setStatus("processed");
    })
    .catch(error => console.error(error));
  }
  return (
    <>
    <div className="back"></div>
    <div className="Main">
      
      <div className="container" ref={contRef}>
        {
          status === "unprocessed"? <WelcomeMessage />: null
        }
      
        {selectedImage || selectedPixelUrl ? (
        <SelectedImage
          selectedImage={selectedImage? URL.createObjectURL(selectedImage) : selectedPixelUrl}
          loading={loading}
          data={data}
          status={status}
        />
        ) : (
          null
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
            fetchStory={fetchStory}
            setPixel={setPixelModal}
            currentSelection={setCurrentSelection}
            audio={audio}
        />
        {/* {
            data.title === null || selectedImage !== null ? "": <Recommendations setPrompt={setPrompt} />
        } */}
      </div>
      {
        PixelModal? (
          <div className="pixelModal">
            <div className="closeContainer"><button id="close" onClick={() => setPixelModal(false)}>x</button></div>

            <PixelImages onImageSelect={setSelectedPixelUrl} currentSelection={setCurrentSelection} setPixelModal={setPixelModal}/>
          </div>
        ) : null
      }
    
    </div>
    </>
   
  );
};
;
export default Main;

