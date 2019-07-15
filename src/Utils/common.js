import moment from 'moment';

export const getFieldsAndValues = ({ columns, values }) => {
	let obj = {};

	// create fields with []
	columns.map((column) => (obj[column.field] = []));

	// push values in obj[field]
	values.map((item) => {
		for (let key in item) {
			if (obj.hasOwnProperty(key)) {
				obj[key].push({ label: item[key], value: item[key] });
			}
		}
		return true;
	});

	return obj;
};

export const getDefaultSelectedFilter = (data) => {
	const obj = {};

	for (let key in data) {
		obj[key] = data[key][0].value;
	}

	return obj;
};

export const email_sort = (email) => {
	const data = email.split('@');
	return `${data[0].substring(0, 5)}xxxxxx@${data[1]}`;
};

export const phone_sort = (phone) => {
	const length = phone.length;
	return `${phone.substring(0, 3)}XXXX${(phone.substring(length - 3), length)}`;
};

export const forgotUserDevice = (device, all = false) => {
	const user = localStorage.getItem('username');
	let devices = localStorage.getItem('deviceData');

	if (devices) {
		devices = JSON.parse(devices);
	}

	if (Object.keys(devices).length && all) {
		const storedDevices = { ...devices };
		storedDevices[user] && delete storedDevices[user];
		localStorage.setItem('deviceData', JSON.stringify(storedDevices));
	} else if (Object.keys(devices).length && devices[user]) {
		console.log(devices[user].deviceId, device);
		if (devices[user].deviceId === device) {
			const storedDevices = { ...devices };
			delete storedDevices[user];
			localStorage.setItem('deviceData', JSON.stringify(storedDevices));
		}
	}
};

export const removeSpaces = (string) => string.replace(/\s/g, '');

export const convert_timestamp = (timestamp) => {
	let time;
	console.log(timestamp);
	if (timestamp.length === 24) {
		const prevDate = moment(timestamp);
		const nowDate = moment(new Date()).subtract({
			minutes: 30,
			hour: 5,
		});
		let diff = nowDate.diff(prevDate, 'minutes');

		let hours = Math.floor(diff / 60);
		let minutes = diff % 60;
		time = `${hours > 0 ? hours + ' hours' : ''} ${
			minutes > 0 ? minutes + ' minutes' : ''
		}`;
	} else {
		// Received number of minutes for which the OTP is valid
		let hours = Math.floor(timestamp / 60);
		let minutes = timestamp % 60;
		time = `${hours > 0 ? hours + ' hours' : ''} ${
			minutes > 0 ? minutes + ' minutes' : ''
		}`;
	}
	return time;
};

export const get_verification_code_msg_template = ({
	type,
	username,
	phone,
	time,
}) => {
	return `We have sent a 6 digit Verification code to your ${
		type === 'email' ? 'e-mail ID' : 'registered number'
	}: ${
		type === 'email' ? email_sort(username) : phone_sort(phone)
	}. Please check your ${type} and enter the 6 digit code below. \n You may click on resend button below if you have not received the code${
		type === 'email'
			? 'You might have received the e-mail in your spam/junk folder'
			: ''
	}.\n Please note that the Verification Code is valid for ${convert_timestamp(
		time,
	)}`;
};
