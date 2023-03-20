
const BtnPlayOrPause = ({handlePlay, isPlaying, isSelectedSong}) => {
  
    return (
      <button
        className='btn-effect'
        onClick={handlePlay}
        style={{
          borderRadius: 100,
          marginRight: 20,
          boxShadow: isSelectedSong ? '7px 6px 28px 1px rgba(190, 16, 16, 0.8)' : ''
        }}
        >
        <i className={ isPlaying ? 'bx bx-pause' : 'bx bx-play' }></i>
      </button> 
    );
  }

export default BtnPlayOrPause;