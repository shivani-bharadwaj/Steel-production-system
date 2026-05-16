import React, { useState, useEffect } from "react";
import "./App.css";

function Admin() {
  const [form, setForm] = useState({
    stage_name: "",
    temperature: "",
    output_tons: "",
    efficiency: ""
  });

  const [data, setData] = useState([]);

  // Fetch data
  const fetchData = () => {
    fetch("http://localhost:5000/data")
      .then(res => res.json())
      .then(result => setData(result));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    }).then(() => {
      alert("✅ Data Added!");
      fetchData();
    });
  };

  // DELETE
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    }).then(() => fetchData());
  };

  return (
    <div className="container">
      <h1>🛠 Admin Panel</h1>

      <input name="stage_name" placeholder="Stage" onChange={handleChange} />
      <input name="temperature" placeholder="Temperature" onChange={handleChange} />
      <input name="output_tons" placeholder="Output" onChange={handleChange} />
      <input name="efficiency" placeholder="Efficiency" onChange={handleChange} />

      <br />
      <button onClick={handleSubmit}>➕ Add Data</button>

      <h2>📊 Current Data</h2>

      <table>
        <tr>
          <th>ID</th>
          <th>Stage</th>
          <th>Temp</th>
          <th>Output</th>
          <th>Efficiency</th>
          <th>Action</th>
        </tr>

        {data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.stage_name}</td>
            <td>{item.temperature}</td>
            <td>{item.output_tons}</td>
            <td>{item.efficiency}</td>
            <td>
              <button onClick={() => handleDelete(item.id)}>❌ Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Admin;