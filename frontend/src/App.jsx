import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Select from './Select';
import Insert from './Insert';
import Login from './Login';
import Home from './Home';
// import AdminLogin from './Admin/AdminLogin';
// import LogAdmin from './Admin/LogAdmin';
import StudentList from './StudentList';
import Addstudent from './Addstudent';
import StudentUpd from './StudentUpd';
import Addcourse from './Addcourse';
import CourseUpd from './Courseupd';
import Selectcourse from './Selectcourse';
import SelectEnrollment from './SelectEnrollment';
import AddEnrollment from './AddEnrollment';
import Updateenrollment from './Updateenrollment';
import Report from './Report'
// import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">School Management System</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/insert">Insert</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/select">Select</Link>
              </li>

               <li className="nav-item">
                <Link className="nav-link" to="/report">Report</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center bg-light">
              <div className="card-body">
                <h5 className="card-title">Students</h5>
                <p className="card-text">Manage Students</p>
                <Link to="/studentlist" className="btn btn-primary">View Students</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-light">
              <div className="card-body">
                <h5 className="card-title">Courses</h5>
                <p className="card-text">Manage Courses</p>
                <Link to="/selectcourse" className="btn btn-primary">View Courses</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-light">
              <div className="card-body">
                <h5 className="card-title">Enrollments</h5>
                <p className="card-text">Manage Enrollments</p>
                <Link to="/selectEnrollment" className="btn btn-primary">View Enrollments</Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            {/* <div className="card text-center bg-light"> */}
              {/* <div className="card-body">
                <h5 className="card-title">Admin</h5>
                <p className="card-text">Admin Login</p>
                <Link to="/adminlog" className="btn btn-primary">Login</Link>
              </div> */}
            {/* </div> */}
          </div>
        </div>
        <Routes>
          <Route path="/adminlog" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/select" element={<Select />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/adminlog" element={<AdminLogin />} /> */}
          {/* <Route path="/logadmin" element={<LogAdmin />} /> */}
          <Route path="/addstudent" element={<Addstudent />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/studentupd/:studentid" element={<StudentUpd />} />
          <Route path="/courseupd/:studentid" element={<CourseUpd />} />
          <Route path="/addcourse" element={<Addcourse />} />
          <Route path="/selectcourse" element={<Selectcourse />} />
          <Route path="/selectEnrollment" element={<SelectEnrollment />} />
          <Route path="/addenrollment" element={<AddEnrollment />} />
          <Route path="/report" element={<Report/>} />
          <Route path="/updateenrollment/:courseid" element={<Updateenrollment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
