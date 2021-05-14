import { useState } from 'react';
import { HiArrowNarrowUp as ArrowUp, HiArrowNarrowDown as ArrowDown } from 'react-icons/hi';

import Dropdown from '../components/Dropdown';


export default function Components(props) {
  // Options for the Single-Select Dropdown
  const [options1, setOptions1] = useState([
    { label: 'option 1', active: false },
    { label: 'option 2', active: true },
    { label: 'option 3', active: false }
  ])

  // Options for the Multi-Select Dropdown
  const [options2, setOptions2] = useState([
    { label: 'option 1' },
    { label: 'option 2' },
    { label: 'option 3' },
    { label: 'option 4' }
  ])

  // Options for the Multi-Level Dropdown
  const [options3, setOptions3] = useState([
    {
      label: 'option 1', options: [
        { label: 'sub-option 1' },
        { label: 'sub-option 2' }
      ]
    },
    {
      label: 'option 2', options: [
        { label: 'sub-option 3' },
        { label: 'sub-option 4' }
      ]
    }
  ])

  // Options for the Dropdown that has a control
  const [options4, setOptions4] = useState([
    { label: 'option 1' },
    { label: 'option 2' },
    { label: 'option 3' }
  ])

  // Controls for Dropdown4
  const [controls4, setControls4] = useState([
    {
      label: 'Sort Direction',
      icon: <ArrowUp />,
      stage: true,
      onClick: prev => {
        setControls4(controls4.map(({ label, onClick }) => ({
          label, onClick, stage: !prev, icon: prev ? <ArrowDown /> : <ArrowUp />
        })))
      }
    }
  ])

  // Dropdown1 onClick handler (acts as a toggle, only one value selected at a time)
  const setDropdown1 = selected => {
    setOptions1(options1.map(({ label, active }) => (
      { label, active: (!active && label === selected) }
    )));
  }

  // Dropdown2 onClick handler (allows for multiple values to be selected)
  const setDropdown2 = selected => {
    setOptions2(options2.map(({ label, active }) => (
      { label, active: (!active && label === selected) || (active && label !== selected) }
    )));
  }

  const clearDropdown2 = _ => {
    setOptions2(options2.map(({ label }) => ({ label, active: false })));
  }

  // Dropdown3 onClick handler (allows for multiple values to be selected)
  const setDropdown3 = selected => {
    setOptions3(options3.map(({ label, active, options }) => ({
      label,
      active: (!active && label === selected),
      options: options?.map(({ label, active }) => ({
        label, active: (!active && label === selected)
      }))
    })));
  }

  const clearDropdown3 = _ => {
    setOptions3(options3.map(({ label, options }) => ({
      label,
      active: false,
      options: options?.map(({ label }) => ({
        label, active: false
      }))
    })));
  }

  // Dropdown1 onClick handler (acts as a toggle, only one value selected at a time)
  const setDropdown4 = selected => {
    setOptions4(options4.map(({ label, active }) => (
      { label, active: (!active && label === selected) }
    )));
  }

  const clearDropdown4 = _ => {
    setOptions4(options4.map(({ label }) => (
      { label, active: false }
    )));
  }

  return (
    <div className='d-flex flex-column w-100 h-100 my-3'>
      <div className='d-flex flex-column mb-5 me-5'>
        <h3 className='mb-3'> Buttons </h3>
        <div className='d-flex mb-3'>
          <button className='btn btn-primary btn-sm me-3'> primary </button>
          <button className='btn btn-outline-primary btn-sm me-3'> primary </button>
          <button className='btn btn-secondary btn-sm me-3'> secondary </button>
          <button className='btn btn-outline-secondary btn-sm me-3'> secondary </button>
        </div>
        <div className='d-flex mb-3'>
          <button className='btn btn-primary me-3'> primary </button>
          <button className='btn btn-outline-primary me-3'> primary </button>
          <button className='btn btn-secondary me-3'> secondary </button>
          <button className='btn btn-outline-secondary'> secondary </button>
        </div>
        <div className='d-flex mb-3'>
          <button className='btn btn-primary btn-lg me-3'> primary </button>
          <button className='btn btn-outline-primary btn-lg me-3'> primary </button>
          <button className='btn btn-secondary btn-lg me-3'> secondary </button>
          <button className='btn btn-outline-secondary btn-lg me-3'> secondary </button>
        </div>
      </div>

      <div className='d-flex flex mb-5 w-lg-50 w-sm-100'>
        <div className='d-flex flex-column me-5'>
          <input className='form-control form-control-sm mb-4' placeholder='input' />
          <input className='form-control mb-4' placeholder='input' />
          <input className='form-control form-control-lg mb-4' placeholder='input' />
        </div>
        <div className='d-flex flex-column me-5'>
          <input className='form-control form-control-sm mb-4' placeholder='disabled' disabled />
          <input className='form-control mb-4' placeholder='disabled' disabled />
          <input className='form-control form-control-lg mb-4' placeholder='disabled' disabled />
        </div>
      </div>

      <div className='d-flex flex mb-5 w-50'>
        <Dropdown
          id='dd1'
          className='me-5'
          name='Single-Select Dropdown'
          options={options1}
          onClick={setDropdown1}
        />

        <Dropdown
          id='dd2'
          className='me-5'
          name='Multi-Select Dropdown'
          options={options2}
          onClick={setDropdown2}
          clear={clearDropdown2}
        />

        <Dropdown
          id='dd3'
          className='me-5'
          name='Multi-Level Dropdown'
          options={options3}
          onClick={setDropdown3}
          clear={clearDropdown3}
        />

        <Dropdown
          id='dd4'
          className='me-5'
          name='Dropdown with a Control'
          options={options4}
          controls={controls4}
          onClick={setDropdown4}
          clear={clearDropdown4}
        />
      </div>
    </div>
  )
}
