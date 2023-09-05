import axios from "axios";
import { toast } from "react-toastify";

// axios.interceptors.response.use(null, (err) => {
//   console.log(err)
//   const expectedError =
//     err.response && err.response.status >= 400 && err.response.status < 500;
//   if (expectedError) {
//     if (err.response.data.errors)
//       return err.response.data.errors.map((e) => toast.error(e.msg));

//     if(err.response.data) return toast.error(err.response.data);
//   }
//   if (!expectedError) {
//     console.log(err);
//     toast.error(err.response.statusText);
//     return Promise.reject(err);
//   }
// });

export const setHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default http;
