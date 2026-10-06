import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '', major: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ studentId: '', name: '', email: '', major: '' });
      fetchStudents();
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      major: student.major
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xóa sinh viên này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
      } catch (err) {
        console.error('Lỗi khi xóa:', err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2>QUẢN LÝ SINH VIÊN (MERN STACK)</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>{editingId ? 'Cập nhật sinh viên' : 'Thêm sinh viên mới'}</h3>
        <input 
          type="text" placeholder="Mã SV" value={formData.studentId} 
          onChange={(e) => setFormData({...formData, studentId: e.target.value})} required 
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input 
          type="text" placeholder="Họ và Tên" value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} required 
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input 
          type="email" placeholder="Email" value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required 
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <input 
          type="text" placeholder="Ngành học" value={formData.major} 
          onChange={(e) => setFormData({...formData, major: e.target.value})} required 
          style={{ marginRight: '8px', padding: '6px' }}
        />
        <button type="submit" style={{ padding: '6px 16px', cursor: 'pointer' }}>
          {editingId ? 'Cập nhật' : 'Thêm'}
        </button>
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>Mã SV</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Ngành</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              <td>{st.studentId}</td>
              <td>{st.name}</td>
              <td>{st.email}</td>
              <td>{st.major}</td>
              <td>
                <button onClick={() => handleEdit(st)} style={{ marginRight: '5px' }}>Sửa</button>
                <button onClick={() => handleDelete(st._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;