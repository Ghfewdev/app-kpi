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
  const fres = Fetch().map(f => f.fm_res);
  const fn = fet.length;

  function checkk(val) {

    var chg1 = []
    var chg2 = []
    var chg3 = []
    var chg4 = []
    var chg5 = []
    var chg6 = []
    var chg7 = []
    var chg8 = []
    var chg9 = []
    var chg10 = []
    var chg11 = []
    var chg12 = []
    var chg13 = []

    for (var d = 0; d <= val.length; d++) {
      if (val[d] != undefined) {
        if (val[d].includes(10))
          chg1.push(val[d][1])
        if (val[d].includes(11))
          chg2.push(val[d][1])
        if (val[d].includes(12))
          chg3.push(val[d][1])
        if (val[d].includes(13))
          chg4.push(val[d][1])
        if (val[d].includes(14))
          chg5.push(val[d][1])
        if (val[d].includes(15))
          chg6.push(val[d][1])
        if (val[d].includes(16))
          chg7.push(val[d][1])
        if (val[d].includes(17))
          chg8.push(val[d][1])
        if (val[d].includes(18))
          chg9.push(val[d][1])
        if (val[d].includes(19))
          chg10.push(val[d][1])
        if (val[d].includes(20))
          chg11.push(val[d][1])
        if (val[d].includes(21))
          chg12.push(val[d][1])
        if (val[d].includes(22))
          chg13.push(val[d][1])
      }
    }

    var y = <tbody>{fet.map((f, j) => {
      var check = <h4 className="bi bi-x-circle"></h4>
      var y = "";
      yg = String((fres[j]))
      for (var i = 10; i <= 22; i++) {
        if (!yg.includes(String(i)))
          y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
        else if (sb1.includes(String([i, f]))) {
          if (i === 10 && chg1.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 11 && chg2.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 12 && chg3.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 13 && chg4.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 14 && chg5.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 15 && chg6.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 16 && chg7.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 17 && chg8.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 18 && chg9.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 19 && chg10.includes(f))
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          else if (i === 20 && chg11.includes(f)) {
            // console.log(chg11)
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          }
            
          else if (i === 21 && chg12.includes(f)) {
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          }
          else if (i === 22 && chg13.includes(f)) {
            console.log(chg13)
            y += `<td><h4 className="bi bi-check-circle-fill greent"></h4></td>`
          }
          else {
            y += `<td><h4 className="bi bi-clock-fill redt"></h4></td>`
          }

        }
        else if (i === f && !sb1.includes(String([i, f])))
          y += `<td><h4 className="bi bi-dash-circle bluet"></h4></td>`
        else
          y += `<td><h4 className="bi bi-clock-fill redt"></h4></td>`
      }
      return (
        <tr key={f}>
          <td>{f}</td>
          {parse(y)}
        </tr>
      )
    })}
    </tbody>

    // console.log(chg13)
    return y

  }

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
  // console.log(pq, b1)
  console.log(pq)
  var sq;
  var yg;
  if (pq <= 9 && pq >= 7)
    sq = <div className='container-fluid' id='pqq'>
      <h2>ข้อมูลการส่งตัวชี้วัดรายหน่วยงานไตรมาสที่ 1 (ไตรมาสปัจจุบัน)</h2>
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
        {checkk(b1)}
      </table>
    </div>
  else if (pq <= 10)
    sq = <div className='container-fluid' id='pqq'>
      <h2>ข้อมูลการส่งตัวชี้วัดรายหน่วยงานไตรมาสที่ 2 (ไตรมาสปัจจุบัน)</h2>
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
        {checkk(b2)}
      </table>
    </div>
  else if (pq <= 3)
    sq = <div className='container-fluid' id='pqq'>
      <h2>ข้อมูลการส่งตัวชี้วัดรายหน่วยงานไตรมาสที่ 3 (ไตรมาสปัจจุบัน)</h2>
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
        {checkk(b3)}
      </table>
    </div>
  else if (pq <= 6 && pq >= 4)
    sq = <div className='container-fluid' id='pqq'>
      <h2>ข้อมูลการส่งตัวชี้วัดรายหน่วยงานไตรมาสที่ 4 (ไตรมาสปัจจุบัน)</h2>
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
        {checkk(b4)}
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
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่วยงานไตรมาสที่ 1</h2>
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
          {checkk(b1)}
        </table>
      </div>
      <div className='container-fluid' id='pq2' hidden>
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่วยงานไตรมาสที่ 2</h2>
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
          {checkk(b2)}
        </table>
      </div>
      <div className='container-fluid' id='pq3' hidden>
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่วยงานไตรมาสที่ 3</h2>
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
          {checkk(b3)}
        </table>
      </div>
      <div className='container-fluid' id='pq4' hidden>
        <h2>ข้อมูลการส่งตัวชี้วัดรายหน่วยงานไตรมาสที่ 4</h2>
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
          {checkk(b4)}
        </table>
      </div>
    </>
  );

}

export default Checking;