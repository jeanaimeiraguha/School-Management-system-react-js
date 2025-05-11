import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addstudent = () => {
    const navigate=useNavigate()
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:5000/addstudent", { firstname, lastname, gender, dob })
            .then((res) => {
                alert("User added successfully");
                setFirstname("");
                setLastname("");
                setGender("");
                setDob("");
                navigate("/studentlist")
            })
            .catch((err) => {
                alert("Failed to add user. Please try again.");
                console.error(err);
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                <h3 className="text-center mb-4">Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter First Name"
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Last Name"
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Gender"
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">DOB</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dob}
                            onChange={e => setDob(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default Addstudent;
