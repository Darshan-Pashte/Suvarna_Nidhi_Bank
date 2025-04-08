import { Navigate } from 'react-router-dom';
// import { TOKEN } from '../constants';

export const PrivateRoute = ({ children, ...rest }) => {
  // const token = true || sessionStorage.getItem(TOKEN);
  const token =  sessionStorage.getItem("TOKEN");

  return token ? children : <Navigate to='/auth/login' />;
};
