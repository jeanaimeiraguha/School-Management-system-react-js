import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Select = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/select')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                alert("Failed to fetch users");
            });
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">User List</h3>
            <table className="table table-striped table-hover shadow">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">Edit</button>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Select;
