import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
export default function RadioGroupForm(props) {
  const {
    TextFieldProps,
    controlerProps,
    errorMessage,
    data,
    required = false,
  } = props;
  return (
    <Controller
      {...controlerProps}
      rules={{
        required: errorMessage,
      }}
      render={({ field, fieldState }) => {
        return (
          <RadioGroup {...field} row>
            {data.map((item, i) => {
              const { disabled = false } = item
              const temp = field.value === item.value
              return (
                <FormControlLabel
                  key={item + i}
                  disabled={!temp && disabled}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              )
            }
            )}
          </RadioGroup>
        );
      }}
    />
  );
}
