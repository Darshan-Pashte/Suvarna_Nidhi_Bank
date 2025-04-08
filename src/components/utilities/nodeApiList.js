import axios from "axios";

export const baseUrl = process.env.REACT_APP_API_BASEURL;

// Dev UAT URL
export const baseUrlServerCorporate = process.env.REACT_APP_API_URL_CORPORATE
export const baseUrlServer = process.env.REACT_APP_API_URL


export const apiList = {
  // // Base URL for UAT
 
  LOGIN: baseUrlServer + "login/dologin",
  LOGOUT_INTERNET: baseUrlServer + "login/logout",
  REGISTER: baseUrlServer + "register/doregister",
  UPDATEPASS: baseUrlServer + "updatepassword",
  OTP: baseUrlServer + "login/validateloginotp",
  REGISTEROTP: baseUrlServer + "register/validateotp",

  FORGOTPASS: baseUrlServer + "register/forgotPassword",
  FORGOTPASSOTPVALIDATE: baseUrlServer + "register/validateotp",


  FORGOTTPIN: baseUrlServer + "forgetTpin",
  
  SETFORGOTPASS: baseUrlServer + "register/setForgotPass",

  UPDATETPIN: baseUrlServer + "register/changeTpin",

  TPINPASS: baseUrlServer + "register/setpin",
  ACCOUNTLIST: baseUrlServer + "bankaccounts",
  FETCHBAL: baseUrlServer + "fetchBalance",
  FETCHACC: baseUrlServer + "bankaccounts",
  FETCHPROFILE: baseUrlServer + "profile",
  RECENTTRANS: baseUrlServer + "recentTrans",


  ACCOUNT_STATEMENT_DOWNLOAD: baseUrlServer + "casaStatement",

  PDF_REQUEST_VIEW: baseUrlServer + "viewPdfRequest",
  PDF_GENERATE: baseUrlServer + "pdfGenerateRequest",
  PDF_DOWNLOAD: baseUrlServer + "pdfDownload",

  BENEFICIARYADD: baseUrlServer + "beneficiary/addother",
  BENEFICIARYADDINTERNAL: baseUrlServer + "beneficiary/addInternal",
  BENEFICIARYBROWSE: baseUrlServer + "beneficiary/browse",
  BENEFICIARYDELETE: baseUrlServer + "beneficiary/delete",
  IMPSTRANSACTIONS: baseUrlServer + "transaction/imps",
  NEFTTRANSACTIONS: baseUrlServer + "transaction/neft",
  INTERNALTRANSACTIONS: baseUrlServer + "transaction/internal",
  SELFTRANSFER: baseUrlServer + "transaction/selfAcct",
  TRANSACTIONBROWSE: baseUrlServer + "transactionBrowse",
  RTGSTRANSACTIONS: baseUrlServer + "transaction/rtgs",
  VERIFYINTERNALBENEFICIARY: baseUrlServer + "beneficiary/verifyAcctNo",

  
  

  //Card
  CARDLIST: baseUrlServer + "card/getlist",
  CARDDETAILS: baseUrlServer + "card/details",
  CARDBLOCKUNBLOCK: baseUrlServer + "card/blockUnblock",
  CARDGENERATEPOTP: baseUrlServer + "card/generatePin1",
  CARDOTP: baseUrlServer + "card/generatePin2",
  CARDPIN: baseUrlServer + "card/generatePin3",

  // Deposit
  FETCHDEPOSIT: baseUrlServer + "fetchDeposites",
  FETCHDEPOSITRECEIPT: baseUrlServer + "fetchAccountReceipt",
  FETCHDEPOSITSCHEME: baseUrlServer + "fetchDepositeScehmes",
  FETCHDEPOSITINTERESTRATE: baseUrlServer + "fetchDepositIntRates",
  FETCHDEPOSITLOOKUP: baseUrlServer + "depositeLookup",
  FETCHDEPOSITACCNO: baseUrlServer + "fetchDepositeAccNo",
  FETCHCASHCERT: baseUrlServer + "openDepositeAcc",

  // Loan

  FETCHLOAN: baseUrlServer + "loan/initiatereq",

  FETCH_MINI_STATEMENT: baseUrlServer + "miniStatement",
  FETCHLOANINFO: baseUrlServer + "loan/fetchLoanAcctDetails",
  FETCHLOANDISBURSEMENT: baseUrlServer + "loan/loanDisbursementDetails",
  FETCHLOANREPAYMENT: baseUrlServer + "loan/loanRepaymentSchedule",
  // GETACCLIMIT: baseUrlServer + "/banking/fetchActLimit",
  GETACCLIMIT: baseUrlServer + "fetchCustLimit",
  UPDATEACCLIMIT: baseUrlServer + "updateCustLimit",
  LOANPAYMENT:baseUrlServer + "transaction/loanPayment",
  LOAN_ACCOUNT_STATEMENT_DOWNLOAD: baseUrlServer + "otherStatement",
STATEMENT: baseUrlServer + "viewStatement",

  // CheckBook

  CHEQUEBOOKREQUEST: baseUrlServer + "chequebookreq",
  CHEQUEBOOKSTATUS: baseUrlServer + "chequestatus",
  STOPCHECK: baseUrlServer + "stopcheque",
  POSITIVE_PAY_SEARCH: baseUrlServer + "positivepaysearch",
  POSITIVE_PAY_REQUEST: baseUrlServer + "positivepayreq",
  CERTIFICATE_DOWNLOAD: baseUrlServer + "certificate/geturl",

    // Internet DashB
    HOME_DASHBOARD: baseUrlServer + "dashboard",
    CUSTOMERCOMPLAINT: baseUrlServer + "complaint/raise",
    BROWSE_CUSTOMER_COMPLAINT: baseUrlServer + "complaint/get",


    CURRENT_ACCOUNT_DETAILS: baseUrlServer + "loan/fetchLoanAcctDetails",


  //Corporate
  FETCH_ACC_CORPORATE: baseUrlServerCorporate + "banking/bankaccounts",
  CORPORATELOGIN : baseUrlServerCorporate + "banking/dologin",
  CORPORATEOTP: baseUrlServerCorporate + "banking/validateloginotp",
  CORPORATESETPASSWORD: baseUrlServerCorporate + "banking/setpassword",
  CORPORATE_ACCOUNT_STATEMENT_DOWNLOAD: baseUrlServerCorporate + "banking/casaStatement",
  CORPORATE_RECENTTRANS: baseUrlServerCorporate + "banking/recentTrans",
  CORPORATE_FETCH_MINI_STATEMENT: baseUrlServerCorporate + "banking/miniStatement",
  CORPORATE_BULKUPLOAD_OTP: baseUrlServerCorporate + "banking/sendOtp",
  CORPORATE_BULK_UPLOAD_AMT_OTP: baseUrlServerCorporate + "banking/bulkuploadSendOtp",
  CORPORATE_APPROVE_AUTHORIZE_OTP: baseUrlServerCorporate + "banking/checkAuthSendOtp",
  CORPORATE_BULKUPLOAD_FILE: baseUrlServerCorporate + "banking/bulkupload",
  CORPORATE_BULKUPLOAD_LIST: baseUrlServerCorporate + "banking/bulkuploadlst",
  CORPORATE_BULKUPLOAD_SAMPLE : baseUrlServerCorporate + "banking/downloadFile/samplefile",
  CORPORATE_BULKUPLOAD_PREVIEW: baseUrlServerCorporate + "banking/bulkuploadpreiview",
  CORPORATE_BENEFICIARYADD: baseUrlServerCorporate + "beneficiary/addother",
  CORPORATE_BENEFICIARYADDINTERNAL: baseUrlServerCorporate + "beneficiary/addInternal",
  CORPORATE_BENEFICIARYBROWSE: baseUrlServerCorporate + "beneficiary/browse",
  CORPORATE_FUND_TRANFER_DETAILS_COMMON: baseUrlServerCorporate + "banking/transactionlookup",
  CORPORATE_BENEFICIARYDELETE: baseUrlServerCorporate + "beneficiary/delete",
  CORPORATE_CUSTOMER: baseUrlServerCorporate + "fetchCustNo",
  CORPORATE_LOANACCOUNT: baseUrlServerCorporate + "loan/fetchloans",
  CORPORATE_TRANSACTION_VIEW: baseUrlServerCorporate + "banking/transactionpreiview",
  CORPORATE_FUND_TRANFER: baseUrlServerCorporate + "banking/fundTransfer",
  CORPORATE_SELF_ACCOUNT_TRANFER: baseUrlServerCorporate + "banking/selfAcctFundTransfer",
  CORPORATE_FETCH_BALANCE: baseUrlServerCorporate + "banking/fetchBalance",
  CORPORATE_FETCHPROFILE: baseUrlServerCorporate + "profile",
  CORPORATE_SET_NEW_PASSWORD: baseUrlServerCorporate + "banking/setpassword",
  CORPORATE_FETCH_CUSTOMERS: baseUrlServerCorporate + "fetchCustomers",
  CORPORATE_FETCH_CUSTOMERS_LIMIT: baseUrlServerCorporate + "fetchCustLimit",
  CORPORATE_FETCH_CUSTOMERS_LIMIT_UPDATE: baseUrlServerCorporate + "updateCustLimit",
  CORPORATE_INTERNAL_BENE_VALAIDATE: baseUrlServerCorporate + "beneficiary/verifyAcctNo",
  FORGOTPASSCORPORATE: baseUrlServerCorporate + "forgotPassword",
  CORPORATE_VIEW_STATEMENT: baseUrlServerCorporate + "viewStatement",
  //Autorize and Checker API
  CORPORATE_UPDATEPASSWORD: baseUrlServerCorporate + "updatepassword",
  CORPORATE_FUND_TRANFER_APPROVE: baseUrlServerCorporate + "banking/checkAuth",

  CORPORATE_PDF_REQUEST_VIEW: baseUrlServerCorporate + "viewPdfRequest",
  CORPORATE_PDF_GENERATE: baseUrlServerCorporate + "pdfGenerateRequest",
  CORPORATE_PDF_DOWNLOAD: baseUrlServerCorporate + "pdfDownload",
  LOGOUT: baseUrlServerCorporate + "logout",

  //Deposit
  CORPORATE_FETCHDEPOSIT: baseUrlServerCorporate + "fetchDeposites",
  CORPORATE_FETCHDEPOSITRECEIPT: baseUrlServerCorporate + "fetchAccountReceipt",
  CORPORATE_FETCHDEPOSITSCHEME: baseUrlServerCorporate + "fetchDepositeScehmes",
  CORPORATE_FETCHDEPOSITINTERESTRATE: baseUrlServerCorporate + "fetchDepositIntRates",
  // CORPORATE_FETCHDEPOSITLOOKUP: baseUrlServer + "/banking/depositeLookup",
  // CORPORATE_FETCHDEPOSITACCNO: baseUrlServer + "/banking/fetchDepositeAccNo",
  // CORPORATE_FETCHCASHCERT: baseUrlServer + "/banking/openDepositeAcc",

  //Corporate Loan
  CORPORATE_LOAN_PAYMENT:baseUrlServerCorporate + "transaction/loanPayment",
  CORPORATE_FETCH_LOAN_INFO: baseUrlServerCorporate + "banking/loan/fetchLoanAcctDetails",
  CORPORATE_FETCH_LOAN_DISBURSEMENT: baseUrlServerCorporate + "loan/loanDisbursementDetails",
  CORPORATE_LOAN_ACCOUNT_STATEMENT_DOWNLOAD: baseUrlServerCorporate + "banking/otherStatement",
  CORPORATE_FETCH_LOAN: baseUrlServerCorporate + "banking/loan/initiatereq",
  CORPORATE_FETCH__REPAYMENT: baseUrlServerCorporate + "loan/loanRepaymentSchedule",





  //Corporate
  BROWSE_CORPORATE_USER: baseUrlServerCorporate + "fetchUsers",
  UPDATE_CORPORATE_USER: baseUrlServerCorporate + "updateUserStatus",
  CORPORATE_LOAN_PAY: baseUrlServerCorporate + "banking/loanPayment",
  CORPORATE_BENEFICIARY_AUTHORIZE: baseUrlServerCorporate + "beneficiary/authorize",


  CORPORATE_ACCOUNT_LOAN: baseUrlServerCorporate + "loan/fetchloans",
};

export const header = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "request-id ": "yaN7M9I7xHG0Ln0SYhORnw==",
    "request-key": "NUW1WGooueVbByqEp4rwrA==",
  },
};

export const headerSaving = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "request-id ": "ItJpwb8+bI7M3std+IygAvrWGBBQP5xxRK8ABFt+1+c=",
    "request-key": "FwIOemhG55dkToVR6EzcAfJRZcWSBFLLXFlJwThIcac=",
  },
};

const ServerInstance = axios.create({
  baseURL: baseUrl,
});

ServerInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwtToken");
  if (token) config.headers.authorization = `Bearer ${JSON.parse(token)}`;
  return config;
});

export default ServerInstance;
