import React, { useState, useEffect, useLayoutEffect } from 'react';

import compars from '../utils/compars';
import filters from '../utils/filters';
import JobCard from '../components/JobCard';
import SortSelect from '../components/SortSelect';
import FilterSelect from '../components/FilterSelect';
import SearchBar from '../components/SearchBar';

import '../../scss/home.scss';


export default function Home(props) {
  const [size, setSize] = useState([0, 0]);
  const [rows, setRows] = useState(4);
  const [jobs, setJobs] = useState([]);
  const [filter, setJobFilter] = useState(() => filters.allowAll);
  const [comparator, setJobSort] = useState(() => compars.noSort);

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
    if (!jobs.length) {
      const cachedJobs = JSON.parse(localStorage.getItem('jobs'));

      if (cachedJobs && cachedJobs.length) {
        setJobs(cachedJobs);

      } else {
        fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setJobs(res.data);
              localStorage.setItem('jobs', JSON.stringify(res.data));
            } else {
              console.log(res.error);
            }
          })
          .catch((err) => {
            // Display an error to user, tell them to refresh
            console.error(err);
          });
      }
    }
  }, [jobs, size]);

  function setSort(type, direction) {
    setJobSort(compars[type](direction));
  }

  function setFilter(type, value) {
    setJobFilter(filters[type](value));
  }

  useLayoutEffect(() => {
    const updateSize = () => setSize([window.innerWidth, window.innerHeight]);

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);


  return (
    <div id='home' className='d-flex flex-column px-3'>
      <div className='criteria row justify-content-center mt-5'>
        {/* Job Criteria Row (Desktop) */}
        <div className='d-none d-sm-flex row'>
          <div className='col ps-0'> <SortSelect setSort={setSort} /> </div>
          <div className='col mx-3 mx-lg-5'> <FilterSelect setFilter={setFilter} jobs={jobs} /> </div>
          <div className='col-4 col-lg-6 pe-0'> <SearchBar setFilter={setFilter} /> </div>
        </div>
        {/* Job Criteria Column (Mobile) */}
        <div className='d-block d-sm-none col-10'>
          <div className='row'> <SortSelect setSort={setSort} /> </div>
          <div className='row my-3'> <FilterSelect setFilter={setFilter} jobs={jobs} /> </div>
          <div className='row'> <SearchBar setFilter={setFilter} /> </div>
        </div>
      </div>

      <div className='content row justify-content-center'>
        <div className='col-sm col-10 mt-4 mt-sm-5 px-3'>
          <div className='row'>
            {jobs
              .sort(comparator)
              .filter(filter)
              .reduce((cols, job, i) => {
                const r = i % rows;
                if (!cols[r]) cols[r] = [];
                cols[r].push(job);
                return cols;
              }, [])
              .map((col, i) => (
                <div key={i} className='col mb-5'>
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
