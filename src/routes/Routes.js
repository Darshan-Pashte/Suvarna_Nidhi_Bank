// import { ReactComponent as DashboardIcon } from "../assets/Dashboard.svg";
import { ReactComponent as CreditCardIcon } from "../assets/icons8-credit-card-64.svg";
import { ReactComponent as UpiIcon } from "../components/Sidebar/SidebarIcons/upi.svg";
import { ReactComponent as QRsvg } from "../components/Sidebar/SidebarIcons/QR.svg";
import { ReactComponent as Login } from "../components/Sidebar/SidebarIcons/Login.svg";
import { ReactComponent as VpaIcon } from "../components/Sidebar/SidebarIcons/VPA.svg";
import { ReactComponent as BankIcon } from "../components/Sidebar/SidebarIcons/bank.svg";
import { ReactComponent as DashboardIcon } from "../components/Sidebar/SidebarIcons/dashboard.svg";



import { ReactComponent as HomeIcon } from "../components/Sidebar/SidebarIcons/home.svg";
import { ReactComponent as CardsIcon } from "../components/Sidebar/SidebarIcons/cards.svg";
import { ReactComponent as AccoutIcon } from "../components/Sidebar/SidebarIcons/account.svg";
import { ReactComponent as CheckIcon } from "../components/Sidebar/SidebarIcons/Cheque.svg";
// import { ReactComponent as FundTranfer } from "../components/Sidebar/SidebarIcons/Fund transfer.svg";
import { ReactComponent as LoanIcon } from "../components/Sidebar/SidebarIcons/Loan.svg";
import { ReactComponent as StatementIcon } from "../components/Sidebar/SidebarIcons/Statements.svg";
import { ReactComponent as CustomerSupportIcon } from "../components/Sidebar/SidebarIcons/customersupport.svg";
import { ReactComponent as CertificatesIcon } from "../components/Sidebar/SidebarIcons/certificates.svg";
import { ReactComponent as SettingIcon } from "../components/Sidebar/SidebarIcons/setting.svg";
import { ReactComponent as ViewIcon } from "../components/Sidebar/SidebarIcons/view.svg";
import { ReactComponent as ApproveIcon } from "../components/Sidebar/SidebarIcons/approve.svg";
import { ReactComponent as Deposit } from "../components/Sidebar/SidebarIcons/Deposit.svg";
import { ReactComponent as FundTranfer } from "../components/Sidebar/SidebarIcons/Fund transfer.svg";
import { ReactComponent as Beneficiary } from "../components/Sidebar/SidebarIcons/Beneficiary.svg";
import Accounts from "../containers/MainContainer/SuperApp/Account/Accounts";
import accountsIcon from "../../src/assets/Sidebar/accountsIcon.svg";
import Payments from "../containers/MainContainer/SuperApp/Payments/Payments";

import Investments from "../containers/MainContainer/SuperApp/Investments/Investments";
import Loans from "../containers/MainContainer/SuperApp/Loans/Loans";
import ServiceRequest from "../containers/MainContainer/SuperApp/ServiceRequest/ServiceRequest";
import Cards from "../containers/MainContainer/SuperApp/Cards/Cards";
import Home from "../containers/MainContainer/SuperApp/Home/Home";
import Statements from "../containers/MainContainer/SuperApp/Statements/Statements";
import Settings from "../containers/MainContainer/SuperApp/Settings/Settings";
import CorporateHome from "../containers/MainContainer/corporatePages/home/CorporateHome";
import FundTransfer from "../containers/MainContainer/SuperApp/FundTransfer/FundTransfer";
import Insurance from "../containers/MainContainer/SuperApp/Insurance/Insurance";
import CorporateFundTransfer from "../containers/MainContainer/SuperApp/CorporateFundTransfer/CorporateFundTransfer";
import BillPayments from "../containers/MainContainer/SuperApp/BillPayments/BillPayments";
import ElectricityBill from "../containers/MainContainer/SuperApp/BillPayments/ElectricityBill";
import WithinBank from "../containers/MainContainer/SuperApp/CorporateFundTransfer/WithinBank";
import SelfAccount from "../containers/MainContainer/SuperApp/CorporateFundTransfer/SelfAccount";
import OtherAccount from "../containers/MainContainer/SuperApp/CorporateFundTransfer/OtherAccount";
import AddPayee from "../containers/MainContainer/SuperApp/AddPayee/AddPayee";
import NewCheckBook from "../containers/MainContainer/SuperApp/NewCheckBook/NewCheckBook";
import UploadFile from "../containers/MainContainer/SuperApp/UploadFile/UploadFile";
import DataTableLower from "../containers/MainContainer/SuperApp/CorporateHome/tableTab2Home";
import UploadViewFIle from "../containers/MainContainer/SuperApp/UploadFile/UploadViewFIle";
import UploadApproveReject from "../containers/MainContainer/SuperApp/UploadFile/UploadApproveReject";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BeneficiaryDetails from "../containers/MainContainer/SuperApp/AccountLimit/IMPS/BeneficiayDetails";
import AccountLimit from "../containers/MainContainer/SuperApp/AccountLimit/IMPS/AccountLimit";
import AccountLimitNEFT from "../containers/MainContainer/SuperApp/AccountLimit/NEFT/AccountLimitNEFT";
import NeftDetails from "../containers/MainContainer/SuperApp/AccountLimit/NEFT/NeftDetails";
import AccountLimitInternal from "../containers/MainContainer/SuperApp/AccountLimit/InternalFundTransfer/AccountLimitInternal";
import AccountLimitIMPS from "../containers/MainContainer/SuperApp/AccountLimit/IMPS/AccountLimitIMPS";
import InternalDetails from "../containers/MainContainer/SuperApp/AccountLimit/InternalFundTransfer/InternalDetails";
import AccountBeneficiary from "../containers/MainContainer/SuperApp/AccountLimit/Beneficiary/AccountBeneficiary";
// import NewCard from "../containers/MainContainer/SuperApp/Cards/NewCard";
import AccountBeneficiaryInternal from "../containers/MainContainer/SuperApp/AccountLimit/BeneficiaryInternal/AccountBeneficiaryInternal";
import Payment1Mobile from "../containers/MainContainer/SuperApp/Payments/Payment1Mobile";
import FixedDepositDetails from "../containers/MainContainer/SuperApp/Account/FixedDeposit/FixedDepositDetails";
import FixedDepositScheme from "../containers/MainContainer/SuperApp/Account/FixedDeposit/FixedDepositScheme";
import OpenDeposit from "../containers/MainContainer/SuperApp/Account/FixedDeposit/Opendeposit";
import FixedDepositCashCert from "../containers/MainContainer/SuperApp/Account/FixedDeposit/FixedDepositCashCert";
import FixedDepositInterestRate from "../containers/MainContainer/SuperApp/Account/FixedDeposit/FixedDepositInterestRate";
import OpendepositeChild from "../containers/MainContainer/SuperApp/Account/FixedDeposit/OpendepositeChild";
import OpendepositeChild1 from "../containers/MainContainer/SuperApp/Account/FixedDeposit/OpenDepositChild1";
import LoansFields from "../containers/MainContainer/SuperApp/Loans/LoansFields";
import SetAccLimit from "../containers/MainContainer/SuperApp/AccountLimit/SetAccLimit";
import ChequeRequest from "../containers/MainContainer/SuperApp/Cheque/ChequeRequest/ChequeRequest";
import ChequeStatus from "../containers/MainContainer/SuperApp/Cheque/ChequeStatus/ChequeStatus";
import StopPayment from "../containers/MainContainer/SuperApp/Cheque/StopPayment/StopPayment";
import RTGS from "../containers/MainContainer/SuperApp/AccountLimit/RTGS/RTGS";
import RTGSDetails from "../containers/MainContainer/SuperApp/AccountLimit/RTGS/RTGSDetails";
import CorporateAccount from "../containers/MainContainer/corporatePages/Accounts/CorporateAccount";
import TransferFunds from "../containers/MainContainer/SuperApp/CorporateFundTransfer/TransferFunds";
import LoansPayment from "../containers/MainContainer/SuperApp/Loans/LoansPayment";
import LoanDetails from "../containers/MainContainer/SuperApp/Loans/LoanDetails";
import DisbursementDetails from "../containers/MainContainer/SuperApp/Loans/DisbursementDetails";
import BulkTransfer from "../containers/MainContainer/SuperApp/CorporateFundTransfer/BulkTransfer";
import AccountBeneficiaryCorporate from "../containers/MainContainer/corporatePages/beneficiaryManagement/Beneficiary/AccountBeneficiary";
import AccountBeneficiaryInternalCorporate from "../containers/MainContainer/corporatePages/beneficiaryManagement/BeneficiaryInternal/AccountBeneficiaryInternal";
import FixedDepositDetailsCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/FixedDepositDetails";
import FixedDepositCashCertCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/FixedDepositCashCert";
import FixedDepositSchemeCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/FixedDepositScheme";
import FixedDepositInterestRateCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/FixedDepositInterestRate";
import OpenDepositCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/Opendeposit";
import OpendepositeChildCorporate from "../containers/MainContainer/corporatePages/FixedDeposit/OpendepositeChild";
import OpendepositeChild1Corporate from "../containers/MainContainer/corporatePages/FixedDeposit/OpenDepositChild1";
// import Authorize from "../containers/MainContainer/corporatePages/authorize/Authorize";
import LoansCorporate from "../containers/MainContainer/corporatePages/Loans/Loans";
import SettingsCorporate from "../containers/MainContainer/corporatePages/Settings/Settings";
import StatementsCorporate from "../containers/MainContainer/corporatePages/Statements/Statements";
import ChequeRequestCorporate from "../containers/MainContainer/corporatePages/Cheque/ChequeRequest/ChequeRequest";
import ChequeStatusCorporate from "../containers/MainContainer/corporatePages/Cheque/ChequeStatus/ChequeStatus";
import StopPaymentCorporate from "../containers/MainContainer/corporatePages/Cheque/StopPayment/StopPayment";
import FundTransferPreview from "../containers/MainContainer/SuperApp/CorporateFundTransfer/FundTransferPreview";
import BulkFundTransferPreview from "../containers/MainContainer/SuperApp/CorporateFundTransfer/BulkFundTransferPreview";
// import AuthorizerSuccessfulPayment from "../containers/MainContainer/corporatePages/authorize/AuthorizerSuccessfulPayment";
import BulkUploadStatus from "../containers/MainContainer/SuperApp/CorporateFundTransfer/BulkUploadStatus";
// import Checkerhome from "../containers/MainContainer/corporatePages/Checker/CheckerHome/CheckerHome";
// import CheckerView from "../containers/MainContainer/corporatePages/Checker/CheckerView/CheckerView";
import CheckerViewRecord from "../containers/MainContainer/checkerApprove/CheckerView/CheckerViewRecord";
import CheckerApprove from "../containers/MainContainer/checkerApprove/CheckerApprove";
import AuthorizeApprove from "../containers/MainContainer/authorizeApprove/AuthorizeApprove";
import AuthorizerSuccessfulPayment from "../containers/MainContainer/authorizeApprove/AuthorizerSuccessfulPayment";
import Checkerhome from "../containers/MainContainer/checkerApprove/CheckerHome/CheckerHome";
import AuthorizeHome from "../containers/MainContainer/authorizeApprove/AuthorizeHome";
import CheckerSuccessfulPayment from "../containers/MainContainer/checkerApprove/CheckerSuccessfulPayment";
import CheckerPreviewDetails from "../containers/MainContainer/checkerApprove/CheckerPreviewDetails";
import AuthorizePreviewDetails from "../containers/MainContainer/authorizeApprove/AuthorizePreviewDetails";
import ViewDownloadStatement from "../containers/MainContainer/SuperApp/Home/ViewDownloadStatement";
import CorViewDownloadStatement from "../containers/MainContainer/corporatePages/home/HomeAccountStatement/ViewDownloadStatement";
import CorporateFixedDepositDetails from "../containers/MainContainer/corporatePages/FixedDepositCorporate/FixedDepositDetails";
import CorporateFixedDepositCashCert from "../containers/MainContainer/corporatePages/FixedDepositCorporate/FixedDepositCashCert";
import CorporateFixedDepositScheme from "../containers/MainContainer/corporatePages/FixedDepositCorporate/FixedDepositScheme";
import CorporateFixedDepositInterestRate from "../containers/MainContainer/corporatePages/FixedDepositCorporate/FixedDepositInterestRate";
import CorporateOpenDeposit from "../containers/MainContainer/corporatePages/FixedDepositCorporate/Opendeposit";
import CorporateOpendepositeChild from "../containers/MainContainer/corporatePages/FixedDepositCorporate/OpendepositeChild";
import CorporateOpendepositeChild1 from "../containers/MainContainer/corporatePages/FixedDepositCorporate/OpenDepositChild1";
import OldCard from "../containers/MainContainer/SuperApp/Cards/OldCard";
import NewCard from "../containers/MainContainer/SuperApp/Cards/NewCard";
import BulkUploadView from "../containers/MainContainer/SuperApp/CorporateFundTransfer/BulkUploadView";
import AuthorizeBulkPreview from "../containers/MainContainer/SuperApp/CorporateFundTransfer/AurhorizeBulkPreview";
import SetAccLimitCorporate from "../containers/MainContainer/SuperApp/AccountLimit/SetAccLimitCorporate";
import PaymentSuccess from "../containers/MainContainer/SuperApp/AccountLimit/PaymentSuccess";
import RepaymentDetails from "../containers/MainContainer/SuperApp/Loans/RepaymentDetails";
import CorporateLoans from "../containers/MainContainer/SuperApp/LoansCorporate/Loans";
import CorporateLoanPayment from "../containers/MainContainer/SuperApp/LoansCorporate/LoansPayment";
import CorporateLoanDetails from "../containers/MainContainer/SuperApp/LoansCorporate/LoanDetails";
import CorporateDisbursementDetails from "../containers/MainContainer/SuperApp/LoansCorporate/DisbursementDetails";
import CorporateRepaymentDetails from "../containers/MainContainer/SuperApp/LoansCorporate/RepaymentDetails";
import SelfAccountTransfer from "../containers/MainContainer/SuperApp/AccountLimit/SelfAccount/SelfAccount";
import SelfAccountTranfer from "../containers/MainContainer/SuperApp/CorporateFundTransfer/SelfAccountTranfer";
import PositivePaySearch from "../containers/MainContainer/SuperApp/Cheque/PositivePay/PositivePay";
import PositivePayTab from "../containers/MainContainer/SuperApp/Cheque/PositivePay/PositivePayTab";
import Certificates from "../containers/MainContainer/SuperApp/Certificates/certificatelist/Certificates";
import CustomerComplaint from "../containers/MainContainer/SuperApp/CustomerComplaint/CustomerComplaint/CustomerComplaint";
import BrowseCustomerComplaint from "../containers/MainContainer/SuperApp/CustomerComplaint/CustomerComplaint/BrowseCustomerComplaint";
import BrowseBeneficiary from "../containers/MainContainer/corporatePages/beneficiaryManagement/BrowseBeneficiary/BrowseBeneficiary";
import DataTable from "../containers/MainContainer/SuperApp/Home/tableTab2Home";
import UserMaster from "../containers/MainContainer/corporatePages/UserMaster/UserMaster";
import AuthBeneficiary from "../containers/MainContainer/corporatePages/beneficiaryManagement/AuthBeneficiary/AuthBeneficiary";
import AuthBeneficiarySuccessfull from "../containers/MainContainer/corporatePages/beneficiaryManagement/AuthBeneficiary/AuthBeneficiarySuccessfull";
import Receipt from "../containers/MainContainer/SuperApp/AccountLimit/NEFT/Receipt";
import TransactionBrowse from "../containers/MainContainer/SuperApp/AccountLimit/Transaction/TransactionBrowse";
import TransactionReceipt from "../containers/MainContainer/SuperApp/AccountLimit/Transaction/Receipt/TransactionReceipt";
import IMPSDetails from "../containers/MainContainer/SuperApp/AccountLimit/IMPS/IMPSDetails";
import GenerateQRCode from "../containers/MainContainer/SuperApp/GenerateQRCode/GenerateQRCode";
import GenerateQRCodeCorporate from "../containers/MainContainer/SuperApp/GenerateQRCode/GenerateQRCodeCorporate";

const Routes = () => {
  const { loading, error, isAuthenticated, user, menu, userRole } = useSelector(
    (state) => state.auth
  );
  // const [array, setArray] = useState("")
  // useEffect(async() => {
  //   const Menu = sessionStorage.getItem("menu");
  //   const array1 = await Menu;
  //   // console.log("array1",array1);
  //   // const array1 = "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
  //   // console.log("array2",array2);
  //   const array =
  //     Menu !== null &&
  //     Menu !== undefined &&
  //     Menu != "" &&
  //     array1?.split("").map((char) => parseInt(char));
  //   setArray(array)
  // }, [])

  // const Menu = sessionStorage.getItem("menu");
  const array1 = menu;
  // console.log("array1",array1);
  // const array1 = "1110000000011100000001111100000100000000010000000001111000000111110000011100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  // const array1 = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011100000000111100000011111110001000000000111000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  // const array1 = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001100000000011111000000000100000000000000000000000000000000000000000000000000000000000000000000000000"
  // const array1 = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011000000000111110000000001001000000000000000000000"
  // console.log("array2",array2);
  const array =
    menu !== null &&
    menu !== undefined &&
    menu != "" &&
    array1?.split("").map((char) => parseInt(char));

  const PROTECTED_ROUTES = [
    //PERSONEL
    {
      name: "Home",
      id: "dashboard",
      url: array[0] == "1" ? "/dashboard" : null,
      component: <Home />,
      arr: array[0],
      roles: [],
      Icon: HomeIcon,
    },

    //PERSONEL
    {
      name: "Account",
      id: "account",
      url: array[1] == "1" ? "/account" : null,
      arr: array[1],
      component: <Accounts />,
      roles: [],
      Icon: AccoutIcon,
    },

    {
      name: "Account",
      id: "account",
      url: array[1] == "1" ? "/account" : null,
      roles: [],
      Icon: AccoutIcon,
      component: <Accounts />,
      childRoutes: [
        {
          name: "SET ACCOUNT LIMIT",
          id: "setacclimit",
          url: array[1] == "1" ? "/setacclimit" : null,
          roles: [],
          // arr: array[2],
          component: <SetAccLimit />,
          Icon: AccoutIcon,
        },

        {
          name: "View Statement",
          id: "viewstatement",
          url: array[1] == "1" ? "/viewstatement" : null,
          roles: [],
          // arr: array[2],
          component: <ViewDownloadStatement />,
          Icon: DashboardIcon,
        },

      ],
    },

    //Corporate Maker
    {
      name: "Home",
      id: "dashboard",
      url: array[101] == "1" ? "/dashboard" : null,
      component: <CorporateHome />,
      roles: [],
      arr: array[101],
      Icon: HomeIcon,
    },

    //Corporate CHECKER HOME
    {
      name: "Home",
      id: "dashboard",
      url: array[201] == "1" ? "/dashboard" : null,
      roles: [],
      arr: array[201],
      component: <Checkerhome />,
      Icon: HomeIcon,
    },

    // CORPORATE HOME AUTHORIZE

    {
      name: "Home",
      id: "dashboard",
      url: array[251] == "1" ? "/dashboard" : null,
      roles: [],
      arr: array[251],
      component: <AuthorizeHome />,
      Icon: HomeIcon,
    },


    //CORPORATE
    {
      name: "Account",
      id: "account",
      url: array[102] == "1" || array[202] == "1" || array[252] == "1" ? "/account" : null,
      arr: array[102] || array[202] || array[252],
      component: <CorporateAccount />,
      roles: ["all"],
      Icon: AccoutIcon,
    },

    {
      name: "Account",
      id: "account",
      url: array[102] == "1" || array[202] == "1" || array[252] == "1" ? "/account" : null,
      arr: array[102] || array[202] || array[252],
      component: <CorporateAccount />,
      roles: ["all"],
      Icon: AccoutIcon,
      childRoutes: [
        {
          name: "SET ACCOUNT LIMIT",
          id: "setacclimit",
          url: array[102] == "1" || array[202] == "1" || array[252] == "1" ? "/setacclimit" : null,
          roles: [],
          // arr: array[2],
          component: <SetAccLimitCorporate />,
          Icon: AccoutIcon,
        },
        {
          name: "View Statement",
          id: "viewstatement",
          url: array[102] == "1" || array[202] == "1" || array[252] == "1" ? "/viewstatement" : null,
          roles: [],
          // arr: array[2],
          component: <CorViewDownloadStatement />,
          Icon: DashboardIcon,
        },

        {
          name: "Loan Details",
          id: "loandetails",
          url: array[102] == "1" || array[202] == "1" || array[252] == "1" ? "/loandetails" : null,
          // url: "/loandetails",
          roles: [],
          component: <CorporateLoanDetails />,
          Icon: LoanIcon,
        },

      ],
    },



    // CORPORATE CHECKER VIEW
    {
      name: "Transaction Report",
      id: "checkerview",
      url: array[212] == "1" ? "/checkerview" : null,
      roles: [],
      arr: array[212],
      component: <BulkUploadView />,
      Icon: StatementIcon,
    },

    {
      name: "Transaction Report",
      id: "checkerview",
      url: array[212] == "1" ? "/checkerview" : null,
      roles: [],
      Icon: StatementIcon,
      childRoutes: [
        {
          name: "Checker Preview Record",
          id: "checkerpreviewdetails",
          url: array[212] == "1" ? "/checkerpreviewdetails" : null,
          roles: [],
          component: <CheckerPreviewDetails />,
          Icon: StatementIcon,
        },
      ]
    },

    {
      name: "Bulk Preview",
      id: "checkerbulkview",
      url: array[213] == "1" ? "/checkerbulkview" : null,
      roles: [],
      arr: array[213],
      component: <AuthorizeBulkPreview />,
      Icon: Beneficiary,
    },

    {
      name: "Bulk Preview",
      id: "checkerbulkview",
      url: array[213] == "1" ? "/checkerbulkview" : null,
      roles: [],
      Icon: Beneficiary,
      childRoutes: [
        {
          name: "Checker Preview",
          id: "checkpreview",
          url: array[213] == "1" ? "/checkpreview" : null,
          roles: [],
          component: <BulkFundTransferPreview />,
          Icon: Beneficiary,
        },
      ]
    },

    // CORPORATE CHECKER APPROVE

    {
      name: "Transaction Approve",
      id: "checkerapprove",
      url: array[214] == "1" ? "/checkerapprove" : null,
      roles: [],
      arr: array[214],
      component: <CheckerApprove />,
      Icon: CheckIcon,
    },

    // Checker VIEW Records
    {
      name: "Transaction Approve",
      id: "checkerapprove",
      url: array[214] == "1" ? "/checkerapprove" : null,
      roles: [],
      Icon: ApproveIcon,
      childRoutes: [
        {
          name: "Checker View Record",
          id: "checkerviewrecord",
          url: array[214] == "1" ? "/checkerviewrecord" : null,
          roles: [],
          component: <CheckerViewRecord />,
          Icon: ApproveIcon,
        },
        {
          name: "Checker Approve",
          id: "checkersuccesfulpayment",
          url: array[214] == "1" ? "/checkersuccesfulpayment" : null,
          roles: [],
          // arr: array[9],
          component: <CheckerSuccessfulPayment />,
          Icon: ApproveIcon,
        },
      ]
    },
    // {
    //   name: "Checker Home",
    //   id: "checker",
    //   url: "/checker",
    //   roles: ["all"],
    //   arr: array[9] && userRole=="checker",
    //   Icon: StatementIcon,
    //   childRoutes: [
    //     {
    //       name: "Home",
    //       id: "checkerhome",
    //       url: "/checkerhome",
    //       roles: [],
    //       arr: array[9] && userRole=="checker",
    //       component: <Checkerhome />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "View",
    //       id: "checkerview",
    //       url: "/checkerview",
    //       roles: [],
    //       arr: array[9] && userRole=="checker",
    //       component: <wBulkUploadView/>,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Checker Approve",
    //       id: "checkerapprove",
    //       url: "/checkerapprove",
    //       roles: [],
    //       arr: array[9] && userRole=="checker",
    //       component: <CheckerApprove/>,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Checker View Record",
    //       id: "checkerviewrecord",
    //       url: "/checkerviewrecord",
    //       roles: [],
    //       component: <CheckerViewRecord/>,
    //       Icon: FundTranfer,
    //     },
    //   ],
    // },



    // CORPORATE VIEW AUTHORIZE

    {
      name: "Transaction Report",
      id: "authorizeview",
      url: array[262] == "1" ? "/authorizeview" : null,
      roles: [],
      arr: array[262],
      component: <BulkUploadView />,
      Icon: StatementIcon,
    },

    {
      name: "Transaction Report",
      id: "authorizeview",
      url: array[262] == "1" ? "/authorizeview" : null,
      roles: [],
      Icon: StatementIcon,
      childRoutes: [
        {
          name: "Checker Preview Record",
          id: "authorizeviewdetails",
          url: array[262] == "1" ? "/authorizeviewdetails" : null,
          roles: [],
          component: <AuthorizePreviewDetails />,
          Icon: StatementIcon,
        },
      ]
    },

    {
      name: "Bulk Preview",
      id: "authorizebulkview",
      url: array[263] == "1" ? "/authorizebulkview" : null,
      roles: [],
      arr: array[263],
      component: <AuthorizeBulkPreview />,
      Icon: Beneficiary,
    },

    {
      name: "Bulk Preview",
      id: "authorizebulkview",
      url: array[263] == "1" ? "/authorizebulkview" : null,
      roles: [],
      Icon: Beneficiary,
      childRoutes: [
        {
          name: "Preview",
          id: "authpreview",
          url: array[263] == "1" ? "/authpreview" : null,
          roles: [],
          component: <BulkFundTransferPreview />,
          Icon: Beneficiary,
        },
      ]
    },



    // CORPORATE APPROVE AUTHORIZE

    {
      name: "Transaction Authorize",
      id: "authorizeapprove",
      url: array[264] == "1" ? "/authorizeapprove" : null,
      roles: [],
      arr: array[264],
      component: <AuthorizeApprove />,
      Icon: CheckIcon,
    },

    {
      name: "Transaction Authorize",
      id: "authorizeapprove",
      url: array[264] == "1" ? "/authorizeapprove" : null,
      roles: [],
      component: <AuthorizeApprove />,
      Icon: CheckIcon,
      childRoutes: [
        {
          name: "Approve",
          id: "authorizersuccesfulpayment",
          url: array[264] == "1" ? "/authorizersuccesfulpayment" : null,
          roles: [],
          // arr: array[9],
          component: <AuthorizerSuccessfulPayment />,
          Icon: ApproveIcon,
        },
      ]
    },
    //  {
    //   name: "Authorize Home",
    //   id: "authorize",
    //   url: "/authorize",
    //   roles: ["all"],
    //   arr: array[9],
    //   Icon: StatementIcon,
    //   childRoutes: [
    //     {
    //       name: "Authorize Home",
    //       id: "authorize",
    //       url: "/authorizehome",
    //       roles: [],
    //       arr: array[9],
    //       component: <AuthorizeHome />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "View",
    //       id: "authorizeview",
    //       url: "/authorizeview",
    //       roles: [],
    //       arr: array[9],
    //       component: <wBulkUploadView />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Authorise Approve",
    //       id: "authorizeapprove",
    //       url: "/authorizeapprove",
    //       roles: [],
    //       arr: array[9],
    //       component: <AuthorizeApprove />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Authorize Approve",
    //       id: "authorizersuccesfulpayment",
    //       url: "/authorizersuccesfulpayment",
    //       roles: [],
    //       // arr: array[9],
    //       component: <AuthorizerSuccessfulPayment/>,
    //       Icon: FundTranfer,
    //     },
    //   ],
    // },





    //Personel

    {
      name: "Beneficiary Master",
      id: "beneficiarymanagement",
      url: array[11] == "1" ? "/beneficiarymanagements" : null,
      arr: array[11],
      roles: [],
      Icon: Beneficiary,
      childRoutes: [
        {
          name: "Other Bank",
          id: "addexternal",
          url: array[12] == "1" ? "/addexternal" : null,
          roles: [],
          arr: array[12],
          component: <AccountBeneficiary />,
          Icon: Beneficiary,
        },
        {
          name: "Within Bank",
          id: "addinternal",
          url: array[13] == "1" ? "/addinternal" : null,
          roles: [],
          arr: array[13],
          component: <AccountBeneficiaryInternal />,
          Icon: Beneficiary,
        },
      ],
    },

    // Corporate

    {
      name: "Beneficiary Master",
      id: "beneficiarymanagement",
      url: array[112] == "1" ? "/beneficiarymanagements" : null,
      arr: array[112],
      // url: "/beneficiarymanagements",
      // arr: array[9],
      roles: [],
      Icon: Beneficiary,
      childRoutes: [
        {
          name: "Add Other Bank",
          id: "addexternal",
          url: array[113] == "1" ? "/addexternal" : null,
          roles: [],
          arr: array[113],
          component: <AccountBeneficiaryCorporate />,
          Icon: Beneficiary,
        },
        {
          name: "Add Within Bank",
          id: "addinternal",
          url: array[114] == "1" ? "/addinternal" : null,
          roles: [],
          arr: array[114],
          component: <AccountBeneficiaryInternalCorporate />,
          Icon: Beneficiary,
        },
        {
          name: "Browse",
          id: "browsebeneficiary",
          url: array[115] == "1" ? "/browsebeneficiary" : null,
          roles: [],
          arr: array[115],
          component: <BrowseBeneficiary />,
          Icon: Beneficiary,
        },

      ],
    },


    //PERSONEL
    {
      name: "Fund Transfer",
      id: "fundtransfer",
      url: array[21] == "1" ? "/fundtransfer" : null,
      arr: array[21],
      roles: [],
      Icon: FundTranfer,
      childRoutes: [
        {
          name: "IMPS",
          id: "imps",
          url: array[28] == "1" ? "/imps" : null,
          roles: [],
          arr: array[28],
          component: <AccountLimitIMPS />,
          Icon: FundTranfer,
        },
        {
          name: "NEFT",
          id: "neft",
          url: array[22] == "1" ? "/neft" : null,
          roles: [],
          arr: array[22],
          component: <AccountLimitNEFT />,
          Icon: FundTranfer,
        },
        {
          name: "RTGS",
          id: "rtgs",
          url: array[23] == "1" ? "/rtgs" : null,
          roles: [],
          arr: array[23],
          component: <RTGS />,
          Icon: FundTranfer,
        },
        {
          name: "Within Bank",
          id: "internal",
          url: array[24] == "1" ? "/internal" : null,
          roles: [],
          arr: array[24],
          component: <AccountLimitInternal />,
          Icon: FundTranfer,
        },
        {
          name: "Self Account",
          id: "selfaccount",
          url: array[25] == "1" ? "/selfaccount" : null,
          roles: [],
          arr: array[25],
          component: <SelfAccountTransfer />,
          Icon: FundTranfer,
        },
        {
          name: "Payment Success",
          id: "paymentsuccess",
          url: array[25] == "1" ? "/paymentsuccess" : null,
          roles: [],
          component: <PaymentSuccess />,
          Icon: FundTranfer,
        },
        {
          name: "IMPS Details",
          id: "impsdetails",
          url: array[28] == "1" ? "/impsdetails" : null,
          roles: [],
          component: <IMPSDetails />,
          Icon: FundTranfer,
        },
        {
          name: "Neft Details",
          id: "neftdetails",
          url: array[22] == "1" ? "/neftdetails" : null,
          roles: [],
          component: <NeftDetails />,
          Icon: FundTranfer,
        },
        {
          name: "Receipt",
          id: "receipt",
          url: array[26] == "1" ? "/receipt" : null,
          roles: [],
          component: <Receipt />,
          Icon: FundTranfer,
        },
        {
          name: "RTGS Details",
          id: "rtgsdetails",
          url: array[23] == "1" ? "/rtgsdetails" : null,
          roles: [],
          component: <RTGSDetails />,
          Icon: FundTranfer,
        },
        {
          name: "Internal Details",
          id: "internaldetails",
          url: array[24] == "1" ? "/internaldetails" : null,
          roles: [],
          component: <InternalDetails />,
          Icon: FundTranfer,
        },
          
        {
          name: "Transaction Receipt",
          id: "transactionreceipt",
          url: array[27] == "1" ? "/transactionreceipt" : null,
          roles: [],
          // arr: array[26],
          component: <TransactionReceipt />,
          Icon: FundTranfer,
        },
        {
          name: "Transfer History",
          id: "transactionbrowse",
          url: array[27] == "1" ? "/transactionbrowse" : null,
          roles: [],
          arr: array[27],
          component: <TransactionBrowse />,
          Icon: FundTranfer,
        },
      ],
    },

    //CORPORATE

    {
      name: "Payments",
      id: "payments",
      // url: "/payments",
      url: array[122] == "1" ? "/payments" : null,
      arr: array[122],
      roles: ["all"],
      Icon: LoanIcon,
      childRoutes: [
        {
          name: "Fund Transfer",
          id: "fundtransfer",
          url: array[123] != 0 ? "/fundtransfer" : null,
          arr: array[123],
          roles: [],
          component: <TransferFunds />,
          Icon: LoanIcon,
        },
        {
          name: "Self Account",
          id: "selfaccounttranfer",
          url: array[124] != 0 ? "/selfaccounttranfer" : null,
          arr: array[124],
          roles: [],
          component: <SelfAccountTranfer />,
          Icon: LoanIcon,
        },
        {
          name: "Bulk Payment Upload",
          id: "bulkpayment",
          url: array[125] != 0 ? "/bulkpayment" : null,
          arr: array[125],
          roles: [],
          component: <BulkTransfer />,
          Icon: LoanIcon,
        },
        {
          name: "Transaction Report",
          id: "view",
          url: array[126] != 0 ? "/bulkpaymentuploadview" : null,
          arr: array[126],
          roles: [],
          component: <BulkUploadView />,
          Icon: LoanIcon,
        },
        {
          name: "Bulk Upload Preview",
          id: "bulkpreview",
          url: array[127] != 0 ? "/bulkpreview" : null,
          arr: array[127],
          roles: [],
          component: <AuthorizeBulkPreview />,
          Icon: LoanIcon,
        },
        {
          name: "Fund Transfer Preview ",
          id: "fundTransferReview",
          url: array[127] != 0 ? "/fundTransferPreview" : null,
          // arr: array[9],
          roles: [],
          component: <FundTransferPreview />,
          Icon: LoanIcon,
        },
        {
          name: "Bulk Fund Transfer Preview",
          id: "bulkFundTransferPreview",
          url: array[127] != 0 ? "/bulkFundTransferPreview" : null,
          // arr: array[9],
          roles: [],
          component: <BulkFundTransferPreview />,
          Icon: LoanIcon,
        },
        {
          name: "Loan Payment",
          id: "loanpayment",
          url: array[128] != 0 ? "/loanpayment" : null,
          arr: array[128],
          roles: [],
          component: <CorporateLoanPayment />,
          Icon: LoanIcon,
        },
      ],
    },


    // PERSONEL
    // {
    //   name: "Cards",
    //   id: "cards",
    //   url: array[0] == "1" ? "/cards" : null,
    //   arr: array[0],
    //   component: <OldCard />,
    //   roles: [],
    //   Icon: CardsIcon,
    // },
    {
      name: "Cards",
      id: "cards",
      url: array[31] == "1" ? "/cards" : null,
      arr: array[31],
      component: <NewCard />,
      roles: [],
      Icon: CardsIcon,
    },




    // {
    //   name: "Insurance",
    //   id: "insurance",
    //   arr: array[4],
    //   url: "/insurance",
    //   component: <Insurance />,
    //   roles: [],
    //   Icon: UpiIcon,
    // },
    // {
    //   name: "Investments",
    //   id: "investments",
    //   url: "/investments",
    //   arr: array[5],
    //   component: <Investments />,
    //   roles: [],
    //   Icon: Login,
    // },

    //PERSONEL

    {
      name: "Loans",
      id: "loans",
      url: array[41] == "1" ? "/loans" : null,
      arr: array[41],
      component: <Loans />,
      roles: [],
      Icon: LoanIcon,
    },

    {
      name: "loansfields",
      id: "loansfields",
      url: array[41] == "1" ? "/loans" : null,
      roles: ["all"],
      Icon: LoanIcon,
      childRoutes: [
        // {
        //   name: "loansfields",
        //   id: "loansfields",
        //   url: array[0] == "1" ? "/loansfields" : null,
        //   roles: [],
        //   component: <LoansFields />,
        //   Icon: LoanIcon,
        // },
        {
          name: "loanspayment",
          id: "loanspayment",
          url: array[41] == "1" ? "/loanspayment" : null,
          roles: [],
          component: <LoansPayment />,
          Icon: LoanIcon,
        },
        {
          name: "Loan Details",
          id: "loandetails",
          url: array[41] == "1" ? "/loandetails" : null,
          roles: [],
          component: <LoanDetails />,
          Icon: LoanIcon,
        },
        {
          name: "Disbursement Details",
          id: "disbursementdetails",
          url: array[41] == "1" ? "/disbursementdetails" : null,
          roles: [],
          component: <DisbursementDetails />,
          Icon: LoanIcon,
        },
        {
          name: "Repayment Details",
          id: "repaymentdetails",
          url: array[41] == "1" ? "/repaymentdetails" : null,
          roles: [],
          component: <RepaymentDetails />,
          Icon: LoanIcon,
        },
        {
          name: "View Statement",
          id: "viewstatement",
          url: array[41] == "1" ? "/viewstatement" : null,
          roles: [],
          // arr: array[2],
          component: <ViewDownloadStatement />,
          Icon: DashboardIcon,
        },
      ],
    },

    //Corporate

    {
      name: "Loans",
      id: "loans",
      url: array[132] == "1" || array[216] == "1" || array[266] == "1" ? "/loans" : null,
      arr: array[132] || array[216] || array[266],
      component: <CorporateLoans />,
      roles: ["all"],
      Icon: LoanIcon,
    },

    {
      name: "loans",
      id: "loans",
      url: array[132] == "1" || array[216] == "1" || array[266] == "1" ? "/loans" : null,
      roles: ["all"],
      Icon: LoanIcon,
      childRoutes: [
        {
          name: "loanspayment",
          id: "loanspayment",
          url: array[132] == "1" || array[216] == "1" || array[266] == "1" ? "/loanspayment" : null,
          roles: [],
          component: <CorporateLoanPayment />,
          Icon: LoanIcon,
        },
        {
          name: "Loan Details",
          id: "loandetails",
          url: array[132] == "1" || array[216] == "1" || array[266] == "1" ? "/loandetails" : null,
          roles: [],
          component: <CorporateLoanDetails />,
          Icon: LoanIcon,
        },
        {
          name: "Disbursement Details",
          id: "disbursementdetails",
          url: array[132] == "1" || array[216] == "1" || array[266] == "1" ? "/disbursementdetails" : null,
          roles: [],
          component: <CorporateDisbursementDetails />,
          Icon: LoanIcon,
        },
        {
          name: "Repayment Details",
          id: "repaymentdetails",
          url: array[132] == "1" || array[216] == "1" || array[266] == "1" ? "/repaymentdetails" : null,
          roles: [],
          component: <CorporateRepaymentDetails />,
          Icon: LoanIcon,
        },
        {
          name: "View Statement",
          id: "viewstatement",
          url: array[132] == "1" || array[216] == "1" || array[266] == "1" ? "/viewstatement" : null,
          roles: [],
          // arr: array[2],
          component: <CorViewDownloadStatement />,
          Icon: DashboardIcon,
        },
      ],
    },

    //PERSONEL
    {
      name: "Deposit",
      id: "deposit",
      url: array[51] == "1" ? "/account" : null,
      arr: array[51],
      roles: [],
      Icon: Deposit,
      childRoutes: [
        {
          name: "Deposit Account Details",
          id: "depositaccountdetails",
          url: array[52] == "1" ? "/fixeddepositdetails" : null,
          roles: [],
          arr: array[52],
          component: <FixedDepositDetails />,
          // component: <AccountBeneficiary />,
          Icon: FundTranfer,
        },
        {
          name: "Deposit Account Details",
          id: "depositaccountdetails",
          url: array[52] == "1" ? "/fixeddepositcashcert" : null,
          roles: [],
          // arr: array[2],
          component: <FixedDepositCashCert />,
          // component: <AccountBeneficiary />,
          Icon: FundTranfer,
        },
        {
          name: "Interest Rate",
          id: "interestrate",
          url: array[53] == "1" ? "/fixeddepositscheme" : null,
          roles: [],
          arr: array[53],
          component: <FixedDepositScheme />,
          Icon: FundTranfer,
        },
        {
          name: "Interest Rate",
          id: "interestrate",
          url: array[53] == "1" ? "/fixeddepositintrate" : null,
          roles: [],
          // arr: array[2],
          component: <FixedDepositInterestRate />,
          Icon: FundTranfer,
        },
        {
          name: "Open New Deposit",
          id: "opennewdeposit",
          url: array[54] == "1" ? "/opendeposit" : null,
          roles: [],
          arr: array[54],
          component: <OpenDeposit />,
          Icon: FundTranfer,
        },
        {
          name: "Open New Deposit",
          id: "opennewdeposit",
          url: array[54] == "1" ? "/opendepositchild" : null,
          roles: [],
          // arr: array[2],
          component: <OpendepositeChild />,
          Icon: FundTranfer,
        },
        {
          name: "Open New Deposit",
          id: "opennewdeposit",
          url: array[54] == "1" ? "/opendepositchild1" : null,
          roles: [],
          // arr: array[2],
          component: <OpendepositeChild1 />,
          Icon: FundTranfer,
        },
      ],
    },
    // {
    //   name: "Bill Payments",
    //   id: "billpayments",
    //   url: "/billPayments",
    //   arr: array[7],
    //   component: <BillPayments />,
    //   roles: [],
    //   Icon: QRsvg,
    // },
    // {
    //   name: "Electricity Bill",
    //   id: "electricityBill",
    //   url: "/electricityBill",
    //   arr: array[8],
    //   component: <ElectricityBill />,
    //   roles: [],
    //   Icon: QRsvg,
    // },

    // CORPORATE
    // {
    //   name: "Authorize",
    //   id: "authorize",
    //   url: "/authorize",
    //   roles: ["all"],
    //   arr: array[9],
    //   Icon: StatementIcon,
    //   childRoutes: [
    //     {
    //       name: "Authorize Home",
    //       id: "authorize",
    //       url: "/authorizehome",
    //       roles: [],
    //       arr: array[9],
    //       component: <AuthorizeHome />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "View",
    //       id: "authorizeview",
    //       url: "/authorizeview",
    //       roles: [],
    //       arr: array[9],
    //       component: <BulkUploadStatus />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Authorise Approve",
    //       id: "authorizeapprove",
    //       url: "/authorizeapprove",
    //       roles: [],
    //       arr: array[9],
    //       component: <AuthorizeApprove />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Payment",
    //       id: "authorizersuccesfulpayment",
    //       url: "/authorizersuccesfulpayment",
    //       roles: [],
    //       arr: array[9],
    //       component: <AuthorizerSuccessfulPayment/>,
    //       Icon: FundTranfer,
    //     },
    //   ],
    // },

    //CORPORATE

    {
      name: "Deposit",
      id: "deposit",
      url: array[142] == "1" ? "/account" : null,
      arr: array[142],
      roles: [],
      Icon: Deposit,
      childRoutes: [
        {
          name: "Deposit Account Details",
          id: "depositaccountdetails",
          url: array[143] == "1" ? "/fixeddepositdetails" : null,
          roles: [],
          arr: array[143],
          component: <CorporateFixedDepositDetails />,
          // component: <AccountBeneficiary />,
          Icon: FundTranfer,
        },
        {
          name: "Deposit Account Details",
          id: "depositaccountdetails",
          url: array[143] == "1" ? "/fixeddepositcashcert" : null,
          roles: [],
          // arr: array[2],
          component: <CorporateFixedDepositCashCert />,
          // component: <AccountBeneficiary />,
          Icon: FundTranfer,
        },
        {
          name: "Interest Rate",
          id: "interestrate",
          url: array[144] == "1" ? "/fixeddepositscheme" : null,
          roles: [],
          arr: array[144],
          component: <CorporateFixedDepositScheme />,
          Icon: FundTranfer,
        },
        {
          name: "Interest Rate",
          id: "interestrate",
          url: array[144] == "1" ? "/fixeddepositintrate" : null,
          roles: [],
          // arr: array[3],
          component: <CorporateFixedDepositInterestRate />,
          Icon: FundTranfer,
        },
        // {
        //   name: "Open New Deposit",
        //   id: "opennewdeposit",
        //   url: array[3] == "1" ? "/opendeposit" : null,
        //   roles: [],
        //   arr: array[3],
        //   component: <CorporateOpenDeposit />,
        //   Icon: FundTranfer,
        // },
        // {
        //   name: "Open New Deposit",
        //   id: "opennewdeposit",
        //   url: array[3] == "1" ? "/opendepositchild" : null,
        //   roles: [],
        //   // arr: array[2],
        //   component: <CorporateOpendepositeChild />,
        //   Icon: FundTranfer,
        // },
        // {
        //   name: "Open New Deposit",
        //   id: "opennewdeposit",
        //   url: array[3] == "1" ? "/opendepositchild1" : null,
        //   roles: [],
        //   // arr: array[2],
        //   component: <CorporateOpendepositeChild1 />,
        //   Icon: FundTranfer,
        // },
      ],
    },


    {
      name: "Beneficiary Authorize",
      id: "beneficiaryauth",
      url: array[215] == "1" || array[265] == "1" ? "/beneficiaryauth" : null,
      component: <AuthBeneficiary />,
      roles: [],
      arr: array[215] || array[265],
      Icon: StatementIcon,
    },



    {
      name: "Beneficiary Authorize",
      id: "beneficiaryauth",
      url: array[215] == "1" || array[265] == "1" ? "/beneficiaryauth" : null,
      roles: [],
      Icon: ApproveIcon,
      childRoutes: [
        {
          name: "Beneficiary Authorize",
          id: "authpayeesuccesfull",
          url: array[215] == "1" || array[265] == "1" ? "/authpayeesuccesfull" : null,
          roles: [],
          // arr: array[9],
          component: <AuthBeneficiarySuccessfull />,
          Icon: ApproveIcon,
        },
      ]
    },

    //Corporate

    // {
    //   name: "Deposit",
    //   id: "deposit",
    //   url: "/account",
    //   arr: array[9],
    //   roles: [],
    //   Icon: FundTranfer,
    //   childRoutes: [
    //     {
    //       name: "Deposit Account Details",
    //       id: "depositaccountdetails",
    //       url: "/fixeddepositdetails",
    //       roles: [],
    //       arr: array[9],
    //       component: <FixedDepositDetailsCorporate />,
    //       // component: <AccountBeneficiary />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Deposit Account Details",
    //       id: "depositaccountdetails",
    //       url: "/fixeddepositcashcert",
    //       roles: [],
    //       // arr: array[2],
    //       component: <FixedDepositCashCertCorporate />,
    //       // component: <AccountBeneficiary />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Interest Rate",
    //       id: "interestrate",
    //       url: "/fixeddepositscheme",
    //       roles: [],
    //       arr: array[9],
    //       component: <FixedDepositSchemeCorporate />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Interest Rate",
    //       id: "interestrate",
    //       url: "/fixeddepositintrate",
    //       roles: [],
    //       // arr: array[2],
    //       component: <FixedDepositInterestRateCorporate />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Open New Deposit",
    //       id: "opennewdeposit",
    //       url: "/opendeposit",
    //       roles: [],
    //       arr: array[9],
    //       component: <OpenDepositCorporate />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Open New Deposit",
    //       id: "opennewdeposit",
    //       url: "/opendepositchild",
    //       roles: [],
    //       // arr: array[2],
    //       component: <OpendepositeChildCorporate />,
    //       Icon: FundTranfer,
    //     },
    //     {
    //       name: "Open New Deposit",
    //       id: "opennewdeposit",
    //       url: "/opendepositchild1",
    //       roles: [],
    //       // arr: array[2],
    //       component: <OpendepositeChild1Corporate />,
    //       Icon: FundTranfer,
    //     },
    //   ],
    // },


    // {
    //   name: "Fund Transfer",
    //   id: "fundtransfer",
    //   url: "/fundtransfer",
    //   arr: array[9],
    //   component: <CorporateFundTransfer />,
    //   roles: ["all"],
    //   Icon: DashboardIcon,
    //   childRoutes: [
    //     {
    //       name: "IMPS",
    //       id: "impscorporate",
    //       url: array[9] != 0 ? "/withinbank" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <WithinBank />,
    //       Icon: DashboardIcon,
    //     },
    //     {
    //       name: "NEFT",
    //       id: "neftcorporate",
    //       url: array[9] != 0 ? "/selfaccount" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <SelfAccount />,
    //       Icon: DashboardIcon,
    //     },
    //     {
    //       name: "INTERNAL",
    //       id: "internalcorporate",
    //       url: array[9] != 0 ? "/otheraccount" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <OtherAccount />,
    //       Icon: DashboardIcon,
    //     },
    //   ],
    // },
    // {
    //   name: "Add Payee",
    //   id: "addpayee",
    //   url: "/addpayee",
    //   arr: array[10],
    //   component: <AddPayee />,
    //   roles: ["all"],
    //   Icon: DashboardIcon,
    // },
  ];

  const PROTECTED_ROUTES_SERVICES = [
    // {
    //   name: "Payments",
    //   id: "payments",
    //   url: "/payments",
    //   arr: array[11],
    //   component: <Payments />,
    //   roles: ["all"],
    //   Icon: DashboardIcon,
    // },

    //PERSONEL

    {
      name: "Statements",
      id: "statements",
      url: array[2] == "1" ? "/statements" : null,
      component: <Statements />,
      roles: [],
      arr: array[2],
      Icon: StatementIcon,
    },

    //CORPORATE

    {
      name: "Statements",
      id: "statements",
      // url: "/statements",
      url: array[103] == "1" ? "/statements" : null,
      component: <StatementsCorporate />,
      roles: [],
      arr: array[103],
      Icon: StatementIcon,
    },
    // {
    //   name: "Service Request",
    //   id: "servicerequest",
    //   url: "/servicerequest",
    //   component: <ServiceRequest />,
    //   roles: ["all"],
    //   arr: array[13],
    //   Icon: VpaIcon,
    // },

    //CORPORATE
    // {
    //   name: "Request New Cheque book",
    //   id: "newcheckbbok",
    //   url: "/newcheckbbok",
    //   component: <NewCheckBook />,
    //   roles: ["all"],
    //   arr: array[10],
    //   Icon: VpaIcon,
    // },

    //PERSONEL

    {
      name: "Cheque",
      id: "cheque",
      url: array[61] == "1" ? "/cheque" : null,
      arr: array[61],
      // component: <CorporateFundTransfer />,
      roles: ["all"],
      Icon: CheckIcon,
      childRoutes: [
        {
          name: "Request",
          id: "request",
          url: array[62] != 0 ? "/request" : null,
          roles: [],
          arr: array[62],
          component: <ChequeRequest />,
          Icon: CheckIcon,
        },
        {
          name: "Status",
          id: "status",
          url: array[63] != 0 ? "/status" : null,
          roles: [],
          arr: array[63],
          component: <ChequeStatus />,
          Icon: CheckIcon,
        },
        {
          name: "Stop Payment",
          id: "stop",
          url: array[64] != 0 ? "/stoppayment" : null,
          roles: [],
          arr: array[64],
          component: <StopPayment />,
          Icon: CheckIcon,
        },
        {
          name: "Positive Pay",
          id: "positivepaysearch",
          url: array[65] != 0 ? "/positivepaysearch" : null,
          roles: [],
          arr: array[65],
          component: <PositivePayTab />,
          Icon: CheckIcon,
        },
      ],
    },

    {
      name: "Certificates",
      id: "certificates",
      // url: "/statements",
      url: array[71] == "1" ? "/certificates" : null,
      component: <Certificates />,
      roles: [],
      arr: array[71],
      Icon: CertificatesIcon,
    },

    //COPRORATE

    // {
    //   name: "Cheque",
    //   id: "cheque",
    //   url: "/cheque",
    //   arr: array[9],
    //   // component: <CorporateFundTransfer />,
    //   roles: ["all"],
    //   Icon: CheckIcon,
    //   childRoutes: [
    //     {
    //       name: "Request",
    //       id: "request",
    //       url: array[9] == 1 ? "/request" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <ChequeRequestCorporate />,
    //       Icon: CheckIcon,
    //     },
    //     {
    //       name: "Status",
    //       id: "status",
    //       url: array[9] == 1 ? "/status" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <ChequeStatusCorporate />,
    //       Icon: CheckIcon,
    //     },
    //     {
    //       name: "Stop Payment",
    //       id: "stop",
    //       url: array[9] == 1 ? "/stoppayment" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <StopPaymentCorporate />,
    //       Icon: CheckIcon,
    //     },
    //   ],
    // },

    //CORPORATE
    // {
    //   name: "Upload File",
    //   id: "uploadfile",
    //   url: "/uploadfile",
    //   arr: array[9],
    //   // component: <CorporateFundTransfer />,
    //   roles: ["all"],
    //   Icon: DashboardIcon,
    //   childRoutes: [
    //     {
    //       name: "Upload a File",
    //       id: "uploadfile",
    //       url: array[9] != 0 ? "/uploadfile" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <UploadFile />,
    //       Icon: DashboardIcon,
    //     },
    //     {
    //       name: "View Uploaded File Details",
    //       id: "viewfile",
    //       url: array[9] != 0 ? "/viewfile" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <UploadViewFIle />,
    //       Icon: DashboardIcon,
    //     },
    //     {
    //       name: "Approve / Reject Uploaded File",
    //       id: "approvereject",
    //       url: array[9] != 0 ? "/approvereject" : null,
    //       roles: [],
    //       arr: array[9],
    //       component: <UploadApproveReject />,
    //       Icon: DashboardIcon,
    //     },
    //   ],
    // },
    //   {
    //     name: "Upload File",
    //     id: "uploadfile",
    //     url: "/uploadfile",
    //     // component: <UploadFile />,
    //     roles: ["all"],
    //     arr: array[10],
    //     Icon: VpaIcon,
    //     childRoutes: [
    //       {
    //         name: "Upload a File",
    //         id: "withinbank",
    //         url: array[9] != 0 ? "/withinbank" : null,
    //         roles: [],
    //         arr: array[9],
    //         component: <UploadFile/>,
    //         Icon: DashboardIcon,
    //       },
    //       {
    //         name: "View Uploaded File Details",
    //         id: "viewfile",
    //         url: array[9] != 0 ? "/viewfile" : null,
    //         roles: [],
    //         arr: array[9],
    //         component: <SelfAccount />,
    //         Icon: DashboardIcon,
    //       },
    //       {
    //         name: "Approve / Reject Uploaded File",
    //         id: "approvereject",
    //         url: array[9] != 0 ? "/approvereject" : null,
    //         roles: [],
    //         arr: array[9],
    //         component: <OtherAccount />,
    //         Icon: DashboardIcon,
    //       },
    // ]
    //   },
  ];

  const PROTECTED_ROUTES_SETTINGS = [

    //PERSONEL SETTING
    {
      name: "Profile",
      id: "settings",
      url: array[72] == "1" ? "/settings" : null,
      component: <Settings />,
      roles: ["all"],
      arr: array[72],
      Icon: SettingIcon,
    },

    {
      name: "Customer Support",
      id: "complaint",
      // url: "/statements",
      url: array[73] == "1" ? "/complaint" : null,
      component: <BrowseCustomerComplaint />,
      roles: [],
      arr: array[73],
      Icon: CustomerSupportIcon,
    },
    {
      name: "Customer Support",
      id: "complaint",
      url: array[73] == "1" ? "/complaint" : null,
      roles: [],
      Icon: AccoutIcon,
      component: <BrowseCustomerComplaint />,
      childRoutes: [
        {
          name: "Raise Complaint",
          id: "raisecomplaint",
          url: array[73] == "1" ? "/raisecomplaint" : null,
          roles: [],
          // arr: array[2],
          component: <CustomerComplaint />,
          Icon: AccoutIcon,
        },
      ]
    },
    {
      name: "Generate QR Code",
      id: "qrcode",
      url: array[0] == "1" ? "/qrcode" : null,
      component: <GenerateQRCode />,
      roles: ["all"],
      arr: array[0],
      Icon: QRsvg,
    },

    //CORPORATE SETTINGS
    {
      name: "Profile",
      id: "settings",
      url: array[152] == "1" || array[226] == "1" || array[276] == "1" ? "/settings" : null,
      component: <SettingsCorporate />,
      roles: ["all"],
      arr: array[152] || array[226] || array[276],
      Icon: SettingIcon,
    },

    {
      name: "User's",
      id: "users",
      url: array[279] == "1" ? "/users" : null,
      arr: array[279],
      component: <UserMaster />,
      roles: [],
      Icon: SettingIcon,
    },
    {
      name: "Generate QR Code",
      id: "qrcode",
      url: array[101] || array[201] || array[251] == "1" ? "/qrcode" : null,
      component: <GenerateQRCodeCorporate />,
      roles: ["all"],
      arr: array[101] || array[201] || array[251],
      Icon: QRsvg,
    },

    //CORPORATE CHECKER SETTINGS
    // {
    //   name: "Settings CHECKER",
    //   id: "settings",
    //   url: array[9] == "1" ? "/settings" : null,
    //   component: <SettingsCorporate />,
    //   roles: ["all"],
    //   arr: array[9],
    //   Icon: SettingIcon,
    // },

    //CORPORATE AUTHORIZE SETTINGS
    // {
    //   name: "Settings AUTHORIZE",
    //   id: "settings",
    //   url: array[9] == "1" ? "/settings" : null,
    //   component: <SettingsCorporate />,
    //   roles: ["all"],
    //   arr: array[9],
    //   Icon: SettingIcon,
    // },
  ];
  return {
    PROTECTED_ROUTES,
    PROTECTED_ROUTES_SERVICES,
    PROTECTED_ROUTES_SETTINGS,
  };
};

export default Routes;

// export const PROTECTED_ROUTES_CORPORATE = [
// {
//   name: "Corporate Home",
//   id: "corporatehome",
//   url: "/corporatehome",
//   component: <Settings />,
//   roles: ["all"],
//   Icon: DashboardIcon,
// },
// ];
