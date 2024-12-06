import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
//import Authlevel from '../Component/Authlevel';
import "chartjs-gauge";
import Solve from "../Component/Solve";
import Authen from '../Component/Authen';
import Fetch from '../Component/Fetch';
import Solve2 from '../Component/solve2';
import Dash from '../Component/Dash';


const Dashboard = () => {

  Authen();

  const [ans, setAns] = useState([]);
  const [all, setAll] = useState([]);
  const [all2, setAll2] = useState([]);
  const fet = Fetch();
  const kpi = Dash(4);
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

      fetch(import.meta.env.VITE_APP_API + "/all")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setAll(data);
      });

  }, [])

  var an;

  

  //console.log(opp)
console.log(all)
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
            <th>รพภ</th>
            <th>รพร</th>
            <th>รพส</th>
            <th>รพข</th>
            <th>รพป</th>
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
            var sov = <th><h4 className='greent'>{(a.fm_solve)}</h4></th>
            var tc = [(a.h1).toFixed(2), (a.h2).toFixed(2), (a.h3).toFixed(2), (a.h4).toFixed(2), (a.h5).toFixed(2), (a.h6).toFixed(2), (a.h7).toFixed(2), (a.h8).toFixed(2), (a.h9).toFixed(2), (a.h10).toFixed(2), (a.h11).toFixed(2), (a.d1).toFixed(2), (a.d2).toFixed(2), (a.re_sum).toFixed(2)]
            if (itp[i] === 1) {
              if (a.fm_id === "20" || a.fm_id === "20.2") {
                ifr = <th><div style={{ width: 155 }}>
                  <Solve2 name={a.re_sum} name2={(a.fm_solve)} do={160} class={"respondash"} />
                </div></th>
                sov = <th><h4 className='redt'>{(a.fm_solve)}</h4></th>
              } else {
                ifr = <th><div style={{ width: 155 }}>
                  <Solve name={a.re_sum} name2={(a.fm_solve)} do={160} class={"respondash"} />
                </div></th>
                if (a.fm_id === "5") {
                  sov = <th><h4 className='redt'>{(a.fm_solve)}</h4></th>
                }
              }
            }
            else if (itp[i] === 2) {
              tc = [a.h1, a.h2, a.h3, a.h4, a.h5, a.h6, a.h7, a.h8, a.h9, a.h10, a.h11, a.d1, a.d2, a.re_sum]
              
              if (a.fm_id === "47") {
                if ((a.pa1 / 13) >= Number(opp[i]))
                  ifr = <th><h4 className='greent'>{Math.trunc(a.pa1 / 13)}</h4></th>
                else
                  ifr = <th><h4 className='redt'>{Math.trunc(a.pa1 / 13)}</h4></th>
              }
              else if (opp[i] === "0") {
                if (a.pa2 === 0)
                  ifr = <th><h4 className='greent'>{a.pa1}</h4></th>
                else
                  ifr = <th><h4 className='greent'>{a.pa2}</h4></th>
              } else {
                var t = opp[i].split(", ")
              var tt = t.reduce((x, y) => Number(x) + Number(y), 0);
                if (a.pa1 >= tt)
                  ifr = <th><h2 className='greent'>{a.pa1}</h2></th>
                else {
                  ifr = <th><h2 className='redt'>{a.pa1}</h2></th>
                }
                sov = <th><h4 className='greent'>{tt}</h4></th>
              }
            }
            else if (itp[i] === 3) {
              tc = [a.h1, a.h2, a.h3, a.h4, a.h5, a.h6, a.h7, a.h8, a.h9, a.h10, a.h11, a.d1, a.d2, a.re_sum]
              if (a.re_sum === 36)
                ifr = <th><h5 className='greent'>ส่งข้อมูลครบ</h5></th>
              else
                ifr = <th><h5 className='greent'>โครงการ</h5></th>
            }
            return (
              <tr key={i}>
                <th>{a.fm_id}</th>
                {sov}
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
