import React from 'react';
import { HiSearch } from 'react-icons/hi';

import '../../scss/searchbar.scss';


/** Searchbar Component
 * Allows the user to filter through job listings by keyword(s)
 * @prop {Function}   setFilter    Sets the filter function to be used on the home page
 * @returns {Component}
 */
export default function Searchbar(props) {
  return (
    <div className='searchbar input-group mb-3'>
      <input className='form-control bg-1 py-1' placeholder='Search' type='text'></input>
      <button className='btn btn-secondary bg-2' type='button'> <HiSearch /> </button>
    </div>
  );
}
