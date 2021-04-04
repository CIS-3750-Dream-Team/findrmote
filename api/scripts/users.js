const db = require('../utils/db');
const users = require('./users.json');


const controls = {
  create_table: () => {
    db.query(`
      CREATE TABLE users (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        type INTEGER NOT NULL DEFAULT 0,
        status INTEGER NOT NULL DEFAULT 0,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        f_name TEXT NOT NULL,
        l_name TEXT NOT NULL,
        employer_visible BOOLEAN NOT NULL DEFAULT FALSE,
        notifications BOOLEAN NOT NULL DEFAULT FALSE,
        meta TEXT NOT NULL
      );
    `)
      .then((res) => {
        console.log('[+] Created users table');
        console.log(res);
      })
      .catch((err) => {
        console.error('[!] Users table failed');
        console.log(err);
      })
  },

  load_users: () => {
    for (const user of users)
      db.query(
        'INSERT INTO users (id, type, email, password, f_name, l_name, meta) VALUES ($1, $2, $3, $4, $5, $6, $7);',
        [user.id, user.group, user.email, user.password, user.f_name, user.l_name, JSON.stringify(meta)]
      )
        .then((res) => {
          console.log('[+] Inserted user data');
          console.log(res);
        })
        .catch((err) => {
          console.error('[!] User data insertion failed');
          console.log(err);
        })
  },

  undefined: () => console.error('[!] No instruction given')
}

controls[process.argv[2]]();
