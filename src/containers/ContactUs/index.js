import React, { PureComponent } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';

import ContentHeader from '../../components/UI/ContentHeader';
import FormField from '../../components/UI/FormField';

import { SEND_ICON, CROSS_ICON } from '../../Utils/icons';

import './style.css';

// redux actions
import { add_global_message } from '../../redux/actions/ui_actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const initialState = {
	dept: {},
	issue: '',
	message: '',

	deptError: '',
	issueError: '',
	messageError: '',
};

class ContactUs extends PureComponent {
	state = {
		...initialState,
		allDepartments: [],
	};

	componentDidMount = async () => {
		try {
			const res = await axios({
				url: `https://devapi.customer.creditculturedemo.com/customer/departments`,
				method: 'POST',
				data: {
					action: 'getAllActiveDepartments',
					payload: {
						projection: ['id', 'description', 'issues'],
					},
				},
			});
			if (res.status === 200) {
				const allDepartments = res.data.body;

				allDepartments.forEach((department) => {
					if (department.issues && department.issues.length) {
						department.issues = department.issues.filter(
							(issue) => issue.active,
						);
					}
				});

				this.setState({ allDepartments: res.data.body });
			}
		} catch (error) {
			//TODO: Show Error Component here
			console.log(error.response);
		}
	};

	validateDepartmentField({ async = false }) {
		if (async) {
			setTimeout(() => {
				if (!this.state.dept || !this.state.dept.id) {
					this.setState({ deptError: `Please choose a department.` });
				} else {
					this.setState({ deptError: `` });
					return true;
				}
			});
		} else {
			if (!this.state.dept || !this.state.dept.id) {
				this.setState({ deptError: `Please choose a department.` });
			} else {
				this.setState({ deptError: `` });
				return true;
			}
		}
	}

	validateReasonField({ async = false }) {
		if (async) {
			setTimeout(() => {
				if (!this.state.issue || !this.state.issue.id) {
					this.setState({ reasonError: `Please choose reason of contact.` });
				} else {
					this.setState({ issueError: `` });
					return true;
				}
			});
		} else {
			if (!this.state.issue || !this.state.issue.id) {
				this.setState({ issueError: `Please choose reason of contact.` });
			} else {
				this.setState({ issueError: `` });
				return true;
			}
		}
	}

	validateMessageField({ async = false }) {
		if (async) {
			setTimeout(() => {
				if (!this.state.message) {
					this.setState({ messageError: `Your message is required.` });
				} else {
					this.setState({ messageError: `` });
					return true;
				}
			});
		} else {
			if (!this.state.message) {
				this.setState({ messageError: `Your message is required.` });
			} else {
				this.setState({ messageError: `` });
				return true;
			}
		}
	}

	onClear = (e) => {
		if (e) e.preventDefault();
		this.setState({ ...initialState });
	};

	onSubmit = async (e) => {
		try {
			console.log(this.state.message);

			if (e) e.preventDefault();
			let valid = true;

			var userData = this.state;

			valid = this.validateDepartmentField({});
			valid = this.validateReasonField({});
			valid = this.validateMessageField({});

			if (valid) {
				let response = await axios({
					url:
						'https://devapi.customer.creditculturedemo.com/customer/contact-us',
					method: 'POST',
					data: {
						action: 'contactUs',
						payload: {
							message: this.state.message,
							department: this.state.dept.id,
							issue: this.state.issue.id,
							userId: `ashish_mehra`,
						},
					},
				});

				if (response.data.statusCode === 200) {
					this.props.add_global_message({
						message: response.data.Message,
						messageType: 'success',
						flash: true,
					});
					// this.messages.show({
					// 	severity: 'success',
					// 	summary: 'success',
					// 	detail: response.data.Message,
					// });
					this.onClear();
				} else {
					this.props.add_global_message({
						message: response.data.message,
						messageType: 'error',
						flash: true,
					});
					// this.messages.show({
					// 	severity: 'warn',
					// 	summary: 'Sorry!',
					// 	detail: response.data.message,
					// });
				}
			} else {
				this.props.add_global_message({
					message: 'Looks like your input is invalid.',
					messageType: 'error',
					flash: true,
				});
				// this.messages.show({
				// 	severity: "warn",
				// 	summary: "Sorry!",
				// 	detail: `Looks like your input is invalid.`
				// });
			}
		} catch (error) {
			console.log(error);
		}
	};

	onReasonFieldMouseDown = (event) => {
		setTimeout(() => {
			if (!this.state.dept || !this.state.dept.id) {
				this.setState({ issueError: `Please choose department first.` });
			} else {
				this.setState({ issueError: `` });
			}
		});
	};

	onIssueChange = (e) => {
		if (e && e.value && e.value.id && typeof e.value.id === 'string') {
			this.setState({ issue: e.value });
		}
	};

	onMessageChange = (e) => {
		if (e && e.target && e.target.value && typeof e.target.value === 'string') {
			this.setState({ message: e.target.value });
			this.validateMessageField({ async: true });
		}
	};

	onChange = (e) => {
		this.validateDepartmentField({ async: true });
		this.onReasonFieldMouseDown({ async: true });
		this.setState({ [e.target.name]: e.value });
	};

	render() {
		const {
			allDepartments,
			dept,
			deptError,
			issue,
			issueError,
			message,
			messageError,
		} = this.state;

		const windowLength = window.innerWidth;

		return (
			<div className="wrapper p-grid">
				<ContentHeader heading="Contact Us" />

				<div className="p-col-12 d-flex-rev">
					<FormField
						name="dept"
						type="dropdown"
						options={allDepartments}
						optionLabel="description"
						value={dept}
						label={'Select a Department'}
						updateValue={this.onChange}
					/>

					{deptError && (
						<span
							className="error-text"
							style={{
								marginTop: '5px',
							}}
						>
							{deptError}
						</span>
					)}
				</div>

				<div className="p-col-12 d-flex-rev">
					{/* <FormField
						name="issue"
						type="dropdown"
						options={dept.issues}
						optionLabel="description"
						value={issue}
						label={'Select an Issue'}
						updateValue={this.onChange}
					/> */}

					<div
						className="p-col-12 d-flex-rev"
						style={{ marginTop: '1.5%', maxWidth: '367px' }}
					>
						<Dropdown
							style={{ width: '100%;' }}
							value={this.state.issue}
							options={this.state.dept.issues}
							onChange={this.onIssueChange}
							placeholder="Choose reason of contact"
							optionLabel="description"
							onMouseDown={this.onReasonFieldMouseDown}
						/>
						{/* <small className="d-block text-danger"> {this.state.reasonError} </small> */}
					</div>

					{issueError && (
						<span
							className="error-text"
							style={{
								marginTop: '5px',
							}}
						>
							{issueError}
						</span>
					)}
				</div>

				<div
					className="p-col-12 d-flex-rev"
					style={{ marginTop: '1.5%', maxWidth: '367px' }}
				>
					<FormField
						name="message"
						type="textarea"
						value={message}
						updateValue={this.onMessageChange}
						label={'Write Message'}
						rows={7}
						cols={windowLength >= 376 ? 40 : windowLength >= 321 ? 33 : 25}
					/>

					{messageError && (
						<span
							className="error-text"
							style={{
								marginTop: '5px',
							}}
						>
							{messageError}
						</span>
					)}
				</div>

				<div className="p-col-12 mt-1">
					<Button
						label="Send"
						icon={SEND_ICON}
						style={{ marginRight: '.5em' }}
						onClick={this.onSubmit}
					/>

					<Button label="Clear" icon={CROSS_ICON} onClick={this.onClear} />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ add_global_message }, dispatch);

export default connect(
	null,
	mapDispatchToProps,
)(ContactUs);
