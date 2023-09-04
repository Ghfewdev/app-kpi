import { useState, useEffect } from 'react'

const sResulted = (val) => {

  const [fetchs,setFetchs] = useState([]);
  
  useEffect(() => {

    fetch(`https://kpi-api.onrender.com/result/id/${val}`)
              .then(response => {
                return response.json();
              })
              .then(data => {
                setFetchs(data);
              });
    
  });

  return fetchs

}
 
const Resulted = (val) => {
  return sResulted(val)
}

export default Resulted
