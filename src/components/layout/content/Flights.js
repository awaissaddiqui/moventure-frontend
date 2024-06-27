// FlightOfferForm.js

import React, { useState } from 'react';
import axios from 'axios';
import Style from "../../../styles/FlightOfferForm.module.css" // Import the CSS file
import { mySwal } from '../small_components/Alert';

const FlightOfferForm = () => {
    const [formData, setFormData] = useState({
        cabin_class: 'economy',
        max_connections: 2,
        passengers: [{
            type: 'adult',
            family_name: '',
            given_name: '',
            loyalty_programme_accounts: [{
                account_number: '',
                airline_iata_code: ''
            }]
        }],
        private_fares: {
            QF: [{ corporate_code: '', tracking_reference: '' }],
            UA: [{ corporate_code: '', tour_code: '' }]
        },
        slices: [{
            origin: '',
            destination: '',
            departure_date: ''
        }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');
        
        setFormData(prevData => {
            let updatedData = { ...prevData };
            let currentLevel = updatedData;

            for (let i = 0; i < nameParts.length - 1; i++) {
                if (Array.isArray(currentLevel[nameParts[i]])) {
                    currentLevel = currentLevel[nameParts[i]][parseInt(nameParts[++i])];
                } else {
                    currentLevel = currentLevel[nameParts[i]];
                }
            }

            currentLevel[nameParts[nameParts.length - 1]] = value;
            return updatedData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://moventure-2024.azurewebsites.net/api/flights/offers?return_offers=true&supplier_timeout=10000', {
            cabin_class: formData.cabin_class,
            max_connections: formData.max_connections,
            passengers: formData.passengers,
            private_fares: formData.private_fares,
            slices: formData.slices
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(response => {
                mySwal.fire({
                    title: 'Success',
                    text: 'Flight offer request sent successfully',
                    icon:'success',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            .catch(error => {
                mySwal.fire({
                    title: 'Error',
                    text: 'An error occurred, please try again',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 2000
                })
            });
    };

    return (
        <div className={Style.flightOfferForm}>
            <h1>Flight Offer Request</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Cabin Class:
                    <select name="cabin_class" value={formData.cabin_class} onChange={handleChange}>
                        <option value="economy">Economy</option>
                        <option value="premium_economy">Premium Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First</option>
                    </select>
                </label>

                <label>
                    Max Connections:
                    <input
                        type="number"
                        name="max_connections"
                        value={formData.max_connections}
                        onChange={handleChange}
                    />
                </label>

                <h2>Passengers</h2>
                {formData.passengers.map((passenger, index) => (
                    <div key={index} className="passenger-section">
                        <label>
                            Type:
                            <select name={`passengers.${index}.type`} value={passenger.type} onChange={handleChange}>
                                <option value="adult">Adult</option>
                                <option value="young_adult">Young Adult</option>
                                <option value="child">Child</option>
                                <option value="infant">Infant</option>
                            </select>
                        </label>
                        <label>
                            Family Name:
                            <input
                                type="text"
                                name={`passengers.${index}.family_name`}
                                value={passenger.family_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Given Name:
                            <input
                                type="text"
                                name={`passengers.${index}.given_name`}
                                value={passenger.given_name}
                                onChange={handleChange}
                            />
                        </label>
                        <h3>Loyalty Programme Accounts</h3>
                        {passenger.loyalty_programme_accounts && passenger.loyalty_programme_accounts.map((account, accIndex) => (
                            <div key={accIndex} className="loyalty-account-section">
                                <label>
                                    Account Number:
                                    <input
                                        type="text"
                                        name={`passengers.${index}.loyalty_programme_accounts.${accIndex}.account_number`}
                                        value={account.account_number}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Airline IATA Code:
                                    <input
                                        type="text"
                                        name={`passengers.${index}.loyalty_programme_accounts.${accIndex}.airline_iata_code`}
                                        value={account.airline_iata_code}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                ))}

                <h2>Private Fares</h2>
                {Object.entries(formData.private_fares).map(([airline, fares], index) => (
                    <div key={index} className="private-fares-section">
                        <h3>{airline}</h3>
                        {fares.map((fare, fareIndex) => (
                            <div key={fareIndex}>
                                <label>
                                    Corporate Code:
                                    <input
                                        type="text"
                                        name={`private_fares.${airline}.${fareIndex}.corporate_code`}
                                        value={fare.corporate_code}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    {fare.tracking_reference ? 'Tracking Reference' : 'Tour Code'}:
                                    <input
                                        type="text"
                                        name={`private_fares.${airline}.${fareIndex}.${fare.tracking_reference ? 'tracking_reference' : 'tour_code'}`}
                                        value={fare.tracking_reference || fare.tour_code}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                ))}

                <h2>Flight Slices</h2>
                {formData.slices.map((slice, index) => (
                    <div key={index} className="slice-section">
                        <label>
                            Origin:
                            <input
                                type="text"
                                name={`slices.${index}.origin`}
                                value={slice.origin}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Destination:
                            <input
                                type="text"
                                name={`slices.${index}.destination`}
                                value={slice.destination}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Departure Date:
                            <input
                                type="date"
                                name={`slices.${index}.departure_date`}
                                value={slice.departure_date}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                ))}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FlightOfferForm;
