/* April 6, 2021
 * CIS-3750 findrmote
 * Profile Endpoint (/profile)
 */

const db = require('../utils/db');
const {Logger} = require('../utils/log');


const logger = Logger('findrmote API');


module.exports = {
  // Pull user data from the API by user ID
  get: async (req, res) => {
    userID = req.params['user_id'].replace(':', '');

    if (!userID.length) {
      res.json({success: false, error: 'No user ID given', data: null}); return;
    }

    db.query('SELECT * FROM users WHERE id=$1 AND status=0', [userID])
      .then((result) => {
        const userData = result.rows[0];

        userData.meta = JSON.parse(userData.meta);

        logger.info(`(/profile) Pulled profile for ${userID}`);
        res.json({success: true, error: null, data: userData});
      })
      .catch((err) => {
        logger.info(`(/profile) Failed to load user data for ${userID}`);
        res.json({success: false, error: 'Failed to load user data', data: null});
      });
  },

  // Update user data
  post: async (req, res) => {
    const user_id = req.body['userID'];
    const type = req.body['type'];
    const form = req.body['form'];

    const f_name = req.body?.values['firstName'];
    const l_name = req.body?.values['lastName'];
    const email = req.body?.values['email'];

    if (type === 'candidate') {
      notifications = req.body?.values['getNotifications'];
      employer_visible = req.body?.values['employerVisible'];

      const meta = {
        education: req.body?.values['education'],
        education_lvl: req.body?.values['degree'],
        s_date: req.body?.values['startDate'],
        e_date: req.body?.values['endDate'],
        lnk_github: req.body?.values['github'],
        lnk_linkedin: req.body?.values['linkedIn'],
        lnk_website: req.body?.values['personalSite']
      };

      db.query(
        'UPDATE users SET f_name=$2, l_name=$3, email=$4, notifications=$5, employer_visible=$6, meta=$7 WHERE id=$1;',
        [user_id, f_name, l_name, email, notifications, employer_visible, JSON.stringify(meta)]
      )
        .then((result) => {
          logger.info(`(/profile) Updated candidate profile for ${userID}`);
          res.json({success: true, error: null, data: null});
        })
        .catch((err) => {
          logger.info(`(/profile) Failed to update candidate profile for ${userID}`);
          res.json({success: false, error: 'Failed to update profile', data: null});
        });

    } else {
      if (form === 'company') {
        const email = req.body?.values['companyEmail'];

        const meta = {
          company_name: req.body?.values['companyName'],
          company_desc: req.body?.values['companyDescription'],
          company_phone: req.body?.values['companyPhone'],
          company_loc: req.body?.values['location'],
          lnk_website: req.body?.values['site']
        };

        db.query('UPDATE users SET email=$2, meta=$3 WHERE id=$1;', [user_id, email, JSON.stringify(meta)])
          .then((result) => {
            logger.info(`(/profile) Updated company information for ${userID}`);
            res.json({success: true, error: null, data: null});
          })
          .catch((err) => {
            logger.error(`(/profile) Failed to update company information for ${userID}`);
            res.json({success: false, error: 'Failed to update profile', data: null});
          });

      } else {
        db.query('UPDATE users SET f_name=$2, l_name=$3, email=$4 WHERE id=$1;', [user_id, f_name, l_name, email])
          .then((result) => {
            logger.info(`(/profile) Updated company profile for ${userID}`);
            res.json({success: true, error: null, data: null});
          })
          .catch((err) => {
            logger.error(`(/profile) Failed to update company profile for ${userID}`);
            res.json({success: false, error: 'Failed to update profile', data: null});
          });
      }
    }
  }
}
