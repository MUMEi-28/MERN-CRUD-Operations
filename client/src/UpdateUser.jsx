import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateUser()
{
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        age: ""
    });

    useEffect(() =>
    {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then(res => setUser(res.data))
            .catch(err => console.error("Error fetching user:", err));
    }, [id]);

    const handleChange = (e) =>
    {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        try
        {
            await axios.put(`http://localhost:3001/updateUser/${id}`, user);
            navigate("/"); // Redirect back after updating
        } catch (error)
        {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            className="form-control"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-2">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-2">
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            placeholder="Enter Age"
                            className="form-control"
                            value={user.age}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}
