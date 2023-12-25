import React from 'react'
import Senddetail from './Senddetail'

const Post = () => {
  var chi = 0
  if (chi === 0)
  Senddetail();
  chi = 1

  setTimeout(() => {
    location = "/"
  }, 3000)

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
