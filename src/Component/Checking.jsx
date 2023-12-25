import React, { useState, useEffect } from 'react';
import Fetch from './Fetch';
import parse from "html-react-parser";


const Checking = () => {

  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);
  const [tableData4, setTableData4] = useState([]);
  const [choose, setChoose] = useState("");
  const fet = Fetch().map(f => f.fm_id);
  const fres = Fetch().map(f => [f.fm_id, f.fm_res]);
  const fn = fet.length;


  if (tableData1 != undefined) {
    var a1 = tableData1.map(t => t.fm_res);
    var sa1 = String(a1);
    var b1 = tableData1.map(t => [t.us_id, t.fm_id]);
    var sb1 = String(b1);
  }

  if (tableData2 != undefined) {
    var a2 = tableData2.map(t => t.fm_res);
    var sa2 = String(a2);
    var b2 = tableData2.map(t => [t.us_id, t.fm_id]);
    var sb2 = String(b2);
  }

  if (tableData3 != undefined) {
    var a3 = tableData3.map(t => t.fm_res);
    var sa3 = String(a3);
    var b3 = tableData3.map(t => [t.us_id, t.fm_id]);
    var sb3 = String(b3);
  }

  if (tableData4 != undefined) {
    var a4 = tableData4.map(t => t.fm_res);
    var sa4 = String(a4);
    var b4 = tableData4.map(t => [t.us_id, t.fm_id]);
    var sb4 = String(b4);
  }

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_API + "/checked/1")
      .then((data) => data.json())
      .then((data) => setTableData1(data));

    fetch(import.meta.env.VITE_APP_API + "/checked/2")
      .then((data) => data.json())
      .then((data) => setTableData2(data));

    fetch(import.meta.env.VITE_APP_API + "/checked/3")
      .then((data) => data.json())
      .then((data) => setTableData3(data));

    fetch(import.meta.env.VITE_APP_API + "/checked/4")
      .then((data) => data.json())
      .then((data) => setTableData4(data));

  }, []);

  var pq = new Date().getUTCMonth() + 1
  //console.log(pq, b1)
  var sq;
  var yg;
  if (pq >= 10)
    sq = <div className='container-fluid' id='pqq'>
    <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงานไตรมาสที่ 1 (ไตรมาสปัจจุบัน)</h2>
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
          <th scope="col">สก</th>
          <th scope="col">ศบฉ</th>
        </tr>
      </thead>
      <tbody>
        {fet.map((f, j) => {
          var check = <h4 className="bi bi-x-circle"></h4>
          var y = "";
          yg = String(fres[j])
          for (var i = 10; i <= 22; i++) {
            if (!yg.includes(String(i)))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else if (sb1.includes(String([i, f])))
            y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
            else if (i === f && !sb1.includes(String([i, f])))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else
            y += `<td><h4 className="bi bi-clock-history redt"></h4></td>`
          }
          //console.log(yg)
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
  else if (pq <= 3)
    sq = <div className='container-fluid' id='pqq'>
      <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงานไตรมาสที่ 2 (ไตรมาสปัจจุบัน)</h2>
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
            <th scope="col">สก</th>
            <th scope="col">ศบฉ</th>
          </tr>
        </thead>
        <tbody>
        {fet.map((f, j) => {
          var check = <h4 className="bi bi-x-circle"></h4>
          var y = "";
          yg = String(fres[j])
          for (var i = 10; i <= 22; i++) {
            if (!yg.includes(String(i)))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else if (sb2.includes(String([i, f])))
            y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
            else if (i === f && !sb2.includes(String([i, f])))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else
            y += `<td><h4 className="bi bi-clock-history redt"></h4></td>`
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
  else if (4 <= pq <= 6)
    sq = <div className='container-fluid' id='pqq'>
      <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงานไตรมาสที่ 3 (ไตรมาสปัจจุบัน)</h2>
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
            <th scope="col">สก</th>
            <th scope="col">ศบฉ</th>
          </tr>
        </thead>
        <tbody>
        {fet.map((f, j) => {
          var check = <h4 className="bi bi-x-circle"></h4>
          var y = "";
          yg = String(fres[j])
          for (var i = 10; i <= 22; i++) {
            if (!yg.includes(String(i)))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else if (sb3.includes(String([i, f])))
            y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
            else if (i === f && !sb3.includes(String([i, f])))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else
            y += `<td><h4 className="bi bi-clock-history redt"></h4></td>`
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
  else if (7 <= pq <= 9)
    sq = <div className='container-fluid' id='pqq'>
      <h2>ข้อมูลการส่งตัวชี้วัดรายหน่อยงานไตรมาสที่ 4 (ไตรมาสปัจจุบัน)</h2>
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
            <th scope="col">สก</th>
            <th scope="col">ศบฉ</th>
          </tr>
        </thead>
        <tbody>
        {fet.map((f, j) => {
          var check = <h4 className="bi bi-x-circle"></h4>
          var y = "";
          yg = String(fres[j])
          for (var i = 10; i <= 22; i++) {
            if (!yg.includes(String(i)))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else if (sb4.includes(String([i, f])))
            y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
            else if (i === f && !sb4.includes(String([i, f])))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else
            y += `<td><h4 className="bi bi-clock-history redt"></h4></td>`
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

  const cq = () => {
    if (choose === 'q1') {
      document.getElementById("pqq").hidden = true
      document.getElementById("pq1").hidden = false
      document.getElementById("pq2").hidden = true
      document.getElementById("pq3").hidden = true
      document.getElementById("pq4").hidden = true
    }
    else if (choose === 'q2') {
      document.getElementById("pqq").hidden = true
      document.getElementById("pq1").hidden = true
      document.getElementById("pq2").hidden = false
      document.getElementById("pq3").hidden = true
      document.getElementById("pq4").hidden = true
    }
    else if (choose === 'q3') {
      document.getElementById("pqq").hidden = true
      document.getElementById("pq1").hidden = true
      document.getElementById("pq2").hidden = true
      document.getElementById("pq3").hidden = false
      document.getElementById("pq4").hidden = true
    }
    else if (choose === 'q4') {
      document.getElementById("pqq").hidden = true
      document.getElementById("pq1").hidden = true
      document.getElementById("pq2").hidden = true
      document.getElementById("pq3").hidden = true
      document.getElementById("pq4").hidden = false
    }
    else {
      document.getElementById("pqq").hidden = false
      document.getElementById("pq1").hidden = true
      document.getElementById("pq2").hidden = true
      document.getElementById("pq3").hidden = true
      document.getElementById("pq4").hidden = true
    }
  }
  //console.log(pq, choose)

  return (
    <>
      <div>
        <select value={choose} onClick={e => cq()} onChange={e => { setChoose(e.target.value) }}>
          <option value="qq">ไตรมาสปัจจุบัน</option>
          <option value="q1">ไตรมาสที่ 1</option>
          <option value="q2">ไตรมาสที่ 2</option>
          <option value="q3">ไตรมาสที่ 3</option>
          <option value="q4">ไตรมาสที่ 4</option>
        </select>
      </div>
      <br />
      {sq}
      <div className='container-fluid' id='pq1' hidden>
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
              <th scope="col">สก</th>
              <th scope="col">ศบฉ</th>
            </tr>
          </thead>
          <tbody>
          {fet.map((f, j) => {
          var check = <h4 className="bi bi-x-circle"></h4>
          var y = "";
          yg = String(fres[j])
          for (var i = 10; i <= 22; i++) {
            if (!yg.includes(String(i)))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else if (sb1.includes(String([i, f])))
            y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
            else if (i === f && !sb1.includes(String([i, f])))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else
            y += `<td><h4 className="bi bi-clock-history redt"></h4></td>`
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
      <div className='container-fluid' id='pq2' hidden>
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
              <th scope="col">สก</th>
              <th scope="col">ศบฉ</th>
            </tr>
          </thead>
          <tbody>
          {fet.map((f, j) => {
          var check = <h4 className="bi bi-x-circle"></h4>
          var y = "";
          yg = String(fres[j])
          for (var i = 10; i <= 22; i++) {
            if (!yg.includes(String(i)))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else if (sb2.includes(String([i, f])))
            y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
            else if (i === f && !sb2.includes(String([i, f])))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else
            y += `<td><h4 className="bi bi-clock-history redt"></h4></td>`
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
      <div className='container-fluid' id='pq3' hidden>
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
              <th scope="col">สก</th>
              <th scope="col">ศบฉ</th>
            </tr>
          </thead>
          <tbody>
          {fet.map((f, j) => {
          var check = <h4 className="bi bi-x-circle"></h4>
          var y = "";
          yg = String(fres[j])
          for (var i = 10; i <= 22; i++) {
            if (!yg.includes(String(i)))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else if (sb3.includes(String([i, f])))
            y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
            else if (i === f && !sb3.includes(String([i, f])))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else
            y += `<td><h4 className="bi bi-clock-history redt"></h4></td>`
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
      <div className='container-fluid' id='pq4' hidden>
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
              <th scope="col">สก</th>
              <th scope="col">ศบฉ</th>
            </tr>
          </thead>
          <tbody>
          {fet.map((f, j) => {
          var check = <h4 className="bi bi-x-circle"></h4>
          var y = "";
          yg = String(fres[j])
          for (var i = 10; i <= 22; i++) {
            if (!yg.includes(String(i)))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else if (sb4.includes(String([i, f])))
            y += `<td><h4 className="bi bi-check-circle greent"></h4></td>`
            else if (i === f && !sb4.includes(String([i, f])))
            y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
            else
            y += `<td><h4 className="bi bi-clock-history redt"></h4></td>`
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