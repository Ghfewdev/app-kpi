import React, { useEffect, useState } from 'react'


export default function Dash(val) {
    const [da1, setDa1] = useState([]);

    useEffect(() => {

        fetch(import.meta.env.VITE_APP_API + `/dashh?fm=${val}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setDa1(data);
        });

    }, []);

  return da1
}
