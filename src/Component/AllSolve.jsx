import React, { useEffect, useState } from 'react'

function out(para) {
    if(para !== null)
    return para
    else
    console.log("now loading")
}

const AllSolve = (defm) => {

    const [fetchs,setFetchs] = useState([]);
    
          useEffect(()=> {
            
            fetch(`http://localhost:3000/checked/${defm}`)
              .then(response => {
                return response.json();
              })
              .then(data => {
                setFetchs(data);
              });
    
        
          }, [])

    return out(fetchs)

}

export default AllSolve
