import React from 'react';
import SearchBox from './SearchBox';
import Destinations from './Destinations';
import ContactUs from './ContactUs';

function Body() {
    return (
        <div>
            <SearchBox />
            <Destinations/>
            <ContactUs/>
        </div>
    );
}

export default Body;