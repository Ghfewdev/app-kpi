import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
//import Authlevel from '../Component/Authlevel';
import "chartjs-gauge";
import Solve from "../Component/Solve";
import Authen from '../Component/Authen';
import Fetch from '../Component/Fetch';


const Dashboard = () => {

  Authen();

  const [ans, setAns] = useState([]);
  const fet = Fetch();

  const itp = fet.map(r => r.fm_method);
  const opp = fet.map(t => t.fm_con);

  useEffect(() => {

    fetch(import.meta.env.VITE_APP_API+"/ans")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setAns(data);
      });

  }, [])

  var an;

  console.log(opp)

  if (ans != []) {
    an = <div className='container textc'>
      <br />
      <div><h1>รายงานตัวชี้วัดประจำปี 2567</h1></div>
      <br />
      <div className='col-md-3'></div>
      <table className='table table-bordered border-primary'>
        <thead className="table-dark">
          <tr>
            <th>KPI</th>
            <th>เป้าหมาย</th>
            <th>รพก</th>
            <th>รพต</th>
            <th>รพจ</th>
            <th>รพท</th>
            <th>รพว</th>
            <th>รพล</th>
            <th>รพร</th>
            <th>รพส</th>
            <th>รพข</th>
            <th>รพค</th>
            <th>รพบ</th>
            <th>สก.</th>
            <th>ศบฉ.</th>
            <th>รวม</th>
            <th>ผลการดำเนินงาน</th>
          </tr>
        </thead>
        <tbody>
          {ans.map((a, i) => {
            var ifr
            if (itp[i] === 1) {
            ifr = <th><div style={{ width: 155 }}>
            <Solve name = {a.re_sum} name2 = {(a.fm_solve)} do ={160} class={"respondash"} />
            </div></th>
            }
            else if (itp[i] === 2) {
              var t = opp[i].split(", ")
              var tt = t.reduce((x, y) => Number(x) + Number(y), 0);
              ifr = <th><h1>{tt}</h1></th>
            }
            
            return (
            <tr key={i}>
              <th>{a.fm_id}</th>
              <th>{(a.fm_solve)}</th>
              <th>{(a.h1).toFixed(2)}</th>
              <th>{(a.h2).toFixed(2)}</th>
              <th>{(a.h3).toFixed(2)}</th>
              <th>{(a.h4).toFixed(2)}</th>
              <th>{(a.h5).toFixed(2)}</th>
              <th>{(a.h6).toFixed(2)}</th>
              <th>{(a.h7).toFixed(2)}</th>
              <th>{(a.h8).toFixed(2)}</th>
              <th>{(a.h9).toFixed(2)}</th>
              <th>{(a.h10).toFixed(2)}</th>
              <th>{(a.h11).toFixed(2)}</th>
              <th>{(a.d1).toFixed(2)}</th>
              <th>{(a.d2).toFixed(2)}</th>
              <th>{(a.re_sum).toFixed(2)}</th>
              {ifr}
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  } else an = <h1>กำลังดำเนินเรียกข้อมูล</h1>

  return (
    <>
      <Navbar />
      {an}
      <br /><br />
      <Footer />
    </>
  )
}

export default Dashboard
