import React, { useEffect, useContext, Component } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import {
  HiHeart,
  HiOutlineHeart,
  HiCheckCircle,
  HiBookmark,
  HiOutlineBookmark,
  HiOutlineCheckCircle,
  HiEyeOff,
  HiOutlineEyeOff,
} from 'react-icons/hi';

import { Session } from '../utils/contexts';

import '../../scss/job-control.scss';


// TODO: create a tooltip component or use react-tooltip and wrap the controls around the tooltip. Team discussion required

/** JobControl Component
 * Four buttons that allow a user to mark a job as liked, bookmarked, applied, or hidden
 * @prop {String}   jobID   The ID of the associated job
 * @prop {Number}   likes   (TBD) The number of likes the job has
 * @prop {String}   size    The size of the control icons (measured in em)
 * @returns {Component}
 */
export default function JobControls({ jobID, likes, settings, size = '1em' }) {
  const { id: userID, collections, setCollection } = useContext(Session);
  const history = useHistory();

  settings = settings || { liked: true, bookmarked: true, applied: true, hidden: true };

  useEffect(() => {
    const state = collections.get(jobID);

    if (collections?.sync === jobID) {
      if (userID) {
        fetch(`${process.env.REACT_APP_API_URL}/collections`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({ user_id: userID, job_id: jobID, state }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setCollection(jobID, collections.get(jobID));
            } else {
              console.log(res.error);
            }
          })
          .catch((err) => {
            // Display an error popup
            console.error(err);
          });
      } else {
        setCollection(jobID, {});

        swal({
          icon: 'warning', title: 'Uh oh!', text: 'You must be logged in to use collections',
          buttons: {
            confirm: { text: 'Sign up!', value: true },
            cancel: { text: 'Cancel', value: false, visible: true }
          }
        })
          .then((value) => {
            if (value) history.push('/login');
          });
      }
    }
  }, [collections]);


  function setState(collection, e) {
    const c = collections.get(jobID);
    setCollection(jobID, ({ ...c, [collection]: !c?.[collection] }), jobID);
    e.stopPropagation();
    e.preventDefault();
  }


  return (
    <div className='job-controls row'>
      {settings?.liked && (
        <div className='col-3 ms-0'>
          <button className='job-control--button' onClick={(e) => setState('liked', e)}>
            {collections.get(jobID)?.liked ? (
              <HiHeart size={size} color='#ef4444' />
            ) : (
              <HiOutlineHeart size={size} color='#ef4444' />
            )}
          </button>
        </div>
      )}
      {settings?.bookmarked && (
        <div className='col-3'>
          <button className='job-control--button' onClick={(e) => setState('bookmarked', e)}>
            {collections.get(jobID)?.bookmarked ? (
              <HiBookmark size={size} color='#2f80ed' />
            ) : (
              <HiOutlineBookmark size={size} color='#2f80ed' />
            )}
          </button>
        </div>
      )}
      {settings?.applied && (
        <div className='col-3'>
          <button className='job-control--button' onClick={(e) => setState('applied', e)}>
            {collections.get(jobID)?.applied ? (
              <HiCheckCircle size={size} color='#4ade80' />
            ) : (
              <HiOutlineCheckCircle size={size} color='#4ade80' />
            )}
          </button>
        </div>
      )}
      {settings?.hidden && (
        <div className='col-3'>
          <button className='job-control--button' onClick={(e) => setState('hidden', e)}>
            {collections.get(jobID)?.hidden ? (
              <HiEyeOff size={size} color='#ffa214' />
            ) : (
              <HiOutlineEyeOff size={size} color='#ffa214' />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
