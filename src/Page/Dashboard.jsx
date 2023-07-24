import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import Authen from '../Component/Authen';

const columns = [
  { field: 'fm_id', headerName: 'ลำดับตัวชี้วัด' },
  { field: 'fm_name', headerName: 'ชื่อตัวชี้วัด', width: 400 },
  { field: 'us_agency', headerName: 'ส่วนราชการ' },
  { field: 'de_qur', headerName: 'ไตรมาส' },
  { field: 'fm_solve', headerName: 'ค่าเป้าหมาย' },
  { field: 'de_ans', headerName: 'ผลการดำเนินงาน' },
  { field: 'de_result', headerName: 'สรุป' }
]

const Dashboard = () => {

  Authen();

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://kpi-api.onrender.com/all")
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

export default Dashboard;