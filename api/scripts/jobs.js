const db = require('../utils/db');
const jobs = require('./positions.json');


const controls = {
  create_table: () => {
    db.query(`
      CREATE TABLE jobs (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        type TEXT NOT NULL,
        company TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        link TEXT NOT NULL,
        pay INTEGER NOT NULL DEFAULT 0,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        tags TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        status INTEGER NOT NULL DEFAULT 0
      );
    `)
      .then((res) => {
        console.log('[+] Created job table');
        console.log(res);
      })
      .catch((err) => {
        console.error('[!] Job table failed');
        console.log(err);
      })
  },

  load_jobs: () => {
    for (const job of jobs)
      db.query(
        'INSERT INTO jobs (id, type, company, title, description, link, tags) VALUES ($1, $2, $3, $4, $5, $6, $7);',
        [job.id, job.type, job.company, job.title, job.description, job.company_url, JSON.stringify(getTags())]
      )
        .then((res) => {
          console.log('[+] Inserted job data');
          console.log(res);
        })
        .catch((err) => {
          console.error('[!] Job data insertion failed');
          console.log(err);
        })
  },

  undefined: () => console.error('[!] No instruction given')
}


function getTags() {
  const num = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const tags = ['jQuery', 'Javascript', 'HTML', 'CSS', 'Github', 'Firebase', 'Javascript', 'HTML', 'Python', 'Golang', 'Bash', 'Java', 'Unit Testing', 'Git', 'CSS', 'Github', 'Kafka'];
  const res = [];

  for (let i = 0; i < num(2, 5); i++) {
    const n = num(0, tags.length-i);
    res.push(...tags.splice(n, 1));
  }

  return res;
}


controls[process.argv[2]]();
