import React, { useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./Login.module.css";
import { DataContext } from "../../context/LoaderContext";

export default function PrivayPolicy() {
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
            <div className={classes.headingSecurity}>Privacy Policy</div>
            <h6>Introduction</h6>
            <p>
              At Suvarna Laxmi Nidhi Limited, safeguarding your privacy and
              securing your financial data is our top priority. Our commitment
              is to maintain the confidentiality, integrity, and security of
              your personal and financial information. This Privacy Policy
              explains how we collect, store, process, and protect your data,
              ensuring compliance with the regulatory frameworks of the{" "}
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                Ministry of Corporate Affairs (MCA)
              </span>{" "}
              and undertaking by{" "}
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                Reserve Bank of India (RBI)
              </span>{" "}
              .{" "}
            </p>
            <h6 style={{ marginTop: "20px" }}>Scope of the Policy</h6>
            <p>
              This policy governs the data privacy practices of Suvarna Laxmi
              Nidhi Limited and applies to customers, members, employees, and
              visitors of our website. By using our services, you acknowledge
              and consent to the collection, use, and disclosure of your
              information as described in this policy.
            </p>
            <h6 style={{ marginTop: "20px" }}>Information We Collect</h6>
            <p>
              To provide seamless financial services, we collect a variety of
              data, including personal identifiers such as name, address,
              contact details, email ID, date of birth, PAN, Aadhaar, and
              passport details. Financial information including bank details,
              transaction history, loan details, and income proof is also
              collected. KYC documentation, as required by regulatory
              guidelines, includes government-mandated identity and address
              proofs. Technical data such as IP addresses, device identifiers,
              browsing history, and cookies are utilized to enhance security and
              improve user experience.
            </p>
            <h6 style={{ marginTop: "20px" }}>How We Collect Information</h6>
            <p>
              We obtain data through direct customer interactions, online
              transactions, loan agreements, our website, mobile applications,
              and from legally authorized third-party agencies such as{" "}
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                {" "}
                credit bureaus, verification agencies, and regulatory
                authorities
              </span>
              .
            </p>
            <h6 style={{ marginTop: "20px" }}>
              Purpose of Data Collection and Processing
            </h6>
            <p>
              Your information is used to deliver and manage financial services,
              conduct KYC and AML verifications, enhance customer experience,
              prevent fraud and cyber threats, comply with regulatory
              obligations, and offer personalized marketing communications with
              your consent.
            </p>
            <h6 style={{ marginTop: "20px" }}>Data Security Measures</h6>
            <p>
              We employ cutting-edge security protocols, including end-to-end
              encryption to safeguard sensitive financial data, multi-factor
              authentication to enhance login security, regular security audits
              to proactively identify vulnerabilities, restricted data access to
              prevent unauthorized access, and continuous monitoring to detect
              cyber threats and breaches.
            </p>
            <h6 style={{ marginTop: "20px" }}>
              Sharing and Disclosure of Information
            </h6>
            <p>
              We do not sell or rent your data. However, information may be
              shared with regulatory authorities such as{" "}
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                {" "}
                RBI, MCA, and the relevant government authorities{" "}
              </span>{" "}
              when legally mandated. Credit bureaus receive data for
              creditworthiness assessments related to financial transactions.
              Third-party service providers may process data for payment
              processing, IT support, and fraud detection. Law enforcement
              agencies may access information in cases of legal obligations or
              fraud investigations. Business partners may receive data with
              explicit user consent for tailored financial offers.
            </p>
            <h6 style={{ marginTop: "20px" }}>Data Retention and Disposal</h6>
            <p>
              We retain your data only as long as necessary for business and
              regulatory requirements. Upon expiration, data is securely deleted
              or anonymized following strict data disposal protocols.
            </p>
            <h6>User Rights and Choices</h6>
            <p>
              You have full control over your personal data, including the right
              to access, update, delete, or restrict processing. To exercise
              your rights, contact us at{" "}
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                {" "}
                {bankContactInfo?.email}
              </span>
            </p>
            <h6>Grievance Redressal Mechanism</h6>
            <p>
              For concerns related to data privacy, reach out to our Grievance
              Officer at{" "}
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                {" "}
                Suvarna Laxmi Nidhi Limited,
              </span>{" "}
              Sr. No. 106-3A, Near Hotel Sahara, S. B. Road, Shivaji Nagar, Pune
              411016, or via email at{" "}
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                {" "}
                {bankContactInfo?.email}
              </span>
            </p>
            <h6 style={{ marginTop: "20px" }}>
              Third-Party Links and External Websites
            </h6>
            <p>
              Our website may include links to third-party platforms. We do not
              control their policies, and we encourage users to review their
              privacy terms before sharing personal data.
            </p>
            <h6 style={{ marginTop: "20px" }}>
              Use of Cookies and Tracking Technologies
            </h6>
            <p>
              Cookies help us enhance user experience, analyze site traffic, and
              provide personalized content. Users can manage cookie preferences
              through browser settings. Disabling cookies may impact website
              functionalities.
            </p>
            or by mail: {bankContactInfo?.address}
            <h6 style={{ marginTop: "20px" }}>
              Changes to this Privacy Policy
            </h6>
            <p>
              We may update this policy periodically to reflect evolving
              regulatory, technological, or business requirements. Users will be
              informed of significant changes, and continued use of services
              constitutes acceptance of the revised terms.
            </p>
            <h6 style={{ marginTop: "20px" }}>Contact Information</h6>
            <p>
              For further inquiries, email us at{" "}
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                {" "}
                {bankContactInfo?.email}
              </span>
            </p>
            <p style={{ marginTop: "20px" }}>
              By using Suvarna Laxmi Nidhi Limited’s services, you confirm that
              you have read, understood, and agreed to the terms outlined in
              this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
