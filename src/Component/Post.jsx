import React from 'react'
import Senddetail from './Senddetail'

const Post = () => {

  if (sessionStorage.getItem("postfi") === "1") {
    Senddetail();
    setTimeout(() => {
      sessionStorage.removeItem("postfi")
      location = "addevent"
    }, 3000)
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
              บันทึกข้อมูลสำเร็จ
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
