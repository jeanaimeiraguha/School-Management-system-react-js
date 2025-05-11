import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    const handleDelete = (studentid) => {
        axios.delete(`http://localhost:5000/deletestudent/${studentid}`)
            .then(() => {
                alert("Student record deleted successfully");
                setStudents(students.filter(student => student.studentid !== studentId));
            })
            .catch((error) => {
                console.error("Failed to delete record:", error);
                alert("Failed to delete the student record.");
            });
    };

    useEffect(() => {
        axios.get("http://localhost:5000/studentlist")
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
                alert("Failed to fetch student data.");
            });
    }, []);

    return (
        <div className="container">
    
  <Link to="/addstudent" className='btn btn-success me-2'>Add New</Link>
            <table border={2} className="table table-sm ">
                <thead className="table-dark">
                    <tr>
                        <th>Student ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Gender</th>
                        <th>Date Of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.studentid}>
                            <td>{student.studentid}</td>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.gender}</td>
                            <td>{student.dob}</td>
                            <td>
                              <Link className='btn btn-warning me-2' to={`/studentupd/${student.studentid}`}>Update</Link>
                                {/* <button className="btn btn-success mb-3 me-2">Update</button> */}
                                <button 
                                    className="btn btn-danger mb-2 " 
                                    onClick={() => handleDelete(student.studentid)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
