import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import Textfield from "./textField";

export default function TextFieldFormNew(props) {
  const { TextFieldProps, rules, controlerProps, required = false } = props;
  return (
    <Controller
      {...controlerProps}
      rules={rules && rules}
      render={({ field, fieldState }) => {
        return (
          <Textfield
            value={field.value}
            // label={label}
            autoComplete="off"
            {...field}
            {...TextFieldProps}
            // label={<>{TextFieldProps.label}{required ? <sup className="validationStart">*</sup> : null}</>}
            // {...required}
            error={required && !!fieldState.error}
            helperText={required && fieldState.error?.message}
            InputLabelProps={{
              shrink: field.value ? true : false,
            }}
          />
        );
      }}
    />
  );
}

