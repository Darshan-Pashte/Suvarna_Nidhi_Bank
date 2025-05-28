import classes from './Header.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import ProfileIcon from './assets/profile.jpg';
import SettingIcon from './assets/SettingsFilled.svg';
import LogoutIcon from './assets/LogoutFilled.svg';
import ViewProfileIcon from './assets/PersonFilled.svg';
import { REMOVE_USER } from '../../constants';
import { AuthContext } from '../../context/AuthContext';
import ChevronDown from '../../assets/chevron-down.svg';
import { useNavigate } from 'react-router-dom';
// import LOGO from '../../assets/swiftcore_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
// import headerLogo from "../../assets/headerLogo.png";
// import headerLogo from "../../components/Sidebar/SidebarIcons/Logo.svg";
import { postApiData } from '../utilities/nodeApiServices';
import { apiList } from '../utilities/nodeApiList';

// import logo from "../../assets/images/backupImages/Bhagini/Logo.svg";
// import headerLogo from "../../assets/images/commonforweb/maheshBnk.PNG";


const Header = ({ analytics }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { state } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const { loading, error, isAuthenticated, user, userType } = useSelector((state) => state.auth);
  // console.log("user", user)
  const [isLoading, setIsloading] = useState(false);
  // const { dispatch: authDispatch } = useContext(AuthContext);
  // const [userName, setUserName] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [logo, setBackgroundImage] = useState(null);
  const theme = useSelector((state) => state.theme.theme);

  // console.log("lastLogin",lastLogin)

  // useEffect(() => {
  //   setUserName(sessionStorage.getItem("username"))
  //   setLastLogin(sessionStorage.getItem("lastLogin"))
  // }, []);

  const bankNames = process.env.REACT_APP_FLAVOUR;

  useEffect(() => {
    const importedImage = async () => {
    const  logo = await import(`../../assets/Banks/${bankNames}/images/Logo.svg`);
    setBackgroundImage(logo.default);
    };
    importedImage(); 
  }, [bankNames]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (document.getElementById('profile') && !document.getElementById('profile').contains(e.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleLogoClick = () => {
    navigate("/dashboard"); // Replace "/newPage" with the path to your desired route
  };
  // const handleLogout = () => {
  //   // authDispatch({ type: REMOVE_USER });
  //   dispatch(logout());
  //   sessionStorage.clear()
  //   localStorage.clear()
  //   navigate("/auth/login")
  // };
  console.log("sessioniD", user);
  const handleLogout = async (data) => {
    if (userType == "corporate") {
      try {
        setIsloading(true);
        const payload = {
          username: user?.userId,
          sessionId: user?.sessionId
        };
        const response = await postApiData(apiList.LOGOUT, payload);
        console.log(response);
        if (response?.status == true) {
          dispatch(logout());
          navigate("/auth/login")
          // sessionStorage.setItem("jwtToken", response?.data.token);
          setIsloading(false);
        }
        // else {
        // SweetAlertPopup("User Logout Fail")
        // }
      } catch (error) {
        console.log("An error occurred");
        setIsloading(false);
      }

    } else {
      try {
        setIsloading(true);
        const payload = {
          custNo: user?.userId,
          sessionId: user?.sessionId
        };
        const response = await postApiData(apiList.LOGOUT_INTERNET, payload);
        console.log(response);
        if (response?.status == true) {
          dispatch(logout());
          navigate("/auth/login")
          // sessionStorage.setItem("jwtToken", response?.data.token);
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

  const handleShowProfile = () => {
    navigate("/settings")
  };

  const handleSettings = () => {
    navigate("/settings")
  };

  return (
    <div className={`${classes.HeaderContainer} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
      <div  className={`${classes.LeftContainer} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
        <div className={classes.lefttitle}>
          <img className={classes.lefttitlelogo} src={logo} alt='' onClick={handleLogoClick}/>

        </div>
        {/* <div className={classes.analytics}>
          <div className={classes.mainAnalytics} style={{ background: '#169E' }}>
            <div className={classes.analyticsValue}>{analytics.tioal || 100}</div>
            <div className={classes.analyticsTitle}>Total ATMS</div>
          </div>
          <div className={classes.AnalyticsContainer}>
            <div className={classes.eachAnalytics}>
              <div className={classes.analyticsValue}>{analytics.inService || 80}</div>
              <div className={classes.analyticsTitle}>In Service</div>
            </div>
            <div className={classes.separator}></div>
            <div className={classes.eachAnalytics}>
              <div className={classes.analyticsValue}>{analytics.outOfService || 15}</div>
              <div className={classes.analyticsTitle}>Out Of Service</div>
            </div>
            <div className={classes.separator}></div>
            <div className={classes.eachAnalytics}>
              <div className={classes.analyticsValue}>{analytics.offline || 5}</div>
              <div className={classes.analyticsTitle}>Offline</div>
            </div>
          </div>
        </div> */}
      </div>
      <div className={classes.RightContainer}>
        <div  className={`${classes.welcometitle} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>{userType == "corporate" ? "Welcome to Corporate Banking" : "Welcome to Internet Banking"}</div>
       

        <div className={classes.ProfileSection}>
        <div className={classes.Title}>
          <div className={classes.lastLogin}>
            <div className={`${classes.textlastlogin} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`} >Last Login</div>
            <div className={`${classes.textlastlogin} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>
            {user?.lastLogin}
            </div>
          </div>
        </div>
          <div className={classes.ProfileContainer} id='profile' onClick={() => setShowProfile(!showProfile)}>
            <img src={ProfileIcon} alt='' />
            {/* <div>{state?.user?.firstName + ' ' + state?.user?.lastName}</div> */}
            {/* <div>{state?.username}</div> */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <div className={`${classes.nameadmin} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`}>{user?.customerName}</div>
              <div className={`${classes.nameRole} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`} >{user?.userId}{" "}{user?.userRole && `(${user?.userRole})`}</div>
            </div>
            <img className={`${classes.chevronButton} ${theme === "dark" ? `${classes.DarkTheme}` : `${classes.LightTheme}`}`} src={ChevronDown} alt='' />
            {showProfile ? (
              <ul>
                <li onClick={handleSettings}><img src={SettingIcon} alt='settings' />Settings</li>
                {/* <li onClick={handleShowProfile}><img src={ViewProfileIcon} alt='profile'/>Profile</li> */}
                <li onClick={handleLogout}><img src={LogoutIcon} alt='logout' />Sign Out</li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
