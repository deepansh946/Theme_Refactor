import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import FormField from '../../../components/UI/FormField';
import SocialMediaButton from '../../../components/UI/SocialMediaButton';
import NormalLogin from '../../../components/UI/Wrappers/NormalLogin';
import SocialLogin from '../../../components/UI/Wrappers/SocialLogin';
import BackgroundLayer from '../../../components/UI/BackgroundLayer';
import ErrorText from '../../../components/UI/ErrorText';
import HelpText from '../../../components/UI/HelpText';
import Logo from '../../../components/UI/Logo';
import CountryCode from '../../../components/UI/CountryCode';
import Loader from '../../../components/UI/Loader';
import { SignUp } from '../../../Utils/formStructure';
import {
	convert_timestamp,
	get_verification_code_msg_template,
} from '../../../Utils/common';

import {
	validateForm,
	validateEmail,
	validateConfirmPassword,
} from '../../../Utils/formValidation';

// redux effects,actions & constants
import { add_global_message } from '../../../redux/actions/ui_actions';
import { request_signup$ } from '../../../redux/effects/auth_effects';
import { REQUEST_SIGNUP_SUCCESS } from '../../../redux/constants/auth_constant';

import '../Auth.css';

class SignUpContainer extends Component {
	state = {
		formData: _.cloneDeep(SignUp),
		countryCode: '+91',
	};

	componentDidMount() {
		document.title = 'Credit Culture | Sign Up';

		if (this.props.loggedIn) {
			this.props.history.push('/');
		}
	}

	// SignUp User
	onSignUp = async (e) => {
		e.preventDefault();
		const updatedState = validateForm(_.cloneDeep({ ...this.state.formData }), {
			isd: this.state.countryCode,
		});
		this.setState({
			formData: updatedState,
		});

		// request signup api if form is valid
		if (updatedState.formValid) {
			const { username, password, phone } = this.state.formData;
			const response = await this.props.request_signup$({
				action: 'signup',
				payload: {
					username: username.value,
					password: password.value,
					phoneNumber: `${this.state.countryCode}${phone.value}`,
				},
			});

			//reset form if signup complete
			if (response.type === REQUEST_SIGNUP_SUCCESS) {
				this.setState({ formData: _.cloneDeep(SignUp) });

				// 151 => verifyEmail
				// 153 => emailCodeALreadySent
				if ([151, 153].includes(this.props.challenge)) {
					const time = convert_timestamp(this.props.duration);
					const msg = get_verification_code_msg_template({
						type: 'email',
						username: username.value,
						time: this.props.duration,
					});
					const message =
						this.props.challenge === 151
							? msg
							: `Verification code already sent ${time} ago`;
					// dispatch action for gloabl message
					this.props.add_global_message({
						flash: this.props.challenge !== 151,
						formFlash: this.props.challenge === 151,
						messageType: 'success',
						message,
					});
					this.props.history.push('/verify-email');
				} else if (this.props.challenge === 154) {
					// dispatch action for gloabl message
					this.props.add_global_message({
						flash: true,
						messageType: 'success',
						message: 'You are 1 steps away from completing your registration.',
					});
					this.props.history.push('/verify-phone');
				} else if (this.props.challenge === 157) {
					this.props.add_global_message({
						flash: true,
						messageType: 'success',
						message: 'You are already registered.Please login to continue.',
					});
					// TODO : Perform Login ~ If asked
					this.props.history.push('/login');
				}
			} else {
				const { error } = this.props;
				// for password
				if ([104].includes(error.code)) {
					const formData = _.cloneDeep(this.state.formData);
					formData['password'].valid = false;
					formData['password'].msg = error.msg;
					formData['password'].value = '';
					this.setState({
						formData,
					});
				} else if ([118].includes(error.code)) {
					const formData = _.cloneDeep(this.state.formData);
					formData['phone'].valid = false;
					formData['phone'].msg = error.msg;
					formData['phone'].value = '';
					this.setState({
						formData,
					});
				}
			}
		}
	};

	// update input values
	updateValue = (e) => {
		const formData = _.cloneDeep({ ...this.state.formData });
		formData[e.target.name].value = e.target.value;

		if (e.target.name === 'password') {
			formData['confirm'].valid = true;
			formData['confirm'].msg = '';
		}

		if (!formData[e.target.name].valid) {
			formData[e.target.name].valid = true;
			formData[e.target.name].msg = '';
		}

		this.setState({
			formData,
		});
	};

	// update country code
	updateCountryCode = (e) => {
		const formData = _.cloneDeep(this.state.formData);
		formData['phone'].valid = true;
		formData['phone'].msg = '';
		this.setState({ formData, countryCode: e.value });
	};

	// onBlur Validation
	validateOnBlur = (target) => {
		let updatedField;
		if (target === 'username') {
			updatedField = { ...this.state.formData[target] };
			if (updatedField.value !== '') {
				updatedField = validateEmail(updatedField);
				this.setState({
					formData: {
						...this.state.formData,
						[target]: updatedField,
					},
				});
			}
		} else if (target === 'confirm') {
			updatedField = { ...this.state.formData[target] };
			if (updatedField.value !== '') {
				updatedField = validateConfirmPassword(
					this.state.formData.password,
					updatedField,
				);
				this.setState({
					formData: {
						...this.state.formData,
						[target]: updatedField,
					},
				});
			}
		}
	};

	// toggle view password
	toggleViewPassword = (target) => {
		const formData = _.cloneDeep({ ...this.state.formData });
		formData[target].viewPassword = !formData[target].viewPassword;
		this.setState({
			formData,
		});
	};

	render() {
		const { username, phone, password, confirm } = this.state.formData;

		return (
			<>
				{this.props.loading && <Loader />}
				<BackgroundLayer />
				<Logo styleClass="center-logo" />
				<form
					onSubmit={this.onSignUp}
					id="login"
					className="form-style"
					action=""
				>
					<div className="p-grid">
						<NormalLogin>
							<div className="form-group">
								<FormField
									updateValue={this.updateValue}
									blurValidate={this.validateOnBlur}
									{...username}
								/>
								{!username.valid && <ErrorText text={username.msg} />}
							</div>
							<div style={{ position: 'relative' }} className="form-group">
								<FormField
									onlyNumber={true}
									updateValue={this.updateValue}
									{...phone}
								/>
								<CountryCode
									selectedCountry={this.state.countryCode}
									updateCountryCode={this.updateCountryCode}
								/>
								{!phone.valid && <ErrorText text={phone.msg} />}
							</div>
							<div className="form-group">
								<FormField
									type="password"
									updateValue={this.updateValue}
									toggleViewPassword={this.toggleViewPassword}
									{...password}
								/>
								{!password.valid && <ErrorText text={password.msg} />}
							</div>
							<div className="form-group">
								<FormField
									type="password"
									updateValue={this.updateValue}
									blurValidate={this.validateOnBlur}
									toggleViewPassword={this.toggleViewPassword}
									{...confirm}
								/>
								{!confirm.valid && <ErrorText text={confirm.msg} />}
							</div>
							<div className="form-group">
								<Button className="auth-btn" label="Sign Up" />
							</div>
							<HelpText text="Already have an account? ">
								<Link to="/login">Login</Link>
							</HelpText>
						</NormalLogin>
						<SocialLogin>
							<SocialMediaButton
								type="facebook"
								label="Sign up with facebook"
							/>
							<SocialMediaButton type="google" label="Sign up with google" />
							<SocialMediaButton type="amazon" label="Sign up with amazon" />
						</SocialLogin>
					</div>
				</form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state.AUTH,
		error: { ...state.UI.error },
	};
};

const mapActionsToProps = (dispatch) =>
	bindActionCreators({ request_signup$, add_global_message }, dispatch);

export default connect(
	mapStateToProps,
	mapActionsToProps,
)(withRouter(SignUpContainer));
