import EventFill from './EventFill';
import Profile from './Profile';
import React, { useEffect } from 'react';

const PostEv = () => {
  const user = Profile();
  var event1 = EventFill();
  console.log(event1)

  const JsonData = {
    user: user,
    event: event1
  };

  //    if (detail == [] || detail == undefined || detail == -Infinity) {
  //      detail = 1
  //    }

  //useEffect(() => {
  if (sessionStorage.getItem("postev") === "1") {
    fetch(import.meta.env.VITE_APP_API + "/eved/fill", {
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
          console.log("logadd: success")
        } else {
          console.log("logadd: failure")
        }
      })
      .catch((error) => {
        console.log("Error: ", error)
      })
  
  //}, []);
  
  setTimeout(() => {
    sessionStorage.removeItem("postev")
    location = "/"
  }, 2000)
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
              บันทึกข้อมูลโครงการสำเร็จ
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

export default PostEv
