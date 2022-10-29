import './Edittable.css'
import CloseIcon from "@mui/icons-material/Close";

const Editable = () => {
    return (
        <div className="editable">
            <p>Add Card</p>
            <form className="editable_edit">
                <input type="text"/>
                <div className="editable_edit_footer">
                    <button type='submit'>Add</button>
                    <CloseIcon/>
                </div>
            </form>
        </div>
    )
}

export default Editable
