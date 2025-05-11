import React from 'react';

const Home = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh", padding: "20px" ,marginTop:"-104px"}}>
            <h2 className="text-center mb-4">Welcome to the Home Page</h2>
            <p className="text-center mb-4">This is where you can manage users and data. Use the navigation to add, view, or update your information.</p>
            <div className="text-center">
                <a href="/select" className="btn btn-primary me-2">View Users</a>
                <a href="/insert" className="btn btn-success">Add User</a>
            </div>
        </div>
    );
};

export default Home;
