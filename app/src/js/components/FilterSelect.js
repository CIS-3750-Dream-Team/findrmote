import React, {useState} from 'react';

import Dropdown from './Dropdown';


/** FilterSelect Component
 * @prop {Array}      jobs         List of all jobs. Used to build dropdown submenu
 * @prop {Function}   setFilter    Sets the filter function to be used on the home page
 */
function FilterSelect({jobs, setFilter}) {
  const [options, setOptions] = useState([
    {
      label: 'Companies',
      options: [
        {label: 'Google'},
        {label: 'Netflix'}
      ]
    },
    {
      label: 'Job Title', 
      options: [
        {label: 'Software Engineer'},
        {label: 'Backend Developer'}
      ]
    },
    {
      label: 'Creation Date',
      options: [
        {label: '2020-12-03'},
        {label: '2021-11-02'}
      ]
    }
  ]);

  function setDropdown(selected) {
    setOptions(
      options.map(({label, active, options}) => ({
        label,
        active: (!active && label === selected) || (active && label !== selected),
        options: options?.map(({label, active}) => ({
          label, active: (!active && label === selected) || (active && label !== selected)
        }))
      }))
    );
  }

  function clearDropdown(_) {
    setOptions(
      options.map(({label, options}) => ({
        label,
        active: false,
        options: options?.map(({label}) => ({
            label, active: false
        }))
      }))
    );
  }


  return (
    <Dropdown
      name='Filter'
      id='filter-select'
      className='w-100 me-5'
      options={options}
      onClick={setDropdown}
      clear={clearDropdown}
    />
  );
}

export default FilterSelect;
