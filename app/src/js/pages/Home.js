import React, { useState, useEffect, useLayoutEffect } from 'react';

import compars from '../utils/compars';
import filters from '../utils/filters';
import JobCard from '../components/JobCard';

const API_URL = process.env.REACT_APP_API_URL;

function Home(props) {
  const [size, setSize] = useState([0, 0]);
  const [rows, setRows] = useState(4);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState(() => filters.allowAll);
  const [comparator, setSort] = useState(() => compars.noSort);

  useEffect(() => {
    if (size[0] > 1200)
      setRows(4);
    else if (size[0] > 1000)
      setRows(3);
    else if (size[0] > 750)
      setRows(2);
    else
      setRows(1);

    // Get job data on component render
    if (!jobs.length)
      fetch(`${API_URL}/jobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success)
            setJobs(res.data);
          else
            console.log(res.error);
        })
        .catch((err) => {
          // Display an error to user, tell them to refresh
          console.error(err);
        });

  }, [jobs, size]);


  useLayoutEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight]);

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);


  return (
    <div id="home">
      <div className="criteria-wrapper row">
        {/* Add the SortSelect, FilterSelect, and SearchBar here */}
      </div>

      <div className="row justify-content-center">
        <div className="col-sm col-10 mt-5">
          <div className="row">
            {jobs
              .filter(filter)
              .sort(comparator)
              .reduce((cols, job, i) => {
                const r = i % rows;
                if (!cols[r]) cols[r] = [];
                cols[r].push(job);
                return cols;
              }, [])
              .map((col, i) => (
                <div key={i} className="col">
                  {col.map((job, i) => <JobCard key={i} job={job} />)}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
