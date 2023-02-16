import { useEffect, useState } from "react"
import "./Tickets.css"
// export const TicketList = () => {
//     return <h2>List of Tickets</h2>
// }
    
export const TicketList = () => {
    const [tickets, setTickets] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`)
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)

                })
        },
        []
    )
    return <>
        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                tickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "bomb" : "No"}</footer>
                        </section>
                    }
                )
            }
            </article>
        </>
}