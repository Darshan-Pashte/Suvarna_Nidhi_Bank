import * as React from "react";
import Box from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { downloadAs } from "./downloadAs";

export default function DownloadAsComponent() {
  const [download, setDownload] = React.useState(downloadAs[0].id);

  const handleChange = (event) => {
    setDownload(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 300, margin: "1rem" }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={download}
          onChange={handleChange}
        >
          {downloadAs.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
