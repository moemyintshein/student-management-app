import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setMessage(res.data.message);
      window.location.href = res.data.is_admin ? "/admin" : "/dashboard";
    } catch (err) {
      setMessage(err.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
            onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password}
            onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
        <div className="mt-2">{message}</div>
      </form>
      <a href="/signup">Don't have an account? Signup</a>
    </div>
  );
}

export default Login;