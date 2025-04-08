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
                    Please carefully review the terms and conditions set forth below before using this website. By accessing, browsing, or utilizing this site and any of its pages, you acknowledge your agreement to be bound by these terms and conditions. Material available on this website may be downloaded for non-commercial, personal use only, under the condition that all copyright and proprietary notices are preserved intact. Distribution, alteration, transmission, re-utilization, reporting, or employing the site's content for public or commercial activities, including but not limited to text, images, audio, and video, is strictly prohibited without the express written consent of {bankContactInfo?.BANKname}
                    <br />
                    Copyright (c) {bankContactInfo?.BANKname}, All Rights Reserved. The content displayed on this site, along with information submitted to the bank via this site, shall remain the exclusive property of {bankContactInfo?.BANKname}, unless specified otherwise.
                    <br />
                    <br />
                    <b>Trademarks</b>
                    <br />
                    The name {bankContactInfo?.BANKname} and its logo are duly registered trademarks and service marks belonging to the bank.
                    <br />
                    <br />
                    <b>Use of Information and Materials</b>
                    <br />
                    The content and materials on this website are presented solely for informational purposes and should not be interpreted as an offer, solicitation, invitation, advice, or recommendation to purchase or dispose of any financial instruments or banking products offered by {bankContactInfo?.BANKname}
                    <br />
                    Content and materials, along with terms, conditions, and descriptions on this website, are amendable. Not every product or service mentioned is accessible in every geographic location. Eligibility for particular products and services is contingent upon final determination and approval by {bankContactInfo?.BANKname}, and is based on the specific terms and conditions under which they are provided.
                    <br />
                    <br />
                    <b>Disclaimer</b>
                    <br />
                    Materials and information presented on this website are intended for general informational purposes only and should not serve as a foundation for making business or financial decisions.
                    <br />
                    Advice or information obtained via this website should not be acted upon without seeking more accurate, up-to-date sources of information or specific professional guidance. We strongly advise obtaining such professional counsel when necessary.
                    <br />
                    Content and materials on this site are offered "as is" and "as available," with efforts made to maintain accuracy and correctness. However, {bankContactInfo?.BANKname} does not guarantee the continuity or currency of information at the time it is accessed by users.
                    <br />
                    {bankContactInfo?.BANKname} disclaims all liability for any direct or indirect loss or damage (including, but not limited to, special, incidental, or consequential loss or damage) arising from the use of this website, including any losses, damages, or expenses stemming from, but not limited to, defects, errors, imperfections, faults, mistakes, or inaccuracies in this website, its contents, or associated services, or due to the unavailability of the website or any part thereof or any contents or associated services.
                    <br />
                    {bankContactInfo?.BANKname} does not assure the receipt of emails sent from the website nor guarantees the privacy and/or security of emails during internet transmission.
                    <br />
                    <br />

                    <input
                            type="button"
                            name="submit"
                            className="btn btn-info btn-md orangeBtn"
                            value="close"
                            onClick={goToLink}
                            style={{ backgroundColor: 'var(--button-color)', color: 'white',width: '10vw',fontSize:'20px',fontWeight:'500' }}
                        />
                </div>
            </div>
        </div>
    );
    
}
