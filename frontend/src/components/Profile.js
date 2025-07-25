import React, { useEffect, useState } from "react";
import axios from "axios";

function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

function Profile() {
  const email = getQueryParam("email");
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${email}`)
      .then((res) => setStudent(res.data))
      .catch((err) => setStudent(null));
  }, [email]);

  if (!student) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{student.name} Profile</h2>
      <img src={`http://localhost:5000/uploads/${student.photo}`} alt="Student" height="120" />
      <ul className="list-group my-3">
        <li className="list-group-item">DOB: {student.dob}</li>
        <li className="list-group-item">NRC: {student.nrc}</li>
        <li className="list-group-item">Father: {student.father_name}</li>
        <li className="list-group-item">Email: {student.email}</li>
        <li className="list-group-item">Phone: {student.phone}</li>
        <li className="list-group-item">Addresses: {student.addresses}</li>
      </ul>
      <a className="btn btn-secondary" href="/dashboard">Back</a>
    </div>
  );
}

export default Profile;