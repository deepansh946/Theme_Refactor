import React from 'react';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';

import Logo from '../Logo';
import BackgroundLayer from '../BackgroundLayer';
import FormField from '../FormField';
import ErrorText from '../ErrorText';
import './Verification.css';

const Verification = ({
	formSubmit,
	heading,
	subHeading,
	updateValue,
	verification,
	validateOnBlur,
	countdown,
	resendCode,
	showRemember,
	remember,
	formFlash,
	messageType,
	message,
}) => {
	const formateTimer = (countDown) => {
		let minutes = Math.floor(countDown / 60);
		let seconds = countDown % 60;
		// append 0 in minutes/seconds if it is < 10
		minutes = minutes < 10 ? `0${minutes}` : minutes;
		seconds = seconds < 10 ? `0${seconds}` : seconds;

		if (countDown >= 0 && countDown <= 60) {
			return `(${seconds})`;
		} else {
			return countDown < 0 ? null : `(${minutes} : ${seconds})`;
		}
	};

	return (
		<>
			<BackgroundLayer />
			<Logo styleClass="center-logo" />
			<form onSubmit={formSubmit} id="verificationForm" className="form-style">
				<h2>{heading}</h2>
				<small>{subHeading}</small>
				{formFlash && <p className={`${messageType}Text`}>{message}</p>}
				<div className="form-group">
					<FormField
						onlyNumber={true}
						updateValue={updateValue}
						maxLength={verification.validation.maxLength}
						blurValidate={validateOnBlur}
						{...verification}
					/>
					{!verification.valid && <ErrorText text={verification.msg} />}
				</div>
				{showRemember && (
					<div style={{ paddingLeft: 0 }} className="form-group">
						<FormField
							type="checkbox"
							updateValue={updateValue}
							tooltip="Select this option if you want us to not to ask for OTP on this device. Caution: Do not select this option on a shared device."
							{...remember}
						/>
					</div>
				)}
				<div className="action-group">
					<Button label="Submit" className="p-button-primary" />
					<Button
						type="button"
						label={
							countdown === 0 ? 'Resend' : `Resend ${formateTimer(countdown)}`
						}
						onClick={resendCode}
						disabled={countdown > 0}
						className="p-button-success"
					/>
				</div>
			</form>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		...state.UI,
	};
};

export default connect(mapStateToProps)(Verification);
