import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

import FormField from '../../components/UI/FormField';
import UserCard from '../../components/UI/UserCard';
import ChangePassword from '../../components/ChangePassword';
import _ from 'lodash';

import {
	validateConfirmPassword,
	validateForm,
} from '../../Utils/formValidation';
import './style.css';

import { updatePassword } from '../../Utils/formStructure';

// redux effects
import { add_global_message } from '../../redux/actions/ui_actions';
import { update_user_password$ } from '../../redux/effects/user_effects';
import {
	USER_PASSWORD_UPDATE,
	USER_PASSWORD_UPDATE_SUCCESS,
	USER_PASSWORD_UPDATE_FAIL,
} from '../../redux/constants/user_constant';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: _.cloneDeep(updatePassword),
		};
	}
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

	toggleViewPassword = (target) => {
		const formData = { ...this.state.formData };
		formData[target].viewPassword = !formData[target].viewPassword;
		this.setState({
			formData,
		});
	};

	validateOnBlur = (target) => {
		let updatedField = { ...this.state.formData[target] };
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
	};

	resetPassword = async (e) => {
		e.preventDefault();
		const updatedState = validateForm(_.cloneDeep(this.state.formData));

		this.setState({
			formData: updatedState,
		});

		if (updatedState.formValid) {
			const { oldPassword, password } = this.state.formData;
			const response = await this.props.update_user_password$({
				action: 'changePassword',
				payload: {
					accessToken: this.props.accessToken,
					idToken: `Bearer ${this.props.idToken}`,
					previousPassword: oldPassword.value,
					proposedPassword: password.value,
				},
			});

			if (response.type === USER_PASSWORD_UPDATE_SUCCESS) {
				this.props.add_global_message({
					message: 'Your password has been changed.',
					messageType: 'success',
					flash: true,
				});
				// reset form
				this.setState({
					formData: _.cloneDeep(updatePassword),
				});
			} else {
				const { error } = this.props;

				if (error.code === 53) {
					const formData = _.cloneDeep(this.state.formData);
					formData['oldPassword'].valid = false;
					formData['oldPassword'].msg = error.msg;
					formData['oldPassword'].value = '';
					this.setState({
						formData,
					});
				} else if ([104, 165].includes(error.code)) {
					const formData = _.cloneDeep(this.state.formData);
					formData['password'].valid = false;
					formData['password'].msg = error.msg;
					formData['password'].value = '';
					this.setState({
						formData,
					});
				}
			}
		}
	};

	render() {
		return (
			<div className="profile-container">
				<div className="user-profile">
					<UserCard
						user={{
							profileImg: 'assets/layout/images/avatar.png',
							name: 'ABC',
							username: 'abc',
							phoneNumber: '+91 8171700584',
							verified: false,
						}}
					/>
				</div>

				<div className="user-data">
					<div className="profile-content">
						<h2>Update Profile</h2>
						<form id="updateProfile" action="">
							<div className="p-grid">
								<div className="form-group p-md-6 p-col-12">
									<FormField name="username" label="Username" valid="true" />
								</div>
								<div className="form-group p-md-6 p-col-12">
									<FormField name="address" label="Address" valid="true" />
								</div>
								<div className="form-group p-md-6 p-col-12">
									<FormField name="city" label="City" valid="true" />
								</div>
								<div className="form-group p-md-3 p-col-12">
									<FormField name="zip" label="Zip" valid="true" />
								</div>
								<div className="form-group p-md-3 p-col-12">
									<FormField
										type="dropdown"
										name="state"
										options={[
											{ label: 'New York', value: 'NY' },
											{ label: 'Rome', value: 'RM' },
											{ label: 'London', value: 'LDN' },
											{ label: 'Istanbul', value: 'IST' },
											{ label: 'Paris', value: 'PRS' },
										]}
										label="State"
									/>
								</div>
							</div>
							<Button label="Update" className="p-button-primary" />
						</form>
					</div>
					<div className="change-password--card">
						<ChangePassword
							formData={this.state.formData}
							updateValue={this.updateValue}
							toggleViewPassword={this.toggleViewPassword}
							resetPassword={this.resetPassword}
							blurValidate={this.validateOnBlur}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		accessToken: state.AUTH.auth ? state.AUTH.auth.AccessToken : null,
		idToken: state.AUTH.auth ? state.AUTH.auth.IdToken : null,
		error: state.UI.error,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ add_global_message, update_user_password$ }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Profile);
