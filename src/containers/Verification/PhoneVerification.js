import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import _ from 'lodash';

import FormField from '../../components/UI/FormField';
import CountryCode from '../../components/UI/CountryCode';
import ErrorText from '../../components/UI/ErrorText';
import HelpText from '../../components/UI/HelpText';
import Loader from '../../components/UI/Loader';
import Verification from '../../components/UI/Verification/Verification';
import { VerificationForm, updatePhoneForm } from '../../Utils/formStructure';
import {
	validateForm,
	validateVerificationCode,
} from '../../Utils/formValidation';

// Redux Actions,Effects & Constants
import { add_global_message } from '../../redux/actions/ui_actions';
import {
	request_phone_verification$,
	resend_phone_code$,
	change_phone_number$,
} from '../../redux/effects/auth_effects';
import {
	REQUEST_VERIFY_PHONE_SUCCESS,
	RESEND_PHONE_CODE_SUCCESS,
	CHANGE_PHONE_SUCCESS,
} from '../../redux/constants/auth_constant';

class PhoneVerification extends PureComponent {
	state = {
		formData: _.cloneDeep(VerificationForm),
		updatePhoneFormData: _.cloneDeep(updatePhoneForm),
		countryCode: '+91',
		countdown: 60,
	};

	async componentDidMount() {
		// redirect is username and password not available in both localstorage and store
		if (!this.props.idToken || ![154].includes(this.props.challenge)) {
			// redirect user to '/login'
			this.props.history.push('/login');
		} else {
			document.title = 'Credit Culture | Phone Verification';
			await this.props.resend_phone_code$({
				action: 'sendPhoneCode',
				payload: {
					idToken: localStorage.getItem('idToken') || this.props.idToken,
				},
			});
			this.countdownStart();
		}
	}

	countdownStart = () => {
		let timeLeft = this.state.countdown;
		this.timerId = setInterval(() => {
			if (timeLeft === 0) {
				clearInterval(this.timerId);
			} else {
				timeLeft--;
				this.setState((prevState) => {
					return { countdown: prevState.countdown - 1 };
				});
			}
		}, 1000);
	};

	updateValue = (e, target = 'formData') => {
		const formData = _.cloneDeep({ ...this.state[target] });
		formData[e.target.name].value = e.target.value;

		if (!formData[e.target.name].valid) {
			formData[e.target.name].valid = true;
			formData[e.target.name].msg = '';
		}

		this.setState({
			[target]: formData,
		});
	};

	validateOnBlur = () => {
		const updatedState = validateVerificationCode(
			this.state.formData.verification,
		);
		this.setState({
			formData: {
				...this.state.formData,
				verification: updatedState,
			},
		});
	};

	// update country code
	updateCountryCode = (e) => {
		const formData = _.cloneDeep(this.state.updatePhoneFormData);
		formData['phone'].valid = true;
		formData['phone'].msg = '';
		this.setState({ updatePhoneFormData: formData, countryCode: e.value });
	};

	resendVerificationCodeOnPhone = async () => {
		const response = await this.props.resend_phone_code$({
			action: 'sendPhoneCode',
			payload: {
				idToken: this.props.idToken,
			},
		});

		// reset countdown
		if (response.type === RESEND_PHONE_CODE_SUCCESS) {
			//TODO: global success flash
			if (this.props.challenge === 154) {
				this.props.add_global_message({
					flash: true,
					messageType: 'success',
					message: 'OTP re-sent successfully.',
				});
				// start countdown
				this.setState({
					countdown: 60,
				});
				setTimeout(() => this.countdownStart(), 500);
			} else if (this.props.challenge === 157) {
				this.props.add_global_message({
					flash: true,
					messageType: 'success',
					message: 'Phone number have been verified.Login now.',
				});
				this.props.history.push('/login');
			}
		}
	};

	verifyPhone = async (e) => {
		e.preventDefault();

		const verification = validateVerificationCode(
			this.state.formData.verification,
		);

		const updatedState = { ...this.state.formData, verification };

		this.setState({
			formData: updatedState,
		});
		// request phone verification if form is valid
		if (verification.valid) {
			const { verification } = updatedState;
			const response = await this.props.request_phone_verification$({
				action: 'verifyPhone',
				payload: {
					code: parseInt(verification.value, 10),
					idToken: this.props.idToken,
				},
			});
			if (response.type === REQUEST_VERIFY_PHONE_SUCCESS) {
				this.props.add_global_message({
					flash: true,
					messageType: 'success',
					message: 'Your registration has been successfully completed.',
				});
				this.setState({
					formData: _.cloneDeep(VerificationForm),
				});
				console.log(this.props.challenge);
				if (this.props.challenge === 157) {
					this.props.history.push('/login');
				}
			} else {
				const { error } = this.props;
				if ([115, 116].includes(error.code)) {
					const formData = _.cloneDeep(this.state.formData);
					// for verification
					formData['verification'].valid = false;
					formData['verification'].msg = error.msg;
					this.setState({ formData });
				}
			}
		}
	};

	phoneUpdate = async (e) => {
		e.preventDefault();
		const updatedState = validateForm(
			_.cloneDeep({ ...this.state.updatePhoneFormData }),
			{
				isd: this.state.countryCode,
			},
		);

		this.setState({
			updatePhoneFormData: updatedState,
		});

		// change phone number
		if (updatedState.formValid) {
			const { phone } = this.state.updatePhoneFormData;

			const response = await this.props.change_phone_number$({
				action: 'changePhone',
				payload: {
					idToken: this.props.idToken,
					phoneNumber: `${this.state.countryCode}${phone.value}`,
				},
			});

			if (response.type === CHANGE_PHONE_SUCCESS) {
				const response = await this.props.resend_phone_code$({
					action: 'sendPhoneCode',
					payload: {
						idToken: this.props.idToken,
					},
				});

				if (response.type === RESEND_PHONE_CODE_SUCCESS) {
					// success flash
					this.props.add_global_message({
						flash: true,
						messageType: 'success',
						message: `Your phone number have been changed to ${
							this.state.countryCode
						}${phone.value.substring(0, 3)}XXXX${phone.value.substring(
							phone.value.length - 3,
							phone.length,
						)}.`,
					});
					// reset phone data
					this.setState({
						updatePhoneFormData: _.cloneDeep(updatePhoneForm),
						visible: false,
					});
				}
			} else {
				const { error } = this.props;
				// reset phone data
				if ([117, 118].includes(error.code)) {
					const updatePhoneFormData = _.cloneDeep(
						this.state.updatePhoneFormData,
					);
					updatePhoneFormData['phone'].valid = false;
					updatePhoneFormData['phone'].msg = error.msg;
					updatePhoneFormData['phone'].value = '';
					this.setState({
						updatePhoneFormData,
						visible: true,
					});
				} else {
					this.setState({
						visible: false,
					});
				}
			}
		}
	};

	render() {
		const { verification } = this.state.formData;
		const { phone } = this.state.updatePhoneFormData;
		return (
			<>
				{this.props.loading && <Loader />}
				<Verification
					formSubmit={this.verifyPhone}
					heading="Phone Verification"
					subHeading="Check your phone for verification code"
					countdown={this.state.countdown}
					updateValue={this.updateValue}
					validateOnBlur={this.validateOnBlur}
					resendCode={this.resendVerificationCodeOnPhone}
					verification={verification}
					error={this.props.error}
					phoneChange={true}
				/>

				<HelpText textWhite={true} text="Want to change your phone number.">
					<span
						style={{
							marginLeft: '5px',
							color: '#fff',
							borderBottom: '1px solid #fff',
							cursor: 'pointer',
						}}
						onClick={() => this.setState({ visible: true })}
					>
						Click here
					</span>
				</HelpText>

				<Dialog
					visible={this.state.visible}
					style={{ width: '500px' }}
					header="Update Phone Number"
					modal={true}
					onHide={() => this.setState({ visible: false })}
				>
					<form onSubmit={this.phoneUpdate}>
						<div style={{ position: 'relative' }} className="form-group">
							<FormField
								updateValue={(e) => this.updateValue(e, 'updatePhoneFormData')}
								{...phone}
							/>
							<CountryCode
								selectedCountry={this.state.countryCode}
								updateCountryCode={this.updateCountryCode}
							/>
							{!phone.valid && <ErrorText text={phone.msg} />}
						</div>
						<Button label="Update" className="p-button-primary" />
					</form>
				</Dialog>
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

const mapActionToProps = (dispatch) => {
	return bindActionCreators(
		{
			request_phone_verification$,
			resend_phone_code$,
			change_phone_number$,
			add_global_message,
		},
		dispatch,
	);
};

export default connect(
	mapStateToProps,
	mapActionToProps,
)(withRouter(PhoneVerification));
