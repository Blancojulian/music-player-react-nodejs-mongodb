import useAudio from "../hooks/useAudio";
import ListSongs from "./ListSongs";
import ProgressBar from "./ProgressBar";
import VolumeBar from "./VolumeBar";
import FormSubmitAudio from "./FormSubmitAudio";
import BtnModalForm from "./BtnModalForm";

const MusicPlayer = () => {
  
    const {
      audioElem,
      selectedSong,
      songs,
      playing,
      replay,
      time,
      duration,
      volume,
      togglePlay,
      toggleReplay,
      nextSong,
      prevSong,
      selectSong,
      songEnded,
      updateTime,
      audioDuration,
      setCurrentTime,
      setCurrentVolume,
      updateVolume,
      fetchData
  
    } = useAudio();
    

    return (
      <div className='container'>

        <audio
          ref={audioElem}
          onEnded={songEnded}
          onTimeUpdate={updateTime}
          onCanPlayThrough={audioDuration}
          onVolumeChange={updateVolume}
          ></audio>

        <div className='title'>{selectedSong != null ? selectedSong.title : 'title'}</div>
        <div className='artist'>{selectedSong != null ? selectedSong.artist : 'artist'}</div>

        <ProgressBar 
          time={time}
          duration={duration}
          setCurrentTime={setCurrentTime}
          />
        
        <div className='box-buttons'>
          
            <button
              className='btn-effect'
              onClick={prevSong}><i className='bx bx-skip-previous'></i></button>
            <button
              className='btn-effect'
              onClick={togglePlay}>
              {playing ? <i className='bx bx-pause'></i> : <i className='bx bx-play'></i>}
            </button>
            <button
              className='btn-effect'
              onClick={nextSong}><i className='bx bx-skip-next'></i>
            </button>
            <button
              onClick={toggleReplay}
              className={`btn-effect ${replay ? 'btn-replay-on' : 'btn-replay-off'}`}>
              <i className='bx bx-repeat'></i>
            </button>
            
            <VolumeBar
              className='btn-control'
              volume={volume}
              handleVolume={setCurrentVolume}
            />
          
        </div>
        
        <hr style={{width: '90%'}}/>

        <BtnModalForm
          textBtn='Add song'
          icon={<i className='bx bx-plus-medical'></i>}
          title='Add song'
          form={<FormSubmitAudio fetchData={fetchData}/>}
          >
        </BtnModalForm>

        <ListSongs
          songs={songs}
          handleSelectSong={selectSong}
          selectedSong={selectedSong}
          togglePlay={togglePlay}
          playing={playing}
          fetchData={fetchData}
          />
         
        
      </div>
    );
  }


  export default MusicPlayer;