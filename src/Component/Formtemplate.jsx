import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { field: 'fm_id', headerName: 'รหัสตัวชี้วัด' },
  { field: 'fm_name', headerName: 'ชื่อตัวชี้วัด' },
  { field: 'us_agency', headerName: 'ส่วนราชการ' },
  { field: 'de_qur', headerName: 'ไตรมาส' },
  { field: 'fm_paras', headerName: 'ค่าที่ต้องการ' },
  { field: 'de_paras', headerName: 'ค่าที่ส่งมา' },
  { field: 'fd_date', headerName: 'วัน' },
  { field: 'fd_time', headerName: 'เวลา' },
]

const Formtemplate = () => {

const [tableData, setTableData] = useState([])

useEffect(() => {
  fetch("https://kpi-api.onrender.com/all")
    .then((data) => data.json())
    .then((data) => setTableData(data))

}, [])

  console.log(tableData)

 return (
  <div style={{ height: 400, width: '70%' }}>
  <DataGrid 
columns={columns} 
rows={tableData} 
 slots={{ toolbar: GridToolbar }}
 getRowId={(row) => row.us_id}
 />
</div>
);

}

export default Formtemplate;