/* February 19, 2021
 * CIS-3750 findrmote
 * Jobs Endpoint (/jobs)
 */

module.exports = {
  get: async (req, res) => {
    res.json({
      success: true,
      error: null,
      data: [
        {
          job_id: '1234',
          company: 'Test Company',
          job_title: 'Software Developer',
          description: 'Test description.',
        }
      ]
    });
  }
}
