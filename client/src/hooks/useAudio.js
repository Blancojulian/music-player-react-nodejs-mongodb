import { useState, useEffect, useRef } from 'react';

const useAudio = () => {

    const audioElem = useRef(null);
    const flagPlaying = useRef(false);

    const [playing, setPlaying] = useState(false);
    const [replay, setReplay] = useState(false);

    const [time, setTime] = useState('');
    const [duration, setDuration] = useState('');

    const [volume, setVolume] = useState(audioElem.current ? audioElem.current.volume : 1);


    const [selectedSong, setSelectedSong] = useState(null);
    const [songs, setSongs] = useState([]);
    const [index, setIndex] = useState('');


    const togglePlay = () => {
        
        if (selectedSong == null && songs.length > 0) {

            flagPlaying.current = true;
            setIndex(0);

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
                await setPlaying(true);

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
        if (index !== '' && songs.length > 0 && selectedSong != null) {

            const i = index + 1 >= songs.length ? 0 : index + 1;
            i === index && !playing ? setPlaying(true) : setIndex(i);

        }
    }

    const prevSong = () => {

        if (index !== '' && songs.length > 0 && selectedSong != null) {

            const i = index - 1 < 0 ? songs.length - 1 : index - 1;
            i === index && !playing ? setPlaying(true) : setIndex(i);

        }
    }

    const selectSong = (id) => {

        if (songs.length > 0) {

            const song = songs.find(song => song._id === id);
            const index = songs.indexOf(song)
            if (index > -1) {
                flagPlaying.current = true;
                setIndex(index);
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
        console.log('state playing: ' + playing)

        if (audioElem.current?.src !== '' && playing) {
            flagPlaying.current = true;
            audioElem.current.play();
            console.log('playing')
        } else {
            flagPlaying.current = false;
            audioElem.current.pause();
        }
        
        return () => {
            flagPlaying.current = false;
            if (audioElem.current) audioElem.current.pause();
        }
    }, [playing])

    //ver si pide setSongs en la dependencia
    useEffect(() => {

        fetchData();

    }, [])


    useEffect(() => {

        if (index !== '') {
            const song = songs[index];
            setSelectedSong(song);
        }
// eslint-disable-next-line
    }, [index])

    useEffect(() => {
        if (selectedSong != null) {

            flagPlaying.current ? selectSourceAndPlay(selectedSong._id) : selectSource(selectedSong._id);

        }
    }, [selectedSong, setPlaying]);




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