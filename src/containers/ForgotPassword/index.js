import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { changePasswordRequest } from '../../Utils/formStructure';

import Loader from '../../components/UI/Loader';
import FormField from '../../components/UI/FormField';
import BackgroundLayer from '../../components/UI/BackgroundLayer';
import ErrorText from '../../components/UI/ErrorText';
import Logo from '../../components/UI/Logo';
import {
	validateForm,
	validateConfirmPassword,
	validateVerificationCode,
} from '../../Utils/formValidation';

import { add_global_message } from '../../redux/actions/ui_actions';
import { request_change_password$ } from '../../redux/effects/auth_effects';
import { CHANGE_PASSWORD_REQUEST_SUCCESS } from '../../redux/constants/auth_constant';
import './style.css';

class ForgotPassword extends Component {
	state = {
		formData: _.cloneDeep(changePasswordRequest),
	};

	componentDidMount() {
		document.title = 'Credit Culture | Reset Password';
		if (this.props.loggedIn || !this.props.username) {
			this.props.history.push('/');
		}
	}

	// change password
	changePassword = async (e) => {
		e.preventDefault();
		const updatedState = validateForm(_.cloneDeep({ ...this.state.formData }));
		this.setState({
			formData: updatedState,
		});

		if (updatedState.formValid) {
			const { code, password } = this.state.formData;
			const response = await this.props.request_change_password$({
				action: 'confirmForgotPassword',
				payload: {
					userName: this.props.username,
					password: password.value,
					code: code.value,
				},
			});

			if (response.type === CHANGE_PASSWORD_REQUEST_SUCCESS) {
				this.props.add_global_message({
					message: 'Your password has been changed.Login now.',
					messageType: 'success',
					flash: true,
				});

				if (this.props.challenge === 157) {
					this.props.history.push('/login');
				}
			} else {
				const { error } = this.props;
				// for password
				if ([104, 165].includes(error.code)) {
					const formData = _.cloneDeep(this.state.formData);
					formData['password'].valid = false;
					formData['password'].msg = error.msg;
					formData['password'].value = '';
					this.setState({
						formData,
					});
				} else if ([105, 47, 48].includes(error.code)) {
					const formData = _.cloneDeep(this.state.formData);
					formData['code'].valid = false;
					formData['code'].msg = error.msg;
					formData['code'].value = '';
					this.setState({
						formData,
					});
				}
			}
		}
	};

	// toggle view password
	toggleViewPassword = (target) => {
		const formData = { ...this.state.formData };
		formData[target].viewPassword = !formData[target].viewPassword;
		this.setState({
			formData,
		});
	};

	// update value
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

	// onBlurValidate
	validateOnBlur = (target) => {
		let updatedField;
		if (target === 'confirm') {
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
		} else if (target === 'code') {
			updatedField = { ...this.state.formData[target] };
			if (updatedField.value.length < updatedField.validation.maxLength) {
				updatedField = validateVerificationCode(updatedField, false);
				this.setState({
					formData: {
						...this.state.formData,
						[target]: updatedField,
					},
				});
			}
		}
	};

	render() {
		const { code, password, confirm } = this.state.formData;
		return (
			<>
				{this.props.loading && <Loader />}
				<BackgroundLayer />
				<Logo styleClass="center-logo" />
				<form
					onSubmit={this.changePassword}
					id="forgotPassword"
					className="form-style"
					action=""
				>
					<h2>Forgot Password</h2>
					<small>Please check your inbox for verification code.</small>

					<div className="form-group">
						<FormField
							onlyNumber={true}
							maxLength={code.validation.maxLength}
							updateValue={this.updateValue}
							blurValidate={this.validateOnBlur}
							{...code}
						/>
						{!code.valid && <ErrorText text={code.msg} />}
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
						<Button className="auth-btn" label="Update Password" />
					</div>
				</form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		...state.UI,
		...state.AUTH,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{ request_change_password$, add_global_message },
		dispatch,
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(ForgotPassword));
