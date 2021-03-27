import * as React from 'react';
import {
  HiHeart,
  HiOutlineHeart,
  HiBookmark,
  HiOutlineBookmark,
  HiCheckCircle,
  HiOutlineCheckCircle,
  HiEyeOff,
  HiOutlineEyeOff,
} from 'react-icons/hi';

import '../../scss/job-control.scss';

const { useState, useEffect } = React;

// TODO: create a tooltip component or use react-tooltip and wrap the controls around the tooltip. Team discussion required

/**
 * @returns {ReactElement} The Job Card component with job title, company, job details.
 */
export default function () {
  const [jobID, setJobID] = useState('');
  const [heart, setheart] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [applied, setApplied] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleHeart = () => {
    setheart(!heart);
  };
  const handleBookmark = () => {
    setBookmark(!bookmark);
  };
  const handleApplied = () => {
    setApplied(!applied);
  };
  const handleHidden = () => {
    setHidden(!hidden);
  };

  return (
    <div className='row'>
      <div className='col-3'>
        <button className='job-control--button' onClick={handleHeart}>
          {heart ? <HiHeart color='#ef4444' /> : <HiOutlineHeart color='#ef4444' />}
        </button>
      </div>
      <div className='col-3'>
        <button className='job-control--button' onClick={handleBookmark}>
          {bookmark ? <HiBookmark color='#2f80ed' /> : <HiOutlineBookmark color='#2f80ed' />}
        </button>
      </div>
      <div className='col-3'>
        <button className='job-control--button' onClick={handleApplied}>
          {applied ? <HiCheckCircle color='#4ade80' /> : <HiOutlineCheckCircle color='#4ade80' />}
        </button>
      </div>
      <div className='col-3'>
        <button className='job-control--button' onClick={handleHidden}>
          {hidden ? <HiEyeOff color='#ffa214' /> : <HiOutlineEyeOff color='#ffa214' />}
        </button>
      </div>
    </div>
  );
}
