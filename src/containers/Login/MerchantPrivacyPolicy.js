import React, { useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./Login.module.css";
import { DataContext } from "../../context/LoaderContext";
import EMAIL from "../../assets/Banks/Suvarna/images/Mail.svg";
import ADRRESS from "../../assets/Banks/Suvarna/images/Registered office.svg";
import PHONE from "../../assets/Banks/Suvarna/images/Phone.svg";
import WEBSITE from "../../assets/Banks/Suvarna/images/Website.svg";


export default function MerchantPrivayPolicy() {
    const bankContactInfo = JSON.parse(process.env.REACT_APP_STRING);
    console.log("bankContactInfo", bankContactInfo);

    return (
        <div>
            <div className={classes.mainpageTermsConditions}>
                <div className={classes.securityTips}>
                    <div
                        className={classes.uprcontainer}
                        style={{ padding: "0px 4rem 0px 4rem" }}
                    >
                        <div className={classes.headingSecurity}>Merchant Policy</div>
                        <h6> Suvarna Laxmi Nidhi Limited</h6>
                        <p>
                        <ul>
                                        <li><img src={EMAIL} alt="email" /> Email: <a href="mailto:support@suvarnalaxmi.com" >support@suvarnalaxmi.com</a></li>
                                        <li> <img src={PHONE} alt="email" /> Phone: +18002684333</li>
                                        <li> <img src={ADRRESS} alt="email" /> Registered Office: Sr. No. 106-3A, Near Hotel Sahara, S. B. Road, Shivaji Nagar, Pune 411016</li>
                                        <li> <img src={WEBSITE} alt="email" /> Website: <a href='https://www.suvarnalaxmi.com' target='_blank'>www.suvarnalaxmi.com </a></li>
                                    </ul>
                        </p>
                       
                        <h6>Introduction</h6>
                        <p>
                            This Merchant Policy governs the terms and expectations for individuals or entities (“Merchants”) partnering with Suvarna Laxmi Nidhi Limited (“Company”). By engaging in any business transaction or integration with the Company, you agree to comply with this policy in addition to the Company’s general Terms & Conditions and applicable laws.
                        </p>
                        <h6 style={{ marginTop: "20px" }}>Eligibility & Onboarding</h6>
                        <p>
                            <ul>
                                <li>All merchants must be legally registered entities in India.</li>
                                <li>PAN, GSTIN, and Bank KYC verification are mandatory.</li>
                                <li>The merchant must not have any legal restrictions or regulatory blacklisting.</li>
                                <li>Suvarna Laxmi reserves the right to approve or reject any merchant application without obligation to disclose reasons.</li>
                            </ul>
                        </p>
                        <h6 style={{ marginTop: "20px" }}>Permitted Use</h6>
                        <p>
                            Merchants may only offer Suvarna Laxmi-approved services or financial promotions via authorized platforms or locations. Unauthorized use of brand assets, or misrepresentation of services, is strictly prohibited.
                        </p>
                        <h6 style={{ marginTop: "20px" }}>Transaction Terms</h6>
                        <p>
                            <ul>
                                <li>All payments and service commissions shall be settled as per mutually agreed terms.</li>
                                <li>Refunds, disputes, and reversals will follow the grievance redressal mechanism.</li>
                                <li>Any merchant fraud, chargebacks, or unauthorized activity will lead to termination and potential legal action.</li>
                            </ul>
                        </p>
                        <h6 style={{ marginTop: "20px" }}>
                            Data Privacy & Confidentiality
                        </h6>
                        <p>
                            <ul>
                                <li>Merchants shall maintain strict confidentiality of user data obtained through partnership with Suvarna Laxmi.</li>
                                <li>No customer or transactional data may be stored, sold, or transferred without written consent.</li>
                                <li>All parties must comply with the Company’s Privacy Policy and relevant laws such as the IT Act and NIDHI Rules.</li>
                            </ul>
                        </p>
                        <h6 style={{ marginTop: "20px" }}>Intellectual Property</h6>
                        <p>
                            All logos, brand names, content, and technology shared remain the sole property of Suvarna Laxmi Nidhi Limited. Unauthorized reproduction or use is not permitted.
                        </p>
                        <h6 style={{ marginTop: "20px" }}>
                            Termination & Suspension
                        </h6>
                        <p>
                            The Company reserves the right to suspend or terminate merchant accounts for:
                            <ul>
                                <li>Breach of this policy</li>
                                <li>Legal non-compliance</li>
                                <li>Reputation risk or fraudulent activities</li>
                            </ul>

                            No liability will be accepted for any indirect losses upon termination.
                        </p>
                        <h6 style={{ marginTop: "20px" }}>Dispute Resolution</h6>
                        <p>
                            Any disputes will be resolved under the jurisdiction of Pune, Maharashtra, in accordance with Indian laws.
                        </p>
                        <p>
                            For any merchant-related support or queries, please write to support@suvarnalaxmi.com or call us at 1800 268 4333 (Mon–Sat, 10:00 AM–6:30 PM; 2nd & 4th Sat holiday).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
