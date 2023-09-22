import React, { useEffect } from 'react'

const Authlevel = () => {
    useEffect(() => {
        try {
            const token = localStorage.getItem("token").split("$")[0]
            fetch(import.meta.env.VITE_APP_API+"/authen", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data.status != "ok") {
                        alert("คุณต้องเข้าสู่ระบบก่อน")
                        sessionStorage.removeItem("id");
                        sessionStorage.removeItem("name");
                        sessionStorage.removeItem("department");
                        localStorage.removeItem("token");
                        window.location = "/login";
                    } else {
                        if (localStorage.getItem("token").split("$")[1] === "9")
                            console.log("ok");
                        else {
                            alert("คุณไม่มีสิทธ์เข้าถึงหน้านี้");
                            window.location = "/";
                        }
                            
                    }

                })
                .catch((error) => {
                    console.log("Error: ", error)
                })
        } catch {
            alert("คุณต้องเข้าสู่ระบบก่อน");
            window.location = "/login";
        }

    }, []);

}

export default Authlevel
