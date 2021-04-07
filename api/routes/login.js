/* March 27, 2021
 * CIS-3750 findrmote
 * Login Endpoint (/login)
 */

const db = require('../utils/db');


module.exports = {
  // Compare database credentials against req.body
  post: async (req, res) => {
    const sent_email = req.body['email'];
    const sent_pass = req.body['password'];

    db.query('SELECT id, type, password FROM users WHERE email=$1', [sent_email])
      .then((result) => {
        if (result.rowCount == 0) {
          res.json({success: false, error: 'Invalid credentials', data: null});

        } else {
          const user_id = result.rows[0].id;
          const stored_pass = result.rows[0].password;
          const type = result.rows[0].type == 0 ? 'candidate' : 'employer';

          if (sent_pass != stored_pass) {
            res.json({success: false, error: 'Incorrect password', data: null});
          } else {
            res.json({success: true, error: null, data: {user_id, type}});
          }
        }
      })
      .catch((err) => {
        res.json({success: false, error: 'Login attempt failed', data: null});
      });
  }
}
