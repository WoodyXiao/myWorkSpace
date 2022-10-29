import {TextField} from "@mui/material";

const TextInput = (props) => {
    const {
        placeholder,
        variant,
        size,
        value,
        onChange
    } = props

    return (
        <TextField
            sx={{

            }}
            hiddenLabel
            fullWidth
            placeholder={placeholder ? placeholder : ''}
            variant={variant ? variant : 'filled'}
            size={size ? size : 'small'}
            value={value ? value : ''}
            required
            onChange={onChange ? onChange : ''}
        />
    )
}
export default TextInput