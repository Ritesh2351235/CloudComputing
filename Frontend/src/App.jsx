import React, { useState } from 'react';
import './App.css';
const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    address: '',
    phoneNumber: ''
  });
  const [students, setStudents] = useState([]);
  const [displayStudents, setDisplayStudents] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://cloud-computing-api.vercel.app/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      // Clear form after successful submission
      setFormData({
        name: '',
        age: '',
        grade: '',
        address: '',
        phoneNumber: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://cloud-computing-api.vercel.app/api/students');
      const data = await response.json();
      console.log(data);
      // Update students state with fetched data
      setStudents(data);
      setDisplayStudents(true); // Set displayStudents to true after fetching data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Student Form</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Grade:</label>
          <input type="text" name="grade" value={formData.grade} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <button id ="buttons " type="submit">Submit</button>
      </form>
      <button id ="buttons " onClick={fetchStudents}>Display Students</button>
      {/* Display student details only when displayStudents is true */}
      {displayStudents && (
        <div>
          <h2>Student Details</h2>
          <ul>
            {students.map(student => (
              <li key={student._id}>
                Name: {student.name}, Age: {student.age}, Grade: {student.grade}, Address: {student.address}, Phone Number: {student.phoneNumber}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
