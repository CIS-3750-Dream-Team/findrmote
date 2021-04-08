import React from 'react';

import '../../scss/job-table.scss';


/** JobTable Component
 * @prop {Array}    header    The table header (an array of columns)
 * @prop {Array}    rows      Array of table rows
 */
function JobTable({header, rows}) {
  return (
    <div className="job-table container p-0 px-1">
      <div className="header row px-3 py-2 ps-4">
        {header.map((col, i) => <div key={i} className='col fw-bolder p-0 pe-3'> {col} </div>)}
      </div>

      <div className="row d-flex flex-column align-items-center px-3 py-2">
        {rows.length ? (
          rows.map((row, i) => (
            <div key={i} className="row d-flex px-2 py-0" onClick={row.onClick}>
              {row.items.map((col, i) => <div key={i} className="col d-flex align-items-center border-btm p-0 py-2"> {col} </div>)}
            </div>
          ))
        ) : (
          <i> There are no jobs in this collection! </i>
        )}
      </div>
    </div>
  );
}

export default JobTable;
