import React from 'react';

import '../../scss/job-card.scss';

/**
 * @description The Job Card component with job title, company, job details
 * @param {Object} props The properties sent to the component
 * @param {Object} props.data the job data object
 * @param {Object} props.data.job_id the job id
 * @param {Object} props.data.company the company name
 * @param {Object} props.data.job_title the job_title
 * @param {Object} props.tags the tags
 * @returns {ReactElement} The Job Card component with job title, company, job details.
 */
export default function JobCard({ data }) {
  return (
    <div className="card jobcard my-5 shdw-md">
      <div className="card-body jobcard--body">
        <h5 className="jobcard--company fw-normal">{data.company}</h5>
        <h1 className="card-title jobcard--title">{data.job_title}</h1>
        <Tags tags={data.tags} />
      </div>
    </div>
  );
}

/**
 * @description Renders a list of technologies for the job
 * @param {Object} props The properties sent to the component
 * @param {string} props.tags The list of technologies that needs to be displayed as tags
 * @returns {ReactElement} The Tags component with the technology tag.
 */
function Tags({ tags }) {
  return (
    <ul className="jobcard--tags d-flex flex-row flex-wrap align-items-center">
      {tags.map((tag, i) => (
        <li key={i}>{tag}</li>
      ))}
    </ul>
  );
}
