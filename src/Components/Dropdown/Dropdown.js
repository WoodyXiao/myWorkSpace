import React, {useEffect, useRef} from "react";


const Dropdown = (props) => {
    const dropdownRef = useRef()

    useEffect(() => {
        const handleClick = (event) => {
            if (
                dropdownRef &&
                !dropdownRef?.current?.contains(event.target) &&
                props.onClose
            ) {
                props.onClose();
            }
        };

        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div ref={dropdownRef} className="dropdown"
             style={{
                 position: 'absolute',
                 top: '100%',
                 right: '0'
             }}
        >
            {props.children}
        </div>
    )
}

export default Dropdown