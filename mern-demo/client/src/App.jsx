import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://localhost:5002/api/students';

  // Câu 63: Hàm tải danh sách sinh viên
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error('Lỗi tải danh sách:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Câu 60 & 61: Thêm hoặc Cập nhật sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Câu 61: PUT /api/students/:id
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Câu 60: POST /api/students
        await axios.post(API_URL, formData);
      }
      setFormData({ studentId: '', name: '', email: '' });
      fetchStudents(); // Câu 63
    } catch (err) {
      console.error('Lỗi xử lý form:', err);
    }
  };

  // Chuẩn bị dữ liệu để Sửa
  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email
    });
  };

  // Câu 62: Xóa sinh viên DELETE /api/students/:id
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sinh viên này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents(); // Câu 63
      } catch (err) {
        console.error('Lỗi khi xóa:', err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>QUẢN LÝ SINH VIÊN (MERN STACK)</h2>

      {/* Form Nhập Dữ Liệu */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
        <button type="submit" style={{ padding: '10px', backgroundColor: editingId ? '#2196F3' : '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          {editingId ? 'Cập Nhật Sinh Viên' : 'Thêm Sinh Viên'}
        </button>
      </form>

      {/* Bảng Danh Sách Sinh Viên */}
      <h3>Danh Sách Sinh Viên</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <button onClick={() => handleEdit(student)} style={{ marginRight: '5px', backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Sửa</button>
                <button onClick={() => handleDelete(student._id)} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;