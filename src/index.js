import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthContext';
import { LoaderProvider } from './context/LoaderContext';
import LoaderComponent from './components/LoaderComponent/LoaderComponent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Provider } from 'react-redux';
// import store from './store';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { store } from './store/store';
import { ConnProvider } from './context/ConContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <LocalizationProvider dateAdapter={AdapterMoment} >
    <LoaderProvider>
      <LoaderComponent />
      <ConnProvider>
      {/* <AuthProvider> */}
        <App />
      {/* </AuthProvider> */}
        </ConnProvider>
    </LoaderProvider>
  </LocalizationProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
