import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { simpleUrl } from '../small_components/Url';
import Style from "../../../styles/Accommodation.module.css"
import { mySwal } from '../small_components/Alert';

function Accommodation() {
    const [accommodations, setAccommodations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newAccommodation, setNewAccommodation] = useState({
        name: '',
        type: 'hostel',
        city: '',
        country: '',
        address: '',
        pricePerNight: ''
    });
    

    useEffect(() => {
        const fetchAccommodations = () => {
            axios.get(`${simpleUrl}/accommodation`).then((response) => {
                setAccommodations(response.data.data);
            }).catch((error) => {
                console.log(error);
            });
        };
        fetchAccommodations();
    }, []);

    const handleDelete = (id) => {
      mySwal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this accommodation!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${simpleUrl}/accommodation/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('x-auth-token')
                    }
                }).then((response) => {
                    setAccommodations(accommodations.filter((accommodation) => accommodation._id !== id));
                    mySwal.fire({
                        title: 'Deleted!',
                        text: 'Accommodation has been deleted.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
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

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleChange = (e) => {
        setNewAccommodation({
            ...newAccommodation,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${simpleUrl}/accommodation`, {
           name: newAccommodation.name,
              type: newAccommodation.type,
                city: newAccommodation.city,
                country: newAccommodation.country,
                address: newAccommodation.address,
                pricePerNight: newAccommodation.pricePerNight
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
        }
    }).then((response) => {
            setAccommodations([...accommodations, response.data.data]);
            setNewAccommodation({
                name: '',
                type: '',
                city: '',
                country: '',
                address: '',
                pricePerNight: ''
            });
            setShowForm(false);
        }).catch((error) => {
            console.log(error);
        });
    };
    return (
        <div className={Style.accommodationContainer}>
            <h2>All Accommodations</h2>
            <button onClick={toggleForm}>
                {showForm ? 'Cancel' : 'Add Accommodation'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className={Style.accommodationForm}>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={newAccommodation.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select name="type" value={newAccommodation.type} onChange={handleChange} required>
                        <option value="hotel">Hotel</option>
                        <option value="guesthouse">Guesthouse</option>
                        <option value="apartment">Apartment</option>
                        <option value="hostel">Hostel</option>
                    </select>
                       </div>
                    <div>
                        <label>City:</label>
                        <input type="text" name="city" value={newAccommodation.city} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Country:</label>
                        <input type="text" name="country" value={newAccommodation.country} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" value={newAccommodation.address} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Price per Night:</label>
                        <input type="number" name="pricePerNight" value={newAccommodation.pricePerNight} onChange={handleChange} required />
                    </div>
                    <button type="submit">Add Accommodation</button>
                </form>
            )}
            <table border="1" cellSpacing="0" className={Style.accommodationTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Address</th>
                        <th>Price per Night</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accommodations.map((accommodation) => (
                        <tr key={accommodation._id}>
                            <td>{accommodation.name}</td>
                            <td>{accommodation.type}</td>
                            <td>{accommodation.city}</td>
                            <td>{accommodation.country}</td>
                            <td>{accommodation.address}</td>
                            <td>{accommodation.pricePerNight}</td>
                            <td>
                                <button onClick={() => handleDelete(accommodation._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Accommodation;
