import React from "react";
import './user_page.css';
import { BsFillCheckCircleFill } from 'react-icons/bs'


import BookingsForm from '../bookings/booking_form_container'
import BookingShow from "../bookings/bookings_show_container";

import ReviewFormContainer from "../review/review_form_container";
import ReviewItemContainer from "../review/review_item_container";


class UserPage extends React.Component {
    constructor(props){
        super(props);
        this.getUserBookings = this.getUserBookings.bind(this);
        this.deleteSelectedBooking = this.deleteSelectedBooking.bind(this);
        this.getUserReviews = this.getUserReviews.bind(this);
    }


    componentDidMount() {

        this.props.fetchUser(this.props.match.params.id)
            .then(()=> this.props.fetchReviews(this.props.match.params.id))
            .then(()=>this.props.fetchBookings(this.props.match.params.id));
    }

    deleteSelectedBooking(bookingId){
        this.props.deleteBooking(bookingId)
            .then(this.props.fetchBookings(this.props))

    }

    getUserReviews() {
        this.props.fetchReviews(this.props.match.params.id);
    }

    getUserBookings() {
        this.props.fetchBookings(this.props.match.params.id);
    }

    render() {
        
        if (!this.props.user) {
            return null;
        }
        if (this.props.user.professional && !this.props.reviews) {
            return null;
        }

        return (
            <div className="user-page">
                <div className="user-container">
                    <div className="user-show-banner">
                            {/* <img className="user-show-banner-img" src="../../images/demo_banner.png" alt="user-show-banner-img"></img> */}
                    </div>
                    <div className="user-show-info-div">
                        <div className="user-show-info-div-left">
                                {/* <div className="user-info"> */}
                                    <div className="user-essential">
                                        <span className="user-photo-">
                                            <img className="user-show-profile-photo" alt="user-show-profile"></img>
                                        </span>
                                        <span className="user-show-full-name"> {this.props.user.firstName} {this.props.user.lastName} </span>
                                        <span>{this.props.user.professional ? <BsFillCheckCircleFill className="user-show-prof-icon" />: <div></div> }</span>
                                        <p></p>
                                        <br/>
                                        <p>About: {this.props.user.bio}</p>
                                        <br/>
                                        <h1>Interests: <ul className="user-show-interests-list">{this.props.user.interests.split(",").map((int, i)=>(
                                            <li key={`interest0${i}`} className="user-show-interest">{int}</li>
                                        ))}</ul></h1>


                        </div>
                            </div>
                                <div className="user-show-info-div-right">
                                    <div className="user-details">
                                        {this.props.user.professional? 
                                        <ul> Prof's categories and videos
                                            <div className="user-show-videos">Placeholder for videos</div>
                                            {this.props.user.categories.split(",").map((cat, i)=>(
                                                <li key={`cat ${i}`}>{cat}</li>
                                            ))}
                                        </ul>
                                        : <div></div> }
                                    
                                    </div>
                                </div>
                                <div className="user-show-bookings" >
                                    {this.props.user.professional && this.props.currentUserId !== this.props.user._id ? <BookingsForm 
                                    getUserBookings={this.getUserBookings} 
                                    className='user-show-bookings-form' 
                                    bookee={this.props.user} 
                                    booker={this.props.currentUser}
                                    /> : <div></div> }
                                    <div className="user-show-bookings-div">
                                        <ul className="user-show-bookings-ul">
                                            {/* make sure bookings only show if they assoicated with it, user and prof */}
                                            {this.props.bookings.data ? <ul>
                                                {this.props.bookings.data.map((booking, idx)=> (
                                                <BookingShow key={idx} booking={booking} getBookings={this.getUserBookings}/>
                                                )
                                            )} </ul> : <div></div> }
                                        </ul>
                                    </div>
                                </div>
                                    
                </div>
                    <div className="user-reviews-container">
                        <h1>Reviews Container</h1>
                        {this.props.reviews.data ? <ul>{this.props.reviews.data.map((review, idx)=> (
                            <ReviewItemContainer key={idx} review={review} getReviews={this.getUserReviews}/>
                        )
                        )} </ul> : <div></div> }
                    </div>
                    <div className="create-review-form">
                        <ReviewFormContainer reviewer={this.props.currentUser} reviewee={this.props.user} getReviews={this.getUserReviews}/>
                    </div>

                </div>
                </div>
        )
    }
}

export default UserPage;