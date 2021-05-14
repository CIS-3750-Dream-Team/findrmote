/* February 19, 2021
 * CIS-3750 findrmote
 * Jobs Endpoint (/jobs)
 */

const db = require('../utils/db');


module.exports = {
  // Pull all jobs from the API
  get: async (req, res) => {
    db.query('SELECT id, type, company, title, created, tags, likes FROM jobs WHERE status=0')
      .then((result) => {
        const rows = result.rows.map(r => ({ ...r, tags: JSON.parse(r.tags) }));

        res.json({ success: true, error: null, data: rows });
      })
      .catch((err) => {
        res.json({ success: false, error: 'Failed to load job data', data: null });
      });
  }
}
