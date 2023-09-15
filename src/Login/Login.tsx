import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    
  // Tạo các state để lưu thông tin đăng nhập
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  // Xử lý khi người dùng thay đổi email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

 
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
   
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
   
    const enteredEmail = email; // Lấy từ state 
    const enteredPassword = password; // Lấy từ state 
  
    const user = registeredUsers.find(
      (user: any) => user.email === enteredEmail && user.password === enteredPassword
    );
  
    if (user) {
      alert('Đăng nhập thành công!');
      navigate('/home');
    } else {
      alert('Email hoặc mật khẩu không đúng.');
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleFormSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Đăng Nhập</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Nhập email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Nhập password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Đăng Nhập
            </button>
          </div>
          <p className="forgot-password text-right mt-2">Bạn chưa có tài khoản?
            <a href="/Register">Đăng Ký</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
