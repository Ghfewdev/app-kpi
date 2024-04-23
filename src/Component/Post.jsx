import React from 'react'
import Senddetail from './Senddetail'

const Post = () => {

  if (sessionStorage.getItem("postfi") === "1") {
    Senddetail();
    
  } else {
    location = "/"
  }

  return (
    <>
      <div className='bgi'>
        <br /><br /><br /><br /><br /><br /><br />
        <div className="card">
          <br /><br /><br />
          <div className="container">
            <br />

            <h1 className='textc'>
              กำลังดำเนินการบันทึกข้อมูลกรุณารอดำเนินการ
            </h1>
            <br />

          </div>
          <br /><br /><br />
        </div>
        <div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></div>

      </div>
    </>
  )
}

export default Post
