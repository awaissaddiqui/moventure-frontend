import React, { useState } from 'react';
import Styles from '../../../styles/ContactUs.module.css';
import emailjs from '@emailjs/browser';
import { mySwal } from '../small_components/Alert';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
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
        const apiKey = "IAbibblQkR-aVFxWX";
        emailjs.sendForm('service_vv73isr', 'contact_form', e.target, apiKey)
            .then((result) => {
                mySwal.fire({
                    title: 'Success',
                    text: 'Message sent successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            }, (error) => {
                console.log(error.text);
                mySwal.fire({
                    title: 'Error',
                    text: 'An error occurred, please try again',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 2000
                });
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                });
            });
       
    };









    return (
        <div className={Styles.contactUsContainer}>
            <h1 id='contact' >Contact Us</h1>
            <form className={Styles.contactForm} onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default ContactUs;
