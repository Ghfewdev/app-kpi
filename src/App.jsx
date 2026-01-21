import React from 'react';
import img from "./img/sbpbar.png"
import './App.css';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Checking from './Component/Checking';
import CheckingMatrix from './Component/Checking2';

function App() {

  return (
    <>
      <Navbar />
      <div className='bc'>
        <div className='textc'>
          <img style={{ width: "auto", height: 250 }} src={img} className="img-fluid" alt="bar" ></img>
        </div>

        <div className="container textc" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <br />
          <h1 style={{ textAlign: "center" }}>
            ระบบเก็บข้อมูล และ รายงานผลตัวชี้วัด
          </h1>
          <br />

          <CheckingMatrix />
        </div>

        <br /><br /><br /><br /><br />
      </div>
      <Footer />
    </>
  )
}

export default App
