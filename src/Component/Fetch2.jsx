import React, { useEffect, useState } from 'react'

function out(para) {
    if(para !== null)
    return para
    else
    console.log("now loading")
}

const Fetch2 = () => {

    const [fetchs,setFetchs] = useState([]);
    
          useEffect(()=> {
            
            fetch(import.meta.env.VITE_APP_API+"/form/year/2568")
              .then(response => {
                return response.json();
              })
              .then(data => {
                setFetchs(data);
              });
    
        
          }, [])

    return out(fetchs)

}

export default Fetch2