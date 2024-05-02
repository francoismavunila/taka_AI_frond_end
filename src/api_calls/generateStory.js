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
            const storyText = response.headers.get('story');
            console.log("19")
            const audioBlob = await response.blob();
            console.log("blob",audioBlob)
            return { storyText, audioBlob };
        } else {
            console.log("error here")
            const errorMessage = `Error: Failed to generate story. Status code: ${response.status}`;
            throw new Error(errorMessage);
        }
    } catch (error) {
        return { error: `Error: ${error.message}` };
    }
};

export default generateStory;