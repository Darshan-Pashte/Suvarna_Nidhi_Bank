import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import AuthLayout from './layouts/AuthLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import './App.css';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Register from './containers/Register/Register';
import AppLogout from './layouts/AppLogout';


function App() {
  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [showHeader, setShowHeader] = useState(false);
  const [message, setMessage] = useState('');
  const BASEURL = process.env.REACT_APP_BASENAME;

  useEffect(() => {
    const handleOnline = () => {
      setIsConnected(true);
      setShowHeader(true);
      setMessage('🎉 Connection Restored! The page will refresh in 2 seconds.');
      const timer = setTimeout(() => {
        setShowHeader(false);
        // window.location.reload();
      }, 2000);

      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsConnected(false);
      setShowHeader(true);
      setMessage('🚫 Connection Lost! Please check your internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    let timer;

    if (isConnected) {
      timer = setTimeout(() => {
        setShowHeader(false);
      }, 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isConnected]);

  const bankName = process.env.REACT_APP_FLAVOUR;

  useEffect(() => {
    const importCSS = async () => {
       await import(`../src/assets/Banks/${bankName}/index.css`);
    };
    importCSS();
  }, [bankName]);


  return (
    <div className='App'>
        {
          !isConnected ? (
            <div className="no-internet-container">
              <h1>🚫 No Internet !</h1>
              <h3>Connection Lost! Please check your internet connection.</h3>
              {/* <img src={connectivitImageNew} alt="No Internet" /> */}
            </div>
          ) : (
            <>
              <Router basename={BASEURL}>
                <AppLogout />
                <Routes>
                  {/* <Route exact path='/register' element={<Register />} /> */}

                  <Route exact path='/auth/*' element={<AuthLayout />} />
                  {/* <Route exact path='/atmmaster/brwatmmasterlist' element={<DepartmentBrowseList />} /> */}
                  <Route
                    exact
                    path='/*'
                    element={
                      <PrivateRoute>
                        <ProtectedLayout />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Router>
            </>
          )
        }

    </div>
  );
}

export default App;
