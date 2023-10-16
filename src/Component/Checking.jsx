import React, { useState, useEffect } from 'react';
import Fetch from './Fetch';
import parse from "html-react-parser";


const Checking = () => {

  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);
  const [tableData4, setTableData4] = useState([]);
  const fet = Fetch().map(f => f.fm_id);
  const fn = fet.length;
  //console.log(fet);


  if (tableData1 != undefined) {
    var a1 = tableData1.map(t => t.us_id);
    var b1 = tableData1.map(t => [t.us_id, t.fm_id]);
    var sb1 = String(b1);
  }

  if (tableData2 != undefined) {
    var a2 = tableData2.map(t => t.us_id);
    var b2 = tableData2.map(t => [t.us_id, t.fm_id]);
    var sb2 = String(b2);
  }

  if (tableData3 != undefined) {
    var a3 = tableData3.map(t => t.us_id);
    var b3 = tableData3.map(t => [t.us_id, t.fm_id]);
    var sb3 = String(b3);
  }

  if (tableData4 != undefined) {
    var a4 = tableData4.map(t => t.us_id);
    var b4 = tableData4.map(t => [t.us_id, t.fm_id]);
    var sb4 = String(b4);
  }

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_API+"/checked/1")
      .then((data) => data.json())
      .then((data) => setTableData1(data));

    fetch(import.meta.env.VITE_APP_API+"/checked/2")
      .then((data) => data.json())
      .then((data) => setTableData2(data));
    
    fetch(import.meta.env.VITE_APP_API+"/checked/3")
      .then((data) => data.json())
      .then((data) => setTableData3(data));

    fetch(import.meta.env.VITE_APP_API+"/checked/4")
      .then((data) => data.json())
      .then((data) => setTableData4(data));

  }, []);


  return (
    <>
      <div className='container-fluid'>
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงานไตรมาสที่ 1</h2>
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
                if(sb1.includes(String([i,f])))
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
      </div><br />

      <div className='container-fluid'>
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงานไตรมาสที่ 2</h2>
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
                if(sb2.includes(String([i,f])))
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
      </div><br />

      <div className='container-fluid'>
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงานไตรมาสที่ 3</h2>
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
                if(sb3.includes(String([i,f])))
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
      </div><br />

      <div className='container-fluid'>
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงานไตรมาสที่ 4</h2>
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
                if(sb4.includes(String([i,f])))
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

export default Checking;