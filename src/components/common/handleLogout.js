import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'path-to-logout-action';

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/auth/login");
  };

  return handleLogout;
};

export default useLogout;