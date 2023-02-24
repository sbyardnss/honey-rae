import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tickets.css"

export const Ticket = ({ ticketObject, currentUser, employeesArray, getAllTickets }) => {
    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    // const [claimedEmployee, updateClaimedEmployee] = useState({
    //     employeeId: 0,
    //     serviceTicketId: 0
    // })

    let assignedEmployee = null;
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employeesArray.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    // const employeeTicketRelationshipToSendToAPI = {
    //     employeeId: claimedEmployee.employeeId,
    //     serviceTicketId: claimedEmployee.serviceTicketId
    // }


    const employeeUser = employeesArray.find(employee => employee.userId === honeyUserObject.id)


    const buttonOrNoButton = () => {
        if (currentUser.staff) {

            return <button onClick={() => {
                fetch(`http://localhost:8088/employeeTickets`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        employeeId: parseInt(employeeUser.id),
                        serviceTicketId: ticketObject.id
                    })
                })
                    .then(response => response.json())
                    .then(
                        () => {
                            getAllTickets()
                        }
                    )

            }
            }
            >Claim</button>
        }
        else {
            return ""
        }
    }

    const canClose = () => {
        if (currentUser.staff) {
            return  <button></button>
        } 
        else {
            return ""
        }
    }

    const closeTicket = () => {

    }


    return <section className="ticket">
        <header>

            {
                currentUser.staff
                    ? `Ticket ${ticketObject.id}`
                    : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>

            }
        </header>
        <section>{ticketObject.description}</section>
        <section className="ticket__emergency">Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
        <footer className="ticket__footer">
            {
                ticketObject.employeeTickets.length
                    ? `Assigned to ${assignedEmployee?.user?.fullName}`
                    : buttonOrNoButton()
            }
        </footer>
    </section>



}