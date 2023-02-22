import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./CustomerList.js"

export const CustomerDetails = () => {
    const {customerId} = useParams()
    const [customer, setCustomer] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then(
                    (data) => {
                        const singleCustomer = data[0]
                        setCustomer(singleCustomer)
                    }
                )
        },
        [customerId]
    )
    return <section className="customer">
        <header>{customer?.user?.fullName}</header>
        <div>Email: {customer?.user?.email}</div>
        <div>Phone: {customer?.phoneNumber}</div>
        <div>Address: {customer?.address}</div>
    </section>
}