import React from 'react';
import './Main.css';
import WelcomeMessage from '../../components/welcome/WelcomeMessage';
import PromptForm from '../../components/prompt/PromptForm';

const Main = () => {
  return (
    <div className='Main'>
        <div className="container">
        <WelcomeMessage />
        <PromptForm />
        </div>
        
    </div>
  )
}

export default Main