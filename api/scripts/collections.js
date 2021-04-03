const db = require('../db');
const collections = require('./collections.json');


const controls = {
  create_table: () => {
    db.query(`
      CREATE TABLE collections (
        id SERIAL NOT NULL PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        job_id VARCHAR(36) NOT NULL,
        bookmarked BOOLEAN NOT NULL DEFAULT FALSE,
        favourite BOOLEAN NOT NULL DEFAULT FALSE,
        applied BOOLEAN NOT NULL DEFAULT FALSE,
        hidden BOOLEAN NOT NULL DEFAULT FALSE,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
      .then((res) => {
        console.log('[+] Created collections table');
        console.log(res);
      })
      .catch((err) => {
        console.error('[!] Collections table failed');
        console.log(err);
      })
  },

  load_collections: () => {
    for (const c of collections) {
      // Insert Query
    }
  },

  undefined: () => console.error('[!] No instruction given')
}

controls[process.argv[2]]();
