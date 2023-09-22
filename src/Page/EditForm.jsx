import React from 'react'
import Authlevel from '../Component/Authlevel';
import Footer from '../Component/Footer';

const EditForm = () => {

  Authlevel();

  // const check = () => {
  //   console.log(document.getElementById("ag").value)
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const JsonData = {
      password: data.get("password"),
      name: data.get("name"),
      agency: data.get("agency")
    };
    fetch("https://kpi-api.onrender.com/register/edit", {
      method: "PUT",
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
          alert("แก้ไขข้อมูลแล้ว");
        } else {
          alert("แก้ไขไม่สำเร็จ")
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
              แก้ไขผู้ใช้งานในระบบ
            </h1>
            <br /><br />
            <form onSubmit={handleSubmit} className='textc'>
              <label> <p>ส่วนราชการ</p></label> &nbsp;&nbsp;
               <select id='ag' name='agency' /*onChange={e => check()}> */ >
              <option value="รพ.กลาง">&nbsp;รพ.กลาง</option>
              <option value="รพ.ตากสิน">&nbsp;รพ.ตากสิน</option>
              <option value="รพ.เจริญกรุงประชารัก">&nbsp;รพ.เจริญกรุงประชารัก</option>
              <option value="รพ.หลวงพ่อทวีศักดิ์">&nbsp;รพ.หลวงพ่อทวีศักดิ์</option>
              <option value="รพ.เวชการุณย์รัศมิ์">&nbsp;รพ.เวชการุณย์รัศมิ์</option>
              <option value="รพ.ลาดกระบัง">&nbsp;รพ.ลาดกระบัง</option>
              <option value="รพ.ราชพิพัฒน์">&nbsp;รพ.ราชพิพัฒน์</option>
              <option value="รพ.สิรินธร">&nbsp;รพ.สิรินธร</option>
              <option value="รพ.ผู้สูงอายุบางขุนเทียน">&nbsp;รพ.ผู้สูงอายุบางขุนเทียน</option>
              <option value="รพ.คลองสามวา">&nbsp;รพ.คลองสามวา</option>
              <option value="รพ.บางนา">&nbsp;รพ.บางนา</option>
              <option value="สก.">&nbsp;สก.</option>
              <option value="สพบ.">&nbsp;สพบ.</option>
              </select>
              <br /><br />
              {/* <input className='form-control' type="text" name='agency' required/> */}
              &nbsp;&nbsp;&nbsp;
              <label> <p>ชื่อผู้ใช้งาน</p><input className='form-control' type="text" name='name' autoFocus required/> </label>
              &nbsp;&nbsp;&nbsp;
              <label> <p>รหัสผ่าน</p><input className='form-control' type="password" name="password" required/></label>
              &nbsp;&nbsp;&nbsp;
              <br /><br /><br />
              <button type='submit' className='btn btn-success'>แก้ไขข้อมูล</button>
            </form>
            <br />
            <div className='textc'><p className='inline textl'><a href="/">กลับหน้าหลัก</a></p>
              <p className='inline textr'><a href="login"></a></p>
              </div>
          </div>
        </div>
        <div><br /><br /><br /><br /><br /><br /><br /></div>

      </div>
    <Footer />
    </>
  )
}

export default EditForm
