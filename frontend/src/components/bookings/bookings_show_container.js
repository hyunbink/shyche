import { connect } from 'react-redux';
import BookingsShow from './bookings_show';
import { fetchBookings, deleteBooking, updateBooking, clearBookingsErrors } from '../../actions/booking_actions';
// import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom'

const mSTP = (state, ownProps) => {
    let loggedUserId;
    if (state.session.user) {
        loggedUserId = state.session.user.id
    }
    return ({
        errors: state.errors.bookings
    })
};

const mDTP = dispatch => ({
    clearBookingsErrors: ()=> dispatch(clearBookingsErrors()),
    deleteBooking: bookingId => dispatch(deleteBooking(bookingId)),
    updateBooking: booking => dispatch(updateBooking(booking))
});

export default withRouter(connect(mSTP, mDTP)(BookingsShow));



