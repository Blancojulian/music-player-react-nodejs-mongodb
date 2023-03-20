import { getDuration } from './../utils/utils';

const FormUpdateSong = ({ fetchData, closeModal, id, title, artist }) => {

    const updateSong = async (event) => {

        event.preventDefault();

        try {
            const formData = new FormData(event.target);
            const file = event.target.song.files[0];

            if (file) {
                const duration = await getDuration(file);
                formData.append('duration', duration);
            }

            const res = await fetch(`https://prueba-sv-mp.blancojulian.repl.co/api/song/${id}`, {
                body: formData,
                method: 'PUT'
            });

            //const json = await res.json();

            if (res.ok && fetchData) await fetchData();

            if (res.ok && closeModal) closeModal();

        } catch (err) {
            console.log('Error al modificar la cancion ' + err)
        }
    }

    return (
        <form
            onSubmit={updateSong}
            action="/api/song" enctype="multipart/form-data" method="POST">
            <div>
                <label>title</label>
                <input type="text" name="title" defaultValue={title} required />
            </div>
            <div>
                <label>artist</label>
                <input type="text" name="artist" defaultValue={artist} required />
            </div>
            <input type="file" name="song" accept='.wav,.mp3' />
            <input type="submit" value="Upload a song" />
        </form>

    );
}

export default FormUpdateSong;