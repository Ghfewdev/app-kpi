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
    fetch(import.meta.env.VITE_APP_API+"/login", {
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
          localStorage.setItem("name", data.name);
          localStorage.setItem("id", data.id);
          localStorage.setItem("department", data.agency)
          localStorage.setItem("token", data.token);
          window.location = "/";
        } else {
          alert("รหัสผ่าน หรือ ชื่อผู้ใช้ไม่ถูกต้อง")
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
              <label><p>ชื่อผู้ใช้งาน</p> <input className='form-control' type='text' name='name' autoFocus required/> </label>
              <br /><br />
              <label><p>รหัสผ่าน</p> <input className='form-control' type='password' name='password' required/> </label>
              <br /><br />
              <button type='submit' className='btn btn-success'>เข้าสู่ระบบ</button>
              <br /><br />
            </form>
            <div className='textc'><p className='inline textl'><a href="/">กลับหน้าหลัก</a></p>
              <p className='inline textr'><a href="/"></a></p>
              </div>
          </div>
        </div>
        <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>
      </div>
      <Footer />
    </>
  )
}

export default Login
