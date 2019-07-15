import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import FormField from '../../../components/UI/FormField';
import SocialMediaButton from '../../../components/UI/SocialMediaButton';
import NormalLogin from '../../../components/UI/Wrappers/NormalLogin';
import SocialLogin from '../../../components/UI/Wrappers/SocialLogin';
import BackgroundLayer from '../../../components/UI/BackgroundLayer';
import HelpText from '../../../components/UI/HelpText';
import ErrorText from '../../../components/UI/ErrorText';
import Logo from '../../../components/UI/Logo';
import Loader from '../../../components/UI/Loader';
import {
	email_sort,
	convert_timestamp,
	get_verification_code_msg_template,
} from '../../../Utils/common';
import { SignIn } from '../../../Utils/formStructure';
import { validateForm, validateEmail } from '../../../Utils/formValidation';

import '../Auth.css';

import {
	REQUEST_LOGIN_SUCCESS,
	REQUEST_FORGOT_PASSWORD_SUCCESS,
} from '../../../redux/constants/auth_constant';
import { add_global_message } from '../../../redux/actions/ui_actions';
import {
	request_login$,
	request_forgot_password$,
} from '../../../redux/effects/auth_effects';

class SignInContainer extends Component {
	state = {
		formData: _.cloneDeep(SignIn),
		email: {
			type: 'text',
			label: 'Email',
			name: 'email',
			value: '',
			validation: {
				required: true,
			},
			valid: true,
			msg: '',
		},
		visible: false,
	};

	componentDidMount() {
		document.title = 'Credit Culture | Login';
		console.log(this.props);
		if (this.props.loggedIn) {
			this.props.history.push('/');
		}
	}

	// SignIn User
	onSignIn = async (e) => {
		e.preventDefault();
		const updatedState = validateForm(_.cloneDeep({ ...this.state.formData }));
		this.setState({
			formData: updatedState,
		});

		// request signin api if form is valid
		if (updatedState.formValid) {
			const { username, password, remember } = this.state.formData;
			const { deviceData } = this.props;
			// create request payload
			const payload = {
				userName: username.value,
				password: password.value,
				rememberMe: remember.value === true ? remember.value : false,
			};

			const userDeviceData = deviceData[username.value] || {};

			console.log(userDeviceData);

			if (Object.keys(userDeviceData).length > 0) {
				payload['deviceId'] = userDeviceData.deviceId;
				payload['deviceSecret'] = userDeviceData.deviceSecret;
			}

			const response = await this.props.request_login$({
				action: 'initiateLogin',
				payload,
			});

			// redirect user to dashboard
			if (response.type === REQUEST_LOGIN_SUCCESS) {
				const { challenge } = this.props;

				// if (challenge) {
				switch (challenge) {
					case 151:
					case 153: {
						const time = convert_timestamp(this.props.duration || 60);
						const msg = get_verification_code_msg_template({
							type: 'email',
							username: username.value,
							time: this.props.duration || 60,
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
						break;
					}
					case 154: {
						this.props.add_global_message({
							flash: true,
							message: 'You are 1 step away from completing your registration.',
							messageType: 'success',
						});
						this.props.history.push('/verify-phone');
						break;
					}
					case 159: {
						this.props.history.push('/verify-mfa');
						break;
					}
					default: {
						this.props.history.push('/');
						break;
					}
				}
				// } else {
				// this.props.history.push('/');
				// }
			}
		}
	};

	// update input values
	updateValue = (e) => {
		// reset field validations
		const formData = { ...this.state.formData };
		formData[e.target.name].value =
			e.target.type === 'checkbox' ? e.target.checked : e.target.value;

		// if !valid reset it
		if (!formData[e.target.name].valid) {
			formData[e.target.name].valid = true;
			formData[e.target.name].msg = '';
		}

		this.setState({
			formData,
		});
	};

	// toggle view password
	toggleViewPassword = (target) => {
		const formData = { ...this.state.formData };
		formData[target].viewPassword = !formData[target].viewPassword;
		this.setState({
			formData,
		});
	};

	// forgot password
	forgotPassword = async (e) => {
		e.preventDefault();
		const response = await this.props.request_forgot_password$({
			action: 'forgotPassword',
			payload: {
				userName: this.state.email.value,
			},
		});

		if (response.type === REQUEST_FORGOT_PASSWORD_SUCCESS) {
			this.props.add_global_message({
				flash: true,
				message: `OTP send successfully to ${email_sort(
					this.state.email.value,
				)}`,
				messageType: 'success',
			});

			// redirect to change password screen
			if (this.props.challenge === 164) {
				this.props.history.push('/forgot');
			}
		} else {
			this.setState({
				email: {
					...this.state.email,
					value: '',
					valid: true,
					msg: '',
				},
				visible: false,
			});
		}
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
		} else if (target === 'email') {
			updatedField = { ...this.state[target] };
			if (updatedField.value !== '') {
				updatedField = validateEmail(updatedField);
				this.setState({
					[target]: updatedField,
				});
			}
		}
	};

	render() {
		const { username, password, remember } = this.state.formData;

		return (
			<>
				{this.props.loading && <Loader />}
				<BackgroundLayer />
				<Logo styleClass="center-logo" />
				<form
					onSubmit={this.onSignIn}
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

							<div className="form-group">
								<FormField
									type="password"
									updateValue={this.updateValue}
									toggleViewPassword={this.toggleViewPassword}
									{...password}
								/>
								{!password.valid && <ErrorText text={password.msg} />}
							</div>

							<div
								style={{
									alignItems: 'center',
									justifyContent: 'space-between',
									paddingTop: '15px',
								}}
								className="p-grid"
							>
								<div>
									<FormField
										type="checkbox"
										tooltip="Select this option if you want us to remember your login credential."
										updateValue={this.updateValue}
										{...remember}
									/>
								</div>

								<Link
									to="/forgot"
									onClick={(e) => {
										e.preventDefault();
										this.setState({
											visible: true,
										});
									}}
									style={{
										marginLeft: '15px',
										color: '#898989',
										cursor: 'pointer',
									}}
								>
									{' '}
									Forgot Password?
								</Link>
							</div>

							<div className="form-group">
								<Button className="auth-btn" label="Sign In" />
							</div>

							<HelpText text="Don't have an account? ">
								<Link to="/sign-up">Sign Up</Link>
							</HelpText>
						</NormalLogin>

						<SocialLogin>
							<SocialMediaButton
								type="facebook"
								label="Sign in with facebook"
							/>
							<SocialMediaButton type="google" label="Sign in with google" />
							<SocialMediaButton type="amazon" label="Sign in with amazon" />
						</SocialLogin>
					</div>
				</form>
				<Dialog
					visible={this.state.visible}
					style={{ width: '500px' }}
					header="Please enter your email address"
					modal={true}
					onHide={() => {
						const email = { ...this.state.email };
						this.setState({
							email: {
								...email,
								value: '',
								valid: true,
								msg: '',
							},
							visible: false,
						});
					}}
				>
					<form onSubmit={this.forgotPassword}>
						<div style={{ position: 'relative' }} className="form-group">
							<FormField
								blurValidate={this.validateOnBlur}
								updateValue={(e) => {
									const email = _.cloneDeep(this.state.email);
									email.value = e.target.value;
									email.valid = true;
									email.msg = '';
									this.setState({
										email,
									});
								}}
								{...this.state.email}
							/>
							{!this.state.email.valid && (
								<ErrorText text={this.state.email.msg} />
							)}
						</div>
						<Button label="Send" className="p-button-primary" />
					</form>
				</Dialog>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state.AUTH,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{ request_login$, request_forgot_password$, add_global_message },
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(SignInContainer));
