import React, { use, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Addcourse = () => {
    const [coursename, setCoursename] = useState("");
    const [credit, setCredit] = useState("");
    const navigate=useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post("http://localhost:5000/insertcourse", { coursename, credit })
            .then((res) => {
                alert("Course added successfully");
                navigate('/selectcourse')
               //  setUsername("");
               //  setPassword("");
            })
            .catch((err) => {
                alert("Failed to add user");
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                <h3 className="text-center mb-4">Add New Course</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Course Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={coursename}
                            onChange={e => setCoursename(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Credit</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Course"
                            value={credit}
                            onChange={e => setCredit(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Add  New course</button>
                </form>
            </div>
        </div>
    );
};

export default Addcourse;
