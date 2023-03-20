import { getDuration } from './../utils/utils';
const FormSubmitAudio = ({ fetchData, closeModal }) => {

    const submitSong = async (event) => {
        event.preventDefault();
        console.log(event.target);
        console.log(event.target.song.files);

        try {

            const formData = new FormData(event.target);
            const file = event.target.song.files[0];
            const duration = await getDuration(file);
            formData.append('duration', duration);

            const res = await fetch(`https://prueba-sv-mp.blancojulian.repl.co/api/song`, {
                body: formData,
                method: 'POST'
            });

            //const json = await res.json();

            if (res.ok && fetchData) await fetchData();

            if (res.ok && closeModal) closeModal();

        } catch (err) {
            console.log('Error al subir la cancion ' + err)
        }
    }
    return (
        <form
            onSubmit={submitSong}
            action="/api/song" enctype="multipart/form-data" method="POST">
            <div>
                <label>Title</label>
                <input type="text" name="title" required />
            </div>
            <div>
                <label>Artist</label>
                <input type="text" name="artist" required />
            </div>
            <input type="file" name="song" accept='.wav,.mp3' required />
            <input type="submit" value="Upload a song" />
        </form>

    );
}

export default FormSubmitAudio;