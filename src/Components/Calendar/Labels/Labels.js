import {useContext} from "react";
import GlobalContext from "../../../Context/GlobalContext";

const Labels = () => {
    const {labels, updateLabel} = useContext(GlobalContext)
    return (
        <div>
            <p>Label</p>
            {
                labels.map(({label: lbl, checked}, idx) => (
                    <label key={idx}>
                        <input type="checkbox"
                               checked={checked}
                               onChange={() => updateLabel({
                                   label: lbl, checked: !checked
                               })}
                        />
                        <span>{lbl}</span>
                    </label>
                ))
            }
        </div>
    )
}

export default Labels