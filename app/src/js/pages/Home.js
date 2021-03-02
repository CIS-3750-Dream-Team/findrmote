import React, {useState, useEffect} from 'react';

const API_URL = process.env.REACT_APP_API_URL;


function Home(props) {
  useEffect(() => {
    // Get job data on component render
    fetch(`${API_URL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(job_data => {
        // Store the job data in state
        console.log(job_data);
      })
      .catch(err => {
        // Display an error to user, tell them to refresh
        console.error(err);
      })
  })

  return (
    <div id='home'>
      <div className="criteria-wrapper">
        {/* Add the SortSelect, FilterSelect, and SearchBar here */}
      </div>
      <div className="job-wrapper">
        {/* Add the JobCard mapping here */}
      </div>
    </div>
  );
}

export default Home;
