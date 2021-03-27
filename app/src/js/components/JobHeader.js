import React from 'react';
import '../../scss/jobHeader.scss';
import JobControl from './JobControl';
import {HiArrowNarrowLeft, HiExternalLink} from 'react-icons/hi';


/**
 * @description The header for a job description page
 * @param {Object} props The properties sent to the component
 * @param {Object} props.job_data the job data object
 * @param {Object} props.job_data.job_id the job id
 * @param {Object} props.job_data.company the company name
 * @param {Object} props.job_data.job_title the job_title
 * @param {Object} props.tags the tags
 * @returns {ReactElement} The header with all the job's info displayed.
 */
export default function JobHeader({ job_data }) {
  const url = new URL(job_data.link);
  return (
    <div className="job-header-div">
      <div className="back-button-section">
        <HiArrowNarrowLeft className="back-button"></HiArrowNarrowLeft>
      </div>
      <div className="job-section-container">
        <h3>{job_data.company}</h3>
        <div className="job-title-function-group">
          <h1>{job_data.title}</h1>
          <div className="job-functions-div">
            <JobControl size = '1.5em'/>
          </div>
        </div>
        <div className="original-link-div">
          <a href = "#">View on {url.hostname}</a>&nbsp;&nbsp;&nbsp;
          <HiExternalLink className="external-link-icon"></HiExternalLink>
        </div>
      </div>
    </div>
    
  );
}
