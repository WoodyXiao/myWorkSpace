import './EditTable.css'
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";

const Editable = (props) => {
    const [showEdit, setShowEdit] = useState(false)
    const [inputVal, setInputVal] = useState(props.text || "")

    return (
        <div className="editable">
            {
                showEdit ?
                    <form className={`editable_edit ${props.editClass || ""}`}
                          onSubmit={(event) => {
                              event.preventDefault()
                              if (props.onSubmit) {
                                  props.onSubmit(inputVal)
                                  setInputVal("")
                                  setShowEdit(false)
                              }
                          }}
                    >
                        <input
                            autoFocus
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            // defaultValue={props.text}
                            placeholder={props.placeholder || "Enter item"}
                        />
                        <div className="editable_edit_footer">
                            <button type='submit'>
                                {props.buttonText || 'Add'}
                            </button>
                            <CloseIcon onClick={() => setShowEdit(false)}/>
                        </div>
                    </form>
                    : <p className={`editable_display ${props.displayClass || ""}`}
                         onClick={() => setShowEdit(true)}>{props.text || 'Add item'}</p>
            }


        </div>
    )
}

export default Editable
