/* March 27, 2021
 * CIS-3750 findrmote
 * Register Endpoint (/register)
 */

const uuid = require('uuid');
const db = require('../db');

/* TODO
 * Check for duplicate emails
 * Check for duplicate companies
 * Set employers to pending
 * Password encryption
 */

module.exports = {
  // Compare database credentials against req.body
  post: async (req, res) => {
    const user_id = uuid.v4();
    const type = req.body['type'];

    const f_name = req.body['first-name'].value;
    const l_name = req.body['last-name'].value;
    const email = req.body['email'].value;
    const pass = req.body['pass'].value;
    const meta = {
      education: req.body['education']?.value,
      education_lvl: req.body['education-type']?.value,
      s_date: req.body['start-date']?.value,
      e_date: req.body['end-date']?.value,
      lnk_github: req.body['link-github']?.value,
      lnk_linkedin: req.body['link-linkedin']?.value,
      lnk_website: req.body['link-website']?.value,
      company_name: req.body['company-name']?.value,
      company_desc: req.body['company-desc']?.value,
      company_loc: req.body['company-location']?.value,
      lnk_website: req.body['company-website']?.value
    };


    db.query(
      'INSERT INTO users (id, type, f_name, l_name, email, password , meta) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [user_id, type == 'candidate' ? 0 : 1, f_name, l_name, email, pass, JSON.stringify(meta)]
    )
      .then((result) => {
        res.json({success: true, error: null, data: {user_id}});
      })
      .catch((err) => {
        res.json({success: false, error: 'Failed to register user', data: null});
      });
  }
}
