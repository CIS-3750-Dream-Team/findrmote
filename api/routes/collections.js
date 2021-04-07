/* April 3, 2021
 * CIS-3750 findrmote
 * Collections Endpoint (/collections)
 */

const db = require('../utils/db');
const {Logger} = require('../utils/log');


const logger = Logger('findrmote API');

module.exports = {
  // Pull all of a user's collections from the database
  get: async (req, res) => {
    userID = req.params['user_id'].replace(':', '');

    db.query('SELECT * FROM collections WHERE user_id=$1;', [userID])
      .then((result) => {
        logger.info(`(/collections) Pulled collections for ${userID}`);

        const state = result.rows.reduce(
          (state, {job_id, liked, bookmarked, applied, hidden}) => ({
            ...state, [job_id]: {liked, bookmarked, applied, hidden}
          }),
        {});

        res.json({success: true, error: null, data: state});
      })
      .catch((err) => {
        logger.error(`(/collections) Failed to pull collections for ${userID}`);
        res.json({success: false, error: 'Failed to load collections', data: null});
      });
  },

  // Mark a job as either liked, bookrmarked, applied, or hidden
  post: async (req, res) => {
    const {user_id, job_id, state} = req.body;

    // First attempt to update the record
    db.query(
      'UPDATE collections SET liked=$1, bookmarked=$2, applied=$3, hidden=$4 WHERE user_id=$5 AND job_id=$6;',
      [state.liked || false, state.bookmarked || false, state.applied || false, state.hidden || false, user_id, job_id]
    )
      .then((result) => {
        if (result.rowCount) { // Update was successful
          logger.info(`(/collections) Updated collection for ${user_id}`);
          res.json({success: true, error: null, data: null});

        } else { // Update failed because no row exists for the job yet
          db.query(
            'INSERT INTO collections (user_id, job_id, liked, bookmarked, applied, hidden) VALUES ($1, $2, $3, $4, $5, $6);',
            [user_id, job_id, state.liked || false, state.bookmarked || false, state.applied || false, state.hidden || false]
          )
            .then((result) => {
              logger.info(`(/collections) Started collection for ${user_id}`);
              res.json({success: true, error: null, data: null});
            })
            .catch((err) => {
              logger.error(`(/collections) Failed to start collection for ${user_id}:\n${err}`);
              res.json({success: false, error: 'Failed to save!', data: null});
            });
        }
      })
      .catch((err) => {
        logger.error(`(/collections) Failed to update collection for ${user_id}:\n${err}`);
        res.json({success: false, error: 'Failed to save!', data: null});
      });
  }
}
