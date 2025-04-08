import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import MainContainer from '../containers/MainContainer/MainContainer';
import { PROTECTED_ROUTES } from '../routes/Routes';

const ProtectedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [opens, setOpens] = useState(false);
  const handle = (status) => {
    setOpens(status);
  };
  const [activeParentRoute, setActiveParentRoute] = useState({});
  const [activeChildRoute, setActiveChildRoute] = useState({});

  return (
    <div className='app-container'>
      <Header analytics={{}} />
      <div className='main-content'>
        <Sidebar activeRoute={activeParentRoute} setActiveRoute={setActiveParentRoute} setOpens={handle} opens={opens}/>
        <Routes>
          <Route path='/*' element={<MainContainer title={activeChildRoute?.name || activeParentRoute?.name} opens={opens} />} />
        </Routes>
      </div>
    </div>
  );
};

export default ProtectedLayout;
