import React, { useState } from 'react';
import axios from 'axios';

const Report = () => {
  const [gpaData, setGpaData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch GPA for all students using .then() and .catch()
  const fetchGPA = () => {
    setLoading(true);
    axios.get('http://localhost:5000/gpa')
      .then((response) => {
        // Handle success response
        setGpaData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle error response
        console.error('Failed to fetch GPA data', error);
        alert('Failed to fetch GPA data');
        setLoading(false);
      });
  };

  return (
    <div className="Report">
      <h1>Green Valley GPA Management</h1>

      <h2>GPA Report</h2>
      <button onClick={fetchGPA} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch GPA'}
      </button>

      {gpaData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            {gpaData.map((gpa, index) => (
              <tr key={index}>
                <td>{gpa.StudentName}</td>
                <td>{gpa.GPA}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No GPA data available.</p>
      )}
    </div>
  );
};

export default Report;
