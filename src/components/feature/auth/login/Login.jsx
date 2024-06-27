import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../../layout/small_components/TextInput';
import InputLabel from '../../../layout/small_components/InputLabel';
import styles from './../../../../styles/Login.module.css';
import axios from 'axios';
import { authUrl } from '../../../layout/small_components/Url';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Login = () => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myData = { ...formData };
    axios.post(`${authUrl}/login`, {
        email: myData.email,
        password: myData.password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            MySwal.fire({
                title: 'Success',
                text: 'You have successfully logged in',
                icon: 'success',
                showConfirmButton: false,
                timer: 1800
            })
            // console.log(response.data.statusCode);
            const token = response.headers['x-auth-token'];
            localStorage.setItem('x-auth-token', token);
            localStorage.setItem('userId', response.data.data.id);
          navigate('/');
        }
        ).catch((error) => {
            if (error.response && error.response.data.error) {
                MySwal.fire({
                    title: 'Error',
                    text: error.response.data.error.message,
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 2000
                })
                console.log(error);
            } else {
                MySwal.fire({
                    title: 'Error',
                    text: error.response.data.data,
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 2000
                })
                console.log(error);
            }
        });    
    
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1} >Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="email" value="Email">Email:</InputLabel>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            isFocused={true} // Autofocus on the email input
          />
        </div>
        <div>
          <InputLabel htmlFor="password" value="Password">Password:</InputLabel>
          <TextInput
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className={styles.button} type="submit">Login</button>
        <p className={styles.p}>Don't have an account? <Link className={styles.a} to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
