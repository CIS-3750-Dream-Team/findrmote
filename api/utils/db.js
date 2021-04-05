const {Pool} = require('pg');
const {parse} = require('pg-connection-string');


const config = parse(`${process.env.DATABASE_URL}?ssl=true`);
config.ssl = {rejectUnauthorized: false};


module.exports = new Pool(config);
