// import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const SelectEnrollment = () => {
     
     const handleDelete=(courseid)=>{
          axios.delete(`http://localhost:5000/deleteenrollment/${courseid}`)
          .then((err)=>{
               alert("Ennrollment deleted")
          })
          .catch((err)=>{
               alert("Failed")
          })
     }
     const [enroll, setEnroll]=useState([])
     useEffect(()=>{
axios.get("http://localhost:5000/selectenrollment")
.then((res)=>{
setEnroll(res.data);


})
.catch((err)=>{
     console.log("failed")
})

     },[])

  return (
    <div>
     <Link to="/addenrollment" className="btn btn-warning btn-sm">Add New Enrollment</Link>
      <table border={2} className="table table-striped">

<thead className="table-dark">

<tr>


     <th>Course id</th>
     <th>student id </th>
     <th>date</th>
     <th>grade</th>
     <th Colspan={2}>Operations</th>
     
</tr>
</thead>
<tbody>
     {enroll.map((data)=>
     <tr key={data.courseid}>
          <td>{data.courseid}</td>
          <td>{data.studentid}</td>
          <td>{data.date}</td>
          <td>{data.grade}</td>
          <td>

               {/* <button className="btn btn-success me-3">Edit</button> */}

<Link className="btn btn-success me-3  " to={`/updateenrollment/${data.courseid}`}>Edit</Link>


               <button className="btn btn-danger me-3" onClick={()=>handleDelete(data.courseid)}>Delete</button>
          </td>
          


     </tr>
     
     
     )}
</tbody>




      </table>

    </div>
  )
}

export default SelectEnrollment
