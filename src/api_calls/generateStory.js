// const generateStory = async (tone, imageUrl, pixelUrl, prompt, currentSelection) => {
//     const formData = new FormData();
//     formData.append('tone', tone);
//     formData.append('prompt', prompt);
    
//     let endpoint;
//     if (currentSelection === "url") {
//         endpoint = "https://taka-1.onrender.com/stories/url/";
//         formData.append('url', pixelUrl);
//     }else{
//         endpoint = "https://taka-1.onrender.com/stories/image/";
//         formData.append('image', imageUrl);
//     }
    

//     try {
//         const response = await fetch(endpoint, {
//             method: 'POST',
//             body: formData
//         });

//         console.log("Response:", response);

//         if (response.ok) {
//             const storyText = response.headers.get('story');
//             console.log("19")
//             const audioBlob = await response.blob();
//             console.log("blob",audioBlob)
//             return { storyText, audioBlob };
//         } else {
//             console.log("error here")
//             const errorMessage = `Error: Failed to generate story. Status code: ${response.status}`;
//             throw new Error(errorMessage);
//         }
//     } catch (error) {
//         return { error: `Error: ${error.message}` };
//     }
// };

const generateStory = async (tone, imageUrl, pixelUrl, prompt, currentSelection) => {
    const formData = new FormData();
    formData.append('tone', tone);
    formData.append('prompt', prompt);
    
    let endpoint;
    if (currentSelection === "url") {
        endpoint = "https://taka-1.onrender.com/stories/url/";
        formData.append('url', pixelUrl);
    }else{
        endpoint = "https://taka-1.onrender.com/stories/image/";
        formData.append('image', imageUrl);
    }
    

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });

        console.log("Response:", response);

        if (response.ok) {
            const data = await response.json();
            console.log("the data", data)
            const storyText = data.story.story;
            const audioUrl = data.url;
            const title = data.title;
            console.log("Story:", storyText);
            console.log("Audio URL:", audioUrl);
            const status = true;
            return {status,title, storyText, audioUrl };
        } else {
            console.log("error here")
            const errorMessage = `Error: Failed to generate story. Status code: ${response.status}`;
            const status = false;
            return {status, error:errorMessage}
        }
    } catch (error) {
        const status = false;

        return { status,error: `Error: ${error.message}` };
    }
};

export default generateStory;