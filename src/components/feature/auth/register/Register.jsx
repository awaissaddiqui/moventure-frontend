import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../../../layout/small_components/TextInput';
import InputLabel from '../../../layout/small_components/InputLabel';
import styles from './../../../../styles/Register.module.css';
import { authUrl } from '../../../layout/small_components/Url';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
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
    const myData = {...formData};
         axios.post(`${authUrl}/signup`,{
            firstName: myData.firstName,
            lastName: myData.lastName,
            email: myData.email,
            password: myData.password,
            dateOfBirth: myData.dateOfBirth,
            phoneNumber: myData.phoneNumber,
            address: myData.address      
        },{
        headers: {
            'Content-Type': 'application/json'
          }
    }).then((response) => {
        console.log(response);
        MySwal.fire({
            title: 'Success',
            text: 'You have successfully registered',
            icon: 'success',
            showConfirmButton: false,
            timer: 1800
        })
        const token = response.headers['x-auth-token'];
        localStorage.setItem('x-auth-token', token);
        localStorage.setItem('userId', response.data.data.id);
        navigate('/');
      }).catch((error) => {
        if (error.response && error.response.data.error && error.response.data.error.message) {
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
      <h1 className ={styles.h1}>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="FN" value="First Name">First Name:</InputLabel>
          <TextInput
            id="FN"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <InputLabel htmlFor="LN" value="Last Name">Last Name:</InputLabel>
          <TextInput
            id="LN"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <InputLabel htmlFor="email" value="Email">Email:</InputLabel>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
        <div>
          <InputLabel htmlFor="DOB" value="Date of Birth">Date of Birth:</InputLabel>
          <TextInput
            id="DOB"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <InputLabel htmlFor="phno" value="Phone Number">Phone Number:</InputLabel>
          <TextInput
            id="phno"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <InputLabel htmlFor="addr" value="Address">Address:</InputLabel>
          <textarea
            id="addr"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className={styles.textarea}
          ></textarea>
        </div>
        <button className={styles.button} type="submit">Register</button>
        <p className={styles.p} >Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
