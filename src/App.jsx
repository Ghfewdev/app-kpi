import React from 'react';
import img from "./img/sbpbar.png"
import './App.css';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Checking from './Component/Checking';

function App() {

  return (
    <>
      <Navbar />
      <div className='bc'>
        <div className='textc'>
      <img style={{ width: "auto", height: 250 }} src={img} className="img-fluid" alt="bar" ></img>
      </div>
        <div className="container textc">
          <br />
          <h1>
            ระบบเก็บข้อมูล และ รายงานผลตัวชี้วัด ประจำปี 2567
          </h1>
          <br />
          <Checking />
        </div>
      <br /><br /><br /><br /><br />
      </div>
      <Footer />
    </>
  )
}

export default App
