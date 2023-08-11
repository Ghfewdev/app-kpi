import React, {useState, useEffect} from "react";

function Details() {
  
  const [num, setNum] = useState([]);

  const f = () => {
    fetch("http://localhost:3000/detail")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setNum(data)
      })

  }
  
  var a = num.map(aa=>aa.de_id);
  var b = Math.max(...a);
  // console.log(b)

  useEffect(() => {
    f();
  
  }, []);

  return b

}

export default Details
