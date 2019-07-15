import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Loader from '../../components/UI/Loader';
import Verification from '../../components/UI/Verification/Verification';
import { VerificationForm } from '../../Utils/formStructure';
import { validateVerificationCode } from '../../Utils/formValidation';
import {
	email_sort,
	get_verification_code_msg_template,
} from '../../Utils/common';

// Redux Store, Actions,Effects & Constants
import { add_global_message } from '../../redux/actions/ui_actions';
import {
	request_email_verification$,
	resend_email_code$,
} from '../../redux/effects/auth_effects';
import {
	REQUEST_VERIFY_EMAIL_SUCCESS,
	RESEND_EMAIL_CODE_SUCCESS,
} from '../../redux/constants/auth_constant';

class EmailVerification extends PureComponent {
	state = {
		formData: _.cloneDeep(VerificationForm),
		countdown: 60,
		heading: 'Email Verification',
	};

	componentDidMount() {
		// redirect is username and password not available in both localstorage and store
		if (
			!this.props.username ||
			!this.props.password ||
			![151, 153].includes(this.props.challenge)
		) {
			// redirect user to '/login'
			this.props.history.push('/login');
		} else {
			document.title = 'Credit Culture | Email Verification';
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
		const formData = _.cloneDeep({ ...this.state.formData });
		formData[e.target.name].value = e.target.value;

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

	resendVerificationCodeOnEmail = async () => {
		const response = await this.props.resend_email_code$({
			action: 'resendEmailCode',
			payload: {
				username: this.props.username,
				password: this.props.password,
			},
		});

		// reset countdown
		if (response.type === RESEND_EMAIL_CODE_SUCCESS) {
			//TODO: global success flash
			this.props.add_global_message({
				flash: true,
				messageType: 'success',
				message: `Verification code send successfully to ${email_sort(
					this.props.username,
				)}`,
			});
			this.setState({
				countdown: 60,
			});
			setTimeout(() => this.countdownStart(), 500);
		}
	};

	verifyEmail = async (e) => {
		e.preventDefault();
		const verification = validateVerificationCode(
			this.state.formData.verification,
		);

		const updatedState = { ...this.state.formData, verification };

		this.setState({
			formData: updatedState,
		});

		// request email verification if for is valid
		if (verification.valid) {
			const { verification } = updatedState;
			const response = await this.props.request_email_verification$({
				action: 'verifyEmail',
				payload: {
					username: this.props.username,
					password: this.props.password,
					code: verification.value,
				},
			});

			if (response.type === REQUEST_VERIFY_EMAIL_SUCCESS) {
				this.setState({
					formData: _.cloneDeep(VerificationForm),
				});
				if (this.props.challenge === 154) {
					const time = this.props.duration || 60;
					const phone = this.props.contact || '8171700584';
					this.props.add_global_message({
						flash: false,
						formFlash: true,
						messageType: 'success',
						message: get_verification_code_msg_template({
							type: 'phone',
							phone,
							time,
						}),
					});

					this.props.history.push('/verify-phone');
				}
			} else {
				const { error } = this.props;

				if ([47, 48].includes(error.code)) {
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
		const { verification } = this.state.formData;
		return (
			<>
				{this.props.loading && <Loader />}
				<Verification
					formSubmit={this.verifyEmail}
					heading="Email Verification"
					subHeading="Check your email account for verification code"
					countdown={this.state.countdown}
					updateValue={this.updateValue}
					validateOnBlur={this.validateOnBlur}
					resendCode={this.resendVerificationCodeOnEmail}
					verification={verification}
					error={this.props.error}
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
		{ request_email_verification$, resend_email_code$, add_global_message },
		dispatch,
	);
};

export default connect(
	mapStateToProps,
	mapActionToProps,
)(withRouter(EmailVerification));
