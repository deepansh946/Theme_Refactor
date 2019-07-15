import React from 'react';
import { Button } from 'primereact/button';
import ErrorText from './UI/ErrorText';
import FormField from './UI/FormField';

const changePasswordTemplate = (
	formData,
	updateValue,
	toggleViewPassword,
	blurValidate,
) => {
	return Object.keys(formData).map((key, i) => {
		if (key !== 'formValid') {
			return (
				<div className="form-group" key={i}>
					<FormField
						feedback={key === 'password'}
						showPasswordFunc={key !== 'password'}
						viewPassword={formData[key].viewPassword}
						toggleViewPassword={toggleViewPassword}
						updateValue={updateValue}
						blurValidate={key === 'confirm' ? blurValidate : null}
						{...formData[key]}
					/>
					{!formData[key].valid && <ErrorText text={formData[key].msg} />}
				</div>
			);
		}
	});
};

const ChangePassword = ({
	formData,
	updateValue,
	toggleViewPassword,
	resetPassword,
	blurValidate,
}) => {
	return (
		<>
			<h2>Change Password</h2>
			<form
				id="resetPassword"
				onSubmit={resetPassword}
				style={{ width: '100%' }}
				autocomplete="new-password"
			>
				{changePasswordTemplate(
					formData,
					updateValue,
					toggleViewPassword,
					blurValidate,
				)}
				<Button type="submit" label="Update" className="p-primary-button" />
			</form>
		</>
	);
};

export default ChangePassword;
