import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Tickets.css"

export const Ticket = ({ employeesArray, currentUser, getAllTickets, ticketObject }) => {
    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const [employeeUser, setEmployeeUser] = useState({})
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


    // const employeeUser = employeesArray.find(employee => employee.userId === currentUser.id)
    useEffect(
        () => {
            if (currentUser.staff) {
                const matchedEmployee = employeesArray.find(employee => employee.userId === currentUser.id)
                setEmployeeUser(matchedEmployee)
            }
            else {
                setEmployeeUser({})
            }
        },
        []
    )

    

    const buttonOrNoButton = () => {
        if (currentUser.staff) {

            return <button className="ticket__claim" onClick={() => {
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
        if (employeeUser?.id === assignedEmployee?.id && ticketObject.dateCompleted === "" && currentUser.staff) {
            return <button onClick={closeTicket} className="ticket__close">Close Ticket</button>
        }
        else {
            return ""
        }
    }

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                    method: "DELETE",
                })
                    .then(() => {
                        getAllTickets()
                    })
            }} className="ticket__delete">Delete Ticket</button>
        }
        else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.userId,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }
        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(getAllTickets)
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
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>
    </section>



}