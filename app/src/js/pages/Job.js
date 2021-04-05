import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft, HiExternalLink } from 'react-icons/hi';

import JobControl from '../components/JobControl';

import '../../scss/job.scss';


function Job(props) {
  const [data, setData] = useState(null);
  const {job_id} = useParams();

  useEffect(() => {
    console.log(`job_id: ${job_id}`);

    fetch(`${process.env.REACT_APP_API_URL}/job/${job_id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'GET'
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        } else {
          console.log(res.error);
        }
      })
      .catch((err) => {
        // Display an error to user, tell them to refresh
        console.error(err);
      });
  }, [job_id]);


  return (
    data ? (
      <div id="jobpage" className="d-flex flex-column px-3">
        <header className="position-relative d-flex w-100 mt-5 mb-5">
          <div className="back-button mt-5 pe-3">
              <Link className="txt-1" to="/"> <HiArrowNarrowLeft size={30}/> </Link>
          </div>

          <div className="d-flex flex-column position-absolute">
            <h3 className="fs-4 txt-0"> {data.company} </h3>

            <div className="d-flex flex-wrap">
              <h1 className="fs-1 fw-bold me-5"> {data.title} </h1>
              <div className="d-flex align-items-center">
                <JobControl jobID={data.id} size="1.5em" />
              </div>
            </div>

            <div className="d-flex align-items-center">
              <a href={data.link}> View on {(new URL(data.link)).hostname} </a>
              <HiExternalLink className="ms-2" size={20}/>
            </div>
          </div>
        </header>

        <div className="job-info-wrapper mt-4">
          <div className="p-0 pb-5" dangerouslySetInnerHTML={{__html: data.description}} />
        </div>
      </div>
    ) : (
      <div className="d-flex align-items-center justify-content-center w-100 h-100">
        <div
          className="spinner-border spinner-border-lg txt-0 mb-5"
          role="status" style={{width: '5rem', height: '5rem'}}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  );
}

export default Job;
