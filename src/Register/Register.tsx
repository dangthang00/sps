import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  
  // Tạo các state để lưu thông tin đăng ký
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  // Xử lý khi người dùng thay đổi họ tên
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };


  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

 
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

 
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };


  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };


  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  //schema kiểm tra và sử dụng yup
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Họ và tên không được để trống')
      .min(8, 'Họ và tên ít nhất 8 ký tự')
      .max(50, 'Họ và tên nhiều nhất 50 ký tự'),
    username: Yup.string()
      .required('Username không được để trống')
      .min(5, 'Username ít nhất 5 ký tự')
      .max(20, 'Username nhiều nhất 20 ký tự'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email không được để trống'),
    password: Yup.string()
      .required('Mật khẩu không được để trống')
      .min(6, 'Mật khẩu ít nhất 6 ký tự')
      .max(20, 'Mật khẩu nhiều nhất 20 ký tự')
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z]).*$/,
        'Mật khẩu phải chứa ít nhất 1 ký tự số và 1 ký tự chữ'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ], 'Mật khẩu và xác nhận mật khẩu không khớp')
      .required('Xác nhận mật khẩu không được để trống'),
    phoneNumber: Yup.string()
    .matches(/^(0|\+84)(3|9)\d{8}$/, 'Số điện thoại không hợp lệ')
      .required('Số điện thoại không được để trống')
      .max(10, 'Số điện thoại nhiều nhất 10 chữ số'),
    address: Yup.string()
      .required('Địa chỉ không được để trống')
      .max(100, 'Địa chỉ nhiều nhất 100 ký tự'),
  });


  const [errors, setErrors] = useState<any>({});
  const handleFormSubmit = (values: any) => {

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
   
    const isUsernameTaken = registeredUsers.some(
      (user: any) => user.username === values.username
    );
  
    if (isUsernameTaken) {
      setErrors({ username: 'Username đã được sử dụng. Vui lòng chọn username khác.' });
    } else {
      const newUser = {
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        address: values.address,
      };
  
  
      registeredUsers.push(newUser);
  
  
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  
      alert('Đăng ký thành công!');
      navigate('/');
    }
  }


  return (
    <div className="Auth-form-container">
      <Formik
        initialValues={{
          fullName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          address: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Đăng Ký Tài Khoản</h3>
              <div className="form-group mt-3">
                <label>Họ và tên</label>
                <input
                  type="text"
                  className={`form-control mt-1 ${
                    errors.fullName && touched.fullName ? 'is-invalid' : ''
                  }`}
                  placeholder="Nhập họ và tên"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && touched.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className={`form-control mt-1 ${
                    errors.username && touched.username ? 'is-invalid' : ''
                  }`}
                  placeholder="Nhập username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
                {errors.username && touched.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control mt-1 ${
                    errors.email && touched.email ? 'is-invalid' : ''
                  }`}
                  placeholder="Nhập email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  className={`form-control mt-1 ${
                    errors.password && touched.password ? 'is-invalid' : ''
                  }`}
                  placeholder="Nhập mật khẩu"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  className={`form-control mt-1 ${
                    errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''
                  }`}
                  placeholder="Xác nhận mật khẩu"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  className={`form-control mt-1 ${
                    errors.phoneNumber && touched.phoneNumber ? 'is-invalid' : ''
                  }`}
                  placeholder="Nhập số điện thoại"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="invalid-feedback">{errors.phoneNumber}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  className={`form-control mt-1 ${
                    errors.address && touched.address ? 'is-invalid' : ''
                  }`}
                  placeholder="Nhập địa chỉ"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                {errors.address && touched.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Đăng Ký
                </button>
              </div>
              <p className="forgot-password text-right mt-2">Bạn đã có tài khoản?
            <a href="/">Đăng Nhập</a>
          </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
