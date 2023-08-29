import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import Authlevel from '../Component/Authlevel';

const columns = [
  { field: 'fm_id', headerName: 'KPI' },
  //{ field: 'fm_name', headerName: 'ชื่อตัวชี้วัด', width: 400 },
  { field: 'fm_solve', headerName: 'ค่าเป้าหมาย' },
  { field: 'h1', headerName: 'รพก' },
  { field: 'h2', headerName: 'รพต' },
  { field: 'h3', headerName: 'รพจ' },
  { field: 'h4', headerName: 'รพท' },
  { field: 'h5', headerName: 'รพว' },
  { field: 'h6', headerName: 'รพล' },
  { field: 'h7', headerName: 'รพร' },
  { field: 'h8', headerName: 'รพส' },
  { field: 'h9', headerName: 'รพข' },
  { field: 'h10', headerName: 'รพค' },
  { field: 'h11', headerName: 'รพบ' },
  { field: 're_sum', headerName: 'รวม' }
]

const EditForm = () => {

  Authlevel();

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://kpi-api.onrender.com/ans")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])
 
  console.log(tableData)

  return (
    <>
    <Navbar />
    <div className='container'>
      <br />
      <h1>รายงานตัวชี้วัด</h1>
      <br />
      <div className='col-md-3'></div>
          <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
              columns={columns}
              rows={tableData}
              slots={{ toolbar: GridToolbar }}
              getRowId={(row) => Number(row.de_id)}
            />
          </div>
    </div>
    <br /><br />
    <Footer />
    </>
  );

}

export default EditForm;