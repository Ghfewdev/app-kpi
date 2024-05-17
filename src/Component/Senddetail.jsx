import Details from './Details';
import Profile from './Profile';
import React, { useEffect } from 'react';

const Senddetail = () => {
  const user = Profile();
  var detail = Details();
  

  const JsonData = {
    user: user,
    detail: detail
  };

  // if (detail == [] || detail == undefined || detail == -Infinity) {
  //   detail = 1
  // }

  //useEffect(() => {
    fetch(import.meta.env.VITE_APP_API + "/formed/fill", {
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
          //console.log("logadd: success")
           setTimeout(() => {
            sessionStorage.removeItem("postfi")
            location = "addevent"
           }, 1000)
        } 
        // else {
        //   //console.log("logadd: failure")
        //   location = "/"
        // }
      })
      .catch((error) => {
        console.log("Error: ", error)
        location = "/"
      })
  //}, []);
  
}

export default Senddetail
