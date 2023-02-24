import { useEffect, useState } from "react"



export const CustomerForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)


    // TODO: Get employee profile info from API and update state
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
                .then(response => response.json())
                .then(
                    (data) => {
                        const customerObject = data[0]
                        updateProfile(customerObject)
                    }
                )
        },
        []
    )
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 2500);
        }
    }, [feedback])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        fetch(`http://localhost:8088/customers/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Customer profile successfully saved")
            })


    }


    return (
        

        <form className="profile">
            <h2 className="profile__title">Profile</h2>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                                const copy = { ...profile }
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                                const copy = { ...profile }
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)

                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={
                    (click) => {
                        handleSaveButtonClick(click)
                    }
                }
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}