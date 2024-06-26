import React from 'react';

const Navbar = () => {

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("department");
    localStorage.removeItem("token");
    window.location = "/";
  }

  var a, b, c

  try {
    c = localStorage.getItem("token").split("$")[1];
    a = localStorage.getItem("department");
    document.getElementById("department").value = a;
  } catch {
    if (a === undefined && c === undefined) {
      b = <>
        <li style={{ float: "right" }}><a className="active" href="login">เข้าสู่ระบบ</a></li>
        <li className='navli'><a className='navli a' href="form">ตัวชี้วัดทั้งหมด</a></li>
        <li className='navli'><a className='navli a' href="login">รายงานตัวชี้วัด</a></li>
        <li className='navli'><a className='navli a' href="login">สรุปผลตัวชี้วัด</a></li>
      </>
    } else if (c === "0") {
      b = <>
        <li style={{ float: "right" }}><a className="red" href='' onClick={handleLogout}>ออกจากระบบ</a></li>
        <li style={{ float: "right" }}><a className="active">ส่วนราชการ: {a}</a></li>
        <li className='navli'><a className='navli a' href="form">ตัวชี้วัดทั้งหมด</a></li>
        <li className='navli'><a className='navli a' href="fillup">รายงานตัวชี้วัด</a></li>
        <li className='navli'><a className='navli a' href="addevent">รายงานโครงการ</a></li>
        <li className='navli'><a className='navli a' href="calform">สรุปผลตัวชี้วัด</a></li>
      </>
    } else if (c === "1") {
      b = <>
        {/* <li style={{ float: "right" }}><a className="red" href='' onClick={handleLogout}>ออกจากระบบ</a></li>
        <li style={{ float: "right" }}><a className="active">ส่วนราชการ: {a}</a></li>
        <li className='navli'><a className='navli a' href="form">ตัวชี้วัดทั้งหมด</a></li>
        <li className='navli'><a className='navli a' href="dashboard">รายงานตัวชี้วัด</a></li>
        <li className='navli'><a className='navli a' href="calform">สรุปผลตัวชี้วัด</a></li> */}
        <li style={{ float: "right" }}><a className="red" href='' onClick={handleLogout}>ออกจากระบบ</a></li>
        <li style={{ float: "right" }}><a className="active">ส่วนราชการ: {a}</a></li>
        <li className='navli'><a className='navli a' href="form">ตัวชี้วัดทั้งหมด</a></li>
        <li className='navli'><a className='navli a' href="fillup">รายงานตัวชี้วัด</a></li>
        <li className='navli'><a className='navli a' href="calform">สรุปผลตัวชี้วัด</a></li>
      </>
    } else if (c === "9") {
      b = <>
        <li style={{ float: "right" }}><a className="red" href='' onClick={handleLogout}>ออกจากระบบ</a></li>
        <li style={{ float: "right" }}><a className="active">ส่วนราชการ: {a}</a></li>
        <li className='navli'><a className='navli a' href="form">ตัวชี้วัดทั้งหมด</a></li>
        <li className='navli'><a className='navli a' href="addform">เพิ่มตัวชี้วัด</a></li>
        <li className='navli'><a className='navli a' href="useredit">แก้ไขผู้ใช้งาน</a></li>
        {/* <li className='navli'><a className='navli a' href="dashboard">รายงานตัวชี้วัด</a></li> */}
        <li className='navli'><a className='navli a' href="calform">สรุปผลตัวชี้วัด</a></li>
      </>
    }
  }
//console.log(a)
//console.log(c)

  return (
    <>
      <ul className='navul'>
        <li className='navli'><a className='navli a' href="/">หน้าแรก</a></li>
        {b}
      </ul>
    </>
  )
}

export default Navbar
