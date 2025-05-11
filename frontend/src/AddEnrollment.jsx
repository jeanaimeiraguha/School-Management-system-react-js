// import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from "react-router-dom"

const AddEnrollment = () => {
     const navigate=useNavigate()
  const [studentid, setStudentid] = useState("")
  const [courseid, setCourseid] = useState("")
  const [date, setDate] = useState("")
  const [grade, setGrade] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post("http://localhost:5000/insertenroll", {
      studentid,
      courseid,
      date,
      grade
    })
    .then((res) => {
      alert("Enrollment Added successfully")
      navigate('/selectenrollment')
    })
    .catch((err) => {
      console.error(err)
      alert("Failed to add enrollment")
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student Id</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Student Id"
            onChange={e => setStudentid(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Course Id</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Course Id"
            onChange={e => setCourseid(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Grade</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Grade"
            onChange={e => setGrade(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Enrollment</button>
      </form>
    </div>
  )
}

export default AddEnrollment
