import React, { useContext } from 'react';
import ChartComponent from '../../../components/ApexCharts/Chart';
import classes from './Dashboard.module.css';
import PercentageFillCard from './PercentageFillCard/PercentageFillCard';
import RevenueCard from './RevenueCard/RevenueCard';
import CardWithMultipleChips from '../Dashboard/CardWithMultipleChips/CardWithMultipleChips';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { postApiData } from '../../../components/utilities/nodeApiServices';
import { apiList } from '../../../components/utilities/nodeApiList';
import SweetAlertPopup from '../../../components/common/sweetAlertPopup';
import { REMOVE_USER } from '../../../constants';
// import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const data = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      name: 'Test 1',
      data: [10, 20, 30, 40, 20, 30, 25, 0, 30, 40, 10, 45],
    },
    {
      name: 'Test 2',
      data: [10, 20, 30, 40, 20, 30, 25, 0, 30, 40, 10, 45].reverse(),
    },
  ],
};

  
const Dashboard = () => {
  const navigate = useNavigate()
  const [totalBanks, setTotalBanks] = useState("");
  const [username, setUserName] = useState("");
  const [token, setToken] = useState("");
  // const { dispatch: authDispatch } = useContext(AuthContext);

// useEffect(() => {
//   setToken(sessionStorage.getItem("TOKEN"));
//   setUserName(sessionStorage.getItem("username"))
// }, []);

  useEffect(() => {
    fetchBanksData();
  }, [username,token]);

  const fetchBanksData = async () => {
    try {
      const payload = {
        requestCode: "dashboard",
        userId: username,
        sessionId: token,
      };
      const response = await postApiData(apiList.ShankarSirsUrl, payload);
      if(response.respCode=="00"){
        setTotalBanks(response?.data);
      }
      else if(response.respCode=="IS"){
        // authDispatch({ type: REMOVE_USER });
        navigate("/auth/login")
        SweetAlertPopup(response?.respMsg, "Error", "error");
      }
      
    } catch (err) {
      // console.log(err);
    }
  }
  const Total = Number(totalBanks?.todaysNoOfTotalUPITxn?.amt);
  const Success = Number(totalBanks?.todaysNoOfSuccessUPITxn?.amt);
  const Failure = Number(totalBanks?.todaysNoOfFailUPITxn?.amt)
  const successrate = totalBanks?.successRate;
  const succrate = parseInt(successrate);

  return (
    <div className={classes.DashboardContainer}>
      <div style={{ flex: 1 }}>
        <div className={classes.container}>
          <RevenueCard title="No of Banks Reg."
            subtitle="No of Banks Registered"
            revenue={totalBanks?.noOfBanks}
            color="#ff4560" />
          <RevenueCard title='Upi Transaction Amount' subtitle='Total' revenue={Total.toFixed(2)} graphData={[]} color='#0077b6' />
          <RevenueCard title='Upi Transaction Amount' subtitle='Success' revenue={Success.toFixed(2)} graphData={[]} color='#3c763d' />
          <RevenueCard title='Upi Transaction Amount' subtitle='Fail' revenue={Failure.toFixed(2)} graphData={[]} color='#ff4560' />

        </div>
        <div className={classes.MidChart}>
          <ChartComponent type='area' series={data.series} showGridLines disableFill />
        </div>
        <div className={classes.BottomContainer}>
          <div>
            <ChartComponent type='bar' series={data.series} showGridLines />
          </div>
          <div>
            <ChartComponent type='radialBar' series={[succrate]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
