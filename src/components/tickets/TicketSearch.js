import "./Tickets.css"

export const TicketSearch = ( {setterFunction} ) => {
    return <div>
        <input onChange={
            (changeEvent) => {
                setterFunction(changeEvent.target.value)
            }
        }
        id="searchArea" type="text" placeholder="enter search terms" />
    </div>
}