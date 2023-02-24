import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import "./Tickets.css"
// export const TicketList = () => {
//     return <h2>List of Tickets</h2>
// }

export const TicketList = ({ searchTermsState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, viewOnlyOpenTix] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTerms = tickets.filter(
                (ticket) => {
                    return ticket.description.toLowerCase().includes(searchTermsState.toLowerCase())
                })
            setFiltered(searchedTerms)
        },
        [searchTermsState]
    )

    // function for, as non-employee, viewing open tix or all tix
    useEffect(
        () => {
            if (openOnly) {
                const openTickets = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

    //function for, as employee, viewing only emergency tix
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    //function for setting initial state of ticket list
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
    //function for filtering tickets based on whether user is employee or customer
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )
    return <>
        {
            honeyUserObject.staff ?
                <>
                    <button className="ticketListBtns" onClick={() => setEmergency(true)}>Emergency Only</button>
                    <button className="ticketListBtns" onClick={() => setEmergency(false)}>View All</button>
                </>
                : <>
                    <button className="ticketListBtns" onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button className="ticketListBtns" onClick={() => viewOnlyOpenTix(true)}>Open Tickets</button>
                    <button className="ticketListBtns" onClick={() => viewOnlyOpenTix(false)}>All Tickets</button>
                </>

        }


        <h2>List of Tickets</h2>
        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>
                                <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
                            </header>
                            <section>{ticket.description}</section>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}