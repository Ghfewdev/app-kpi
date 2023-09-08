import React, { useEffect, useState } from 'react'

const Quarter = () => {

  const [quar, setQuar] = useState([]);
  const us = sessionStorage.getItem("id");
  var che = [];
  var st = "";

  useEffect(() => {

    fetch(`http://localhost:3000/checked/user/${us}`)
              .then(response => {
                return response.json();
              })
              .then(data => {
                setQuar(data);
              });
  }, []);

  if(quar != []) {
    che = quar.map(a => a.de_qur)
    st = String(che)
    console.log(st)
  }
  return st
    
}

export default Quarter
