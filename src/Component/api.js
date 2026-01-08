import axios from "axios";

export const postForms = async (payload) => {
  return axios.post("http://localhost:3000/api/forms/bulk", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
