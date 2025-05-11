import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseUpd = () => {
    const { courseid } = useParams();  

    const [coursename, setCoursename] = useState("");
    const [credit, setCredit] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/selectcourse/${courseid}`)
            .then((res) => {
                // Assuming the response is a single course object
                setCoursename(res.data.coursename);
                setCredit(res.data.credit);
            })
            .catch((err) => {
                console.error("Failed to fetch course data", err);
            });
    }, [courseid]);

    const handleUpdate = () => {
        axios.put(`http://localhost:5000/updatecourse/${courseid}`, { coursename, credit })
            .then(() => {
                alert("Update successful");
            })
            .catch((err) => {
                console.error("Failed to update course data", err);
                alert("Update failed");
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdate();
    };

    return (
        <div className="container">
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Course Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={coursename} 
                        onChange={(e) => setCoursename(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Credits</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={credit} 
                        onChange={(e) => setCredit(e.target.value)} 
                        required 
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default CourseUpd;
