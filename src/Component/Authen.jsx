import React, {useEffect} from 'react'

const Authen = () => {
    useEffect(() => {
        try{
            const token = localStorage.getItem("token").split("$")[0]
            fetch("http://localhost:3000/authen", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+token
                  }
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if(data.status != "ok") {
                    alert("คุณต้องเข้าสู่ระบบก่อน")
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("name");
                    sessionStorage.removeItem("department");
                    localStorage.removeItem("token");
                    window.location = "/login";
                } else {
                    
                }

            })
            .catch((error) => {
                console.log("Error: ", error)
            })
        } catch {
            alert("คุณต้องเข้าสู่ระบบก่อน")
            window.location = "/login"
        }
        
        
    }, []);

}

export default Authen
