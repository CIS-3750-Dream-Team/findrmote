import React, {useState} from 'react';
import Dropdown from './Dropdown';
import {HiArrowNarrowUp as ArrowUp, HiArrowNarrowDown as ArrowDown} from 'react-icons/hi';

function FilterSelect({title, items = [], multiSelect = false}){
	// Options for the Multi-Level  Dropdown
	const [options3, setOptions3] = useState([
		{label: 'Companies', options: [
		  {label: 'Google'}, 
		  {label: 'Netflix'}
		]},
		{label: 'Job Title', options: [
		  {label: 'Software Engineer'}, 
		  {label: 'Backend Developer'}
		]},
		{label: 'Creation Date', options: [
			{label: '2020-12-03'}, 
			{label: '2021-11-02'}
		  ]}
	  ]);
	  
	  const setDropdown3 = selected => {
		setOptions3(options3.map(({label, active, options}) => ({
		  label,
		  active: (!active && label === selected),
		  options: options?.map(({label, active}) => ({
			label, active: (!active && label === selected)
		  }))
		})));
	  }
	
	  const clearDropdown3 = _ => {
		setOptions3(options3.map(({label, options}) => ({
		  label, 
		  active: false, 
		  options: options?.map(({label}) => ({
			label, active: false
		  }))
		})));
	  }
	

	return <Dropdown 
	id='dd3' 
	className='me-5' 
	name='Filter Select' 
	options={options3} 
	onClick={setDropdown3}
	clear={clearDropdown3}
  />;

}

export default FilterSelect;