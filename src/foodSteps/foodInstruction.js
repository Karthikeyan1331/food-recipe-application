import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import TopBar from '../component/TopBar'
import Foot from '../FrontPage/foot'
import './Instruction.css'
import CookS from './CookSymbol'
import { faL } from '@fortawesome/free-solid-svg-icons';

const FoodInstruction = () => {
  const location = useLocation();
  const data = location.state
  let ingredients = data[5].split(','), directions = data[8].split('.').filter(direction => direction.trim() !== '');
  
  const [isSpeechEnded, setIsSpeechEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Initially, set to true to display the play icon

  const toggleIcon = () => {
    setIsPlaying(prevIsPlaying => !prevIsPlaying)
  };
  function DestroyVoice(){
    if(!isPlaying){
      setIsSpeechEnded(prevIsPlaying => !prevIsPlaying)
      toggleIcon();
    }
  }
  useEffect(() => {
    console.log(isPlaying,isSpeechEnded);
    if(!isPlaying && !isSpeechEnded){
      let text=directions.join(". ");
      let speech=new SpeechSynthesisUtterance()
      let voice=window.speechSynthesis.getVoices();
      speech.voice=voice[3]
      speech.text=text
      
      window.speechSynthesis.speak(speech)
      setIsSpeechEnded(true);
      speech.onend = () => {
        setIsSpeechEnded(false);
        setIsPlaying(true); // Reset isPlaying to false after speech ends
      };
      // window.speechSynthesis.speak(value);
      
    }
    else if(isSpeechEnded && isPlaying){
      window.speechSynthesis.pause();
    }
    else if(isSpeechEnded && !isPlaying){
      window.speechSynthesis.resume();
    }
    else {
      // If currently paused, stop the speech
      window.speechSynthesis.cancel();
    }
    
  }, [isPlaying]); // 
  const handleKeyPress = (event) => {
    if (event.key === 'k') {
      toggleIcon();
    }
    // console.log(isPlaying,"Ass wipe")
    if(event.key==='e'){
      DestroyVoice()
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying]);
  return (
    <div className=''>
      <TopBar />
      <div className='Recipe'>
        <div className='RecipeName'>
          {data[0]}
        </div>
        <div className='Rating'>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-half"></i>
          <i className="bi bi-star"></i>
          <div className='mt-[.2vw] ml-[.2vw]'>(999)</div>
          <div className='mt-[.2vw] ml-[.5vw] font-bold'>{data[1]}</div>
        </div>
        <div className='AbovePic'>
          <div className='Save'><i className="bi bi-bookmark"></i></div>
          <div className='Save'><i className="bi bi-download"></i></div>
          <div className='Save'><i className="bi bi-printer"></i></div>
          <div className='Save'><i className="bi bi-share"></i></div>
          <div className='IMadeThis'><i className="bi bi-camera"></i>&nbsp;&nbsp;My Work</div>
        </div>
        <div className='mt-[1vw] bg-blue-100'>
          <img src={data[4]} alt='' />
        </div>
        <div className='mt-[3vw] border-b border-dashed border-black'>
          <div className='flex foodIcon'>
            <div><i className="bi bi-clock-history text-stock text-[1.5vw]"></i></div>
            <div>Duration:</div>
            <div>{data[6]}min</div>
          </div>
          <div className='flex mt-[1.5vw] foodIcon'>
            <CookS needI='ingredient' />

            <div>Ingredients:</div>
            <div>{ingredients.length}</div>
          </div>
          <div className='flex transform translate-x-[40vw] translate-y-[-3.2vw] foodIcon'>
            <CookS needI='cook' />
            <div>Serves:</div>
            <div>{data[7]}</div>
          </div>
        </div>
        <div className='flex text-[2vw] mt-[2vw]'>
          <div className='w-[33vw]'>
            <div className='flex'>
              <div className='mr-[.5vw]'>DIRECTIONS</div>
              {isPlaying === true ? (
                // If isPlaying is true, display the voice icon
                <i className="bi bi-play-fill Voice" title='Press "K" to read' onClick={toggleIcon}></i>
              ) : (
                // If isPlaying is false, display the pause icon and the end icon
                <div>
                  <i className="bi bi-pause-circle Pause" title='Press "K" to pause' onClick={toggleIcon}></i>
                  <i className="bi bi-circle-fill Ennd" title='Press "E" to begin' onClick={DestroyVoice}></i>
                </div>
              )}
            </div>
            <ol className='list-decimal ml-[1.5vw] text-base md:text-[1.1vw] StepsDirections'>
              {directions.map((item, index) => (
                <li key={index}>{item}.</li>
              ))}
            </ol>
          </div>
          <div className='ml-[3vw] w-[25vw]'>
            <div>INGREDIENTS</div>
            {ingredients.map((item, index) => (
              <div
                className='flex text-base md:text-[1.1vw] mt-[1vw] StepsDirections'
                key={index}>{item}</div>
            ))}
            <div className='flex text-base md:text-[1.1vw] mt-[1vw] StepsDirections'>
              <p>2</p>
              <p>g chill power</p>
            </div>


          </div>

        </div>
      </div>
      <div>
        <Foot />
      </div>
    </div>
  )
}

export default FoodInstruction