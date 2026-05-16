import React, { useEffect, useState } from "react";
import "../App.css";
import sailLogo from "../sail.png";

function Dashboard() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    stage_name: "",
    temperature: "",
    output_tons: "",
    efficiency: ""
  });
  const [editId, setEditId] = useState(null);

  const role = localStorage.getItem("role");

  // Fetch data
  const fetchData = () => {
    fetch("http://localhost:5000/data")
      .then(res => res.json())
      .then(result => setData(result));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add / Update
  const handleSubmit = () => {
    if (editId) {
      fetch(`http://localhost:5000/update/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).then(() => {
        setEditId(null);
        setForm({
          stage_name: "",
          temperature: "",
          output_tons: "",
          efficiency: ""
        });
        fetchData();
      });
    } else {
      fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).then(() => {
        setForm({
          stage_name: "",
          temperature: "",
          output_tons: "",
          efficiency: ""
        });
        fetchData();
      });
    }
  };

  // Delete
  const deleteData = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    }).then(() => fetchData());
  };

  // Edit
  const editData = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  return (
    <div className="dashboard-container">
      

<div className="dashboard-title">
  <div className="title-row">
    <img src={sailLogo} alt="SAIL Logo" className="dashboard-logo" />
    <h1 className="sail-text">SAIL</h1>
  </div>

  <h2 className="company-name">
    Steel Authority Of India Limited
  </h2>
</div>

      {/* STATS */}
      <div className="stats">
        <div className="card">
          <h3>Total Units</h3>
          <p>{data.length}</p>
        </div>

        <div className="card">
          <h3>Avg Efficiency</h3>
          <p>
            {data.length > 0
              ? Math.round(
                  data.reduce((acc, item) => acc + parseInt(item.efficiency), 0) /
                    data.length
                )
              : 0}
            %
          </p>
        </div>

        <div className="card">
          <h3>Total Output</h3>
          <p>
            {data.reduce((acc, item) => acc + parseInt(item.output_tons), 0)} tons
          </p>
        </div>
      </div>

      {/* ADMIN FORM */}
      {role === "admin" && (
        <div className="form-box">
          <h2>{editId ? "Edit Data" : "Add Data"}</h2>

          <input name="stage_name" placeholder="Stage" value={form.stage_name} onChange={handleChange} />
          <input name="temperature" placeholder="Temperature" value={form.temperature} onChange={handleChange} />
          <input name="output_tons" placeholder="Output" value={form.output_tons} onChange={handleChange} />
          <input name="efficiency" placeholder="Efficiency" value={form.efficiency} onChange={handleChange} />

          <button onClick={handleSubmit}>
            {editId ? "Update Data" : "Add Data"}
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Stage</th>
              <th>Temperature</th>
              <th>Output</th>
              <th>Efficiency</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.stage_name}</td>
                <td className="temp">{item.temperature}</td>
                <td className="output">{item.output_tons}</td>
                <td className="eff">{item.efficiency}</td>

                {role === "admin" && (
                  <td>
                    <button className="edit-btn" onClick={() => editData(item)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteData(item.id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;