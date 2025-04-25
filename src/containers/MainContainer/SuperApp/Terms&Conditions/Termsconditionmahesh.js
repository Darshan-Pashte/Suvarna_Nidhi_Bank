import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from "../../../../containers/Login/Login.module.css";
import EMAIL from "../../../../assets/Banks/Suvarna/images/Mail.svg";
import ADRRESS from "../../../../assets/Banks/Suvarna/images/Registered office.svg";
import PHONE from "../../../../assets/Banks/Suvarna/images/Phone.svg";
import WEBSITE from "../../../../assets/Banks/Suvarna/images/Website.svg";

export default function TermsConditions() {
    // const { banklink, displayBankLink, npci, displayNpciLink, rbi, displayRbiLink , bankAddress } = useContext(DataContext);
    console.log('REACT_APP_LINKS:', process.env.REACT_APP_LINKS);
    const links = JSON.parse(process.env.REACT_APP_LINKS);

    return (
        <div>
            <div className={classes.mainpageTermsConditions}>
                <div className={classes.securityTips}>
                    <div className={classes.headingTerms}>
                        Terms and Conditions
                    </div>
                    <div className={classes.accordionpage}>
                        <Accordion defaultExpanded >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography >TERMS AND CONDITIONS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    Welcome to Suvarna Laxmi Nidhi Limited ("Company", "we", "us", or "our"). These Terms and Conditions govern your access to and use of our website and financial solutions. By accessing or using our website, you agree to be bound by these Terms.

                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography >Eligibility</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    By using our services, you confirm that you are at least 18 years of age and are legally capable of entering into a binding agreement and a member of Suvarna Laxmi Nidhi Limited.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography>Our Services</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>


                                    Suvarna Laxmi Nidhi Limited offers financial solutions such as deposits, loans, and other customer-centric financial services. All products and services are subject to eligibility and applicable Nidhi Rules,2014 compliance.

                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography>User Responsibilities</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    You agree to:
                                    <ul>
                                        <li>Provide true, accurate, current, and complete information.</li>
                                        <li>Not misuse the website for any unlawful activity.</li>
                                        <li>Maintain the confidentiality of your login details and personal data.</li>
                                    </ul>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography>Intellectual Property</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    All content, design elements, trademarks, and other intellectual property displayed on our website are owned by Suvarna Laxmi Nidhi Limited and protected under applicable intellectual property laws.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography>Third-Party Links</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    Our website may contain links to third-party websites for your convenience. Suvarna Laxmi Nidhi Limited is not responsible for the content or practices of these external sites.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography>Limitation of Liability</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website or services.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography  >Modification of Terms</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    We reserve the right to revise these Terms at any time. Changes will be effective immediately upon posting on the website. Continued use after changes implies acceptance.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography  >Governing Law</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    These Terms shall be governed by the laws of India. Any legal proceedings shall be under the jurisdiction of the competent courts of Pune, Maharashtra.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginTop: '8px' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                style={{ backgroundColor: '#EDEDED' }}
                            >
                                <Typography  >Contact Information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <ul>
                                        <li><img src={EMAIL} alt="email" /> Email: <a href="mailto:support@suvarnalaxmi.com" >support@suvarnalaxmi.com</a></li>
                                        <li> <img src={PHONE} alt="email" /> Phone: +18002684333</li>
                                        <li> <img src={ADRRESS} alt="email" /> Registered Office: Sr. No. 106-3A, Near Hotel Sahara, S. B. Road, Shivaji Nagar, Pune 411016</li>
                                        <li> <img src={WEBSITE} alt="email" /> Website: <a href='https://www.suvarnalaxmi.com' target='_blank'>www.suvarnalaxmi.com </a></li>
                                    </ul>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}
