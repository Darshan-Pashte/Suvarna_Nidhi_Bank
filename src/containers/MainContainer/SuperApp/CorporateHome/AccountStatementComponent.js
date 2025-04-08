import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import classes from "./AccountStatementComponent.module.css";
import { optionsData } from "./optionsData";

export default function AccountStatementComponent() {
  const [account, setAccount] = React.useState(optionsData[0].id);

  const handleChange = (event) => {
    setAccount(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 300, margin: "1rem" }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={account}
          onChange={handleChange}
        >
          {optionsData.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
