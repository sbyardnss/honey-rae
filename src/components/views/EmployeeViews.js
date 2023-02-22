import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../../Customers/CustomerDetails"
import { CustomerList } from "../../Customers/CustomerList"
import { EmployeeDetails } from "../Employees/EmployeeDetails"
import { EmployeeList } from "../Employees/EmployeeList"
import { TicketContainer } from "../tickets/TicketContainer"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customers/:customerId" element={ <CustomerDetails /> } />

                <Route path="tickets" element={ <TicketContainer /> } />
                
            </Route>
        </Routes>
    )
}