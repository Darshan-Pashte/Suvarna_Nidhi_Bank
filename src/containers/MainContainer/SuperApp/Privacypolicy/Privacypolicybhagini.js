import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from "../../../../containers/Login/Login.module.css";
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../../../assets/Banks/Bhagini/images/BhagniLogoAndName 1.jpg';

export default function PrivayPolicyBhagini() {


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
                <div className={classes.uprcontainer}>
                    <div className={classes.headingSecurity}>
                        Privacy Policy
                    </div>
                </div>
                <div>
                    <b>1 OBJECTIVE</b>
                    <br />
                    a) To ensure the security and privacy of customers' sensitive personal data.<br />
                    b) To comply with the Privacy Regulations viz. The Information Technology (Reasonable
                    Security Practices and Procedures and Sensitive Personal Data or Information Rules, 2011).<br />
                    c) Follow good practice.<br />
                    d) Protect BNSB's Stakeholders, staff, and other individuals<br />
                    e) Protect the organization from the consequences of a breach of its responsibilities<br /><br />

                    <b>2 SCOPE AND APPLICABILITY</b>
                    <br />
                    This policy is applicable to all employees of the BNSB, Head office and its branches and its
                    vendors.<br /><br />

                    <b>3 POLICY</b>
                    <br />
                    Bank customers’ sensitive personal data i.e. biometric data, passwords and financial
                    information such as bank account details, credit and debit card details shall be protected by
                    BNSB by following reasonable security practices and procedures. For this, BNSB has:<br />
                     Adopted a comprehensive documented information security program and policies that
                    contain managerial, technical, operational, and physical control measures<br />
                     Implemented the documented security practices<br />
                     Information Systems audits of Bank’s Data Center and branches conducted every year<br /><br />

                    BNSB shall always:<br />
                    a) Comply with both the law and good practices<br />
                    b) Respect individual’s rights of non-disclosure, confidentiality.<br />
                    c) Be open and honest with individuals whose data is held.<br />
                    d) Provide training and support for staff and volunteers who handle personal data, so that
                    they can act confidently and consistently<br />
                    e) Recognize that its first priority is to avoid causing harm to individuals, which means:<br />
                    - keeping information securely in the right hands, and<br />
                    - holding good quality information.<br /><br />

                    <b>3.1 Security and confidentiality of Customer Data</b><br /><br />

                    <b>3.1.1</b><br />
                    As per Information Systems security policies and procedures implemented in the BNSB,
                    BNSB has implemented administrative, physical, and technical safeguards to protect
                    electronic personal data from loss, misuse, and unauthorized access. Customers’ personal
                    data shall be stored on a secured database.<br /><br />

                    <b>3.1.2</b><br />
                    Bank shall not sell personal data to any third party or anybody and shall remain fully
                    compliant with confidentiality of the data as per law.<br />

                    <b>3.1.3</b><br />
                    Bank shall share customers' personal data with third parties if required for business purposes
                    only after implementing adequate controls to ensure maintenance of confidentiality and
                    security of the data by the concerned third party.<br /><br />

                    <b>3.2 Data Usage</b><br /><br />

                    <b>3.2.1</b><br />
                    Bank shall use customers' personal data only for the purpose for which it is collected.
                    Bank is committed to ensuring that personal data is kept strictly confidential. However,
                    personal data may be disclosed to regulatory authorities for the purposes of obtaining
                    regulatory approval in accordance with applicable legal requirements, or otherwise to
                    comply with applicable legal requirements.<br /><br />

                    <b>3.3 Data Retention</b><br />
                    Customer’s data shall be retained as per Senior management Directives (circulars issued
                    by Head Office) and Regulatory Standards (RBI directives)..<br /><br />

                    <b>3.4 Data modification</b><br />
                    BNSB shall update the customer data only after ensuring the authenticity of the change
                    request. Adequate access controls and authorization controls shall be in place to monitor
                    data modifications.<br /><br />

                    <b>3.5 Data Quality</b><br />
                    BNSB shall continuously review and assess the quality and completeness of the data.<br /><br />

                    <b>3.6 Auto Read OTP functionality:</b><br />
                    BNSB shall have an auto-read facility for OTP validation in the Mobile application. Whenever
                    the OTP is sent to the customer, BNSB mobile application shall auto-populate the OTP
                    in the required field instead of entering it by the keypad.<br /><br />

                    <b>3.7 SMS forwarding App / Remote access App:</b><br />
                    BNSB mobile application shall have the ability to identify the “SMS forwarding Apps” as
                    well as “Remote Access Apps” installed on the User’s handset. Based on the “AppID” of
                    these kinds of applications, BNSB mobile application shall restrict the users from accessing
                    the login to the BNSB mobile application if the user has installed the listed apps.<br /><br />

                    <b>3.8 SMS Delivery status facility:</b><br />
                    BNSB shall confirm that SMS Service Providers shall have Call back facilities available to
                    verify the status of SMS sent from the mobile application, also SMS service providers shall
                    have “SMS Delivery receipt check” to know the delivery status of the SMS forwarded
                    from the mobile application end.<br /><br />

                    <b>3.9 SMS forwarding App / Remote access App</b><br />
                    BNSB Mobile banking Application shall have the ability to read/detect Installed Applications on
                    the user’s device and upload it on the bank’s secure server for keeping a safe track of existing
                    applications. The app shall prohibit/restrict Mobile Banking Application usage in case of any
                    listed application with likes of “Remote Access Applications” and “SMS Forwarder
                    Applications” is detected.<br /><br />

                    <b>3.10</b><br />
                    By agreeing to terms within the Mobile banking application and written consent form
                    undertaken from the user during opting mobile banking feature, it will be considered the user
                    has provided affirmative consent for all above-mentioned disclosures.<br /><br />

                    <b>3.11 SECURITY AWARENESS AMONG USERS:</b><br />
                    All staff handling personal data shall receive training in the requirements of data
                    protection-related laws and regulations. They shall also be educated about the legal
                    consequences of intentional/unintentional disclosure/leakage of customers’ data.<br /><br />

                    <b>3.12</b><br />
                    The Bank shall take written consent from the customer in a specific format before providing
                    any special services via mobile.<br /><br />

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
    </div>
);

}
