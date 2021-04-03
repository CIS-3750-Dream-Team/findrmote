var express = require('express');
var winston = require('winston');
var expressWinston = require('express-winston');
var cors = require('cors')

require('dotenv').config();

const index = require('./routes/index');
const register = require('./routes/register');
//const login = require('./routes/login');
const jobs = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(expressWinston.logger({
  colorize: true,
  meta: false,
  expressFormat: false,
  msg: (req, res) => `HTTP ${res.statusCode} ${req.method} ${req.url}`,
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
}));


// INDEX
app.get('/', index.get);

// AUTHENTICATION
app.post('/register', register.post);
//app.post('/login', login.post);

// JOB DATA
app.get('/jobs', jobs.get);


app.listen(PORT, () => {
  console.log(`findrmote-api - http://localhost:${PORT}`)
});
