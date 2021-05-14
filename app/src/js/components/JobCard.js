import React from 'react';
import { Link } from 'react-router-dom';

import JobControl from './JobControl';

import '../../scss/job-card.scss';


/** JobCard Component
 * A card that displays job title, company, and job controls
 * @prop    {Object}      job           The job data object
 * @prop    {Object}      job.id        The job ID
 * @prop    {Object}      job.company   The company name
 * @prop    {Object}      job.title     The job title
 * @prop    {Object}      tags          The tags
 * @returns {Component}
 */
export default function JobCard({ job }) {
  return (
    <Link className='text-decoration-none' to={`/job:${job.id}`}>
      <div className='card jobcard mb-4 shdw-md'>
        <div className='card-body jobcard--body'>
          <h5 className='jobcard--company fw-normal'>{job.company}</h5>
          <h1 className='card-title jobcard--title'>{job.title}</h1>

          <ul className='jobcard--tags d-flex flex-row flex-wrap align-items-center'>
            {tags.map((tag, i) => (
              <li key={i}> {tag} </li>
            ))}
          </ul>

          <JobControl jobID={job.id} />
        </div>
      </div>
    </Link>
  );
}
