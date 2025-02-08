import axios from "axios";
import React, { useEffect } from "react";
import { useActionState } from "react";
import { Link } from "react-router-dom";

export default function Users()
{
    const [users, setUsers] = React.useState([])
    useEffect(() =>
    {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }, [])


    const handleDelete = (id) =>
    {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
            .then(res =>
            {
                console.log("User deleted:", res.data);
                setUsers(users.filter(user => user._id !== id)); // Remove user from state instead of reloading
            })
            .catch(err => console.log("Error deleting user:", err));

    }

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
                            users.map(function (user, index)
                            {
                                return (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                                            <button
                                                className="btn btn-danger"
                                                onClick={(e) => handleDelete(user._id)}
                                            >Delete</button>
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
