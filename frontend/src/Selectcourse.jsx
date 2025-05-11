import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'


const Selectcourse = () => {
    const [course, setCourse] = useState([]);
    const handleDelete=(courseid)=>{
     axios.delete(`http://localhost:5000/deletecourse/${courseid}`)
     .then((res)=>{
          alert("Course deleted")
     })
     .catch((err)=>{
          alert("failed")
     })
    }

    useEffect(() => {
        axios.get('http://localhost:5000/selectcourse')
            .then((res) => {
                setCourse(res.data);
            })
            .catch((err) => {
                alert("Failed to fetch users");
            });
    }, []);

    return (
        <div className="container mt-5">
          <Link to ="/addcourse" className="btn btn-warning me-2">Add course</Link>
            <h3 className="text-center mb-4">User List</h3>
            <table className="table table-striped table-hover shadow">
                <thead className="table-dark">
                    <tr>
                        <th> Course ID</th>
                        <th>Course Name</th>
                        <th>Credits</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {course.map((data) => (
                        <tr key={data.courseid}>
                            <td>{data.coursename}</td>
                            <td>{data.credit}</td>
                            {/* <td>{course.password}</td> */}
                            <td>
                                {/* <button className="btn btn-warning btn-sm me-2">Edit</button>
                                 */}
                                 <Link to={`/courseupd/${data.courseid}`} className="btn btn-success me-2">Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(data.courseid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Selectcourse;
