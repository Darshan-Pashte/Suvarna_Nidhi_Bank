import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from "../../../../containers/Login/Login.module.css";
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../../../assets/Banks/Bhagini/images/BhagniLogoAndName 1.jpg';
export default function SecurityTipsBhagini() {
    const bankContactInfo = JSON.parse(process.env.REACT_APP_STRING);
    console.log("bankContactInfo",bankContactInfo);
    
    const navigate = useNavigate()
    const goToLink = () => {
        navigate('/auth/login'); // replace '/new-page' with the desired URL
    };
    return (
        <div>
            <div className={classes.mainpageTermsConditions}>
                <div className={classes.securityTips}>
                <div className={classes.imagesbhagini}>
                    <img src={ProfileIcon} alt='' style={{display:'flex', justifyContent:'center'}}/>
                    </div>
                    <h3 align="center" className="logo1">Security Tips</h3>
                    <div className={classes.uprcontainer}>
                        Important Security Tips For Safe Online Banking
                        <h6 style={{ marginTop: "12px" }}>Protect Yourself from Online Scams: </h6>
                        <ul style={{ listStyleType: "square", paddingLeft: "16px" }}>
                            <li><b>Access directly: </b>Always type the URL of your bank's website directly into your browser's address bar.</li>
                            <li><b>Beware of fake apps: </b>Avoid downloading malicious online banking apps from app stores. Verify their authenticity by contacting your bank. </li>
                            <li><b>Ignore links: </b>Never click on links in emails or text messages that lead to the bank's website. </li>
                            <li><b>Don't share personal information: </b>{bankContactInfo?.name} or its representatives will never ask for your personal information, password, or one-time SMS password via email, SMS, or phone. Report any such attempts immediately. </li>
                        </ul>
                        <h6 style={{ marginTop: "12px" }}>Enhance Your Internet Security: </h6>
                        <ul><li><b>Update software: </b>Keep your operating system and web browser up-to-date with the latest security patches. </li>
                            <li><b>Enable security features: </b>Use a firewall and antivirus software with updated signatures.</li>
                            <li><b>Regular scans: </b>Scan your computer regularly for viruses and trojans. </li>
                            <li><b>Change passwords: </b>Update your online banking password periodically. </li>
                            <li><b>Monitor logins: </b>Check the last login date and time on your post-login page.</li>
                            <li><b>Avoid public computers: </b>Don't use internet banking on cyber cafes or shared computers.</li>
                            <li><b>Use a Virtual Keyboard: </b>
                                <ul>
                                    <li><b>Protect Against Keyloggers:</b>Use the virtual keyboard provided by your bank to enter your login credentials and other sensitive information. This helps protect against keyloggers that may capture keystrokes from your physical keyboard.</li>
                                    <li><b>Avoid Keyboard Shortcuts Exploits:</b>Virtual keyboards reduce the risk of malicious software exploiting keyboard shortcuts or key combinations.</li>
                                    <li><b>Secure Public or Shared Computers:</b>Using a virtual keyboard on public or shared computers adds an additional layer of security by avoiding direct keystroke entry.</li>
                                </ul>
                            </li>
                        </ul>
                        <h6 style={{ marginTop: "12px" }}>Additional Tips: </h6>
                        <ul><li><b>Verify identity:</b>After logging in, you should not be asked for your username, login password, or credit/debit card details. Any such requests are likely scams.</li></ul>
                        <p>By following these security tips, you can significantly reduce the risk of falling victim to online banking scams and protect your financial information. </p><br/>
                    </div>

                    <input
                            type="button"
                            name="submit"
                            className="btn btn-info btn-md orangeBtn"
                            value="close"
                            onClick={goToLink}
                            style={{ backgroundColor: 'var(--button-color)', color: 'white',width: '10vw',fontSize:'20px',fontWeight:'500' }}
                        />
                    {/* <div className={classes.midconatiner}>
                    Now OnlineSBI is EV-SSL certified
                    </div> */}

                    {/* <div className={classes.lastcontainer}>
                    <h5>What is Extended Validation SSL?</h5>
Extended Validation SSL Certificates give high-security web browser information to clearly identify a website's organizational identity. For example, if you use Microsoft Internet Explorer 7 to visit a website secured with an SSL Certificate that meets the Extended Validation Standard, IE7 will cause the URL address bar to turn green. A display next to the green bar will toggle between the organization name listed in the certificate and the Certificate Authority (VeriSign, for example). Firefox 3 also supports Extended Validation SSL. Other browsers are expected to offer Extended Validation visibility in upcoming releases. Older browsers will display Extended Validation SSL Certificates with the same security symbols as in the existing SSL Certificates.
                    </div> */}

                </div>
            </div>
        </div>
    );
}
