import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { simpleUrl } from '../small_components/Url';
import Styles from "../../../styles/SingleDestination.module.css";
import { mySwal } from '../small_components/Alert';
import { Rating } from 'react-simple-star-rating';
import { useLocation } from 'react-router-dom';
function SingleDestination() {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    localStorage.setItem("price", price);

    const [dest, setDest] = useState({ name: "", country: "", city: "", description: "" });
    const [editMode, setEditMode] = useState(false);
    const [feedbackMode, setFeedbackMode] = useState(false);
    const [feedback, setFeedback] = useState({ comment: "", rating: 0 });
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const handleRatingChange=(rate)=>{
        
        setFeedback({
            ...feedback,
            rating:rate
        });
    }

    const imagesArray =[
        'https://images.unsplash.com/photo-1606786782591-8e4e3e6b3b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDQwNjN8MHwxfGFsbHwxf',
        "https://images.unsplash.com/photo-1717967357077-3c0590e19486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjYzMzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0ODY4NDV8&ixlib=rb-4.0.3&q=80&w=1080",
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

    
    const handleClick = () => {
        const token = localStorage.getItem('x-auth-token');
        if (!token) {
            mySwal.fire({
                title: 'Error',
                text: 'You need to be logged in to create a booking',
                icon: 'error',
                showConfirmButton: true,
                timer: 2000
            });
            return;
        } else {
            navigate(`/booking/${id}`);
        }
    }

    // const prices = [
    //     '$100', '$200', '$330', '$410', '$520', 
    //     '$260', '$170', '$780', '$90', '$100', 
    //     '$110', '$120', '$130', '$140', '$150', 
    //     '$160', '$170', '$180', '$190', '$200'
    //   ];
    //   const shuffledPrices = prices.sort(() => 0.5 - Math.random());

    useEffect(() => {
        window.scrollTo({top:0, behavior:'smooth'});
        axios.get(`${simpleUrl}/destination/${id}`)
            .then((response) => {
                setDest(response.data.data);
            }).catch((error) => {
                console.log(error);
            });
    }, [id]);

        // Get reviews
                useEffect(()=>{
                    axios.get(`${simpleUrl}/review`)
                    .then((response) => {
                        const data = response.data.data.filter((review) => review.entityId === id);
                         setReviews(data);
                        console.log(data);
                    }).catch((error) => {
                        console.log(error);
            }).catch((error) => {
                console.log(error);
                mySwal.fire({
                    title: 'Error',
                    text: 'Failed to submit feedback',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 2000
                });
            });
                },[])




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDest({
            ...dest,
            [name]: value
        });
    };

    const handleUpdateClick = () => {
        setEditMode(true);
    };

    const { name, country, city, description } = dest;
    const handleSaveClick = () => {
        axios.put(`${simpleUrl}/destination/${id}`, {
            name,
            country,
            city,
            description
        
        },{
            headers:{
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            }
        })
            .then((response) => {
                mySwal.fire({
                    title: 'Success',
                    text: 'Destination updated successfully',
                    icon: 'success',
                    showConfirmButton: true,
                    timer: 2000
                });
                setEditMode(false);
            }).catch((error) => {
                console.log(error);
                mySwal.fire({
                    title: 'Error',
                    text: 'Failed to update destination',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 2000
                });
            });
    };

    const handleFeedbackClick = () => {
        setFeedbackMode(true);
    };

    const handleFeedbackChange = (e) => {
        const { name, value } = e.target;
        setFeedback({
            ...feedback,
            [name]: value
        });
    };


    const handleFeedbackSubmit = () => {
        axios.post(`${simpleUrl}/review`,{
            comment: feedback.comment,
            rating: feedback.rating,
            entityId: id,
            entityType: 'destination'
        },{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token')
            },
        })
            .then((response) => {
                mySwal.fire({
                    title: 'Success',
                    text: 'Feedback submitted successfully',
                    icon: 'success',
                    showConfirmButton: true,
                    timer: 2000
                });
                setFeedbackMode(false);
            }).catch((error) => {
                console.log(error);
                mySwal.fire({
                    title: 'Error',
                    text: 'Failed to submit feedback',
                    icon: 'error',
                    showConfirmButton: true,
                    timer: 2000
                });
            });
    };

    return (
        <div className={Styles.card}>
            <img className={Styles.image} src={dest.imageUrl || imagesArray[Math.floor(Math.random() * imagesArray.length)]} alt="destination" />
            {editMode ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={dest.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="country"
                        value={dest.country}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="city"
                        value={dest.city}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        value={dest.description}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSaveClick} className={Styles.button1}>Save</button>
                </div>
            ) : (
                <div>
                    <h1>{dest.name}</h1>
                    <p>Country: <strong>{dest.country}</strong> </p>
                    <p>City: <strong>{dest.city}</strong> </p>
                    <p>Price: <strong>{price}</strong> </p>
                    <p> <strong>{dest.description}</strong> </p>
                    
                </div>
            )}
            <button onClick={handleClick} className={Styles.button1}>Book this Place</button>
            <Link to="/" ><button className={Styles.button2}>Destinations</button></Link>
            {/* <button onClick={handleUpdateClick} className={Styles.button3}>Update Destination</button> */}
            <button onClick={handleFeedbackClick} className={Styles.button4}>Feedback</button>
            {feedbackMode && (
                <div className={Styles.feedback}>
                    <textarea
                        name="comment"
                        value={feedback.comment}
                        onChange={handleFeedbackChange}
                        placeholder="Leave your feedback"
                    />
                    <Rating
                            onClick={handleRatingChange}
                        />
                    <button onClick={handleFeedbackSubmit} className={Styles.button1}>Submit Feedback</button>
                </div>
            )}
              {reviews.length > 0 && (
                <>
                    <h2>Reviews</h2>
                    <div className={Styles.reviewsGrid}>
                        {reviews.map((review, index) => (
                            <div key={index} className={Styles.reviewCard}>
                                <p>{review.comment}</p>
                                <div className={Styles.stars}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} className={review.rating >= star ? Styles.filledStar : Styles.emptyStar}>
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default SingleDestination;
