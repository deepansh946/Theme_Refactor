export const validateRequireFields = (formData) => {
	let updatedObj = { ...formData };
	for (let key in updatedObj) {
		if (
			updatedObj[key].validation &&
			updatedObj[key].validation.required &&
			updatedObj[key].value.trim() === ''
		) {
			updatedObj[key].valid = false;
			updatedObj[key].msg = `Please enter ${updatedObj[
				key
			].label.toLowerCase()}`;
		}
	}
	return updatedObj;
};

export const validateVerificationCode = (verificationCode, required = true) => {
	let code = { ...verificationCode };

	if (required && code.validation.required && code.value.length === 0) {
		code.valid = false;
		code.msg = 'Please enter OTP.';
	}

	if (
		code.valid &&
		code.validation &&
		code.validation.maxLength &&
		(code.value.length < code.validation.maxLength ||
			code.value.length > code.validation.maxLength)
	) {
		code.valid = false;
		code.msg = `Please enter ${code.validation.maxLength} digit OTP.`;
	}

	return code;
};

export const validateEmail = (email) => {
	const exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const emailSplit = email.value.split('@');
	// check for email validation
	if (
		!exp.test(email.value.toLowerCase()) ||
		(emailSplit[0].length > 64 || emailSplit[1].length > 255)
	) {
		email.valid = false;
		email.msg = 'Please enter valid email address';
	}
	return email;
};

export const validatePassword = (password) => {
	// just check for length
	if (password.value.length < 8) {
		password.valid = false;
		password.msg = 'Password length must be minimum 8 characters long';
	}

	return password;
};

export const validateConfirmPassword = (password, confirm) => {
	if (password.valid && password.value !== confirm.value) {
		confirm.valid = false;
		confirm.msg = 'Password not matched';
	}
	return confirm;
};

export const validatePhoneNumber = (phone, isd) => {
	switch (isd) {
		case '+91': {
			if (phone.value.length !== 10) {
				phone.valid = false;
				phone.msg = 'Phone number must have a length of 10.';
			}
			break;
		}
		case '+65': {
			if (phone.value.length !== 8) {
				phone.valid = false;
				phone.msg = 'Phone number must have a length of 8.';
			}
			break;
		}
		case '+63': {
			if (phone.value.length !== 10) {
				phone.valid = false;
				phone.msg = 'Phone number must have a length of 10.';
			}
			break;
		}
	}
	return phone;
};

export const isFormValid = (formData) => {
	const updatedObj = { ...formData, formValid: true };

	for (let key in updatedObj) {
		// set formValid to false if any field is not valid
		if (key !== 'formValid' && !updatedObj[key].valid) {
			updatedObj.formValid = false;
			break;
		}
	}
	return updatedObj;
};

export const validateForm = (formData, extra = {}) => {
	let updatedState = validateRequireFields(formData);
	console.log(updatedState);
	// validate email if "username" is present
	if (updatedState.username && updatedState.username.valid) {
		const updatedUsernameObj = validateEmail(updatedState.username);
		updatedState['username'] = updatedUsernameObj;
	}

	// validate phone if "phone" is present
	if (updatedState.phone && updatedState.phone.valid) {
		const updatePhoneObj = validatePhoneNumber(updatedState.phone, extra.isd);
		updatedState['phone'] = updatePhoneObj;
	}

	// validate password against password policies
	if (
		updatedState.password &&
		updatedState.password.valid &&
		updatedState.password.validation.passwordPolicy
	) {
		const updatedPasswordObj = validatePassword(updatedState.password);
		updatedState['password'] = updatedPasswordObj;
	}

	// validate confirm password match if exist and password is valid
	if (updatedState.confirm && updatedState.confirm.valid) {
		const updateConfirmObj = validateConfirmPassword(
			updatedState.password,
			updatedState.confirm,
		);
		updatedState['confirm'] = updateConfirmObj;
	}

	// OTP verification
	if (
		Object.keys(updatedState).includes('code') ||
		Object.keys(updatedState).includes('verification')
	) {
		const updateTarget = Object.keys(updatedState).includes('code')
			? 'code'
			: 'verification';
		const updateConfirmObj = validateVerificationCode(
			updatedState[updateTarget],
		);
		console.log(updateConfirmObj);
		updatedState[updateTarget] = updateConfirmObj;
	}

	// check if formValid or not
	updatedState = isFormValid(updatedState);
	return updatedState;
};
