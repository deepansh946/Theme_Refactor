import { applicationFormStates } from '../FormStructure';
import _ from 'lodash';

export const convertToState = (state) => {
	console.log(state['loanInformation_loanReleaseMode']);
	let newState = { ...applicationFormStates };
	for (let key in state) {
		if (key.includes('loanInformation')) {
			// loan info
			if (key.includes('desiredLoanAmount')) {
				newState['loanInfo']['loanAmount']['value'] = state[key];
			} else if (key.includes('desiredPaymentTerm')) {
				newState['loanInfo']['paymentTerm']['value'] = state[key];
			} else if (key.includes('loanPurpose')) {
				let purposes = [];
				for (let purpose in state['loanInformation_loanPurpose']) {
					state['loanInformation_loanPurpose'][purpose] &&
						purposes.push(purpose);
				}
				newState['loanInfo']['loanPurpose']['value'] = purposes;
			} else if (key.includes('loanReleaseMode')) {
				console.log(state[key]);
				if (state['loanInformation_loanReleaseMode']['equicomAccount']) {
					newState['loanInfo']['loanMode']['value'] = 'equicomAccount';
					newState['loanInfo']['loanMode']['field'] =
						state[key]['equicomAccount'];
				}
			}
		}
	}
	// console.log(newState);
	return newState;
};

export const getPopulatedState = (data) => {
	let { PersoInfo, Address, Identification, Name, Employment } = data;

	Employment = _.orderBy(Employment, ['start_date'], ['desc']);

	const add = _.orderBy(Address, ['status', 'last_reported_date'], ['asc']);

	let index = -1,
		personalPresentHomeAddress = '',
		personalPrevHomeAddress = '';

	if (add.length > 1) {
		for (let i = 0; i < add.length; i++) {
			const value = add[i];

			if (value.status === '0') {
				continue;
			} else if (value.status === '1') {
				index = i - 1;
				break;
			}
		}

		const presentAddress = add[add.length - 1];
		const prevAddress = add[index];

		const {
			street_number = '',
			street = '',
			city = '',
			province = '',
			region = '',
			postal_code = '',
		} = presentAddress;

		personalPresentHomeAddress = `${street_number || ''} ${street ||
			''} ${city || ''} ${province || ''} ${region || ''} ${postal_code || ''}`;

		personalPrevHomeAddress = `${prevAddress.street_number ||
			''} ${prevAddress.street || ''} ${
			prevAddress.city
		} ${prevAddress.province || ''} ${prevAddress.region ||
			''} ${prevAddress.postal_code || ''}`;
	} else {
		const presentAddress = add[0];

		const {
			street_number = '',
			street = '',
			city = '',
			province = '',
			region = '',
			postal_code = '',
		} = presentAddress;

		personalPresentHomeAddress = `${street_number || ''} ${street ||
			''} ${city || ''} ${province || ''} ${region || ''} ${postal_code || ''}`;
	}

	const { gender, dob, marital_status } = PersoInfo;

	const { id_type, number } = Identification;

	const { firstname, secondname, lastname } = Name;

	const { name, unparsed_street } = Employment[0];

	const genderMapper = {
		M: 'male',
		F: 'female',
	};

	const civilStatusMapper = {
		S: 'single',
		M: 'married',
		W: 'windowed',
	};

	const populatedData = {
		...applicationFormStates,
		personalInfo: {
			...applicationFormStates['personalInfo'],

			personalPersentHomeAddress: {
				...applicationFormStates['personalInfo'].personalPersentHomeAddress,
				value: personalPresentHomeAddress || '',
			},

			personalPerviousHomeAddress: {
				...applicationFormStates['personalInfo'].personalPerviousHomeAddress,
				value: personalPrevHomeAddress || '',
			},

			personalGender: {
				...applicationFormStates['personalInfo'].personalGender,
				value: genderMapper[gender] || '',
			},

			personalDOB: {
				...applicationFormStates['personalInfo'].personalDOB,
				value: new Date(dob),
			},

			personalCivilStatus: {
				...applicationFormStates['personalInfo'].personalCivilStatus,
				value: civilStatusMapper[marital_status] || '',
			},

			personalName: {
				...applicationFormStates['personalInfo'].personalName,
				value: firstname,
			},

			personalMiddle: {
				...applicationFormStates['personalInfo'].personalMiddle,
				value: secondname,
			},

			personalLast: {
				...applicationFormStates['personalInfo'].personalLast,
				value: lastname,
			},
		},

		businessInfo: {
			...applicationFormStates['businessInfo'],

			gsisNumber: {
				name: 'gsisNumber',
				value: id_type === 'SSS' ? number : null,
			},
			tinNumber: {
				name: 'tinNumber',
				value: id_type === 'TIN' ? number : null,
			},
			businessName: {
				name: 'businessName',
				value: name || null,
			},
			businessAddress: {
				name: 'businessAddress',
				value: unparsed_street || null,
			},
		},
	};

	return populatedData;
};
