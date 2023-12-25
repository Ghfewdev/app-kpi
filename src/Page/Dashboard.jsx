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

    fetch(import.meta.env.VITE_APP_API + "/ans")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setAns(data);
      });

  }, [])

  var an;

  //console.log(opp)

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
            var tc = [(a.h1).toFixed(2), (a.h2).toFixed(2), (a.h3).toFixed(2), (a.h4).toFixed(2), (a.h5).toFixed(2), (a.h6).toFixed(2), (a.h7).toFixed(2), (a.h8).toFixed(2), (a.h9).toFixed(2), (a.h10).toFixed(2), (a.h11).toFixed(2), (a.d1).toFixed(2), (a.d2).toFixed(2), (a.re_sum).toFixed(2)]
            if (itp[i] === 1) {
              ifr = <th><div style={{ width: 155 }}>
                <Solve name={a.re_sum} name2={(a.fm_solve)} do={160} class={"respondash"} />
              </div></th>
            }
            else if (itp[i] === 2) {
              tc = [a.h1, a.h2, a.h3, a.h4, a.h5, a.h6, a.h7, a.h8, a.h9, a.h10, a.h11, a.d1, a.d2, a.re_sum]
              if (opp[i] === "0") {
                if (a.pa2 === 0)
                  ifr = <th><h1 className='greent'>{a.pa1}</h1></th>
                else
                  ifr = <th><h1 className='greent'>{a.pa2}</h1></th>
              } else {
                var t = opp[i].split(", ")
                var tt = t.reduce((x, y) => Number(x) + Number(y), 0);
                ifr = <th><h1 className='greent'>{tt}</h1></th>
                
              }
            }
            return (
              <tr key={i}>
                <th>{a.fm_id}</th>
                <th>{(a.fm_solve)}%</th>
                <th>{tc[0]}</th>
                <th>{tc[1]}</th>
                <th>{tc[2]}</th>
                <th>{tc[3]}</th>
                <th>{tc[4]}</th>
                <th>{tc[5]}</th>
                <th>{tc[6]}</th>
                <th>{tc[7]}</th>
                <th>{tc[8]}</th>
                <th>{tc[9]}</th>
                <th>{tc[10]}</th>
                <th>{tc[11]}</th>
                <th>{tc[12]}</th>
                <th>{tc[13]}</th>
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
