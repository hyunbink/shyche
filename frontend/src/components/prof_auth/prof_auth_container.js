import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../actions/user_actions";
import ProfAuthForm from "./prof_auth_form";


const mSTP = (state, ownProps) => {
    console.log("state", state);
    console.log("curUser", state.entities.users[ownProps.match.params.id])
    console.log("ownProps", ownProps);
    return {
    currentUser: state.entities.users[ownProps.match.params.id]
}};

const mDTP = dispatch => ({
    fetchUser: userId=> dispatch(fetchUser(userId)),
    updateUser: user=> dispatch(updateUser(user))
})

export default connect(mSTP, mDTP)(ProfAuthForm);