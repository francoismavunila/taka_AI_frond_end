const generateStory = async (tone, imageUrl, prompt) => {
    const endpoint = "https://taka-1.onrender.com/stories/image/";
    
    const formData = new FormData();
    formData.append('tone', tone);
    formData.append('prompt', prompt);
    formData.append('image', imageUrl);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });

        console.log("Response:", response);

        if (response.ok) {
            const storyText = response.headers.get('story');
            const audioBlob = await response.blob();
            return { storyText, audioBlob };
        } else {
            const errorMessage = `Error: Failed to generate story. Status code: ${response.status}`;
            throw new Error(errorMessage);
        }
    } catch (error) {
        return { error: `Error: ${error.message}` };
    }
};

export default generateStory;