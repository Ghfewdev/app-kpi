import React from 'react';
import './App.css';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';

function App() {

  return (
    <>
      <Navbar />
       

<div className="card">
  <div className="container">
    <br />
    <h1>
        ระบบเก็บข้อมูล และ รายงานผลตัวชี้วัด
      </h1>
      <br />  
      <form>
        <label>Username </label><br /> <input type='text' name='name' autoFocus /> 
        <br /><br />
        <label>Password <br /> <input type='password' name='password' /> </label>
        <br /><br />
        <button type='submit'>Submit</button>
        <br /><br />
      </form>
  </div>
</div>
      <Footer />
    </>
  )
}

export default App
