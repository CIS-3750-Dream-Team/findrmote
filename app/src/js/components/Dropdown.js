import React from 'react';
import {HiChevronDown, HiChevronRight, HiOutlineXCircle} from 'react-icons/hi';

import '../../scss/dropdown.scss';


/** Dropdown Component
 * @prop {String}   className   Any classes passed to the root component
 * @prop {String}   id          The id passed to the dropdown-toggle (for bootstrap)
 * @prop {String}   name        The label for the main dropdown
 * @prop {Array}    options     The array of options for the dropdown
 * @prop {Function} clear       A function that clears the selection
 * @prop {Array}    controls    Dropdown items that can be given special functionality
 */
function Dropdown(props) {
  function setValue(e, label) {
    props.onClick?.(label);
    e.stopPropagation();
  }

  function clearValue(e) {
    props.clear();
    e.stopPropagation();
  }

  function DropdownItem(label, active, i) {
    return (
      <li key={i} className='dropdown-item' onClick={e => setValue(e, label)}>
        {label}
        <input 
          id={`${props.name}${i}`} 
          className='form-check-input ms-3'
          checked={active || false}
          onChange={() => {}}
          type='checkbox'
        />
      </li>
    );
  }

  function SubMenu(label, options, i) {
    return (
      <li key={i} className='dropdown-submenu'>
        <button className='dropdown-item dropdown-toggle'>
          {label} <HiChevronRight />
        </button>
        <ul className='dropdown-menu'>
          {options.map(({label, active}, j) => DropdownItem(label, active, j))}
        </ul>
      </li>
    );
  }


  return (
    <div className={`dropdown ` + props.className}>
      <button
        id={props.id}
        className='btn btn-secondary dropdown-toggle w-100'
        data-bs-toggle='dropdown'
        data-bs-offset='0,10'
        aria-expanded='false'
      >
        {props.name} <HiChevronDown />
      </button>

      <ul className='dropdown-menu' aria-labelledby={props.id}>
        {props.clear ? (
          <li className='dropdown-item' onClick={e => clearValue(e)}>
            Clear Selections <HiOutlineXCircle />
          </li>
        ) : null}

        {props.clear ? <div className='divider'></div> : null}

        {props.controls?.map(({label, icon, onClick, stage}, i) => (
          <li key={i} className='dropdown-item' onClick={e => onClick(stage) || e.stopPropagation()}>
            {label} {icon}
          </li>
        ))}

        {props.controls ? <div className='divider'></div> : null}

        {props.options?.map(({label, active, options}, i) => (
          // If the option has options then it's a submenu, otherwise, just an item
          options ? SubMenu(label, options, i) : DropdownItem(label, active, i)
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
