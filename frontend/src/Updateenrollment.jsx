import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Updateenrollment = () => {
  const { courseid } = useParams(); // Get courseid from URL
  const navigate = useNavigate();

  const [studentid, setStudentid] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/updenroll/${courseid}`)
      .then((res) => {
        setStudentid(res.data.studentid);
        setDate(res.data.date);
        setGrade(res.data.grade);
      })
      .catch((err) => {
        console.error("Failed to fetch enrollment data:", err);
      });
  }, [courseid]);

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/updateenrollment/${courseid}`, {
      courseid,
      studentid,
      date,
      grade,
    })
      .then(() => {
        alert("Enrollment updated successfully!");
        navigate("/selectenrollment");
      })
      .catch((err) => {
        console.error("Failed to update enrollment:", err);
        alert("Failed to update enrollment");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student ID</label>
          <input
            type="text"
            className="form-control"
            value={studentid}
            onChange={(e) => setStudentid(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Course ID</label>
          <input
            type="text"
            className="form-control"
            value={courseid}
            disabled // Disable editing courseid
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Grade</label>
          <input
            type="text"
            className="form-control"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Update Enrollment</button>
      </form>
    </div>
  );
};

export default Updateenrollment;
