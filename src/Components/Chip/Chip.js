import CloseIcon from '@mui/icons-material/Close';
import './Chip.css'

const Chip = (props) => {
    return (
        <div className="chip" style={{backgroundColor: props.color}}>
            {props.text}
            {props.close && <CloseIcon onClick={() => {
                return props.onClose ? props.onClose() : ""
            }}/>}
        </div>
    )
}

export default Chip