import * as ReviewApiUtil from "../util/review_api_util";

export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'REMOVE_REVIEW';
export const RECEIVE_REVIEW_ERRORS = 'RECEIVE_REVIEW_ERRORS';
export const REMOVE_REVIEW_ERRORS = 'REMOVE_REVIEW_ERRORS';
export const CLEAR_REVIEWS = 'CLEAR_REVIEWS'

const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
});

const receiveReview = review => ({
    type: RECEIVE_REVIEW,
    review
});

const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const clearReviews = () => ({
    type: CLEAR_REVIEWS
})

export const receiveReviewErrors = errors => ({
    type: RECEIVE_REVIEW_ERRORS,
    errors
})

export const clearReviewErrors = () => ({
    type: REMOVE_REVIEW_ERRORS
})


export const fetchReviews = userId => dispatch => (
    ReviewApiUtil.fetchReviews(userId)
        .then(reviews => dispatch(receiveReviews(reviews)))
);

export const createReview = review => dispatch => (
    ReviewApiUtil.createReview(review)
        .then(review => dispatch(receiveReview(review)),
        err=> dispatch(receiveReviewErrors(err)))
);

export const updateReview = review => dispatch => (
    ReviewApiUtil.updateReview(review)
        .then(review => dispatch(receiveReview(review)),
        err=> dispatch(receiveReviewErrors(err)))
);

export const deleteReview = reviewId => dispatch => (
    ReviewApiUtil.deleteReview(reviewId)
        .then(()=> dispatch(removeReview(reviewId)))
);



