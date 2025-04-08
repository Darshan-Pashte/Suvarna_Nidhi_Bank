import { createContext } from 'react';
 
// Creating the context object and passing the default values.
const loginContext = createContext({otpDisplay:false,setOtp:()=>{},response:"", setResponse:()=>{},tries:"",setTries:()=>{}});
 
export default loginContext;