import React, {useState} from 'react';
import {HiArrowNarrowUp, HiArrowNarrowDown} from 'react-icons/hi';

import Dropdown from './Dropdown';


/** SortSelect Component
 * @prop {Function}   setSort     Sets the sorting function to be used on the home page
 */
function SortSelect({setSort}) {
  const [options, setOptions] = useState([
    {label: 'Company'},
    {label: 'Job title'},
    {label: 'Creation date'}
  ]);

  const [controls, setControls] = useState([
    {
      label: 'Sort Direction',
      icon: <HiArrowNarrowUp />,
      stage: true,
      onClick: (prev) => {
        setControls(controls.map(({label, onClick}) => ({
          label, onClick, stage: !prev, icon: prev ? <HiArrowNarrowDown /> : <HiArrowNarrowUp />
        })))
      }
    }
  ]);

  function setDropdown(selected) {
    setOptions(
      options.map(({label, active}) => ({
        label, active: (!active && label === selected)
      }))
    );
  }

  function clearDropdown(_) {
    setOptions(
      options.map(({label}) => ({
        label, active: false
      }))
    );
  }


  return (
    <Dropdown
      name='Sort'
      id='sort-select'
      className='w-100 me-5'
      options={options}
      controls={controls}
      onClick={setDropdown}
      clear={clearDropdown}
    />
  );
}

export default SortSelect;
