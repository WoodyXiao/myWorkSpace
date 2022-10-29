import {Button, IconButton} from "@mui/material";

const CreateEventButton = (props) => {
    return (
        props.iconButton ? <IconButton variant={props.variant ? props.variant : "outlined"}
                                       className={props.className && props.className}
                                       size={props.size}
                                       onClick={props.onClick}>
                {props.iconButton}
            </IconButton> :
            <Button startIcon={props.startIcon ? props.startIcon : null}
                    variant={props.variant ? props.variant : "outlined"}
                    className={props.className && props.className}
                    size={props.size}
                    onClick={props.onClick}>

                {props.text}
            </Button>
    )
}

export default CreateEventButton