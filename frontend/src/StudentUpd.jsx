import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentUpd = () => {
    const { studentid } = useParams();  // Correctly extract studentid from route params

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/selectupd/${studentid}`)
            .then((res) => {
                const student = res.data;
                setFirstname(student.firstname);
                setLastname(student.lastname);
                setGender(student.gender);
                setDob(student.dob);
            })
            .catch((err) => {
                console.error("Failed to fetch student data", err);
            });
    }, [studentid]);

    const handleUpdate = () => {
        axios.put(`http://localhost:5000/updatestudent/${studentid}`, { firstname, lastname, gender, dob })
            .then(() => {
                alert("Update successful");
            })
            .catch((err) => {
                console.error("Failed to update student data", err);
                alert("Update failed");
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdate();
    };

    return (
        <div className="container">
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={firstname} 
                        onChange={(e) => setFirstname(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={lastname} 
                        onChange={(e) => setLastname(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Gender</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Date of Birth</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={dob} 
                        onChange={(e) => setDob(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default StudentUpd;
