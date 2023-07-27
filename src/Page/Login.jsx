import React from 'react'
import Footer from '../Component/Footer';

const Login = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const JsonData = {
      name: data.get("name"),
      password: data.get("password")
    };
    fetch("https://kpi-api.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JsonData)
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.status === "ok") {
          // alert("sucess");
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("id", data.id);
          sessionStorage.setItem("department", data.agency)
          localStorage.setItem("token", data.token);
          window.location = "/";
        } else {
          alert("failed")
        }
      })
      .catch((error) => {
        console.log("Error: ", error)
      })

  }


  return (
    <>
      <div className='bgi'>
        <br /><br />
        <div className="card">
          <div className="container">
            <br />
            <h1 className='textc'>
              เข้าสู่ระบบใช้งาน
            </h1>
            <br /><br />
            <form onSubmit={handleSubmit} className='textc'>
              <label><p>ชื่อผู้ใช้งาน</p> <input className='form-control' type='text' name='name' autoFocus /> </label>
              <br /><br />
              <label><p>รหัสผ่าน</p> <input className='form-control' type='password' name='password' /> </label>
              <br /><br />
              <button type='submit' className='btn btn-success'>เข้าสู่ระบบ</button>
              <br /><br />
            </form>
            <div className='textc'><p className='inline textl'><a href="/">กลับหน้าหลัก</a></p>
              <p className='inline textr'><a href="/"></a></p>
              </div>
          </div>
        </div>
        <div><br /><br /><br /><br /><br /><br /><br /></div>
        
      </div>
      <Footer />
    </>
  )
}

export default Login
