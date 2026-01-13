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
          if (data.id === 10) {
              localStorage.setItem("new", 1);
          } else if (data.id === 11) {
              localStorage.setItem("new", 2);
          } else if (data.id === 12) {
              localStorage.setItem("new", 3);
          } else if (data.id === 13) {
              localStorage.setItem("new", 4);
          } else if (data.id === 14) {
              localStorage.setItem("new", 5);
          } else if (data.id === 15) {
              localStorage.setItem("new", 6);
          } else if (data.id === 16) {
              localStorage.setItem("new", 7);
          } else if (data.id === 17) {
              localStorage.setItem("new", 8);
          } else if (data.id === 18) {
              localStorage.setItem("new", 9);
          } else if (data.id === 19) {
              localStorage.setItem("new", 10);
          } else if (data.id === 20) {
              localStorage.setItem("new", 11);
          } else if (data.id === 21) {
              localStorage.setItem("new", 12);
          } else if (data.id === 22) {
              localStorage.setItem("new", 13);
          } else if (data.id === 23) {
              localStorage.setItem("new", 14);
          } else if (data.id === 24) {
              localStorage.setItem("new", 15);
          }
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
