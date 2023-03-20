import useModal from './../hooks/useModal';
import ModalForm from './ModalForm';
import FormUpdateSong from './FormUpdateSong';
import BtnPlayOrPause from './BtnPlayOrPause';
import { useRef } from 'react';



const ListSongs = ({ songs, handleSelectSong, selectedSong, togglePlay, playing, fetchData }) => {

    const { isOpen, closeModal, openModal } = useModal();
    const song = useRef(null);



    const deleteSong = async (id) => {
        try {
            //crear ModalConfirm o usar sweet alert 2
            const respuesta = window.confirm('Desea eliminar la canción');
            
            if (respuesta) {
                const data = await fetch(`https://prueba-sv-mp.blancojulian.repl.co/api/song/${id}`, { method: 'DELETE' });
                const json = await data.json();
                await fetchData(json)
                console.log(json);
                alert(json.message);
            } else {
                console.log('Se nego a eliminar la canción');
            }

        } catch (err) {
            console.log('Error al eliminar la canción ' + err)
        }

    };

    const selectOrTogglePlay = (id) => {
        if (selectedSong == null || selectedSong._id !== id) {
            handleSelectSong(id);
        } else if (selectedSong != null && id === selectedSong._id) {
            togglePlay();
        }
    };

    const isSelectedSong = (id) => {
        return selectedSong != null && id === selectedSong._id;
    };

    const playOrPauseButton = (id) => {
        return playing && isSelectedSong(id);
    };


    const updateSong = (event) => {

        const btnUpdate = event.target.closest('.btn-update')
        if (btnUpdate) {

            const idSong = btnUpdate.dataset.id;
            const songFinded = songs.find((s) => s._id === idSong);

            if (songFinded) {
                song.current = songFinded;
                openModal();
            }

        }
    }

    return (
        <div className='container-list' style={{ marginTop: 20 }}>
            {
                isOpen && song.current != null ?
                    <ModalForm
                        icon={<i className='bx bx-edit-alt' ></i>}
                        title='Update song'
                        closeModal={closeModal}
                        form={
                            <FormUpdateSong
                                id={song.current._id}
                                title={song.current.title}
                                artist={song.current.artist}
                                fetchData={fetchData}
                            />
                        }
                    >
                    </ModalForm> :
                    null
            }
            <table className='box-songs'>
                <thead>
                    <tr>
                        <th className='id' style={{ display: 'none' }}>id</th>
                        <th className='play'></th>

                        <th className='title' style={{ width: 150 }}>title</th>
                        <th className='artist' style={{ width: 150 }}>artist</th>

                        <th>options</th>
                    </tr>
                </thead>
                <tbody onClick={updateSong}>
                    {
                        songs.map((song, index) => {
                            return (
                                <tr key={index}>
                                    <td className='id' style={{ display: 'none' }}>{song._id}</td>
                                    <td className='play'>
                                        <BtnPlayOrPause
                                                handlePlay={() => selectOrTogglePlay(song._id)}
                                                isPlaying={playOrPauseButton(song._id)}
                                                isSelectedSong={isSelectedSong(song._id)}
                                            />
                                    </td>
                                    <td
                                        className='title'
                                        style={{ width: 150 }}
                                    >{song.title}</td>
                                    <td
                                        className='artist'
                                        style={{ width: 150 }}
                                    >{song.artist}</td>
                                    <td className='options'>
                                        <button className="btn btn-dark btn-update" data-id={song._id}>
                                            <i className='bx bx-edit-alt' ></i>
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteSong(song._id)}
                                        >
                                            <i className='bx bx-trash' ></i>
                                        </button>
                                    </td>

                                </tr>

                            );
                        })
                    }
                </tbody>
            </table>
        </div>

    );
}

export default ListSongs;