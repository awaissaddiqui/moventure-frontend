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
    const prices = [
        '$100', '$200', '$330', '$410', '$520', 
        '$260', '$170', '$780', '$90', '$100', 
        '$110', '$120', '$130', '$140', '$150', 
        '$160', '$170', '$180', '$190', '$200'
      ];
      const shuffledPrices = prices.sort(() => 0.5 - Math.random());

    return (
        <div className={Styles.container}  >
            
        <h1 className={Styles.h2} id='distinations'>Popular Destinations</h1>
        <div className={Styles.grid}>
            {destinations.map((destination,index) => (
                <Destination
                    key={destination.id}
                    name={destination.name}
                    description={destination.description}
                    country={destination.country}
                    city={destination.city}
                    id={destination.id}
                    imageUrl={destination.imageUrl}
                    price={shuffledPrices[index % shuffledPrices.length]}
                />
            ))}
            {/* <AddDestination addDestination={addDestination} /> */}
        </div>
    </div>
    );
}

export default Destinations;
