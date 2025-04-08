import { style } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
// import { color } from "highcharts";
import moment from "moment";
import { useContext } from "react";
import { Controller } from "react-hook-form";
// import { ConnContext } from "../../context/conncontext";
import Textfield from './textField';
import styled from "styled-components";
export default function DatePickerForm(props) {
  // const { dateFormat, userAccess } = useContext(ConnContext);
  const { rules, TextFieldProps, controlerProps, DatePickerProps,readOnly=false, required = false , monthyear = false } = props;
  // const isWeekend = (date) => {
  //   const day = date.day();
  //   if (!paymenttype) {

  //     if (initiateDate === "initiateDate" && userAccess && userAccess?.isInitiatePayamentDate && userAccess?.initiatePayamentDay) {
  //       if (!userAccess?.paymentType.split(",").find(element => element === daStatus) || !userAccess?.isFixedPaymentDay) {
  //         var i = userAccess && userAccess.initiatePayamentDay ? userAccess.initiatePayamentDay.split(",").find(element => moment(element, "dddd").day() === day) : null
  //         return day === 0 || (i !== null && moment(i, "dddd").day() !== day);
  //       }
  //     }
  //     if (initiateDate === "initiateDate" && userAccess && userAccess?.paymentType && userAccess?.paymentType.split(",").find(element => element === daStatus) && userAccess?.isFixedPaymentDay) {
  //       var i = userAccess !== undefined && userAccess.fixedPaymentDay !== null && userAccess.fixedPaymentDay !== "" && userAccess.fixedPaymentDay !== undefined ? userAccess.fixedPaymentDay.split(",").find(element => moment(element, "dddd").day() === day) : null
  //       return day === 0 || (i !== null && moment(i, "dddd").day() !== day);
  //     }
  //     if (valuedate === "valueDate" && userAccess && userAccess.isValueDate && userAccess?.valueDay) {
  //       var i = userAccess.valueDay ? userAccess?.valueDay.split(",").find(element => moment(element, "dddd").day() === day) : null
  //       return day === 0 || (i !== null && moment(i, "dddd").day() !== day);
  //     }
  //   }
  //   return day === 0
  // };


  const DatePickers  = styled(DatePicker)(({ theme }) => ({
   

    '& li.active': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
      borderColor:'#E0E3E7',
    },
    '& .MuiInputBase-root': {
      borderRadius: '6px',
      position: 'relative',
      // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
      backgroundColor: '#FFF',
      border: '1px solid',
      // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
      fontSize: '14px',
      height: "31px",
      color: '#888',
                fontWeight:'400',
marginTop:"3px",
      // width: '520px',
      padding: '-15px 12px',
      "@media (max-width: 568px)": {
        padding: "20px 10px",
      },
   
      // Use the system font instead of the default Roboto font.

      '&:focus': {
        // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        // borderColor: theme.palette.primary.main,  
                                               
      },
    "  &.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ":{
border:0
      },
      ".MuiOutlinedInput-notchedOutline":{
        border:0
      }
    },
  }));


  return (
    <Controller
      {...controlerProps}
      rules={required && rules}
      render={({ field, fieldState }) => {
        const { value, onChange } = field
        return (
          <DatePickers
          readOnly={readOnly}
            {...DatePickerProps}
            // shouldDisableDate={isWeekend}
            value={value || new Date()}
            // value={value || new Date()}
            // defaultValue={new Date()} 
            onChange={onChange}
            // label={<>{DatePickerProps.label}{required ? <sup className="validationStart">*</sup> : null}</>}
            renderInput={(params) => (
              <Textfield {...params}
              {...TextFieldProps}
              // {...required}
                error={required && !!fieldState?.error}
                helperText={required && fieldState?.error?.message} />
            )}
            className="datepicker"
            
            inputFormat={monthyear ? "MMM YYYY" : "DD MMM YYYY"}
            // inputFormat={dateFormat}
          />
        );
      }}
    />
  );
}
