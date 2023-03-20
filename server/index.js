require('dotenv').config();
const dbConn = require('./config/dbConn');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/api', require('./routes/songs.js'));

dbConn.once('open', () => {
    console.log('conectado a MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}/`));
});
dbConn.on('error', (err) => {
    console.error(err);
    console.error('Error al conectarse a base de datos');

});