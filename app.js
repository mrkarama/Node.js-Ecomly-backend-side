const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv/config');

const app = express();
const env = process.env;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());

const authRouter = require('./routes/auth');
const API = env.API_PREFIX;
app.use(`${API}/`, authRouter);

// Database connection
mongoose.connect(env.MONGO_DB_CONNECTION_STRING).then(() => {
    console.log('Connected to the Database');
}).catch((error) => {
    console.error(error);
});

const hostname = env.HOST;
const port = env.PORT;
// Start the server
app.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`);
});



