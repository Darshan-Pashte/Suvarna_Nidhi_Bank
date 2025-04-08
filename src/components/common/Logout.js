import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../store/authSlice';





export const HandleLogout = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch();


    dispatch(logout());
    sessionStorage.clear()
    localStorage.clear()
    navigate("/auth/login")
  };
  


