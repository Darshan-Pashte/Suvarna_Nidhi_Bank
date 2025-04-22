import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from "../../../../containers/Login/Login.module.css";
import { useNavigate } from 'react-router-dom';
// import ProfileIcon from '../../../../assets/Banks/Bhagini/images/BhagniLogoAndName 1.jpg';
export default function Disclaimer() {
    // const { banklink, displayBankLink, npci, displayNpciLink, rbi, displayRbiLink , bankAddress } = useContext(DataContext);
    console.log('REACT_APP_LINKS:', process.env.REACT_APP_LINKS);
    const links = JSON.parse(process.env.REACT_APP_LINKS);

    const bankContactInfo = JSON.parse(process.env.REACT_APP_STRING);
    console.log("bankContactInfo", bankContactInfo);

    const navigate = useNavigate()
    const goToLink = () => {
        navigate('/auth/login'); // replace '/new-page' with the desired URL
    };
    return (
        <div>
            <div className={classes.mainpageTermsConditions}>
                <div className={classes.securityTips}>
                    <div className={classes.imagesbhagini}>
                        {/* <img src={ProfileIcon} alt='' style={{display:'flex', justifyContent:'center'}}/> */}
                    </div>
                    <h3 align="center" className="logo1">Disclaimer</h3>
                    <b>Legal Notice and Disclaimer for {bankContactInfo?.BANKname}</b>
                    <br />
                    <br />
                    <b>Legal Notice</b>
                    <br />
                    Please read this legal notice carefully before using this website. By accessing and using any part of this site, you agree to the terms and conditions set forth herein. Content from this site may be downloaded only for personal, non-commercial use, provided that all copyright and proprietary notices remain intact. Any modification, republication, transmission, or commercial exploitation of the website content—including but not limited to text, visuals, graphics, and multimedia elements—without written permission from {bankContactInfo?.BANKname} is strictly prohibited.
                    <br />
                    All content and material available on this site are the intellectual property of Suvarna Laxmi Nidhi Limited, unless stated otherwise, and are protected under applicable intellectual property laws.
                    <br />
                    <br />
                    <b>Trademarks</b>
                    <br />
                    The name {bankContactInfo?.BANKname} and its associated logo are registered trademarks of the Company. Unauthorized use or reproduction of any trademarks or service marks on this website is strictly forbidden.
                    <br />
                    <br />
                    <b>Use of Information and Materials</b>
                    <br />
                    The information presented on this website is intended for general understanding and awareness. It should not be construed as an offer, solicitation, or invitation to engage in any financial product or service. The availability of specific financial services is subject to regulatory guidelines and final approval by {bankContactInfo?.BANKname} Service terms, eligibility, and conditions are subject to change and may vary based on location, regulatory compliance, and user profile.
                    <br />

                    <br />
                    <b>Disclaimer</b>
                    <br />
                    The content on this website is provided on an “as is” and “as available” basis. While we strive for accuracy,{bankContactInfo?.BANKname} does not make any warranties, either express or implied, about the completeness, reliability, or timeliness of any information provided herein. Users are strongly encouraged to seek professional advice before making financial or business decisions based on the information provided.
                    <br />
                    {bankContactInfo?.BANKname} disclaims all liability for any direct, indirect, incidental, or consequential loss or damage arising from the use or inability to use this website, including any inaccuracies, errors, omissions, or service interruptions. The Company is not liable for any damage resulting from internet security risks, such as viruses, unauthorized access, or loss of data.
                    <br />
                    We do not guarantee that communication sent via this website will be received, or that it will remain confidential and secure during internet transmission. You are responsible for ensuring that any electronic communication is properly secured.
                    <br />
                    <br />
                    <b>Use of Information and Materials</b>
                    <br />
                    The information presented on this website is intended for general understanding and awareness. It should not be construed as an offer, solicitation, or invitation to engage in any financial product or service. The availability of specific financial services is subject to regulatory guidelines and final approval by {bankContactInfo?.BANKname} Service terms, eligibility, and conditions are subject to change and may vary based on location, regulatory compliance, and user profile.
                    <br />

                    <br />
                    <b>Data Privacy and Security</b>
                    <br />
                    By using this website, you agree to the collection and use of information as outlined in our Privacy Policy. The Company employs strict security measures to protect user data and comply with data protection guidelines issued by the Ministry of Corporate Affairs and the NIDHI Rules under the guidelines of the Reserve Bank of India.
                    <br />
                    <br />

                    <b>External Links</b>
                    <br />
                    This site may include hyperlinks to third-party websites. {bankContactInfo?.BANKname} does not control or endorse these external sites and is not responsible for their content, privacy practices, or terms of use. Users are encouraged to review the policies of such sites before sharing personal or financial information.
                    <br />
                    <br />

                    <b>Amendments</b>
                    <br />
                    {bankContactInfo?.BANKname} reserves the right to update or modify this legal notice and disclaimer without prior notice. Continued use of the website constitutes acceptance of any revisions made.
                    <br />
                    <br />

                    <b>Contact Information</b>
                    <br />
                    <ul>
                        <li>Email: support@suvarnalaxmi.com </li>
                        <li>Phone: +18002684333</li>
                        <li>Registered Office: Sr. No. 106-3A, Near Hotel Sahara, S. B. Road, Shivaji Nagar, Pune 411016</li>
                        <li>Website: www.suvarnalaxmi.com</li>
                    </ul>
                    <br />
                    <br />

                    <input
                        type="button"
                        name="submit"
                        className="btn btn-info btn-md orangeBtn"
                        value="close"
                        onClick={goToLink}
                        style={{ backgroundColor: 'var(--button-color)', color: 'white', width: '10vw', fontSize: '20px', fontWeight: '500' }}
                    />
                </div>
            </div>
        </div>
    );

}
