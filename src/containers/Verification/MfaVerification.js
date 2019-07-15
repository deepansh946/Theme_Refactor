import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Loader from '../../components/UI/Loader';
import Verification from '../../components/UI/Verification/Verification';
import { MFA_VerificationForm } from '../../Utils/formStructure';
import { validateVerificationCode } from '../../Utils/formValidation';
import { get_verification_code_msg_template } from '../../Utils/common';

// Redux Store, Actions,Effects & Constants
import { add_global_message } from '../../redux/actions/ui_actions';
import {
	resend_mfa_code$,
	request_mfa_verification$,
} from '../../redux/effects/auth_effects';
import {
	RESEND_MFA_CODE_SUCCESS,
	REQUEST_VERIFY_MFA_SUCCESS,
} from '../../redux/constants/auth_constant';

class MfaVerification extends PureComponent {
	state = {
		formData: _.cloneDeep(MFA_VerificationForm),
		countdown: 60,
	};

	async componentDidMount() {
		const { auth, deviceData, challenge, username } = this.props;
		console.log(deviceData);

		// check if deviceId & deviceSecret is availble for user
		if (
			deviceData.username &&
			Object.keys(deviceData.username).length &&
			Object.keys(auth).length
		) {
			this.props.history.push('/');
		} else if (!Object.keys(auth).length || challenge !== 159) {
			this.props.history.push('/login');
		} else {
			document.title = 'Credit Culture | MFA Verification';
			const res = await this.props.resend_mfa_code$({
				action: 'resendMfaCode',
				payload: {
					idToken: this.props.auth.IdToken,
					sessionId: this.props.auth.sessionId,
				},
			});

			if (res.type === RESEND_MFA_CODE_SUCCESS) {
				const { phone } = res.payload.body;

				this.props.add_global_message({
					formFlash: true,
					flash: false,
					message: get_verification_code_msg_template({
						type: 'phone',
						phone,
						time: 5,
					}),
					messageType: 'success',
				});
			}
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

	updateValue = (e) => {
		// console.log(e);
		const formData = _.cloneDeep({ ...this.state.formData });
		formData[e.target.name].value =
			e.target.type === 'checkbox' ? e.target.checked : e.target.value;

		if (!formData[e.target.name].valid) {
			formData[e.target.name].valid = true;
			formData[e.target.name].msg = '';
		}

		this.setState({
			formData,
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

	resendMFA = async () => {
		const response = await this.props.resend_mfa_code$({
			action: 'resendMfaCode',
			payload: {
				idToken: this.props.auth.IdToken,
				sessionId: this.props.auth.sessionId,
			},
		});

		if (response.type === RESEND_MFA_CODE_SUCCESS) {
			this.props.add_global_message({
				flash: true,
				message: 'OTP re-sent successfully.',
				messageType: 'success',
			});
			this.setState({ countdown: 10 });
			setTimeout(() => this.countdownStart(), 500);
		}
	};

	verifyMFA = async (e) => {
		e.preventDefault();

		const verification = validateVerificationCode(
			this.state.formData.verification,
		);

		const updatedState = { ...this.state.formData, verification };

		this.setState({
			formData: updatedState,
		});

		// request mfa verification if form is valid
		if (verification.valid) {
			const { verification, remember } = updatedState;
			const payload = {
				sessionId: this.props.auth.sessionId,
				idToken: this.props.auth.IdToken,
				code: parseInt(verification.value, 10),
				auth: this.props.auth,
			};

			// if remeber device is true add to payload
			if (remember && remember.value !== '') {
				payload['rememberflag'] = true;
			}

			const response = await this.props.request_mfa_verification$({
				action: 'verifyMfaCode',
				payload: payload,
			});

			if (response.type === REQUEST_VERIFY_MFA_SUCCESS) {
				// TODO : Redirect to dashboard
				this.props.history.push('/');
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

	render() {
		const { verification, remember } = this.state.formData;
		return (
			<>
				{this.props.loading && <Loader />}
				<Verification
					formSubmit={this.verifyMFA}
					heading="OTP Verification"
					subHeading="Check your phone for verification code"
					countdown={this.state.countdown}
					updateValue={this.updateValue}
					validateOnBlur={this.validateOnBlur}
					resendCode={this.resendMFA}
					verification={verification}
					remember={remember}
					error={this.props.error}
					showRemember={true}
				/>
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
		{ add_global_message, resend_mfa_code$, request_mfa_verification$ },
		dispatch,
	);
};

export default connect(
	mapStateToProps,
	mapActionToProps,
)(withRouter(MfaVerification));
