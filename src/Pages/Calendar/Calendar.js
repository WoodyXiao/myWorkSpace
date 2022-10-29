import "./Calendar.css"
import CalendarHeader from "../../Components/Calendar/CalendarHeader/CalendarHeader";
import Sidebar from "../../Components/Calendar/Sidebar/Sidebar";
import Month from "../../Components/Calendar/Month/Month";
import EventModal from "../../Components/Calendar/EventModal/EventModal";

import GlobalContext from "../../Context/GlobalContext";

import {getMonth} from "../../util/util";
import {useState, useContext, useEffect} from "react";

const Calendar = () => {

    const [currentMonth, setCurrentMonth] = useState(getMonth())
    const {monthIndex, showEventModal, setShowEventModal} = useContext(GlobalContext)

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex))
    }, [monthIndex])

    return (
        <>
            <div className={"calendar"} style={{
                marginTop: '60px'
            }}>
                {showEventModal && <EventModal onClose={() => setShowEventModal(false)}/>}
                <CalendarHeader/>
                <div>
                    <Sidebar/>
                    <div>
                        <Month month={currentMonth}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar