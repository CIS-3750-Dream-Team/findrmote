var express = require('express');
var cors = require('cors')

require('dotenv').config();

const {ExpressLogger} = require('./utils/log');

const index = require('./routes/index');
const profile = require('./routes/profile');
const collections = require('./routes/collections');
const register = require('./routes/register');
const login = require('./routes/login');
const job = require('./routes/job');
const jobs = require('./routes/jobs');


const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(ExpressLogger());


// INDEX
app.get('/', index.get);

// AUTHENTICATION
app.post('/register', register.post);
app.post('/login', login.post);

// JOB DATA
app.get('/jobs', jobs.get);
app.get('/job/:job_id', job.get);

// USER DATA
app.get('/profile/:user_id', profile.get);
app.post('/profile/', profile.post);
app.get('/collections/:user_id', collections.get);
app.post('/collections', collections.post);


app.listen(PORT, () => {
  console.log(`findrmote-api - http://localhost:${PORT}`)
});
