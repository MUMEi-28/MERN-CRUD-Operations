import React from "react";
import { Link } from "react-router-dom";

export default function Users()
{
    const [users, setUsers] = React.useState([
        {
            Name: "yousaf",
            Email: "ysf@gmail.com",
            Age: "20"
        }
    ])

    return (

        <div className="d-flex vh-100 bg-primary justify-content-center align-cent">

            <div className="w-50 bg-light-subtle rounded p-3">

                <Link to='/create' className="btn btn-success"> Add +</Link>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map(function (user)
                            {
                                return (
                                    <tr>
                                        <td>{user.Name}</td>
                                        <td>{user.Email}</td>
                                        <td>{user.Age}</td>
                                        <td>
                                            <button>Edit</button> <button>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
