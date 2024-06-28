import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { simpleUrl } from '../small_components/Url';
import { mySwal } from '../small_components/Alert';
import Style from '../../../styles/Booking.module.css';
// import { useLocation } from 'react-router-dom';

const Bookings = () => {
    const { id } = useParams();
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const price = queryParams.get('price');
    const price=localStorage.getItem('price');

    const [form, setForm] = useState({
        bookingDate: '',
        totalCost: '',
        status: 'pending',
    });
    const [bookings, setBookings] = useState([]);
    const [showForm, setShowForm] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { bookingDate, price, status } = form;
        axios.post(`${simpleUrl}/booking`, {
            bookingDate,
            totalCost:price,
            status,
            destinationId: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            }
        }).then((response) => {
            mySwal.fire({
                title: 'Success',
                text: 'Booking created successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
            console.log(response);
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

    const fetchBookings = () => {
        axios.get(`${simpleUrl}/booking`).then((response) => {
            console.log(response);
            setBookings(response.data.data);
            setShowForm(false);
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



    const handleDeleteBtn = (bookingId) => () => {
        mySwal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this booking!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${simpleUrl}/booking/${bookingId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('x-auth-token')
                    }
                }).then((response) => {
                    mySwal.fire({
                        title: 'Deleted!',
                        text: 'Booking has been deleted.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    setBookings(bookings.filter((booking) => booking.id !== bookingId));
                    console.log(response);
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
        <div className={Style.container}>
            <div className={Style.sideMenu}>
                <ul>
                    <li><a href="#allBookings" onClick={fetchBookings}>All Bookings</a></li>
                    <li><Link to="/accommodation" >Accommodations</Link></li>
                    <li><Link to="/flights">Flights</Link></li>
                </ul>
            </div>
            <div className={Style.content}>
                {showForm ? (
                    <>
                        <h2 className={Style.h22}>Create a new Booking</h2>
                        <form className={Style.bookingForm} onSubmit={handleSubmit}>
                            <input
                                type="date"
                                name="bookingDate"
                                value={form.bookingDate}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="totalCost"
                                placeholder={price}
                                value={price}
                                onChange={handleChange}
                                readOnly
                                
                            />
                            <select name="status" value={form.status} onChange={handleChange} required>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="canceled">Canceled</option>
                            </select>
                            <button type="submit">Create Booking</button>
                        </form>
                    </>
                ) : (
                    <div>
                        <table className={Style.bookingTable}>
                            <thead>
                                <tr>
                                    <th>Booking Date</th>
                                    <th>Total Cost</th>
                                    <th>Status</th>
                                    <th>Delete Booking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => {
                                    const date = new Date(booking.bookingDate).toISOString().split('T')[0];
                                    return (
                                        <tr key={index}>
                                            <td>{date}</td>
                                            <td>{booking.totalCost}</td>
                                            <td>{booking.status}</td>
                                            <td><button className={Style.deleteBtn} onClick={handleDeleteBtn(booking.id)}>Delete</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

               
            </div>
        </div>
    );
};

export default Bookings;
