import React, { useState } from "react";
import axios from "axios";

function StudentForm() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    nrc: "",
    father_name: "",
    email: "",
    phone: "",
    addresses: "",
    photo: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoFilename = "";
    if (form.photo) {
      const photoData = new FormData();
      photoData.append("photo", form.photo);
      const res = await axios.post("http://localhost:5000/api/upload", photoData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      photoFilename = res.data.filename;
    }
    await axios.post("http://localhost:5000/api/students/", {
      ...form,
      photo: photoFilename,
    });
    setMessage("Student created!");
  };

  return (
    <div className="container mt-5">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3"><label>Name</label>
          <input className="form-control" name="name" onChange={handleChange} required/></div>
        <div className="mb-3"><label>DOB</label>
          <input className="form-control" name="dob" type="date" onChange={handleChange} required/></div>
        <div className="mb-3"><label>NRC</label>
          <input className="form-control" name="nrc" onChange={handleChange} required/></div>
        <div className="mb-3"><label>Father Name</label>
          <input className="form-control" name="father_name" onChange={handleChange} required/></div>
        <div className="mb-3"><label>Email</label>
          <input className="form-control" name="email" type="email" onChange={handleChange} required/></div>
        <div className="mb-3"><label>Phone</label>
          <input className="form-control" name="phone" onChange={handleChange} required/></div>
        <div className="mb-3"><label>Addresses</label>
          <textarea className="form-control" name="addresses" onChange={handleChange} required/></div>
        <div className="mb-3"><label>Photo</label>
          <input className="form-control" name="photo" type="file" accept="image/*" onChange={handleChange}/></div>
        <button className="btn btn-primary" type="submit">Submit</button>
        <div className="mt-2">{message}</div>
      </form>
    </div>
  );
}

export default StudentForm;