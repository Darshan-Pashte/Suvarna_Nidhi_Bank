import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { matchSorter } from 'match-sorter';
import { Controller } from "react-hook-form";
// import Textfield from './textField';
import Textfield from "./textField";



import { styled, Button } from "@mui/material";
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';




// const filterOptions = createFilterOptions({
//   matchFrom: 'start',
//   //stringify: (option) => option.text,

// });  
// const filterOptions = (options, { inputValue }) =>
//   matchSorter(options, inputValue, { keys: ["value"] });

  const filterOptions = (options, { inputValue }) => {
    // Use matchSorter to filter the options
    const filteredOptions = matchSorter(options, inputValue, { keys: ["value"] });
  
    // Sort the filteredOptions array
    const sortedOptions = filteredOptions.sort((a, b) => {
      // Check if "all" is in the value of either option
      const aContainsAll = a.value.toLowerCase().includes("all");
      const bContainsAll = b.value.toLowerCase().includes("all");
  
      // If only one of them contains "all," move it to the front
      if (aContainsAll && !bContainsAll) {
        return -1;
      } else if (!aContainsAll && bContainsAll) {
        return 1;
      }
  
      // If neither or both contain "all," maintain their original order
      return 0;
    });
  
    return sortedOptions;
  };
  
  
  const Autocompletes  = styled(Autocomplete)(({ theme }) => ({
   
    'label + &': {
      marginTop: theme.spacing(1),
      height : "40px",
    },
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
      height : "35px",
      color: '#888',
      fontWeight:'500',
// marginTop:'4px',
      // width: '520px',
    //   padding: '0px 1px 5px 8px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        'Poppins'
      ].join(','),
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



export default function AutocompleteForm1(props) {
  const { rules, onAutocompleteChange ,AutocompleteProps, disabled = false, TextFieldProps, controlerProps, errorMessage, data, required = false,
   } = props;
  // console.log(rules, AutocompleteProps, TextFieldProps, controlerProps, errorMessage, data, )
  const [selected, setSelectedData] = useState("");
  if (required) {
    return (
      <Controller
        {...controlerProps}
        rules={required && rules}
        render={({ field, fieldState }) => {
          const { value } = field;
          return (
            <Autocompletes
              disabled={disabled}
              disableClearable
              {...field}
              value={value || null}
              options={data===undefined || data===null  ? [] : data}
              getOptionLabel={(option) => option?.value}
              filterOptions={filterOptions}
        
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option?.value + option?.code}>
                    {
                      option?.value
                    }
                  </li>
                );
              }
              }
              renderInput={(params) => (
                <Textfield
                  {...params}
                  {...TextFieldProps}
                  // label={<>{TextFieldProps?.label}{required ? <sup className="validationStart">*</sup> : null}</>}
                  {...required}
                  
                  input={<Autocomplete />}
                  //required={required}
                  
                  error={required && !!fieldState?.error}
                  helperText={required && fieldState?.error?.message}
              


                />
              )}

              
              // onChange={(_, data) => field.onChange(data)}
              onChange={(event, newValue, reason) => {
                if (onAutocompleteChange) {
                  onAutocompleteChange(event, newValue, reason);
                }
                if (newValue != null) {
                  setSelectedData(newValue);
                  field.onChange(newValue);
                } else {
                  // console.log("empty");
                  // setSelectedData("")
                  field.onChange(undefined)
                }
              }}
              {...AutocompleteProps}
            />
          );
        }}
      />
    );
  } else {
    return (
      <Controller
        {...controlerProps}
        render={({ field, fieldState }) => {
          const { value } = field;
          return (
            <Autocompletes
              disabled={disabled}
              disableClearable
              {...field}
              value={value || null}
              options={data===undefined || data===null  ? [] : data}
              getOptionLabel={(option) => option?.value}
              filterOptions={filterOptions}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option?.code + option?.value}>
                    {
                      option?.value
                    }
                  </li>
                );
              }
              }
              renderInput={(params) => (
                <Textfield
                  {...params}
                  {...TextFieldProps}
                  label={<>{TextFieldProps?.label}{required ? <sup className="validationStart">*</sup> : null}</>}
                  //required={required}
                  // error={required && !!fieldState.error}
                  // helperText={required && fieldState.error?.message}
                />
              )}
              // onChange={(_, data) => field.onChange(data)}
              onChange={(event, newValue, reason) => {
                if (newValue != null) {
                  // setSelectedData(newValue.text);
                  field.onChange(newValue);
                } else {
                  // console.log("empty");
                  // setSelectedData("")
                  field.onChange(undefined)
                }
              }}
              {...AutocompleteProps}
            />
          );
        }}
      />
    );
  }
}


