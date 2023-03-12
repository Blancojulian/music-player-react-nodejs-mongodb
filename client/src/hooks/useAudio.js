import { useState, useEffect, useRef } from 'react';

const useAudio = () => {

    const audioElem = useRef(null);
    const flagPlaying = useRef(false);
    const index = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [replay, setReplay] = useState(false);

    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');

    const [volume, setVolume] = useState(audioElem.current ? audioElem.current.volume : 1);

    const [selectedSong, setSelectedSong] = useState(null);
    const [songs, setSongs] = useState([]);


    const togglePlay = () => {
        
        if (selectedSong == null && songs.length > 0) {

            flagPlaying.current = true;
            index.current = 0;
            setSelectedSong(songs[0]);

        } else if (songs.length > 0) {

            setPlaying(!playing);

        }

    }
    const toggleReplay = () => {
        setReplay(!replay);
    }

    const selectSource = async (id) => {

        audioElem.current.src = `https://prueba-sv-mp.blancojulian.repl.co/api/song/${id}`;
        await audioElem.current.load();

    }


    const selectSourceAndPlay = async (id) => {

        try {
            if (audioElem.current != null) {

                audioElem.current.src = `https://prueba-sv-mp.blancojulian.repl.co/api/song/${id}`;
                await audioElem.current.load();
                await audioElem.current.play();
                setPlaying(true);

            }

        } catch (err) {
            console.log('Error:\n' + err)
        }



    }

    const replaySong = () => {

        audioElem.current.currentTime = 0;
        audioElem.current.play();

    }

    const stopSong = () => {

        audioElem.current.currentTime = 0;
        audioElem.current.pause();
        setPlaying(false)

    }

    const nextSong = () => {        

        if (index.current != null && songs.length > 0 && selectedSong != null) {

            index.current = index.current + 1 >= songs.length ? 0 : index.current + 1;
            songs.length === 1 ? audioElem.current.currentTime = 0 : setSelectedSong(songs[index.current]);
            
        }
    }

    const prevSong = () => {

        if (index.current != null && songs.length > 0 && selectedSong != null) {

            index.current = index.current - 1 < 0 ? songs.length - 1 : index.current - 1;
            songs.length === 1 ? audioElem.current.currentTime = 0 : setSelectedSong(songs[index.current]);

        }
    }

    const selectSong = (id) => {

        if (songs.length > 0) {

            const song = songs.find(song => song._id === id);
            const i = songs.indexOf(song);
            
            if (song) {
                flagPlaying.current = true;
                index.current = i;
                setSelectedSong(song);
            };

        }

    }
    const songEnded = () => {

        if (songs.at(-1)._id === selectedSong._id && !replay) return stopSong();

        replay ? replaySong() : nextSong();
    }


    const updateTime = (event) => {
        setTime(event.target.currentTime);

    }

    const audioDuration = (event) => {
        setDuration(event.target.duration);
    }

    const setCurrentVolume = (volume) => {

        if (volume === '' || isNaN(volume)) return;

        volume = volume > 1 ? 1 : volume < 0 ? 0 : volume
        audioElem.current.volume = volume;

    }

    const updateVolume = (event) => {
        setVolume(event.target.volume);
    }

    const setCurrentTime = (currentTime) => {
        audioElem.current.currentTime = currentTime;
    }

    const fetchData = async () => {

        try {

            const data = await fetch(`https://prueba-sv-mp.blancojulian.repl.co/api/song`);
            const json = await data.json();
            setSongs(json);

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {

        if (audioElem.current?.src !== '' && playing) {
            flagPlaying.current = true;
            audioElem.current.play();
        } else {
            flagPlaying.current = false;
            audioElem.current.pause();
        }
        
        return () => {
            flagPlaying.current = false;
            if (audioElem.current) audioElem.current.pause();
        }
    }, [playing])

    useEffect(() => {

        fetchData();

    }, [])


    useEffect(() => {
        if (selectedSong != null) {

            flagPlaying.current ? selectSourceAndPlay(selectedSong._id) : selectSource(selectedSong._id);
            //flagPlaying.current ? selectSourceAndPlay(selectedSong.src) : selectSource(selectedSong.src);
            console.log(selectedSong);
        }
    }, [selectedSong]);




    return {
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
    }
}

export default useAudio;