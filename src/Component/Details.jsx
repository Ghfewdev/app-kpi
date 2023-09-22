import React, {useState, useEffect} from "react";

function Details() {
  
  const [num, setNum] = useState([]);

  const f = () => {
    fetch(import.meta.env.VITE_APP_API+"/detail")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setNum(data)
      })

  }
  
  var a = num.map(aa=>aa.de_id);
  var b = Math.max(...a);
  // if(b == -Infinity)
  // b = 0
  // console.log(b)

  useEffect(() => {
    f();
  
  }, []);

  return b

}

export default Details
