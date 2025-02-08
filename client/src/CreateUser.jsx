import React from "react";
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export default function CreateUser()
{

    const [name, setName] = React.useState()
    const [email, setEmail] = React.useState()
    const [age, setAge] = React.useState()

    const navigate = useNavigate()
    const Submit = (event) =>
    {
        event.preventDefault()
        axios.post("http://localhost:3001/createUser", { name, email, age })
            .then(result => console.log(result))
            .catch(err => console.log(err))

        navigate('/')

    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form
                    action=""
                    onSubmit={Submit}
                >
                    <h2>Add User</h2>

                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input
                            type="text"
                            placeholder="Enter Age"
                            className="form-control"
                            onChange={(event) => setAge(event.target.value)}
                        />
                    </div>

                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}