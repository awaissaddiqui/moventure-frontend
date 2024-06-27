import React, { useState } from 'react';
import Styles from '../../../styles/AddDistination.module.css';
import axios from 'axios';
import { simpleUrl } from '../small_components/Url';
import { mySwal } from '../small_components/Alert';
import { useNavigate } from 'react-router-dom';

function AddDestination({ addDestination }) {
    const  navg = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        country: '',
        city: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const imagesArray =[
        "https://images.unsplash.com/photo-1715711200942-7c8abf4ae1c5?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODcxNDF8&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1715571527459-84b49e550d2c?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODc0Mjh8&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1717097410161-aa16fb3ceb3f?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODczNzd8&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1711322535265-81a1961465e3?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODcxNDB8&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1715254934165-15112c612e76?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODcxODB8&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1714997219117-9e64dad78206?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODcxODB8&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1573757103866-22824ebebde4?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODcyMTd8&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1611311034548-fd7a8cabf596?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODczMzR8&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1714733709178-87d37577b1c9?ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODczMzN8&ixlib=rb-4.0.3",

    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localStorage.getItem('x-auth-token')) {
            mySwal.fire({
                title: 'Unauthorized',
                text: 'You need to login to access this page',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
        if(formData.name === '' || formData.description === '' || formData.country === '' || formData.city === ''){
            mySwal.fire({
                title: 'Error',
                text: 'All fields are required',
                icon: 'error',
                showConfirmButton: true,
                timer: 2000
            });
            return;
        }
        axios.post(`${simpleUrl}/destination`, {
            name: formData.name,
            description: formData.description,
            country: formData.country,
            city: formData.city,
            imageUrl: formData.imageUrl || imagesArray[Math.floor(Math.random() * imagesArray.length)]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            }
        })
        .then(response => {
           mySwal.fire({
                title: 'Success',
                text: 'Destination added successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
            addDestination(response.data);
            setFormData({
                name: '',
                description: '',
                country: '',
                city: '',
            });
            navg('/');
        })
        .catch(error => console.error(error));
    };

    return (
        <form className={Styles.addDestinationForm} onSubmit={handleSubmit}>
            <h2>Add New Destination</h2>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Description:
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </label>
            <label>
                Country:
                <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </label>
            <label>
                City:
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </label>
            <label>Image Url
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
            </label>
            <button type="submit">Add Destination</button>
        </form>
    );
}

export default AddDestination;
