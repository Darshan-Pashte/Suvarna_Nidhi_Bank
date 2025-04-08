import React from 'react';
import { Controller } from "react-hook-form";
import { FormControlLabel, FormHelperText, FormControl, Radio, RadioGroup } from "@mui/material";

export default function RedioButtonFormRequired(props) {
  const {
    controlerProps,
    errorMessage,
    data,
    required = false,
  } = props;

  return (
    <FormControl component="fieldset" error={errorMessage}>
      <Controller
        {...controlerProps}
        rules={{
          required: errorMessage,
        }}
        render={({ field, fieldState }) => {
          return (
            <>
              <RadioGroup {...field} row>
                {data.map((item, i) => {
                  const { disabled = false } = item;
                  const temp = field.value === item.value;
                  return (
                    <FormControlLabel
                      key={item.value + i}
                      disabled={!temp && disabled}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  );
                })}
              </RadioGroup>
              {fieldState.invalid && (
                <FormHelperText>{errorMessage}</FormHelperText>
              )}
            </>
          );
        }}
      />
    </FormControl>
  );
}
