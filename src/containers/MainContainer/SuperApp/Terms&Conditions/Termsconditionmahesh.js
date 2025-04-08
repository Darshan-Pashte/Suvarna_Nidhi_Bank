import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from "../../../../containers/Login/Login.module.css";

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
                                    <h6>These Terms and Conditions Are Your Online Banking Contract </h6>
                                    <p>This document outlines the terms and conditions (also referred to as "Terms") that create a contract between you (the User) and the bank for using their online banking services. </p>
                                    <h6 style={{ marginTop: "8px" }}>Agreeing to the Terms: </h6>
                                    <ul><li>By applying for and using online banking, you acknowledge and agree to be bound by these Terms. </li>
                                        <li>Any existing conditions related to your accounts (outside of online banking) will remain in effect. However, if these Terms conflict with your account conditions, these Terms will take precedence. </li></ul>
                                    <h6 style={{ marginTop: "8px" }}>Updates to the Terms: </h6>
                                    <ul><li>The bank may modify or change these Terms in the future. Any updates will be published on the bank's website. </li>
                                    </ul>

                                    <h6 style={{ marginTop: "8px" }}>Agreement Duration: </h6>
                                    <ul><li>This agreement remains valid until:
                                        <ul><li>It is replaced by a new agreement. </li>
                                            <li>It is terminated by either party (you or the bank). </li>
                                            <li>Your account is closed.</li></ul>

                                    </li>
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
                                <Typography >INTERNET BANKING SERIVICES</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <p >The bank will try to provide various online banking services to customers, such as checking account balances, viewing transaction details, requesting checkbooks, transferring funds, making international payments, creating digital deposits, topping up mobile phones and DTH services, paying bills, viewing income tax statements, getting home loan interest certificates, inquiring about TDS, generating Form 15G/H, getting overdrafts against fixed deposits, paying government taxes, paying school/college fees, and other services. These services will be offered gradually as the bank decides. The bank can add or remove these services without giving notice. The availability of services will be communicated through the bank's website, written communication, or other methods. </p>
                                    <p style={{ marginTop: "8px" }}>The bank will take reasonable steps to protect online banking services from unauthorized access using available technology. Customers should not use online banking for illegal or improper purposes. </p>
                                    <p style={{ marginTop: "8px" }}>The bank will provide a user ID and password to customers. Customers must change both the user ID and password when they first use online banking. As a security measure, customers should change their passwords frequently, at least every 90 days. In addition to user ID and password, the bank may require other authentication methods, such as smart cards, one-time SMS passwords, or digital certificates. Customers should not try to access their account information through any means other than online banking. </p>
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
                                <Typography>USER-ID AND PASSWORD</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>

                                    <ul>
                                        <li>You must keep your user ID and password strictly confidential. Never share them with anyone, including individuals claiming to represent the bank.</li>
                                        <li>Create a strong password that's difficult to guess. Your password should be at least eight characters long and include a mix of letters, numbers, and symbols. Avoid using personal information like your name, address, date of birth, or phone number. </li>
                                        <li>Memorize your user ID and password. Don't write them down or store them electronically.</li>
                                        <li>Protect your computer. Never let unauthorized people access your computer, and don't leave it unattended while using online banking services.</li>
                                        <li>Be cautious of scams. The bank will never ask for your personal information, such as your username, password, or one-time SMS password, via email, SMS, or phone. If you receive such a request, it is likely a scam. </li>
                                    </ul>
                                    <h6><b>(1) Resetting of User-id/Password</b></h6>
                                    If you forget your user ID, you can retrieve it by using the "Forgot Username" link on the Online Bank login page. If you forget your password, you can reset it online using the "Forgot Login Password" link. Changing your password does not create a new contract. <br />
                                    <h6 style={{ marginTop: "12px" }}><b>(2) Non-liability of the bank in case of Compromise of User-id and Password</b></h6>
                                    The bank is not responsible for any losses you incur due to a compromised user ID or password, or if you fail to follow the online banking service instructions. You agree to protect the bank from any liability in such cases.
                                    <h6 style={{ marginTop: "12px" }}><b>(3) Locking of User-id</b></h6>
                                    Your user ID will be locked after a certain number of incorrect login attempts (currently three). It will be unlocked the next day. In case of an emergency, you can unlock your user ID online by changing your password using the "Forgot Login Password" link.
                                    <h6 style={{ marginTop: "12px" }}><b>(4) Deactivation of User-id</b></h6>
                                    The bank may deactivate your user ID if you haven't used it for a specified period. The bank also has the right to deactivate your user ID if your account behavior is unsatisfactory. <br />
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
                                <Typography>CYBER CRIME</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <p style={{ marginTop: "12px" }}>The internet is vulnerable to various cybercrimes like phishing, voice phishing, SMS phishing, and system security breaches. These threats can potentially compromise payment instructions or other instructions sent to the bank. While the bank will strive to protect customers' interests, there's no guarantee that such cybercrimes can be completely prevented. The bank cannot be held responsible for losses arising from these cybercrimes. </p>
                                    <p style={{ marginTop: "12px" }}>You should be aware of the risks associated with using public computers like cybercafes. Avoid using shared computer terminals for online banking transactions. When using the bank's internet banking site from a branch e-corner or kiosk, protect your login credentials and don't let anyone else see them or assist you with transactions. </p>
                                    <p style={{ marginTop: "12px" }}>Pay close attention to your registered mobile number. If you lose your mobile phone or change your number, take steps to prevent unauthorized access to your online banking account using the old number. Ensure that your mobile service provider does not issue a duplicate SIM card without proper verification. </p>
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
                                <Typography>TECHNOLOGY RISKS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <p>The bank's website may require maintenance, which may temporarily prevent customers from accessing and using its services. This could lead to delays or failures in processing your instructions.
                                        The bank is not responsible for any losses or damages that may occur due to any failure or inability on the bank's part to fulfill your instructions, regardless of the reason. </p>
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
                                <Typography>LIMITS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <p>The bank may set limits on the amount of money you can transfer or the value of demand drafts or inter-office instruments you can issue through online banking. These limits are in place to reduce your risk. The bank may impose daily limits, periodic limits, or limits per transaction. You must follow these limits, and the bank will provide information about them on the relevant page or website. </p>
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
                                <Typography>CHARGES</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <p>The bank may charge fees for using online banking services, including some fees for specific services. These fees are listed on the bank's website and will be updated if they change. You are responsible for any out-of-pocket expenses related to online banking.
                                        Here's the important part: You and any other account holders (for joint accounts) agree to let the bank deduct these fees from your account(s) automatically. </p>
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
                                <Typography  >MAINTENANCE OF SUFFICIENT BALANCE</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <p style={{ marginTop: "12px" }}>You must ensure that your account has enough funds or credit available to complete online banking transactions. The bank is not responsible for any consequences if the transaction fails due to insufficient funds or credit. </p>
                                    <p style={{ marginTop: "12px" }}>The bank may, at its discretion, process transactions even if there are insufficient funds. In this case, you will be responsible for repaying the overdraft, along with interest and any related fees determined by the bank. The bank may also charge penalties if you do not maintain a minimum balance. </p>
                                    <p style={{ marginTop: "12px" }}>The bank may stop or limit your online banking access if your account balance falls below the required minimum or if you have unpaid service charges. The bank will not be liable for any consequences of this action. </p>
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
                                <Typography  >FUNDS TRANSFER</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <ul><li><b>Make sure you enter the correct details: </b>You are responsible for entering the correct account number and other beneficiary information for your transfers. The bank is not liable for any mistakes you make that result in incorrect transactions. </li>
                                        <li><b>Transfer options:</b> You can transfer funds between your own accounts and to third-party accounts within the bank or at other banks. </li>
                                        <li><b>External bank transfers:</b> Transfers to other banks are subject to the terms and conditions of India's National Electronic Fund Transfer (NEFT) and Real-Time Gross Settlement System (RTGS) as defined by the Reserve Bank of India. You can find more information on the bank's website and the RBI website (<a href={links?.rbi}>{links?.displayRbi}</a>). </li>
                                        {/* <li><b>IMPS transfers:</b> Transfers using the Immediate Payment Service (IMPS) are subject to the terms and conditions available on the bank's website and the NPCI website (<a href={npci}>{displayNpciLink}</a>).</li></ul> */}
                                        <li><b>IMPS transfers:</b> Transfers using the Immediate Payment Service (IMPS) are subject to the terms and conditions available on the bank's website and the NPCI website (<a href={links?.npci}>{links?.displayNpci}</a>).</li></ul>
                                    <h6>Bill Payments </h6>
                                    <ul><li>The bank acts as a facilitator: You can use online banking to pay your bills through the services offered by the bank. </li>
                                        <li>Auto Pay limits: If your bill amount exceeds your set "Auto Pay" limit, the bill will not be paid automatically and will require manual payment. </li>
                                        <li>Accurate information is crucial: You must provide the correct identification details as registered with the biller. Update your information promptly if it changes. </li>
                                        <li>Bill disputes: The bank only provides payment processing; any disputes about bill details must be resolved directly with the biller. </li>
                                        <li>Schedule payments in advance: Make sure to schedule your bill payments at least a few working days (typically 1-5) before the due date to avoid late fees and penalties. </li>
                                        <li></li></ul>

                                    <h6 style={{ marginTop: "12px" }}>The bank is not responsible for: </h6>
                                    <ul><li>Transactions carried out in good faith based on your instructions. </li>
                                        <li>Not carrying out instructions if the bank believes they are not genuine, unclear, improper, or doubtful. </li>
                                        <li>Accepting instructions from any one user in a joint account. </li>
                                        <li>Any errors, service disruptions, or losses you experience related to bill payment services. </li>
                                        <li>Withdrawing or suspending the bill payment service, though they will try to notify you beforehand. </li></ul>

                                    <h6 style={{ marginTop: "12px" }}>Records and Evidence: </h6>
                                    <ul><li>The bank's records of your instructions and transactions are considered final and binding for all purposes and can be used as evidence in any proceedings. </li></ul>

                                    <h6 style={{ marginTop: "12px" }}>Merchant Payments </h6>
                                    <ul><li>The bank facilitates payments for online purchases made through various websites. </li>
                                        <li>The bank transfers the debited amount from your account to the merchant's account. However, the bank is not responsible for any transaction failures. </li>
                                        <li>The bank is not liable for the content on any merchant websites or the quality of their products/services. </li></ul>
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
                                <Typography  >TRANSACTION PROCESSING TIME</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <h6>Instantaneous Transactions</h6>
                                    <ul>
                                        <li><b>Real-time processing:</b>Transactions that are received before the specified cutoff time will be processed immediately, unless there are technical issues or unforeseen circumstances beyond the bank's control. </li>
                                        <li><b>Examples:</b> Inter-bank fund transfers, intra-bank fund transfers, international fund transfers, and stop payments are processed instantaneously. </li>
                                    </ul>
                                    <h6 style={{ marginTop: "12px" }}>Non-Instantaneous Transactions</h6>
                                    <ul>
                                        <li><b>Manual processing:</b>Transactions that require manual intervention by the branch or contact center will be processed as soon as possible. </li>
                                        <li><b>Examples:</b>Demand draft requests, resetting profile passwords, and updating mobile numbers are processed manually.</li>
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
                                <Typography  >AUTHORITY TO THE BANK</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <h6>Online Banking Access and Transactions </h6>
                                    <ul><li><b>Authentication: </b>Online banking transactions can only be performed after verifying the user's ID and password. </li>
                                        <li><b>Bank authorization:</b>You authorize the bank to access your accounts to process online banking transactions. </li>
                                        <li><b>Valid instructions: </b>Your instructions will only be executed if they follow the prescribed procedures. </li>
                                        <li><b>Transaction verification: </b>The bank is not obligated to verify the authenticity of transactions received through online banking, except by checking your user ID and password. </li>
                                        <li><b>Transaction records:</b>The printed output generated during online banking is a record of your internet access but not the bank's record of the transaction. The bank's internal records are considered final and binding. </li>
                                        <li><b>Joint accounts: </b>For joint accounts, all account holders are responsible for transactions made through online banking, even if only one holder uses it.</li>
                                        </ul>

                                        <h6 style={{ marginTop: "12px" }}>Security and Liability </h6>
                                        <ul><li><b>Confidentiality: </b>You agree to keep your user ID and password confidential. </li>
                                        <li><b>No liability: </b>The bank is not responsible for any transactions carried out using your user ID and password, even if they were unauthorized.</li></ul>

                                        <h6 style={{ marginTop: "12px" }}>Termination of Service </h6>
                                        <ul><li><b>Suspension or termination: </b>The bank may suspend or terminate your online banking access at any time, without notice or explanation.</li></ul>
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
                                <Typography  >DISCLOSURE OF PERSONAL INFORMATION</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <h6>Information Collection and Sharing</h6>
                                    <ul><li><b>Data storage: </b>The bank and its service providers may store your personal and technical information in computer systems or other formats for use with online banking services and statistical analysis. </li>
                                    <li><b>User system information: </b>You agree that the bank may collect information about your computer system. However, this does not include sensitive information like your user ID or password. </li>
                                    <li><b>Information sharing: </b> The bank may share your personal information with other institutions in strict confidence for purposes such as:</li>
                                    <ul><li>Participating in electronic clearing networks. </li>
                                    <li>Complying with legal or Reserve Bank of India requirements. </li>
                                    <li>Preventing fraud.</li></ul>
                                    The bank will never collect or disclose your user ID or password to anyone. 
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
                                <Typography  >TERMINATION OF INTERNET BANKING SERVICES</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <h6>Termination of Internet Banking Services </h6>
                                    <ul>
                                        <li><b>User request: </b>You can terminate your online banking services at any time by providing written notice to the bank. However, you will still be responsible for any transactions made on your accounts before the termination date. </li>
                                        <li><b>Bank termination: </b>The bank may suspend or terminate all or part of your online banking services at any time, without notice or explanation. This includes situations where you violate the terms and conditions of the agreement or if the bank becomes aware of your death, bankruptcy, or legal incapacity. </li>
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
                                <Typography  >GOVERNING LAWS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                   <h6>Governing Laws and Jurisdiction </h6>
                                   <ul><li><b>Indian law:</b>The terms and conditions for your online banking services, as well as any transactions on your accounts, are governed by Indian law.</li>
                                   <li><b>No foreign law:</b>The bank is not liable for non-compliance with the laws of any other country. </li>
                                   <li><b>Access from other countries:</b>The fact that you can access online banking from outside India does not mean that the laws of that country apply to you or your transactions.</li>
                                   <li><b>Adherence to Indian laws:</b>You agree to follow the laws of India regarding online banking services.</li>
                                   <li><b>Your responsibility:</b>You are responsible for complying with any regulations that apply in the country where you access the internet. </li>
                                   <li>Dispute resolution:</li>Any disputes arising from these terms and conditions will be subject to the jurisdiction of the courts in Mumbai, India. However, the bank may choose to file a lawsuit in any other court, tribunal, or appropriate forum, and you agree to this jurisdiction.</ul>
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
                                <Typography  >USE OF INTERNET BANKING SERVICE</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className={classes.accordiondata}>
                                    <ul><li><b>Security practices: </b>The terms and conditions outlined in this document establish the security measures the bank will follow for online banking services. This document serves as an agreement between you and the bank regarding online banking. </li>
                                    <li><b>Acceptance of terms:</b>By using the bank's online banking services, you agree to these terms and conditions, including any future amendments. You reaffirm your agreement with these terms every time you use your user ID and password for a transaction.</li></ul>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    </div>
                </div>
            </div>
        </div>
    );
}
