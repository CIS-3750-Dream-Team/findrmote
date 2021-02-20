var express = require('express');
var cors = require('cors')

require('dotenv').config();

const index = require('./routes/index');

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.get('/', index.get);


app.listen(PORT, () => {
    console.log(`findrmote-api - http://localhost:${PORT}`)
})
