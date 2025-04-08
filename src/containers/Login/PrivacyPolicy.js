import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from "./Login.module.css";
import { DataContext } from '../../context/LoaderContext';


export default function PrivayPolicy() {


const bankContactInfo = JSON.parse(process.env.REACT_APP_STRING);
console.log("bankContactInfo",bankContactInfo);

  
    return (
        <div>
            <div className={classes.mainpageTermsConditions}>
                <div className={classes.securityTips}>
                    <div className={classes.uprcontainer}>
                        <div className={classes.headingSecurity}>
                            Privacy Policy
                        </div>
                        <h6>Bank's Commitment to Privacy </h6>
                        <p>Bank recognizes the importance of protecting your personal and financial information. This privacy policy outlines how they collect, use, and safeguard your data. </p>

                        <h6 style={{ marginTop: "12px" }}>What Information Does Bank Collect?</h6>
                        <p>Bank collects various information from you, including: </p>
                        <ul><li>Name </li>
                            <li>Addresses </li>
                            <li>Email address </li>
                            <li>Passport number (for NRIs) </li>
                            <li>Income (for certain products)</li>
                            <li>PAN (for resident accounts)</li>
                            <li>Nominee details (for accounts) </li>
                        </ul>

                        <h6 style={{ marginTop: "12px" }}>
                            Bank Does Not Use Cookies
                        </h6>
                        Unlike many websites, Bank does not use cookies to track your online activity.

                        <h6 style={{ marginTop: "12px" }}>How Bank Uses Your Information </h6>
                        <p>Bank only collects and uses your information for specific business purposes, such as: </p>
                        <ul><li>Opening and managing your accounts</li>
                            <li>Protecting your account records and funds </li>
                            <li>Complying with laws and regulations</li>
                            <li>Designing and improving products and services </li>
                            <li>Understanding your financial needs to provide better service </li>
                        </ul>

                        <h6 style={{ marginTop: "12px" }}>Keeping Your Information Accurate </h6>
                        <p>Bank strives to maintain accurate and up-to-date information about you and your accounts. They have procedures in place to ensure this and allow you to update or correct any inaccuracies through their website feedback mechanism or profile settings.</p>

                        <h6>Limiting Employee Access </h6>
                        <p>Bank only grants access to your personal information to employees who have a legitimate business need for it. They educate their employees on data privacy and hold them accountable for upholding this policy. </p>

                        <h6>Security Measures</h6>
                        <p>Bank implements robust security practices to prevent unauthorized access to your confidential information.</p>

                        <h6>Restricting Disclosure of Your Information</h6>
                        <p>Bank will not share your information with anyone except: </p>
                        <ul>
                            <li>To complete a transaction you initiate</li>
                            <li>When you request or authorize it </li>
                            <li>As required by law</li>
                            <li>For marketing purposes, only after informing you and giving you an option to opt-out </li>
                        </ul>

                        <h6>Who This Privacy Policy Applies To </h6>
                        <p>This policy applies to various individuals who interact with Bank, including: </p>
                        <ul>
                            <li>Potential customers inquiring about products or services </li>
                            <li>Existing customers</li>
                            <li>Loan applicants</li>
                            <li>Visitors to the Bank website</li>
                        </ul>

                        <h6>Contacting Bank About Privacy </h6>
                        If you have any questions or concerns about this privacy policy, you can contact Bank via email at {bankContactInfo?.email} or by mail: {bankContactInfo?.address}
                       
                        <h6>Additional Information About Bank's Website </h6>
                        <ul>
                            <li><b>Children: </b>Bank believes their website content is suitable for all ages.</li>
                            <li><b>Internet Banking: </b>Information collected during regular website visits is combined with any information you provide while using Bank's internet banking service.</li>
                            <li><b>External Links: </b>Bank is not responsible for the privacy practices of websites linked to theirs.</li>
                            <li><b>Data Encryption: </b>Information you provide on the Bank website is encrypted for security purposes.</li>
                            <li><b>Changes to the Privacy Policy: </b>Bank may periodically update this privacy policy. </li>
                        </ul>
                    </div>



                </div>
            </div>
        </div>
    );
}
