import { useState, useRef } from 'react';
import VolumeIcon from './VolumeIcon';


const VolumeBar = ({handleVolume, volume}) => {
  
    const [isMouseOver, setIsMouseOver] = useState(false);
    const lastVolume = useRef(null);
    const drag = useRef(false);
    const containerElem = useRef(null);
    
    const setVolume = (event) => {
      
      const width = containerElem.current.offsetWidth;
      const clickX = event.nativeEvent.offsetX;
      
      let volume = (clickX / width);
      volume = volume > 0.96 ? 1 : volume < 0.01 ? 0 : volume;
      
      handleVolume(volume);
    }
    
    const handleSilence = () => {
      if(volume > 0) {
        lastVolume.current = volume;
        handleVolume(0);
      } else if(lastVolume.current !== null) {
        handleVolume(lastVolume.current);
      }
    }

    return (
      
        <div
          className='volume-bar-container'
          onMouseOver={() => setIsMouseOver(true)}
          onMouseOut={() => {
            drag.current = false;
            setIsMouseOver(false);
          }}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
          >
          <button
            onClick={handleSilence}
            className='btn-effect'
            style={{borderRadius: '10px', height:'100%', width: '100%'}}>
            <VolumeIcon volume={volume} />
          </button>
          
          <div style={{width: 0, height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div
              style={{background: '#EBEDEF', position: 'absolute', borderRadius: '10px'}}
              onMouseMove={(event) => {
                  if(drag.current) setVolume(event);
                }}
             
              >
              <div
                ref={containerElem}
                onClick={setVolume}
                onMouseDown={() => drag.current = true}
                onMouseUp={() => drag.current = false}
                
                className='volume-container'
                style={ isMouseOver ? { width: '100px'} : {display: 'none'} }
                >
                <div
                  className='volume'
                  style={volume ? {width: `${volume * 100}%`} : {width: '0%'}}
                  ></div>
              </div>
            </div>
          </div>
          
          
        </div>
    );
  }

  export default VolumeBar;