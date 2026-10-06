import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });

  // URL của Backend API
  const API_URL = 'http://localhost:5002/api/students';

  // Câu 47: Gọi API lấy danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách sinh viên:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Xử lý thay đổi trong form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Câu 48: Thêm sinh viên mới từ Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ studentId: '', name: '', email: '' });
      fetchStudents(); // Tải lại danh sách sau khi thêm
    } catch (err) {
      console.error('Lỗi khi thêm sinh viên:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2>Quản Lý Sinh Viên (MERN Stack)</h2>

      {/* Câu 48: Form nhập MSSV, Họ tên và Email */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
        <input
          type="text"
          name="studentId"
          placeholder="Mã số sinh viên (MSSV)"
          value={formData.studentId}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Thêm Sinh Viên
        </button>
      </form>

      {/* Câu 47: Hiển thị danh sách sinh viên */}
      <h3>Danh Sách Sinh Viên</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;