import React from 'react';
import JobHeader from '../components/JobHeader';

const jobdata = {
  job_id: '5678',
  company: 'Tulip Retail',
  job_title: 'Frontend Developer',
  tags: ['jQuery', 'Javascript', 'HTML', 'CSS', 'Github'],
}

function Job(props) {
  return (
    <div id="jobpage">
      <JobHeader/>
    </div>
    
  )
}

export default Job;
