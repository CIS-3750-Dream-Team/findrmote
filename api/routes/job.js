/* April 3, 2021
 * CIS-3750 findrmote
 * Job Endpoint (/job)
 */

const db = require('../db');


module.exports = {
  // Pull a job from the API by job ID
  get: async (req, res) => {
    jobID = req.params['job_id'].replace(':', '');

    db.query('SELECT * FROM jobs WHERE id=$1 AND status=0', [jobID])
      .then((result) => {
        res.json({success: true, error: null, data: result.rows[0]});
      })
      .catch((err) => {
        res.json({success: false, error: 'Failed to load job data', data: null});
      });
  }
}
