import React, { useEffect, useState } from 'react';
import Destination from './Destination'; // Make sure the path is correct
import { simpleUrl } from '../small_components/Url';
import axios from 'axios';
import Styles from '../../../styles/Destinations.module.css';
import AddDestination from './../content/AddDistination';

function Destinations() {
    const [destinations, setDestinations] = useState([]);
   

    useEffect(() => {
    const fetchData = ()=>{
        axios.get(`${simpleUrl}/destination`)
        .then((response) => {
            // console.log(response.data.data);
            setDestinations(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    fetchData();
    }, []);




    const addDestination = (newDestination) => {
        setDestinations([...destinations, newDestination]);
    };

    return (
        <div className={Styles.container}  >
            
        <h1 className={Styles.h2} id='distinations'>Popular Destinations</h1>
        <div className={Styles.grid}>
            {destinations.map((destination) => (
                <Destination
                    key={destination.id}
                    name={destination.name}
                    description={destination.description}
                    country={destination.country}
                    city={destination.city}
                    id={destination.id}
                    imageUrl={destination.imageUrl}
                />
            ))}
            <AddDestination addDestination={addDestination} />
        </div>
    </div>
    );
}

export default Destinations;
