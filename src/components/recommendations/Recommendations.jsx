import React from 'react';
import './Recommendations.css';

const Recommendations = ({setPrompt}) => {
    const recommendations = [
        // "A story about a group of friends who discover a hidden island ",
        // "The handsome detective in my town",
        // "Secrets of my sister",
        // "She is a witch, and she has fallen in love with the town's most eligible bachelor",
    ]
  return (
    <div className='recommendations'>
            {recommendations.map((recommendation, index) => (
            <div key={index} className='recommendation' >
                <p >{recommendation}</p>
            </div>
            ))}
    </div>
  )
}

export default Recommendations