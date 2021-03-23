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
          company: 'Google',
          job_title: 'Software Developer',
          tags: ['Firebase', 'Javascript', 'HTML', 'Github', 'Python', 'Golang', 'Bash'],
        },
        {
          job_id: '5678',
          company: 'Tulip Retail',
          job_title: 'Frontend Developer',
          tags: ['jQuery', 'Javascript', 'HTML', 'CSS', 'Github'],
        },
        {
          job_id: '9888',
          company: 'NCR',
          job_title: 'Software Developer',
          tags: ['Java', 'Github', 'HTML', 'Unit Testing', 'Git'],
        },
        {
          job_id: '9995',
          company: 'The Cooperators',
          job_title: 'Fullstack Developer',
          tags: ['CSS', 'Javascript', 'Github', 'HTML', 'Git', 'Kafka', 'Python'],
        },
        {
          job_id: '9699',
          company: 'Mozilla',
          job_title: 'Quality Assurance',
          tags: ['Github', 'Javascript'],
        }
      ]
    });
  }
}
