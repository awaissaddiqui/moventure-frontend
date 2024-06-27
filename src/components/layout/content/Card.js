import React from 'react';

function Card({ name, description, country, city, id }) {
    return (
        <div>
            <h2>{name}</h2>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>City:</strong> {city}</p>
            <p>{description}</p>
            
        </div>
    );
}

export default Card;