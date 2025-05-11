import React, { useState } from 'react';
import axios from 'axios';

const LogAdmin = () => {
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!adminName || !password) {
      alert("Please fill in all the fields");
      return;
    }

    axios.post("http://localhost:5000/adminlog", {
      adminName: adminName.trim(),
      password: password.trim()
    })
    .then((res) => {
      alert(`You are logged in, ${adminName}!`);
    })
    .catch((err) => {
      console.error("Failed to add admin", err);
      alert(err.response?.data?.error || "Invalid credentials");
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        UserName <input type="text" value={adminName} onChange={e => setAdminName(e.target.value)} required /> <br />
        Password <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /> <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LogAdmin;
