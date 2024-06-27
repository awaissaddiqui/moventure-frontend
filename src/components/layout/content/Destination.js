import React from 'react';
import Styles from '../../../styles/Destination.module.css';
import { Link} from 'react-router-dom';



function Destination({ name, description, country, city, id, imageUrl }) {
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

    return (
        <div className={Styles.destination}>
            <img className={Styles.image} src={imageUrl || imagesArray[Math.floor(Math.random() * imagesArray.length)]} alt="destination" />
            <h2>{name}</h2>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>City:</strong> {city}</p>
            <p>{description}</p>
            <Link to={`/singledestination/${id}`}><button className={Styles.button} > View More</button></Link>
        </div>
    );
}

export default Destination;
