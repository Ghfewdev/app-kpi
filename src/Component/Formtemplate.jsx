import React, { useState, useEffect } from 'react';
import Fetch from './Fetch';
import parse from "html-react-parser";


const Formtemplate = () => {

  const [tableData, setTableData] = useState([]);
  const fet = Fetch().map(f => f.fm_id);
  const fn = fet.length;
  console.log(fet);


  if (tableData != undefined) {
    var a = tableData.map(t => t.us_id);
    var b = tableData.map(t => [t.us_id, t.fm_id]);
    var sb = String(b);

  }


  useEffect(() => {
    fetch("http://localhost:3000/checked")
      .then((data) => data.json())
      .then((data) => setTableData(data));

  }, []);

  return (
    <>
      <div className='container-fluid'>
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงาน</h2>
        <br />
        <table className='table table-bordered border-primary'>
          <thead className="table-dark">
            <tr>
              <th scope="col">ตัวชี้วัด</th>
              <th scope="col">รพก</th>
              <th scope="col">รพต</th>
              <th scope="col">รพจ</th>
              <th scope="col">รพท</th>
              <th scope="col">รพว</th>
              <th scope="col">รพล</th>
              <th scope="col">รพร</th>
              <th scope="col">รพส</th>
              <th scope="col">รพข</th>
              <th scope="col">รพค</th>
              <th scope="col">รพบ</th>
            </tr>
          </thead>
          <tbody>
            {fet.map((f, i) => {
              var check = <h4 className="bi bi-x-circle"></h4>
              var y = "";

              for (var i = 10; i <= 20; i++) {
                if(sb.includes(String([i,f])))
                  y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
                  else
                  y += `<td><h4 className="bi bi-x-circle redt"></h4></td>`
                
              }

              return (
                <tr key={f}>
                  <td>{f}</td>
                  {parse(y)}
                </tr>
              )
            })}




          </tbody>
        </table>
      </div>
    </>
  );

}

export default Formtemplate;