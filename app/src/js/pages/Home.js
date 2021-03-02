import React, { useEffect } from 'react';
import JobCard from '../components/JobCard';

const API_URL = process.env.REACT_APP_API_URL;

// TODO: delete after connecting to api later. backend api doesn't send proper job_data format yet: no tags array.
const job_datas = [
  {
    job_id: '1234',
    company: 'Google',
    job_title: 'Software Developer',
    tags: [
      'Firebase',
      'Javascript',
      'HTML',
      'Github',
      'Python',
      'Golang',
      'Bash',
    ],
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
  },
];

function Home(props) {
  useEffect(() => {
    // Get job data on component render
    fetch(`${API_URL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((job_data) => {
        // Store the job data in state
        console.log(job_data);
      })
      .catch((err) => {
        // Display an error to user, tell them to refresh
        console.error(err);
      });
  }, []);

  return (
    <div id="home">
      <div className="criteria-wrapper">
        {/* Add the SortSelect, FilterSelect, and SearchBar here */}
      </div>

      {/* JobCard Container: Renders Four jobs in each row */}
      <div className="job-wrapper row my-4">
        {job_datas.map((job_data) => (
          <div className="col-12 col-md-4 col-xl-3" key={job_data.job_id}>
            <JobCard job_data={job_data} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
