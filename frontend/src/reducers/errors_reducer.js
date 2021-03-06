import { combineReducers } from 'redux';
import bookingsErrorsReducer from './bookings_errors_reducer';
import reviewsErrorsReducer from './reviews_errors_reducer';
import SessionErrorsReducer from './session_errors_reducer';
import videosErrorsReducer from './videos_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    bookings: bookingsErrorsReducer,
    reviews: reviewsErrorsReducer,
    videos: videosErrorsReducer
});