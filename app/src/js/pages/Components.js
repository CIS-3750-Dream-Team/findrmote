/* Components.js
 * February 27, 2021
 * Example usage of basic components
 */


function Components(props) {
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
    </div>
  )
}

export default Components;
 