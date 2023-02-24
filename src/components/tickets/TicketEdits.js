import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Tickets.css"

export const TicketEdit = () => {
    const [ticket, updateTicket] = useState({
        id: 0,
        userId: 0,
        description: "",
        emergency: false,
        dateCompleted: ""
    })
    const {ticketId} = useParams()
    const navigate = useNavigate()
    
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets?id=${ticketId}`)
            .then(response => response.json())
            .then(
                (data) => {
                    const singleCustomer = data[0]
                    updateTicket(singleCustomer)
                }
                )
            },
            [ticketId]
            )
            

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const ticketEditToSendToAPI = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ticket.dateCompleted
        }
        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketEditToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets")
            })
    }

    return (
        <form className="ticketEdit">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        required autoFocus
                        type="text"
                        id="descriptionText"
                        className="form-control"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.description = evt.target.value
                                updateTicket(copy)
                            }
                        }>{ticket.description}</textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        checked={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.emergency = evt.target.checked
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Edit
            </button>
        </form>
    )
}