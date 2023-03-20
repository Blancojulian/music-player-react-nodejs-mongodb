const Song = require('./../models/Song.js');
const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const UPLOAD_FOLDER = path.join(__dirname, '..', 'uploads');

// it use after multer
const createSong = async (req, res) => {

    const { title, artist, duration } = req.body;

    if (!title || !artist || !duration) return res.status(500).json({ message: 'ERROR al subir la cancion, se necesitan los datos' });
    try {

        const path = req.file.path;

        const song = new Song({
            title: title,
            artist: artist,
            duration: duration,
            audio: {
                filename: req.file.filename,
                contentType: req.file.mimetype,
                size: req.file.size

            }
        });

        await song.save();

        res.status(200).json({ message: 'exito al subir la cancion' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'ERROR al subir la cancion' });
    }

}


const getSong = async (req, res) => {

    try {
        if (!req?.params?.id) return res.status(400).json({ "message": 'Song ID required' });
        const id = req.params.id;

        const song = await Song.findOne({ _id: id });

        const range = req.headers.range;

        //const audioSize = fs.statSync(path.join(UPLOAD_FOLDER, song.audio.filename)).size;

        const size = song.audio.size;
        const contentType = song.audio.contentType;
        let readStream;
        // if there is no request about range
        if (!range) {
            console.log("Requires Range header");
            return res.status(400).send("Requires Range header");
        }


        const chunkSize = 1000000;
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + chunkSize, size - 1)
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${size}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": contentType
        }
        res.writeHead(206, headers);

        readStream = fs.createReadStream(path.join(UPLOAD_FOLDER, song.audio.filename), { start: start, end: end });
        readStream.pipe(res);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'ERROR al subir la cancion' });
    }

}

const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find({}).select('-audio -__v').exec();

        res.json(songs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'ERROR no se encontraron las canciones' });
    }
}

const deleteSong = async (req, res) => {

    const id = req?.params?.id;
    if (!id) return res.status(400).json({ message: 'Song ID required' });

    try {

        const songFinded = await Song.findOne({ _id: id });

        if (!songFinded) {
            return res.status(204).json({ message: 'No hay canción con ese ID' });
        }

        await fsPromises.unlink(path.join(UPLOAD_FOLDER, songFinded.audio.filename));

        const song = await Song.deleteOne({ _id: id });

        res.status(200).json({ message: `Canción ${songFinded.title} eliminada` });

    } catch (err) {
        console.error('Error: ' + err);
        res.status(500).json({ message: 'ERROR al eliminar la cancion' });
    }

}

const updateSong = async (req, res) => {
    const { title, artist } = req.body;
    const id = req?.params?.id;

    if (!id) return res.status(400).json({ message: 'Song ID required' });

    if (!id || !title || !artist) return res.status(401).json({ message: 'Error debe ingresar los datos de la cación' });

    try {
        const songDuplicated = await Song.findOne({ title: title, artist: artist });
        const song = await Song.findOne({ _id: id });

        if (!song) {
            return res.status(204).json({ message: 'No hay canción con ese ID' });
        }

        if (songDuplicated && song._id.toString() != songDuplicated._id.toString()) {
            return res.status(409).json({ message: `La canción ${songDuplicated.title} del artisa ${songDuplicated.artist} ya se creo` });
        }

        const query = {
            title: title,
            artist: artist
        };

        if (req.file) {
            //console.log('se agregro archivo ' + req.file.filename);
            query.audio = {
                filename: req.file.filename,
                contentType: req.file.mimetype,
                size: req.file.size
            };
        }

        const modifySong = await Song.findByIdAndUpdate(id, query);

        res.status(200).json({ message: 'Canción modificada' });

    } catch (err) {
        console.log(err + 'error al modificar la canción');
        return res.status(500).json({ message: 'Error al modificar la canción' });
    }
}

module.exports = {
    createSong,
    getSong,
    getAllSongs,
    deleteSong,
    updateSong
};