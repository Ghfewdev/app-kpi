import React, { useEffect, useState } from 'react'

const dDoc = () => {

    const [fetchs, setFetchs] = useState([]);

    useEffect(() => {

        fetch(`https://kpi-api.onrender.com/event/${sessionStorage.getItem("now")}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setFetchs(data);
            });


    }, [])
    
    return fetchs

}

const Doc = () => {
    return dDoc()
}

export default Doc
