import React from 'react';
import {HiSearch} from 'react-icons/hi';

import '../../scss/searchbar.scss';

/** Searchbar Component
 * @description The SearchBar component with setFilters(keywords)
 * @param props.setFilters
 */

function Searchbar(setFilters) {
  return (
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"></input>
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">
        <HiSearch/> 
      </button>
    </div>
  )
}

export default Searchbar;
