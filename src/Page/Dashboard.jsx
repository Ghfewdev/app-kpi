import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import Authlevel from '../Component/Authlevel';



const Dashboard = () => {

  Authlevel();

  const [ans, setAns] = useState([]);

  useEffect(() => {

    fetch("https://kpi-api.onrender.com/ans")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setAns(data);
      });

  }, [])

  var an;

  if (ans != []) {
    an = <div className='container textc'>
      <br />
      <div><h1>รายงานตัวชี้วัด</h1></div>
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
            <th>รวม</th>
          </tr>
        </thead>
        <tbody>
          {ans.map((a, i) => {
            return (
            <tr key={i}>
              <th>{a.fm_id}</th>
              <th>{(a.fm_solve).split(" ")[1]}</th>
              <th>{a.h1}</th>
              <th>{a.h2}</th>
              <th>{a.h3}</th>
              <th>{a.h4}</th>
              <th>{a.h5}</th>
              <th>{a.h6}</th>
              <th>{a.h7}</th>
              <th>{a.h8}</th>
              <th>{a.h9}</th>
              <th>{a.h10}</th>
              <th>{a.h11}</th>
              <th>{a.re_sum}</th>
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
