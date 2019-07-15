import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import Main from './containers/Main';
import Login from './containers/Auth/SignIn/SIgnInContainer';
import SignUp from './containers/Auth/SignUp/SignUpContainer';
import EmailVerification from './containers/Verification/EmailVerification';
import PhoneVerification from './containers/Verification/PhoneVerification';
import MfaVerification from './containers/Verification/MfaVerification';

import './App.css';
import Flash from './components/UI/Flash';
import ForgotPassword from './containers/ForgotPassword';

class App extends Component {
	render() {
		return (
			<>
				<CSSTransition
					in={this.props.flash}
					timeout={{ enter: 300, exit: 0 }}
					classNames="flash"
					unmountOnExit
					mountOnEnter
				>
					<Flash
						flash={this.props.flash}
						type={this.props.messageType}
						message={this.props.message}
					/>
				</CSSTransition>
				<Switch>
					{/* All routes here E.g: Login, Sign Up, Verify Email, Verify Phone */}
					<Route path="/login" component={Login} />
					<Route path="/sign-up" component={SignUp} />
					<Route path="/forgot" component={ForgotPassword} />
					<Route path="/verify-email" component={EmailVerification} />
					<Route path="/verify-phone" component={PhoneVerification} />
					<Route path="/verify-mfa" component={MfaVerification} />
					{this.props.loggedIn ? (
						<Route path="/" component={Main} />
					) : (
						<Redirect to="/login" />
					)}
				</Switch>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state.UI,
		loggedIn: state.AUTH.loggedIn,
	};
};

export default withRouter(connect(mapStateToProps)(App));
