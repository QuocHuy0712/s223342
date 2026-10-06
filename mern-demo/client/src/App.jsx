import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State quản lý danh sách sinh viên
  const [students, setStudents] = useState([]);
  
  // State quản lý dữ liệu form nhập
  const [formData, setFormData] = useState({ 
    studentId: '', 
    name: '', 
    email: '' 
  });

  // URL Backend API (Port 5002)
  const API_URL = 'http://localhost:5002/api/students';

  // 1. Hàm lấy danh sách sinh viên từ Backend (GET) - Câu 47
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

  // Xử lý khi người dùng nhập dữ liệu vào ô input
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // 2. Hàm gửi dữ liệu sinh viên mới lên Backend (POST) - Câu 48 & 49
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      // Reset form sau khi thêm thành công
      setFormData({ studentId: '', name: '', email: '' });
      // Tải lại danh sách mới nhất
      fetchStudents();
    } catch (err) {
      console.error('Lỗi khi thêm sinh viên:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>QUẢN LÝ SINH VIÊN (MERN STACK)</h2>

      {/* Form nhập dữ liệu sinh viên (Câu 48 & 49) */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          name="studentId"
          placeholder="Mã số sinh viên (MSSV)"
          value={formData.studentId}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email sinh viên"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '12px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            fontSize: '16px', 
            fontWeight: 'bold', 
            cursor: 'pointer' 
          }}
        >
          Thêm Sinh Viên
        </button>
      </form>

      {/* Bảng hiển thị danh sách sinh viên (Câu 47) */}
      <h3>Danh Sách Sinh Viên Hiện Tại</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>Chưa có sinh viên nào trong cơ sở dữ liệu.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;