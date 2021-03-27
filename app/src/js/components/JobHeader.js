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
  return (
    <div className="job-header-div">
      <div className="back-button-section">
        <HiArrowNarrowLeft className="back-button"></HiArrowNarrowLeft>
      </div>
      <div className="job-section-container">
        <h3>Tulip Retail</h3>
        <div className="job-title-function-group">
          <h1>Software Developer</h1>
          <div className="job-functions-div">
            <JobControl/>
          </div>
        </div>
        <div className="original-link-div">
          <p>
            <a href = "#">View on indeed</a>&nbsp;&nbsp;&nbsp;
            <HiExternalLink className="external-link-icon"></HiExternalLink>
          </p>
        </div>
      </div>
    </div>
  );
}
