import React, { useState, useEffect } from 'react';
import { mySwal } from '../../../layout/small_components/Alert';
import axios from 'axios';
import { simpleUrl } from '../../../layout/small_components/Url';
import { useNavigate } from 'react-router-dom';
import styles from './../../../../styles/Profile.module.css'; // Assuming you have a CSS module for styling

function Profile() {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('x-auth-token');
        const userId = localStorage.getItem('userId');

        if (!token) {
            mySwal.fire({
                title: 'Unauthorized',
                text: 'You need to login to access this page',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000
            });
            navigate('/login');
        }

        axios.get(`${simpleUrl}/user/${userId}`, {

            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }).then((response) => {
            setUser(response.data.data);
            setFormData(response.data.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('x-auth-token');
        const userId = localStorage.getItem('userId');

        axios.put(`${simpleUrl}/user/${userId}`, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            dateOfBirth: formData.dateOfBirth
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }).then((response) => {
            mySwal.fire({
                title: 'Success',
                text: 'Profile updated successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
            setUser(response.data.data);
            setEditMode(false);
        }).catch((error) => {
            mySwal.fire({
                title: 'Error',
                text: 'An error occurred, please try again',
                icon: 'error',
                showConfirmButton: true,
                timer: 2000
            });
            console.log(error);
        });
    };

    const handleDelete = () => {
        const userId = localStorage.getItem('userId');
        mySwal.fire({
            title: "Delete Account!",
            icon:"warning",
            text: "Are you sure to delete your account",
            input: "text",
            showCancelButton: true,
            animation: "slide-from-top",
            inputPlaceholder: "Enter your password"
          }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('x-auth-token');
                
                
                axios.delete(`${simpleUrl}/user/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token
                    },
                    data: {  // Add the data as part of the request body
                        email: user.email,
                        password: result.value
                    }
                }).then((response) => {
                    mySwal.fire({
                        title: 'Success',
                        text: 'User deleted successfully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    localStorage.removeItem('x-auth-token');
                    localStorage.removeItem('userId');
                    navigate('/register');
                }).catch((error) => {
                    mySwal.fire({
                        title: 'Error',
                        text: 'An error occurred, please try again',
                        icon: 'error',
                        showConfirmButton: true,
                        timer: 2000
                    });
                    console.log(error);
                });
            }
        });
    };

    return (
        <div className={styles.profileContainer}>
            <h1>Profile Information</h1>
            <div className={styles.profileDetails}>
                {editMode ? (
                    <form onSubmit={handleSubmit} className={styles.profileForm}>
                        <label>
                            First Name:
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </label>
                        <label>
                            Last Name:
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </label>
                        <label>
                            Phone:
                            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </label>
                        <label>
                            Address:
                            <input type="text" name="address" value={formData.address} onChange={handleChange} />
                        </label>
                        <label>
                            Date of Birth:
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                        </label>
                        <button type="submit" >Save</button>
                        <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                    </form>
                ) : (
                    <>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>Email:<strong>{user.email}</strong> </p>
                        <p>Phone:<strong>{user.phoneNumber}</strong> </p>
                        <p>Address:<strong>{user.address}</strong> </p>
                        <p>Date of Birth:<strong>{user.dateOfBirth}</strong> </p>
                        <div className={styles.btnContainer} >

                        <button className={styles.btnUpdate} onClick={() => setEditMode(true)}>Edit Profile</button>
                        <button className={styles.btnDelete} onClick={handleDelete}>Delete Profile</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Profile;
