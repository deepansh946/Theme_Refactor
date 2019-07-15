import React, { PureComponent } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { SAVE_ICON, RESET_ICON } from '../../icons';
import FormField from '../../components/UI/FormField';
import './style.css';

class PasswordPolicy extends PureComponent {
	constructor() {
		super();
		this.state = {
			minimumLength: '',
			uppercase: null,
			lowercase: null,
			number: null,
			nonAlphanumeric: null,
			passwordReuse: null,
			passwordsToRemember: '',
			passwordExpiration: null,
			expirationPeriod: '',
		};
	}

	onUppercaseChange = (event) => {
		this.setState({ uppercase: event.checked }, () => console.log(this.state));
	};
	onLowercaseChange = (event) => {
		this.setState({ lowercase: event.checked });
	};
	onNumberChange = (event) => {
		this.setState({ number: event.target.checked });
	};
	onNonAlphanumericChange = (event) => {
		this.setState({ nonAlphanumeric: event.target.checked });
	};
	onPasswordReuseChange = (event) => {
		this.setState({ passwordReuse: event.target.checked });
	};
	onPasswordsToRememberChange = (event) => {
		this.setState({ passwordsToRemember: event.target.value });
	};
	onPasswordExpirationChange = (event) => {
		this.setState({ passwordExpiration: event.target.checked });
	};
	onExpirationPeriodChange = (event) => {
		this.setState({ expirationPeriod: event.target.value });
	};
	onSubmit = (event) => {
		event.preventDefault();
	};
	onReset = (event) => {
		event.preventDefault();
	};

	render() {
		return (
			<div className="p-grid">
				<div className="p-col-12">
					<form className="password-policy">
						<Fieldset>
							<div className="content-section introduction">
								<div className="feature-intro">
									<h2 className="password-policy--title">Password Policy</h2>
								</div>
							</div>
							<div className="form-group p-float-label">
								<FormField
									type="number"
									name="float-input"
									valid={true}
									value={this.state.minimumLegth}
									size="30"
									updateValue={(e) =>
										this.setState({
											minimumLegth: e.target.value,
										})
									}
									min={4}
									max={20}
									label="Minimum Password Length*"
								/>
							</div>
							<div className="form-group p-float-label">
								<FormField
									type="checkbox"
									name="uppercase"
									value={this.state.uppercase}
									updateValue={this.onUppercaseChange}
									checked={this.state.uppercase}
									label=" Require at least one uppercase character."
								/>
							</div>

							<div className="form-group p-float-label">
								<FormField
									type="checkbox"
									name="lowercase"
									value={this.state.lowercase}
									updateValue={this.onLowercaseChange}
									checked={this.state.lowercase}
									label="Require at least one lowercase character."
								/>
							</div>
							<div className="form-group p-float-label">
								<FormField
									type="checkbox"
									name="number"
									valid={true}
									value={this.state.number}
									updateValue={this.onNumberChange}
									checked={this.state.number}
									label="Require at least one number."
								/>
							</div>

							<div className="form-group p-float-label">
								<FormField
									type="checkbox"
									name="nonAlphanumeric"
									value={this.state.nonAlphanumeric}
									updateValue={this.onNonAlphanumericChange}
									checked={this.state.nonAlphanumeric}
									label="Require at least one non-alphanumeric character."
								/>
							</div>
							<div className="form-group p-float-label">
								<FormField
									type="checkbox"
									name="passwordExpiration"
									value={this.state.passwordExpiration}
									updateValue={this.onPasswordExpirationChange}
									checked={this.state.passwordExpiration}
									label="Enable password expiration."
								/>
							</div>
							{this.state.passwordExpiration && (
								<div className="form-group p-float-label">
									<FormField
										name="expirationPeriod"
										value={this.state.expirationPeriod}
										updateValue={this.onExpirationPeriodChange}
										checked={this.state.onExpirationPeriod}
										label="Password Expiration period (in days)."
										min={0}
										type="number"
										valid={true}
									/>
									{this.state.expirationPeriod < 0 && (
										<small className="text-danger">
											This value is invalid.
										</small>
									)}
								</div>
							)}

							<div className="form-group p-float-label">
								<FormField
									type="checkbox"
									name="passwordReuse"
									value={this.state.passwordReuse}
									updateValue={this.onPasswordReuseChange}
									checked={this.state.passwordReuse}
									label="Prevent password reuse."
								/>
							</div>

							{this.state.passwordReuse && (
								<div className="form-group p-float-label">
									<FormField
										name="passwordsToRemember"
										value={this.state.passwordsToRemember}
										updateValue={this.onPasswordsToRememberChange}
										checked={this.state.passwordsToRemember}
										label="Number of passwords to remember"
										max={6}
										min={0}
										type="number"
										valid={true}
										size="30"
									/>
									{this.state.expirationPeriod < 0 && (
										<small className="text-danger">
											This value is invalid.
										</small>
									)}
								</div>
							)}

							<div className="form-group" style={{ display: 'flex' }}>
								<Button
									label="Save"
									style={{ marginRight: '5px' }}
									icon={SAVE_ICON}
								/>
								<Button className="p-primary" label="Reset" icon={RESET_ICON} />
							</div>
						</Fieldset>
					</form>
				</div>
			</div>
		);
	}
}
export default PasswordPolicy;
