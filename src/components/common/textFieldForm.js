import { Controller } from "react-hook-form";
import Textfield from "./textField";

export default function TextFieldForm(props) {
  const {
    TextFieldProps,
    rules,
    controlerProps,
    required = false,
    regExp,
    newLine = false,
    backgroundColor = false,
  } = props;

  return (
    <Controller
      {...controlerProps}
      rules={rules}
      render={({ field, fieldState }) => {
        const handleInputChange = (event) => {
          const regex = regExp;
          const { name, value } = event.target;

          console.log("name, value", name, value);

          let processedValue;

          if (newLine) {
            processedValue = value.replace(/\n/g, ",");
          } else if (
            name === "ifsccode" ||
            name === "benIFSC" ||
            name === "benifsc" ||
            name === "beneIfsc" ||
            name === "customerno"
          ) {
            processedValue = value
              .split("")
              .map((char) => char.toUpperCase())
              .join("");
          } else {
            processedValue = value;
          }

          const isValidInput =
            regex.test(processedValue) || processedValue === "";

          if (!isValidInput) {
            event.preventDefault();
            return;
          }

          field.onChange(processedValue);
        };

        const shouldShowError =
          required ||
          (controlerProps.name === "mobilenum" && !!fieldState.error);

        return (
          <Textfield
            value={field.value}
            autoComplete="off"
            {...field}
            {...TextFieldProps}
            sx={{
              "& fieldset": { border: "none" },
              "& .MuiInputBase-root": {
                padding: "4px 0 5px",
              },
              "& .MuiInputBase-input": {
                borderRadius: "6px",
                position: "relative",
                // backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
                // backgroundColor: "#FFF",
                backgroundColor: !backgroundColor ? "#FFF" : "#EEEFF7",

                border: "1px solid",
                // borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
                // borderColor: 'red',
                fontSize: "0.813rem",
                height: "2px",
                color: "#888",
                fontWeight: "500",

                // width: '520px',
                padding: "14px 10px",
                "@media (max-width: 568px)": {
                  padding: "20px 10px",
                },
                '&:focus': {
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 5px",
                  // border: "2px solid",
      borderColor: '#242A42', // Fallback if Mui-focused doesn't work
    },
              },
            }}
            error={shouldShowError}
            helperText={shouldShowError ? fieldState.error?.message : ""}
            InputLabelProps={{
              shrink: field.value ? true : false,
            }}
            onChange={handleInputChange}
          />
        );
      }}
    />
  );
}
