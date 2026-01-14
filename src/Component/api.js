import axios from "axios";

export const postForms = async (payload) => {
  return axios.post(import.meta.env.VITE_APP_API + "/api/forms/bulk", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
