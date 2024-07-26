import React from "react";
import { Navbar } from "./layout/nav/Navbar";
import Body from "./layout/content/Body";
import Login from "./feature/auth/login/Login";
import Register from "./feature/auth/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleDestination from "./layout/content/SingleDestination";
import Booking from "./layout/content/Booking";
import Logout from "./feature/auth/login/Logout";
import Profile from "./feature/auth/login/Profile";
import Accommodation from "./layout/content/Accommodation";
import FlightOfferForm from "./layout/content/Flights";
import AppAds from "./layout/content/AppAds";

const App = () => {
    return (
        <>
        <BrowserRouter>
             {/* <Navbar /> */}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/singledestination/:id" element={<SingleDestination />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/profile" element={<Profile/>} />
                <Route path="/accommodation" element={<Accommodation/>} />
                <Route path="/flights" element={<FlightOfferForm/>}/>
                <Route path="/" element={<Body />} />
                <Route path="/app-ads.txt" element={<AppAds />} />
            </Routes>
          </BrowserRouter>
  
        </>
    );
};

export default App;
