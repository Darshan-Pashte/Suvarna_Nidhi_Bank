import TextField from '@mui/material/TextField';
export default function Textfield(props) {
    return (
        <TextField
            // InputLabelProps={{
            //     shrink: true,
            // }}
            variant="outlined"
            // defaultValue="Default Value"
            {...props}

        />
    )
}