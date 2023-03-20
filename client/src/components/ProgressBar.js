import { useRef } from 'react';
//import { useState, useEffect, useRef } from 'react';
import { minutosYSegundos } from './../utils/utils'

const ProgressBar = ({ time, duration, setCurrentTime }) => {

    const containerElem = useRef(null);

    const setProgress = (event) => {

        const width = containerElem.current.offsetWidth;
        const clickX = event.nativeEvent.offsetX;

        setCurrentTime((clickX / width) * duration);

    }

    return (
        <div className='progress-bar-container'>
            <div className=''>{minutosYSegundos(time) || ''}</div>

            <div className="progress-container" ref={containerElem} style={{ width: '90%' }} onClick={setProgress}>

                <div className="progress-time" style={(time && duration) ? { width: `${(time / duration) * 100}%` } : {}}></div>
            </div>

            <div className=''>{minutosYSegundos(duration) || ''}</div>

        </div>

    );
}

export default ProgressBar;