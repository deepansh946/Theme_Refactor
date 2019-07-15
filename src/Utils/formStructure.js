export const SignUp = {
	username: {
		type: 'text',
		label: 'Email',
		name: 'username',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	phone: {
		type: 'text',
		label: 'Phone Number',
		name: 'phone',
		value: '',
		mask: '(+91) 9999999999',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	password: {
		type: 'password',
		label: 'Password',
		name: 'password',
		value: '',
		feedback: true,
		showPasswordFunc: true,
		viewPassword: false,
		validation: {
			required: true,
			passwordPolicy: true,
		},
		valid: true,
		msg: '',
	},
	confirm: {
		type: 'password',
		label: 'Confirm Password',
		name: 'confirm',
		value: '',
		feedback: false,
		showPasswordFunc: true,
		viewPassword: false,
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	formValid: true,
};

export const SignIn = {
	username: {
		type: 'text',
		label: 'Email',
		name: 'username',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	password: {
		type: 'password',
		label: 'Password',
		name: 'password',
		value: '',
		feedback: false,
		showPasswordFunc: true,
		viewPassword: false,
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	remember: {
		type: 'checkbox',
		label: 'Remember me',
		name: 'remember',
		value: '',
		validation: {},
		valid: true,
		msg: '',
	},
	formValid: true,
};

export const changePasswordRequest = {
	code: {
		type: 'text',
		label: 'Code',
		name: 'code',
		value: '',
		validation: {
			required: true,
			maxLength: 6,
		},
		valid: true,
		msg: '',
	},
	password: {
		type: 'password',
		label: 'New Password',
		name: 'password',
		value: '',
		feedback: true,
		showPasswordFunc: true,
		viewPassword: false,
		validation: {
			required: true,
			passwordPolicy: true,
		},
		valid: true,
		msg: '',
	},
	confirm: {
		type: 'password',
		label: 'Confirm Password',
		name: 'confirm',
		value: '',
		showPasswordFunc: true,
		feedback: false,
		viewPassword: false,
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
};

export const updatePassword = {
	oldPassword: {
		type: 'password',
		label: 'Old Password',
		name: 'oldPassword',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	password: {
		type: 'password',
		label: 'New Password',
		name: 'password',
		value: '',
		feedback: true,
		showPasswordFunc: true,
		viewPassword: false,
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	confirm: {
		type: 'password',
		label: 'Confirm Password',
		name: 'confirm',
		value: '',
		showPasswordFunc: true,
		viewPassword: false,
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
};

export const VerificationForm = {
	verification: {
		type: 'text',
		label: 'Verification Code',
		name: 'verification',
		value: '',
		validation: {
			required: true,
			maxLength: 6,
		},
		valid: true,
		msg: '',
	},
};

export const MFA_VerificationForm = {
	verification: {
		type: 'text',
		label: 'Verification Code',
		name: 'verification',
		value: '',
		validation: {
			required: true,
			maxLength: 6,
		},
		valid: true,
		msg: '',
	},
	remember: {
		type: 'checkbox',
		label: 'Remember this device',
		name: 'remember',
		value: '',
		validation: {},
		valid: true,
		msg: '',
	},
};

export const updatePhoneForm = {
	phone: {
		type: 'text',
		label: 'Phone Number',
		name: 'phone',
		value: '',
		mask: '(+91) 9999999999',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
};

// Sample
export const SampleForm = {
	vin: {
		type: 'text',
		label: 'Vin',
		name: 'vin',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	year: {
		type: 'text',
		label: 'Year',
		name: 'year',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	brand: {
		type: 'text',
		label: 'Brand',
		name: 'brand',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	color: {
		type: 'text',
		label: 'Color',
		name: 'color',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
};

export const SampleForms = {
	department: {
		type: 'text',
		label: 'Department',
		name: 'department',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	issue: {
		type: 'text',
		label: 'Issue',
		name: 'issue',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	status: {
		type: 'text',
		label: 'Status',
		name: 'status',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
	message: {
		type: 'text',
		label: 'Message',
		name: 'message',
		value: '',
		validation: {
			required: true,
		},
		valid: true,
		msg: '',
	},
};
