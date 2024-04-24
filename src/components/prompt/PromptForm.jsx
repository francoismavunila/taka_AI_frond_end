import React, {useState} from 'react';
import './PromptForm.css';
import { FaArrowRight, FaImage } from 'react-icons/fa';

const PromptForm = () => {

    const tones = ['happy', 'sad', 'angry', 'surprised', 'disgusted', 'fearful', 'neutral'];
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState('');
    const [tone, setTone] = useState('');
  return (
    <div className='prompt'>
        <form className="prompt-form">
            <div className="form-group">
                <textarea type="text" className="form-control" id="prompt" placeholder="A picture is worth a thousand words. Start writing yours" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            </div>
            <div className="flex-space">
                <div className="form-group">
                    <select className="form-control" value={tone} onChange={(e) => setTone(e.target.value)}>
                        <option value=''>Tone</option>
                        {tones.map((tone, index) => <option key={index} value={tone}>{tone}</option>)}
                    </select>
                </div>
                <div className="flex-row">
                <button className='icon'>
                        <FaImage />
                    </button>
                    <button className='icon'>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default PromptForm