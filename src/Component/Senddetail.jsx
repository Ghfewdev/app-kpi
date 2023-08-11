import Details from './Details';
import Profile from './Profile';

const Senddetail = () => {
    const user = Profile();
    const detail = Details();
    const JsonData = {
        user: user,
        detail: detail
      };
      fetch("http://localhost:3000/formed/fill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JsonData)
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.status === "ok") {
            console.log("logadd: success")
          } else {
            console.log("logadd: failure")
          }
        })
        .catch((error) => {
          console.log("Error: ", error)
        })
}

export default Senddetail
