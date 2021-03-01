import React from 'react';
import {HiChevronDown, HiChevronRight, HiOutlineXCircle} from 'react-icons/hi';

import '../../scss/dropdown.scss';


/** Dropdown Component
 * @prop {String}   className   Any classes passed to the root component
 * @prop {String}   id          The id passed to the dropdown-toggle (for bootstrap)
 * @prop {String}   name        The label for the main dropdown
 * @prop {Array}    options     The array of options for the dropdown
 * @prop {Function} clear       A function that clears the selection
*/

function Dropdown(props) {
  const setValue = (e, label) => {
    props.onClick?.(label);
    e.stopPropagation();
  }

  const clearValue = (e) => {
    props.clear();
    e.stopPropagation();
  }

  const DropdownItem = (label, active, i) => (
    <li key={i} className='dropdown-item' onClick={e => setValue(e, label)}>
      {label}
      <input 
        id={`${props.name}${i}`} 
        className='form-check-input'
        checked={active || false}
        onChange={() => {}}
        type='checkbox'
      />
    </li>
  )

  const SubMenu = (label, options, i) => (
    <li key={i} className='dropdown-submenu'>
      <button className='dropdown-item dropdown-toggle'>
        {label} <HiChevronRight />
      </button>
      <ul className='dropdown-menu'>
        {options.map(({label, active}, j) => DropdownItem(label, active, j))}
      </ul>
    </li>
  )

  return (
    <div className={`dropdown ` + props.className}>
      <button
        id={props.id}
        className='btn btn-secondary dropdown-toggle'
        data-bs-toggle='dropdown'
        data-bs-offset='0,10'
        aria-expanded='false'
      >
        {props.name} <HiChevronDown />
      </button>

      <ul className='dropdown-menu' aria-labelledby={props.id}>
        {props.clear ? (
          <React.Fragment>
            <li className='dropdown-item' onClick={e => clearValue(e)}>
              Clear Selections <HiOutlineXCircle />
            </li>
            <div className='divider'></div>
          </React.Fragment>
        ) : null}

        {props.options.map(({label, active, options}, i) => (
          options ? SubMenu(label, options, i) : DropdownItem(label, active, i)
        ))}
      </ul>
    </div>
  )
}

export default Dropdown;
