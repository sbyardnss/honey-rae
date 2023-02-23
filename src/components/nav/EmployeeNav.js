import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () => {
    const navigate = useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


        return (
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/tickets">Tickets</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/employees">Employees</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/customers">Customers</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/profile">Profile</Link>
                </li>
                {
                    localStorage.getItem("honey_user")
                        ? <li className="navbar__item navbar__logout">
                            <Link className="navbar__link" to="" onClick={() => {
                                localStorage.removeItem("honey_user")
                                navigate("/", {replace: true})
                            }}>Logout</Link>
                        </li>
                        : ""
                }
            </ul>
        )
    
}