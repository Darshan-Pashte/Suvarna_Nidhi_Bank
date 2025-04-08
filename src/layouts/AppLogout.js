import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SweetAlertPopup from "../components/common/sweetAlertPopup";
import { postApiData } from "../components/utilities/nodeApiServices";
import { apiList } from "../components/utilities/nodeApiList";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import opps from "./Opps.svg";


const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  const [isLoading, setIsloading] = useState(false);
  const location = useLocation()
  let timer;
  const { loading, error, isAuthenticated, user, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const BASEURL = process.env.REACT_APP_BASENAME;

  console.log("user", user)
  console.log("location", location)


  const handleLogout = async (data) => {
    if(userType == "corporate"){
      try {
        setIsloading(true);
        const payload = {
          username: JSON.parse(sessionStorage.getItem("userId")),
          sessionId: JSON.parse(sessionStorage.getItem("TOKEN")),

        };
        const response = await postApiData(apiList.LOGOUT, payload);
        console.log(response);
        if (response?.status == true) {
          dispatch(logout());
          sessionStorage.clear()
          localStorage.clear()
          window.location.reload();
          window.location.href = `/${BASEURL}/auth/opps`
          setIsloading(false);
        } 
        // else {
        // SweetAlertPopup("User Logout Fail")
        // }
      } catch (error) {
        console.log("An error occurred");
        setIsloading(false);
      }
  
    }else{
      try {
        setIsloading(true);
        const payload = {
          custNo: JSON.parse(sessionStorage.getItem("userId")),
          sessionId: JSON.parse(sessionStorage.getItem("TOKEN")),
        };
        const response = await postApiData(apiList.LOGOUT_INTERNET, payload);
        console.log(response);
        if (response?.status == true) {
          dispatch(logout());
          sessionStorage.clear()
          localStorage.clear()
          window.location.reload();
          window.location.href = `/${BASEURL}/auth/opps`
          setIsloading(false);
        } 
        // else {
        // SweetAlertPopup("User Logout Fail")
        // }
      } catch (error) {
        console.log("An error occurred");
        setIsloading(false);
      }
      // dispatch(logout());
      // navigate("/auth/login")
      // sessionStorage.setItem("jwtToken", response?.data.token);
    }
    
    // dispatch(logout());
    // sessionStorage.clear()
    // localStorage.clear()
    // navigate("/auth/login")
  };

  const handleLogoutTimer = () => {
    // 10000ms = 10secs. You can change the time.
    // if (location.pathname !== "/auth/login") {
      timer = setTimeout(async () => {
        resetTimer();
        Object.values(events).forEach((item) => {
          window.removeEventListener(item, resetTimer);
        });
        // window.location.pathname = "/vakrangeeatmadminportal/auth/opps";
        handleLogout();

      },6000000
      );
    // }
  };

 


  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, [user]);

 
  const logoutAction = () => {
    handleLogout()
   
  };



  return children;
};

export default AppLogout;