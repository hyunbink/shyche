import { connect } from 'react-redux';
import { clearErrors, login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = (state) => {
    console.log("state", state.errors.session.email);
    return {
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: user => dispatch(login(user)),
        clearErrors: ()=> dispatch(clearErrors())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);