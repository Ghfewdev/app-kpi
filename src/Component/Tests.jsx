import React from 'react'
import Table1 from './Table1'

const Tests = () => {


  const handelPrint = () => {

    setTimeout(() => {
      window.print();
    }, 300);

  }

  return (
    <>
      <div className='d-print-none'>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header d-print-none">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Table1 />
              </div>
              <div className="modal-footer d-print-none">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={e => handelPrint()}>Print</button>
              </div>
            </div>
          </div>
        </div>

      </div><div className='d-none d-print-block'><Table1 /></div>

    </>
  )
}

export default Tests
