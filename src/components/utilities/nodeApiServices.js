import Swal from "sweetalert2";
import SweetAlertPopup from "../common/sweetAlertPopup";
import { baseUrlServer } from "./nodeApiList";
import axios from "axios";
import CryptoJS from 'crypto-js';

const BASEURL = process.env.REACT_APP_BASENAME;

const validateResponse = (apiData) => {
  if (typeof apiData == "undefined") {
    return {
      status: false,
      error: "unauthorized",
    };
  }
  return apiData;
};

const API = axios.create({
  baseURL: baseUrlServer,
});

API.interceptors.request.use((config, response) => {
  const token = sessionStorage.getItem("updatedToken");
  console.log("responseHeader", response)
  // const username = sessionStorage.getItem("username");
  // const bankcode = sessionStorage.getItem("bankcode");
  // if (token) config.headers.authorization = ${token};
  // if (token) config.headers['Authorization'] = token;
  if (token) config.headers["Authorization"] = "Bearer " + token;
  // console.log('token',token)
  // if (username) {
  //   config.headers["X-Username"] = JSON.parse(username);
  // }
  // if (bankcode) {
  //   config.headers["X-Bankcode"] = JSON.parse(bankcode);
  // }
  return config;
});

// API.interceptors.response.use((response) => {
//   // Log response headers
//   console.log("ResponseHHHH:", response.headers);

//   return response;
// }, (error) => {
//   // Handle the error response
//   if (error.response && error.response.status === 403) {
//     Swal.fire({
//       title: "Oops...Session has expired!!!",
//       icon: "question",
//       confirmButtonText: "Login Again",
//       allowOutsideClick: false
//     }).then((result) => {
//       if (result.isConfirmed) {
//         sessionStorage.clear();
//         localStorage.clear();
//         window.location.href = `/${BASEURL}/auth/login`;
//         window.location.reload();
//       }
//     });
//   }

//   return Promise.reject(error);
// });

export async function postApiData(url, payload, headers = {}) {
  const hashedData = CryptoJS.SHA256(JSON.stringify(payload) + "KuVUmJvu9BEiEqdbNiIZWg" + "netbanking").toString(CryptoJS.enc.Hex);
  try {
    const response = await API.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Hash": hashedData,
        ...headers
      }
    });

    // Log request headers
    console.log("Request Headers:", response.config.headers);
    if (response.headers.authorization) {
      sessionStorage.setItem("updatedToken", response.headers?.authorization);
    }


    const x = JSON.stringify(response.data) + "KuVUmJvu9BEiEqdbNiIZWg" + "netbanking";
    const hashedDataResponse = CryptoJS.SHA256(x).toString(CryptoJS.enc.Hex);
    const receivedHash = response.headers.hash;


    if (receivedHash != hashedDataResponse) {
      SweetAlertPopup("Hacker activity detected.. Please logout", "Error", "error")
      return;
    }

    // Log response headers

    if (response.data.respCode === "IS") {
      await Swal.fire({
        title: "Oops...Session has been expired!!!",
        icon: "question",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Login Again",
        denyButtonText: `Deny`,
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = `/${BASEURL}/auth/login`
          window.location.reload();
        } else if (result.isDenied) {

        }
      }).catch((err) => { SweetAlertPopup('kk', 'kkj') });
    }
    return validateResponse(response.data);
  } catch (error) {
    if (error.response && error.response.status == 403) {
      await Swal.fire({
        title: "Oops...Session has been expired!!!",
        icon: "question",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Login Again",
        denyButtonText: `Deny`,
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = `/${BASEURL}/auth/login`
          window.location.reload();
        } else if (result.isDenied) {

        }
      }).catch((err) => { SweetAlertPopup('kk', 'kkj') });
      // window.location.href = "/vakrangeeatmadminportal"
    } else if (error.name == "AxiosError") {
      Swal.fire({
        title: "Network Error",
        icon: "error",
      })

    }
    else {
      console.error("Error in postApiData:", error);
      throw error; // Rethrow the error for higher level handling if necessary
    }
  }
}

export async function getApiData(url, headers) {
  try {
    //const response = await API.get(url,headers);
    const response = await API.get(url, { headers });
    if (response.headers.authorization) {
      sessionStorage.setItem("updatedToken", response.headers?.authorization);
    }
    
    if (response.data.respCode === "IS") {
      await Swal.fire({
        title: "Oops...Session has been expired!!!",
        icon: "question",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Login Again",
        denyButtonText: `Deny`,
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = `/${BASEURL}/auth/login`
          window.location.reload();
        } else if (result.isDenied) {

        }
      }).catch((err) => { SweetAlertPopup('kk', 'kkj') });
    }
    return validateResponse(response.data);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Redirect to login page

      // const navigate = useNavigate();
      //       navigate("/auth/login")


      // window.location.href = "/vakrangeeatmadminportal"
      await Swal.fire({
        title: "Oops...Session has been expired!!!",
        icon: "question",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Login Again",
        denyButtonText: `Deny`,
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = `/${BASEURL}/auth/login`
          window.location.reload();
        } else if (result.isDenied) {

        }
      });
      // window.location.href = "/vakrangeeatmadminportal"

    } else {
      // Handle other errors
      console.error("Error in axiosGetApiData:", error);
      throw error; // Rethrow the error for higher level handling if necessary
    }
  }
}

export async function getApiDataPdf(url, headers) {
  try {
    //const response = await API.get(url,headers);
    const response = await API.get(url, { headers });
    if (response.headers.authorization) {
      sessionStorage.setItem("updatedToken", response.headers?.authorization);
    }

    if (response.data.respCode === "IS") {
      await Swal.fire({
        title: "Oops...Session has been expired!!!",
        icon: "question",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Login Again",
        denyButtonText: `Deny`,
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = `/${BASEURL}/auth/login`
          window.location.reload();
        } else if (result.isDenied) {

        }
      }).catch((err) => { SweetAlertPopup('kk', 'kkj') });
    }
    return validateResponse(response);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Redirect to login page

      // const navigate = useNavigate();
      //       navigate("/auth/login")


      // window.location.href = "/vakrangeeatmadminportal"
      await Swal.fire({
        title: "Oops...Session has been expired!!!",
        icon: "question",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Login Again",
        denyButtonText: `Deny`,
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          sessionStorage.clear();
          localStorage.clear();
          window.location.href = `/${BASEURL}/auth/login`
          window.location.reload();
        } else if (result.isDenied) {

        }
      });
      // window.location.href = "/vakrangeeatmadminportal"

    } else {
      // Handle other errors
      console.error("Error in axiosGetApiData:", error);
      throw error; // Rethrow the error for higher level handling if necessary
    }
  }
}


export async function postApiDataNew(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("jwtToken"),

    },
  });
  if (response.headers.authorization) {
    sessionStorage.setItem("updatedToken", response.headers?.authorization);
  }
  const apiData = await response.json();
  return validateResponse(apiData);
}


export async function postfileData(url, file, headers) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(url, {

    // mode: 'no-cors',
    method: "POST",
    body: formData,
    // body: JSON.stringify(payload),
    // redirect: 'follow',
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept": "/",
      "type": "formData",
      ...headers
    },
  });
  const apiData = await response.json();
  return validateResponse(apiData);
}


export async function updateApiData(url, payload) {

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });

  const apiData = await response.json();
  return validateResponse(apiData);
}