import React, { PureComponent } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';

import ContentHeader from '../../components/UI/ContentHeader';
import StarRating from '../../components/UI/StarRating';
import FormField from '../../components/UI/FormField';

import { SEND_ICON, CROSS_ICON } from '../../Utils/icons';

import './style.css';

class Feedback extends PureComponent {
	state = {
		rating: 0,
		feedback: '',
		department: null,

		departmentError: '',
		ratingError: '',
		feedbackError: '',

		departments: [],
	};

	componentDidMount = async () => {
		try {
			const res = await axios({
				url:
					'https://devapi.customer.creditculturedemo.com/customer/departments',
				method: 'POST',
				data: {
					action: 'getAllActiveDepartments',
					payload: {
						projection: ['id', 'description'],
					},
				},
			});

			this.setState({ departments: res.data.body });
		} catch (e) {
			console.log('error');
		}
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.value });
	};

	onInputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onFormSubmit = async () => {
		// TODO: Refactor this code. Use formValidation util
		this.setState({
			ratingError: '',
			departmentError: '',
			feedbackError: '',
		});

		const { rating, feedback, department } = this.state;

		if (department === null) {
			this.setState({
				departmentError: 'Department is required',
			});
		}

		if (feedback === '') {
			this.setState({
				feedbackError: 'Feedback is required',
			});
		} else if (feedback.trim().length < 10) {
			this.setState({
				feedbackError: 'Minimum length is 10 characters long',
			});
		}

		if (rating === 0) {
			this.setState({
				ratingError: 'Rating is required',
			});
		}

		try {
			const res = await axios({
				url: 'https://devapi.customer.creditculturedemo.com/customer/feedback ',
				method: 'POST',
				data: {
					action: 'addFeedback',
					payload: {
						feedback: feedback,
						department: department.id,
						rating: rating,
					},
				},
			});

			if (res.status === 200) {
				// TODO: Show success component here
				console.log(res.data);

				this.setState({
					rating: 0,
					department: null,
					feedback: '',

					ratingError: '',
					departmentError: '',
					feedbackError: '',
				});
			}
		} catch (error) {
			// TODO: Show error component here
			console.log(`Error => ${error.response}`);
		}
	};

	onClear = () => {
		this.setState({
			rating: 0,
			department: null,
			feedback: '',

			ratingError: '',
			departmentError: '',
			feedbackError: '',
		});
	};

	render() {
		const {
			rating,
			ratingError,
			departments,
			department,
			departmentError,
			feedback,
			feedbackError,
		} = this.state;

		const windowLength = window.innerWidth;

		return (
			<div className="wrapper p-grid">
				<ContentHeader
					heading="Feedback"
					subHeading="Your feedback is valuable to us. Please rate us and
					provide your feedback below."
				/>

				<StarRating
					name="rating"
					value={rating}
					updateValue={this.onChange}
					error={ratingError}
				/>

				<div className="p-col-12 d-flex-rev">
					<FormField
						name="department"
						type="dropdown"
						options={departments}
						optionLabel="description"
						value={department}
						label={'Select a Department'}
						updateValue={this.onChange}
					/>

					{departmentError && (
						<span
							className="error-text"
							style={{
								marginTop: '5px',
							}}
						>
							{departmentError}
						</span>
					)}
				</div>

				<div className="p-col-12" style={{ marginTop: '1.5%' }}>
					<FormField
						name="feedback"
						type="textarea"
						value={feedback}
						updateValue={this.onInputChange}
						label={'Write Feedback'}
						rows={7}
						cols={windowLength >= 376 ? 40 : windowLength >= 321 ? 33 : 25}
					/>

					<p style={{ margin: 0 }}>
						{150 - feedback.length} characters remaining{' '}
					</p>

					{feedbackError && (
						<span
							className="error-text"
							style={{
								marginTop: '5px',
							}}
						>
							{feedbackError}
						</span>
					)}
				</div>

				<div className="p-col-12 mt-1">
					<Button
						label="Send"
						icon={SEND_ICON}
						style={{ marginRight: '.5em' }}
						onClick={this.onFormSubmit}
					/>

					<Button label="Clear" icon={CROSS_ICON} onClick={this.onClear} />
				</div>
			</div>
		);
	}
}

export default Feedback;
