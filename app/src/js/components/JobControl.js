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
 * @param {Object} props The properties sent to the component
 * @param {Object} props.size The size of the icons. Default is 1em
 * @returns {ReactElement} The Job Card component with job title, company, job details.
 */
export default function (props) {
  const size = props.size ?? '1em';
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
          {heart ? (
            <HiHeart size={size} color='#ef4444' />
          ) : (
            <HiOutlineHeart size={size} color='#ef4444' />
          )}
        </button>
      </div>
      <div className='col-3'>
        <button className='job-control--button' onClick={handleBookmark}>
          {bookmark ? (
            <HiBookmark size={size} color='#2f80ed' />
          ) : (
            <HiOutlineBookmark size={size} color='#2f80ed' />
          )}
        </button>
      </div>
      <div className='col-3'>
        <button className='job-control--button' onClick={handleApplied}>
          {applied ? (
            <HiCheckCircle size={size} color='#4ade80' />
          ) : (
            <HiOutlineCheckCircle size={size} color='#4ade80' />
          )}
        </button>
      </div>
      <div className='col-3'>
        <button className='job-control--button' onClick={handleHidden}>
          {hidden ? (
            <HiEyeOff size={size} color='#ffa214' />
          ) : (
            <HiOutlineEyeOff size={size} color='#ffa214' />
          )}
        </button>
      </div>
    </div>
  );
}
