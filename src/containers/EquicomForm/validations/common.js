import { zipCode } from '../data/ZipCode';

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

export const validateEmail = (email) =>
	email.match(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	)
		? true
		: false;

export const validatePassword = (password) => {
	// just check for length
	if (password.value.length < 8) {
		password.valid = false;
		password.msg = 'Password length must be minimum 8 characters long';
	}

	return password;
};

export const removeCommas = (str) => {
	const tempstr = str.replace(/,/g, '');
	console.log(tempstr);
	return tempstr;
};

export const validateConfirmPassword = (password, confirm) => {
	if (password.valid && password.value !== confirm.value) {
		confirm.valid = false;
		confirm.msg = 'Password not matched';
	}
	return confirm;
};

export const validatePhoneNumber = (phone, isd) => {
	//console.log(isd, phone.value);
	switch (isd) {
		case '+91': {
			if (phone.value.length !== 10) {
				phone.valid = false;
				phone.msg = 'Phone number must have a length of 10.';
			}
			break;
		}
		case '+65': {
			if (phone.value.length !== 6) {
				phone.valid = false;
				phone.msg = 'Phone number must have a length of 6.';
			}
			break;
		}
		case '+63': {
			if (phone.value.length !== 6) {
				phone.valid = false;
				phone.msg = 'Phone number must have a length of 8.';
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

	// check if formValid or not
	updatedState = isFormValid(updatedState);
	return updatedState;
};

// maximum length check -- Fields
export const validateMaximumFieldLength = (str) =>
	str.length <= 20 ? true : false;

// maximum length check -- Address
export const validateMaximumAddressLength = (str) =>
	str.length <= 300 ? true : false;

// minimum value validation
export const validateMinimumValue = (str, min) =>
	parseInt(str) >= min ? true : false;

// maximum value validation
export const validateMaximumValue = (str, max) =>
	parseInt(str) <= max ? true : false;

// required check
export const validateRequiredField = (val) => (val ? true : false);

// required check for array
export const validateRequiredArray = (val) => (val.length > 0 ? true : false);

// zero check
export const validateBeginFromZero = (str) =>
	parseInt(str.split('')[0]) === 0 ? true : false;

// only string characters
export const validateCharacterOnlyString = (str) =>
	str.replace(/ /g, '').match(/^[A-Za-z]+$/) ? true : false;

// characters and whitespace
export const validateCharacterWithSpace = (str) =>
	str.match(/[a-zA-Z][a-zA-Z ]+/) ? true : false;

//characters and numbers
export const validationCharacterWithNumber = (str) =>
	str.match(/^[A-Za-z0-9]+$/) ? true : false;
// only numbers allowed
export const validateNumberOnlyString = (str) =>
	str.replace(/ /g, '').match(/^0$|^-?[0-9]\d*(\.\d+)?$/) ? true : false;

// shouldn't contain white space
export const validateWhiteSpace = (str) => (str.match(/\s/g) ? false : true);

// valid philippines zip code
export const validateZipCode = (str) =>
	zipCode.hasOwnProperty(str.toString().replace(/ /g, '')) ? true : false;

// valid ph mobile number
export const validateMobileNumber = (str) =>
	str.replace(/ /g, '').match(/^(09|\+639|9)\d{9}$/) ? true : false;

// valid ph telephone number
export const validateTelephoneNumber = (str) =>
	str
		.replace(/ /g, '')
		.match(
			/^(02|\+632|2|03|\+633|3|04|\+634|4|05|\+635|5|06|\+636|6|07|\+637|7|08|\+638|8)\d{8}$/,
		)
		? true
		: false;

// validate month
export const validateMonth = (str) =>
	parseInt(str) < 13 && parseInt(str) > 0 ? true : false;

// validate year
export const validateYear = (str) =>
	parseInt(str) < 100 && parseInt(str) > 0 ? true : false;
