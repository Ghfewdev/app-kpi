import React, { useEffect, useState } from 'react'

function out(para) {
    if(para !== null)
    return para
    else
    console.log("now loading")
}

const Users = () => {

    const [fetchs,setFetchs] = useState([]);
    
          useEffect(()=> {
            
            fetch("http://localhost:3000/users")
              .then(response => {
                return response.json();
              })
              .then(data => {
                setFetchs(data);
              });
    
        
          }, [])

    return out(fetchs)

}

export default Users
