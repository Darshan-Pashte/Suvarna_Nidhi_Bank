import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classes from "../../../../containers/Login/Login.module.css";
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../../../assets/Banks/Bhagini/images/BhagniLogoAndName 1.jpg';
export default function TermsConditionbhagini() {
    // const { banklink, displayBankLink, npci, displayNpciLink, rbi, displayRbiLink , bankAddress } = useContext(DataContext);
    console.log('REACT_APP_LINKS:', process.env.REACT_APP_LINKS);
    const links = JSON.parse(process.env.REACT_APP_LINKS);

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
                    <h3 align="center" className="logo1">Terms and Conditions</h3>

                    <div>
                        <b>Terms and Conditions for Mobile Banking Service</b><br /><br />
                        Definitions: The following words and expressions shall have the corresponding meanings wherever appropriate.
                        <br /><br />
                        <b>Bank</b>: Shall mean Bhagini Nivedita Sahakari Bank Ltd., Pune<br /><br />
                        <b>Account</b>: Shall mean account at the bank which has been registered for Mobile banking facility.<br /><br />
                        <b>Customer</b>: Shall mean the holder of an Account in Bhagini Nivedita Sahakari Bank Ltd., Pune<br /><br />
                        <b>IBS</b>: Shall mean Internet Banking Service provided by the Bank.<br /><br />
                        <b>Mobile Phone Number</b>: Shall mean the Mobile number that has been registered by the customer with the Bank<br /><br />
                        <b>Email ID</b>: Shall mean the Email Id that has been registered by the customer with the Bank.<br /><br />
                        <b>Bank’s website</b>: Shall mean www.bhagininiveditabank.com<br /><br />
                        <b>MPIN</b>: Shall mean the Personal Identification Number (password) for the Internet Banking services.<br /><br />
                        <b>Registration</b>: Shall mean generation of User ID and MPIN.<br /><br />
                        <b>OTP</b>: Shall mean One Time Password, which will get auto generated and fetched by the application while verifying the Mobile number and handset.<br /><br />
                        <b>Parties</b>: Party to this terms and conditions shall collectively be mentioned as Parties<br /><br />

                        This document is published in adherence to Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011, which mandates the publication of rules, regulations, privacy policy, and user agreement for access or usage. It shall be construed strictly in accordance with these provisions, and any interpretation shall favor the bank's intent to comply with applicable laws, thereby reducing the bank's liability to the minimum extent permitted by law.
                        <br /><br />

                        <b>Applicability of Terms and Conditions:</b>
                        These Terms and Conditions, alongside any applications made by the Bank and accepted by the Customer, constitute a binding contract between the Customer and the Bank. This contract is subject to additional terms agreed upon with other service providers assisting the Bank in offering the Facility. It complements, without derogating from, any other terms and conditions governing Bank Phone Banking, the Account, and/or any other product/services provided by the Bank and its Affiliates. By applying for, accessing, or using the Facility, the Customer, including Authorized Users, unequivocally acknowledges and accepts these Terms and Conditions in their entirety, thereby waiving any right to contest their applicability or the extent of their acceptance. Furthermore, the Bank reserves the right to modify these Terms and Conditions at any time, with such modifications becoming effective upon posting to the Bank’s website or direct communication to the Customer, whichever occurs first. The continued use of the Facility by the Customer or any Authorized User after any such modifications shall constitute an acceptance of the revised Terms and Conditions.
                        <br /><br />

                        <b>General Business Rules Governing Mobile Banking Service:</b>
                        The Service will be available to Customers having a Savings/Current/Cash Credit account with the Bank.
                        <br /><br />
                        1. The Bank sets a daily transaction limit for each Customer, subject to change at the Bank's sole discretion or in accordance with the regulation. Customers will be notified of any changes to this limit through the Bank’s official communication channels.
                        <br /><br />
                        2. Entering an incorrect MPIN three times will result in an automatic block of the IBS facility for the day to protect customer accounts against unauthorized access. This security measure is non-negotiable, and the Bank bears no liability for inconvenience or loss due to account access being temporarily blocked. Any change in the business rules of any of the processes will be notified on Bank’s website www.bhagininiveditabank.com which will be construed as sufficient notice to the Customer.
                        <br /><br />
                        3. For joint accounts operating under 'either or survivor' mode, any holder is authorized to use the Service, with transactions binding all joint holders jointly and severally. Changes in account operation mode must be communicated to and acknowledged by the Bank for application modifications. Accounts with minors are ineligible for IBS.
                        <br /><br />
                        4. The Bank retains absolute authority to decline any Customer’s IBS request without disclosure of reasons, ensuring adherence to regulatory and risk management policies.
                        <br /><br />
                        5. Customers may terminate the Facility through a branch visit or via their registered application. Customers are liable for transactions prior to the Bank's acknowledgment of termination. The Bank may, at its discretion, withdraw or terminate the Service at any time without notice, for reasons including but not limited to maintenance, security concerns, or regulatory compliance. The Bank is not liable for losses/damages arising from service suspension or termination.
                        <br /><br />
                        6. Services under IBS will cease if the primary account is closed. The Bank may also suspend or terminate services without notice for breach of terms, or upon the Customer’s death, subject to regulatory compliance and risk management considerations.
                        <br /><br />
                        7. Customers changing their device must re-register the new device with the Bank to continue using IBS, ensuring account security and service continuity.
                        <br /><br />
                        8. To protect customer security, the application will automatically log out after a period of inactivity, specified by the Bank and subject to change.
                        <br /><br />
                        9. OTPs sent for authentication purposes are valid for a limited duration, as determined by the Bank, to ensure secure transactions.
                        <br /><br />

                        <b>Usage of facility:</b>
                        By accepting the terms and conditions on the mobile phone while registering for the service, the customer:
                        <br /><br />
                        <b>1. Agreement to Use IBS</b>
                        <br /><br />
                        By registering for the service, the customer unequivocally agrees to utilize IBS for both financial and
                        non-financial transactions as made available by the Bank and irrevocably authorizes the Bank to debit any
                        account(s) enabled for IBS for all transactions/services conducted using MPIN and User ID.
                        <br /><br />
                        <b>2. Authorization for Data Mapping</b>
                        <br /><br />
                        The customer authorizes the Bank to associate the account number, User ID, and mobile phone number to
                        facilitate the operation of the service and agrees that the Bank may store this mapping data on its own servers
                        or any other secure location. The Bank may utilize such data at its discretion to offer or enhance further
                        banking/technology products.
                        <br /><br />
                        <b>3. Acceptance of Transaction Validity</b>
                        <br /><br />
                        The customer acknowledges and accepts that the facility allows transactions post-login using the User ID and
                        MPIN within limits set by the Bank. All transactions shall be considered valid and bona fide.
                        <br /><br />
                        <b>4. Non-retractability of Transactions</b>
                        <br /><br />
                        The customer agrees that transactions initiated using mobile phones are final and non-retractable as they occur
                        in real-time/instantaneously.
                        <br /><br />
                        <b>5. Right to Revise Ceilings</b>
                        <br /><br />
                        The customer understands and agrees that the Bank possesses the absolute right to modify transaction ceilings
                        at any time, and such modifications will be effectively binding on the customer.
                        <br /><br />
                        <b>6. Use of Registered Mobile Phone</b>
                        <br /><br />
                        The customer commits to using the service exclusively on a mobile phone that is duly and legally registered in
                        their name with the mobile service provider, and to utilize the facility only through the mobile number
                        registered for the service.
                        <br /><br />
                        <b>7. Use of Registered Mobile Phone</b>
                        <br /><br />
                        The customer commits to using the service exclusively on a mobile phone that is duly and legally registered in
                        their name with the mobile service provider, and to utilize the facility only through the mobile number
                        registered for the service.
                        <br /><br />
                        <b>8. Acknowledgment of Authentication Method</b>
                        <br /><br />
                        The customer acknowledges that while the Information Technology Act, 2000, allows for authentication of
                        electronic records by digital signature, the Bank employs alternative methods such as Mobile Number, MPIN, or
                        other methods in accordance with the regulatory norms for customer authentication. These methods may not be
                        specifically recognized under the IT Act, 2000, for electronic record authentication. The customer agrees this
                        method is acceptable and binding and assumes full responsibility for maintaining the secrecy and
                        confidentiality of the MPIN, absolving the Bank of any liability related to unauthorized use.
                        <br /><br />
                        <b>Others</b>
                        <br /><br />
                        <b>1. Customer's Responsibility for Errors</b>
                        <p>
                            The Customer acknowledges the necessity to understand the process of using the service thoroughly. The Customer
                            bears full responsibility for any errors made while utilizing the service. The Bank shall not be liable for any
                            losses or damages resulting from such errors.
                        </p>
                        <br />
                        <b>2. Bank's Discretion on Services Offered</b>
                        <p>
                            The Bank reserves the exclusive right to determine the scope of services offered through the Facility. This
                            includes the right to add or remove services at its sole discretion without prior notice to Customers.
                        </p>
                        <br />
                        <b>3. Effectuation of Customer Instructions</b>
                        <p>
                            Customer instructions will be executed only upon successful authentication using the USER ID and MPIN, or any
                            other verification method as deemed appropriate by the Bank. The Bank reserves the right to introduce new
                            authentication methods to enhance security.
                        </p>
                        <br />
                        <b>4. Limitation of Bank's Liability</b>
                        <p>
                            While the Bank strives to execute customer instructions promptly, it shall not be held liable for any delays or
                            failures to execute such instructions due to operational system failures, legal requirements, or any
                            circumstances beyond its control. The Customer hereby grants the Bank the authority to access and share account
                            information as necessary for providing the services and complying with legal obligations.
                        </p>
                        <br />
                        <b>5. Record of Transactions</b>
                        <p>
                            The Bank will maintain records of all transactions. These records shall serve as definitive evidence of the
                            transactions' authenticity and accuracy. The Customer agrees to the admissibility of these records as
                            conclusive evidence in any dispute.
                        </p>
                        <br />
                        <b>6. Authorization to Send Promotional Messages</b>
                        <p>
                            The Customer expressly authorizes the Bank and its agents to send promotional messages, including information
                            about the Bank's products, greetings, or any messages deemed appropriate by the Bank. This consent covers all
                            forms of communication. The Customer may opt out of receiving promotional messages at any time by notifying the
                            Bank in accordance with the procedures established by the Bank.
                        </p>
                        <br />
                        <b>7. Rejection of Service Requests</b>
                        <p>
                            The Customer acknowledges that the Bank may send notifications of rejection or inability to process service
                            requests for any reason. The Bank shall not be liable for any consequences or liabilities arising from such
                            rejections or processing failures.
                        </p>
                        <br />
                        <b>8. Confidentiality and Liability</b>
                        <p>
                            The Bank commits to making reasonable efforts to maintain the confidentiality of customer information. However,
                            the Bank shall not be held liable for any inadvertent disclosure or leakage of confidential Customer
                            information resulting from events beyond its control or actions by third parties.
                        </p>
                        <br />
                        <b>9. Authorization of Transactions</b>
                        <p>
                            The Customer expressly authorizes the Bank to process all requests/transactions deemed to have originated from
                            his/her mobile device and authenticated via the user ID and MPIN. For funds transfer requests, the issuance of
                            such a request from the customer's device will be taken as explicit authorization for the Bank to execute the
                            payment.
                        </p>
                        <br />
                        <b>10. Reporting Loss/Theft of Mobile Phone</b>
                        <p>
                            It is the Customer's responsibility to promptly inform the Bank of any loss or theft of their mobile phone,
                            following the procedure specified by the Bank for such events. Failure to promptly report may limit the
                            protections available to the Customer under these terms.
                        </p>
                        <br />
                        <b>11. Telecom Service Provider Charges</b>
                        <p>
                            The Customer may incur charges from their Telecom Service Provider for data or SMS services used in connection
                            with the IBS. The Bank is not responsible for any disputes that may arise between the Customer and their
                            Telecom Service Provider regarding such charges.
                        </p>
                        <br />
                        <b>12. Confidentiality of User ID and MPIN</b>
                        <p>
                            The Customer is solely responsible for maintaining the confidentiality of their IBS user ID and MPIN. The Bank
                            shall not be liable for any loss or damage arising from the Customer's failure to secure these credentials.
                        </p>
                        <br />
                        <b>13. Liability for Divulgence of Access Credentials</b>
                        <p>
                            The Customer bears sole responsibility for any adverse consequences resulting from the inadvertent or negligent
                            disclosure of their IBS user ID and MPIN to third parties. The Bank is not liable for any misuse arising from
                            such disclosure.
                        </p>
                        <br />
                        <b>Fee Structure for the Facility</b>
                        <p>
                            The Bank reserves the exclusive right to levy charges on the Customer for the use of services provided under
                            this facility. The Bank also retains the discretion to modify these fees at any time. Notification of such
                            charges and any changes to the fee structure will be published on the Bank’s official website. This publication
                            shall constitute sufficient notice to the Customer, and continued use of the facility post-notification implies
                            the Customer's acceptance of the new fee structure. All fees charged are non-refundable, except as specifically
                            provided in these terms or as required by applicable law.
                        </p>
                        <br />
                        <b>Accuracy of Information:</b>
                        <br />
                        <b>1. Responsibility for Providing Accurate Information</b>
                        <p>
                            The Customer bears the sole responsibility for providing accurate and current information to the Bank via the
                            Service or through any other communication method. Should discrepancies arise due to incorrect information
                            provided by the Customer, the Bank disclaims any liability for actions taken based on such inaccuracies. Upon
                            notification by the Customer of any errors in the information, the Bank will attempt to rectify the error on a
                            best-effort basis, without guaranteeing a specific outcome or timeframe.
                        </p>
                        <br />
                        <b>2. Bank's Effort on Accuracy</b>
                        <p>
                            The Bank commits to employing reasonable efforts to ensure the accuracy of information it provides. However,
                            the Customer acknowledges that errors or omissions may occur due to factors beyond the Bank's control.
                            Accordingly, the Bank cannot be held liable for any such inaccuracies, errors, or omissions.
                        </p>
                        <br />
                        <b>3. Limitation of Liability for Information Accuracy</b>
                        <p>
                            The Customer agrees that the Bank shall not be liable for any errors in the information provided, even if such
                            errors occur despite the Bank's efforts to ensure information accuracy. The Customer waives any right to hold
                            the Bank responsible for any loss or damage incurred as a consequence of relying on inaccurate information
                            provided by the Bank, except in cases of gross negligence or willful misconduct by the Bank.
                        </p>
                        <br />
                        <b>Responsibilities and Obligations of the Customer:</b>
                        <br />
                        <b>1. Liability for Transactions</b>
                        <p>
                            The customer assumes full responsibility for all transactions conducted through the use of his/her mobile
                            phone, SIM card, and MPIN, including any fraudulent or erroneous transactions. This responsibility applies
                            regardless of whether the transactions were authorized or initiated by the customer. Consequently, the customer
                            bears all risks and consequences, including any loss or damage arising from such transactions.
                        </p>
                        <br />
                        <b>2. Security of Mobile Phone and SIM Card</b>
                        <p>
                            The Customer is obligated to safeguard his/her mobile phone and SIM card against unauthorized use. In the event
                            of misuse, theft, or loss of the mobile phone or SIM card, the Customer must promptly de-register from the IBS
                            following the Bank’s specified procedure. Failure to comply with this security measure absolves the Bank of any
                            liability for transactions made subsequent to the loss or theft.
                        </p>
                        <br />
                        <b>3.Usage of MPIN</b>
                        <br /><br />
                        The Customer agrees to use the MPIN strictly in accordance with the Bank's instructions and procedures, as may
                        be updated from time to time. Non-compliance with these guidelines may compromise account security and the
                        Customer will be solely liable for any resultant unauthorized access or transactions.
                        <br /><br />
                        <b>4.Confidentiality of USERID and MPIN</b>
                        <br /><br />
                        The Customer shall maintain the confidentiality of the USERID and MPIN at all times. Disclosure of these
                        credentials to others, or recording them in an insecure manner, breaches the Customer’s duty to protect account
                        access. The Customer is solely responsible for any adverse outcomes resulting from such breaches.
                        <br /><br />
                        <b>5.Reporting Misuse of MPIN</b>
                        <br /><br />
                        Should the Customer suspect any misuse of the MPIN, it is their immediate responsibility to inform the Bank and
                        undertake steps to change the MPIN. Delay in reporting or taking protective action places the liability for
                        unauthorized transactions on the Customer.
                        <br /><br />
                        <b>6.De-registration Upon Loss of Mobile Phone or SIM</b>
                        <br /><br />
                        In the event of loss or theft of the mobile phone or SIM card, the customer must immediately proceed
                        to de-register from the service to prevent unauthorized access and transactions. The customer's failure to
                        promptly de-register will result in the customer being fully responsible for any transactions that occur
                        thereafter.
                        <br /><br />
                        <b>7.Assumption of Authorization for Transactions</b>
                        <br /><br />
                        Any transaction that originates from the registered mobile number and handset using the customer's USERID and
                        MPIN will be deemed to have been authorized by the customer. Such transactions will be legally binding on the
                        customer, who will bear full responsibility for all implications of these transactions.
                        <br /><br />
                        <b>8.Duty to Stay Informed</b>
                        <br /><br />
                        The Customer is responsible for keeping themselves informed of any updates, modifications, or information
                        regarding the services provided under the facility, as announced on the Bank's website or at its branches.
                        Ignorance of such updates or modifications will not absolve the customer of their responsibilities under these
                        terms and conditions.
                        <br /><br />
                        <b>9.Liability for Losses Due to Breach of Terms</b>
                        <br /><br />
                        The customer shall bear full liability for all losses resulting from a breach of these Terms and Conditions,
                        whether through negligent actions or failure to promptly notify the Bank of unauthorized account access. The
                        responsibility to minimize loss by timely communication lies squarely with the customer.
                        <br /><br />
                        <b>10.Legal Compliance and Responsibility for Mobile Connection/SIM/Phone</b>
                        <br /><br />
                        The customer is solely liable and responsible for ensuring legal compliance and adherence to commercial terms
                        and conditions related to the mobile connection, SIM card, and mobile phone used to avail the facility. The
                        Bank disclaims any responsibility regarding the customer's mobile service agreement or any related legal
                        obligations.
                        <br /><br />
                        <b>Disclaimer</b>
                        <br /><br />
                        <b>1.Absolution of Liability in Good Faith Actions</b>
                        The Bank shall not be liable for any failure to receive or execute requests from the Customer, loss of
                        information during processing or transmission, unauthorized access by third parties, breach of confidentiality,
                        or any other issues arising from circumstances beyond the Bank's control.
                        <br /><br />
                        <b>2.Exemption from Losses Incurred</b>
                        <br /><br />
                        The Bank is absolved from any liability for any direct or indirect loss incurred by the Customer or any third
                        party due to failures or lapses in the facility that are outside the Bank's control.
                        <br /><br />
                        <b>3.No Liability for Transmission Failures</b>
                        <br /><br />
                        The Bank shall not be liable for any failure, delay in transmitting information, inaccuracies in information,
                        or any consequences arising from causes beyond the Bank's control, including but not limited to technology
                        failures, mechanical breakdowns, and power disruptions.
                        <br /><br />
                        <b>4.Service Provider and Third-Party Failures</b>
                        <br /><br />
                        The Bank disclaims any liability for lapses or failures attributable to service providers or third parties
                        involved in this facility. The Bank does not guarantee the quality of service provided by any such entities.
                        Neither the Bank nor its employees, agents, or contractors shall be liable for any loss or damage, whether
                        direct, indirect, or consequential, arising from delays, interruptions, or errors in service provision.
                        <br /><br />
                        <b>5.Compatibility of Mobile Banking Application</b>
                        <br /><br />
                        The Bank assumes no responsibility for the compatibility of the mobile banking application with the Customer's
                        mobile handset. It is the Customer's responsibility to ensure that their device is compatible with the Bank's
                        mobile banking services.
                        <br /><br />
                        <b>6.Responsibility for Third-Party Activities</b>
                        <br /><br />
                        The Customer is responsible and will be held accountable for any actions undertaken by third parties using
                        their account that contravene these terms and conditions.
                        <br /><br />
                        <b>7.Liability for Third-Party Services</b>
                        <br /><br />
                        The Bank disclaims all liability for any errors, omissions, or deficiencies in the services provided by any
                        cellular or third-party service provider, regardless of whether they are appointed by the Bank or not. This
                        exemption extends to any impact such deficiencies may have on the Facility.
                        <br /><br />
                        <b>8.Confidentiality and Security Disclaimer</b>
                        <br /><br />
                        The Bank does not guarantee the confidentiality or security of messages transmitted via the Facility. There is
                        no warranty, express or implied, concerning the system and network's function or performance. The Bank shall
                        not be liable for any loss or damage, direct or indirect, suffered by the Customer or any third party, related
                        to the use of the Facility.
                        <br /><br />
                        <b>9.Data Protection Commitment with Liability Limitation</b>
                        <br /><br />
                        The Bank is committed to protecting the personal data of its customers in line with applicable data protection
                        laws. Notwithstanding, the Bank shall not be held liable for any unauthorized access to personal data that
                        occurs without its direct fault or negligence.
                        <br /><br />
                        <b>Customer Conduct</b>
                        <br /><br />
                        Customers are expected to use the banking services responsibly and in compliance with applicable laws and
                        regulations. Prohibited activities include, but are not limited to, using the services for illegal purposes,
                        engaging in fraudulent activities, attempting unauthorized access to the bank’s systems, and any actions that
                        could cause harm to the bank or other customers. Violation of these guidelines may result in suspension or
                        termination of service access and legal action. Customers are also responsible for securing their account
                        credentials and must promptly report any suspected unauthorized activities.
                        <br /><br />
                        <b>Authority to Bank</b>
                        <br /><br />
                        The Customer hereby grants the Bank irrevocable and unconditional authority to access their accounts and
                        personal information to execute the Customer's instructions, provide the Facility, and for purposes including
                        but not limited to analysis, credit scoring, and marketing initiatives. Both the Customer and any Authorized
                        User acknowledge and consent to the Bank's right to share such personal and account information with other
                        institutions as deemed necessary or appropriate by the Bank. This includes participation in telecommunications
                        or electronic clearing networks, compliance with legal or regulatory directives, engagement with recognized
                        credit rating or scoring agencies, and activities aimed at fraud prevention and detection. The Customer
                        understands that this authorization is critical to the provision and improvement of the banking services and
                        consents to such use and disclosure in accordance with applicable laws and regulations.
                        <br /><br />
                        <b>Records</b>
                        <br /><br />
                        All records maintained by the Bank concerning the Account and/or resulting from the use of the Facility,
                        including details such as the recorded time of transactions and the identity of the Authorized User initiating
                        them, shall be deemed as conclusive evidence of the authenticity and accuracy of the transactions conducted
                        through the Account. The Customer hereby expressly grants the Bank the authority to document these transaction
                        details. This record-keeping is vital for the verification of transactions and may be used as definitive proof
                        in the event of any disputes, inquiries, or for compliance with legal and regulatory requirements.
                        <br /><br />
                        <b>Intellectual Property</b>
                        <br />
                        <br />
                        All content, trademarks, logos, and any other intellectual property associated with the banking services are
                        the exclusive property of the Bank or its licensors. The Customer acknowledges that such intellectual property
                        is protected by applicable intellectual property laws and agrees not to use, reproduce, distribute, or display
                        any part of the service outside the scope of the intended banking services without the Bank's prior written
                        permission. Unauthorized use of the Bank's intellectual property may result in legal action and enforcement of
                        rights to the fullest extent permitted by law.
                        <br />
                        <br />
                        <b>Limitation of Liability</b>
                        <br />
                        <br />
                        The Bank shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                        including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from
                        (i) your access to or use of or inability to access or use the services; (ii) any conduct or content of any
                        third party on the services; (iii) any content obtained from the services; and (iv) unauthorized access, use,
                        or alteration of your transmissions or content, whether based on warranty, contract, tort (including
                        negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage,
                        and even if a remedy set forth herein is found to have failed its essential purpose.
                        <br />
                        <br />
                        <b>Indemnity:</b>
                        <br />
                        <br />
                        In consideration of the Bank offering these facilities, the Customer hereby agrees to fully indemnify and hold
                        the Bank, its directors, officers, employees, and agents harmless from and against all liabilities, legal fees,
                        damages, losses, costs, and other expenses in relation to any claims or actions that arise as a result of
                        direct or indirect use of these facilities by the Customer. This indemnity covers, without limitation, any
                        financial loss, litigation costs, or reputational damage incurred by the Bank due to the Customer's actions,
                        unauthorized third-party access to the Customer's information/instructions, or any breach of confidentiality
                        obligations by the Customer. Furthermore, the Customer agrees to extend this indemnity to cover any
                        consequences resulting from the Bank acting on instructional triggers, whether authorized or unauthorized,
                        provided by the Customer, thereby safeguarding the Bank against any and all repercussions of executing such
                        instructions.
                        <br />
                        <br />
                        <b>Data Protection and Privacy:</b>
                        <br />
                        <br />
                        The Bank is committed to safeguarding the privacy and security of customer personal information. In compliance
                        with applicable data protection laws, the Bank collects, uses, stores, and protects customer data strictly for
                        the purpose of providing and improving banking services. We implement robust security measures to prevent
                        unauthorized access, disclosure, alteration, or destruction of personal data. Customers have the right to
                        access, correct, and delete their personal data, subject to banking regulations and verification processes. The
                        Bank may share customer information with regulatory authorities and service providers only as necessary for
                        providing banking services, and under strict confidentiality agreements. This clause outlines our data
                        protection practices and customers' rights regarding their personal data.
                        <br />
                        <br />
                        <b>Termination</b>
                        <br />
                        <br />
                        <b>Customer Initiated Termination</b>
                        <br />
                        <br />
                        The Customer may terminate the Facility, either in entirety or in specific parts, at any given time by
                        submitting a written notice to the Bank. This notice must be provided at least 15 days prior to the desired
                        termination date. The Customer acknowledges responsibility for any transactions made through the Facility using
                        their Mobile Phone Number up until the end of this 15-day notice period.
                        <br />
                        <br />
                        <b>Bank Initiated Termination or Suspension</b>
                        <br />
                        <br />
                        The Bank reserves the right to temporarily withdraw or permanently terminate the Facility, in whole or in part,
                        at its sole discretion, without any obligation to provide prior notice to the Customer. This right extends to
                        situations requiring maintenance, repair, emergency actions, for ensuring security, or in circumstances where
                        the Customer is found to be in breach of these terms and conditions. Additionally, the Bank may suspend the
                        Facility immediately under circumstances necessitating such action, including, but not limited to, operational,
                        security, or regulatory reasons, or if it is determined that the Customer may not be able to fulfill their
                        obligations under these terms. The Bank will endeavor to notify the Customer as soon as practicable, except
                        when such notification is impractical or counter to security and regulatory protocols.
                        <br />
                        <br />
                        <b>Effect of Account Closure on Facility</b>
                        <br />
                        <br />
                        Termination of the Mobile Banking Services by the Customer or closure of the Accounts to which the Facility is
                        linked will automatically result in the termination of the Facility. The Customer is liable for all obligations
                        incurred until the effective date of termination.
                        <br />
                        <br />
                        <b>Grievance Officer</b>
                        <br />
                        <br />
                        In accordance with Information Technology Act, 2000 and rules made there under, the Grievance Officer for the
                        purpose of your personal sensitive information as governed by Bank’s Privacy Policy is Asmita Modak and can be
                        reached at email: asmita.modak@bhagininiveditabank.com
                        <br />
                        <br />
                        <b>Waiver</b>
                        <br />
                        <br />
                        No delay or failure by either party to exercise any of its powers, rights or remedies under this Agreement will
                        operate as a waiver of such powers, rights or remedies, nor will any single or partial exercise of any such
                        powers, rights or remedies preclude any other or further exercise of the same. Any waiver, to be effective,
                        must be in writing.
                        <br />
                        <br />
                        <b>Compliance with Laws Clause</b>
                        <br />
                        <br />
                        The Customer hereby agree to comply fully with all applicable laws, regulations, and guidelines in the
                        utilization of the banking services. This includes adherence to anti-money laundering regulations, privacy
                        laws, and any other legal requirements pertinent to banking operations and financial transactions. Each party
                        commits to conducting their activities under this agreement in a manner that upholds the integrity and legality
                        of the services provided.
                        <br />
                        <br />
                        <b>Severability:</b>
                        <br />
                        <br />
                        If any provision of this Agreement is determined by any competent authority to be invalid, illegal, or
                        unenforceable in whole or in part, the validity, legality, and enforceability of the remaining provisions, or
                        parts thereof, shall not in any way be affected or impaired. It is hereby agreed that any such invalid,
                        illegal, or unenforceable provision shall be deemed modified to the minimum extent necessary to make it valid,
                        legal, and enforceable while preserving, to the fullest extent possible, the original intentions of the parties
                        as reflected in the original provision. Such modification shall be performed in a manner that most closely
                        matches the original intent behind the unenforceable provision, ensuring the continuation of this Agreement's
                        overall objectives. Following any such modification, the rights and obligations of the parties hereunder shall
                        be interpreted and enforced in accordance with such modifications, maintaining the integrity of the Agreement
                        to the fullest extent permissible by law.
                        <br />
                        <br />
                        <b>Third-Party Services and Links</b>
                        <br />
                        <br />
                        The banking services may integrate with or provide links to third-party services for informational purposes or
                        to offer additional functionality. While these third-party services are selected with care, the Bank does not
                        endorse and is not responsible for the content, functionality, security, or practices of such third-party
                        services. The Customer acknowledges that use of any third-party services is at their own risk and discretion.
                        The Bank disclaims all liability associated with the use of any third-party services linked to or from the
                        banking services.
                        <br />
                        <br />
                        <b>Notices</b>
                        <br />
                        <br />
                        Both the Bank and the Customer may issue notices under these terms and conditions through electronic means to
                        the Customer's designated email address, which shall be considered as written notice. Alternatively, notices
                        may be delivered by hand or sent by registered post or courier to the last known address provided by the
                        Customer to the Bank. For notices directed to the Bank, they should be sent to its operational office located
                        at CTS.No. 34/7, Final Plot No. 35/7B, Prabhat Road, Lane No.8, Erandwane, Pune - 411004. In addition to
                        individual notices, the Bank reserves the right to publish notices of a general nature related to the Facility,
                        applicable to all Customers, on its official website. Such published notices shall be deemed to have been
                        personally served to each Customer upon posting. Both the Bank and the Customer agree to promptly notify each
                        other of any changes in their contact details to ensure the effective delivery of notices.
                        <br />
                        <br />
                        <b>Amendment</b>
                        <br /><br />
                        The Bank reserves the exclusive right to modify, amend, or update the Terms and Conditions of this Agreement at
                        its discretion, to reflect changes in law, best practices, or enhancements to services provided. Any such
                        modifications, amendments, or updates will take effect immediately upon their publication on the Bank's
                        official website. Continued use of the mobile banking services by the Customer following the posting of the
                        modified Terms and Conditions constitutes unambiguous acceptance of those changes. The Customer is encouraged
                        to review the Terms and Conditions periodically to remain informed of any changes. If the Customer does not
                        agree to the modified Terms and Conditions, the Customer has the right to discontinue use of the mobile banking
                        services. The Bank will endeavor, but is not obligated, to provide direct notice of any significant changes to
                        the Terms and Conditions to the Customer through email or other personal communication channels.
                        <br /><br />

                        <b>Force Majeure Clause</b>
                        <br /><br />
                        Neither the Bank nor the Customer shall be held liable for any delay or failure in performance under this
                        Agreement due to events beyond their reasonable control, including but not limited to natural disasters, acts
                        of government, pandemics, terrorism, war, or any other event constituting force majeure. Upon occurrence of
                        such force majeure events, the affected party shall notify the other party promptly. Efforts shall be made to
                        resume performance as soon as possible, but no party shall be required to incur unreasonable expenses or take
                        actions that are substantially disproportionate to the effects of the force majeure event.
                        <br /><br />

                        <b>Governing Law and Jurisdiction:</b>
                        <br /><br />
                        Any disputes arising from or in connection with this Agreement, including disputes regarding its
                        interpretation, violation, invalidity, non-performance, or termination, shall be governed by and construed in
                        accordance with the laws of the Republic of India. The parties hereby agree that the courts located in Pune,
                        India, shall have exclusive jurisdiction to hear and determine any such disputes. This provision explicitly
                        designates the legal framework that will apply and identifies the courts that will have the authority to
                        resolve any disputes, ensuring that all parties have a clear understanding of their rights and obligations
                        under the Agreement.
                        <br /><br />

                        <b>Changes to Services</b>
                        <br /><br />
                        The Bank reserves the right to modify, suspend, or discontinue any part or all of the banking services at any
                        time without prior notice to Customers, except where notice is required by law. Such changes may be due to
                        reasons including, but not limited to, maintaining the security and integrity of the services, complying with
                        legal requirements, or adding and improving features. The Bank will endeavor to minimize inconvenience to
                        Customers by providing reasonable notice of significant changes where feasible. The Customer's continued use of
                        the services following any changes indicates their acceptance of the new terms.
                        <br /><br />

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
