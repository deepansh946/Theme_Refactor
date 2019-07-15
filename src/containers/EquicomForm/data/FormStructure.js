import axios from 'axios';

/* const user = "navneet.prakash@creditculture.sg";
	const url = `https://hjk7yciihi.execute-api.ap-southeast-1.amazonaws.com/dev/equicomform/${user}`;
	console.log(`url => ${url}`);
	const data = await axios.get(url).then(res => res.data).catch(err => console.log(err));
	console.log(data); */

export const applicationFormStates = {
	loanInfo: {
		loanAmount: {
			name: 'loanAmount',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: true,
		},
		loanMode: {
			name: 'loanMode',
			value: '',
			field: '',
			required: true,
		},
		loanPurpose: {
			name: 'loanPurpose',
			value: [],
			required: true,
		},
		paymentTerm: {
			name: 'paymentTerm',
			value: null,
			required: true,
		},
	},
	businessInfo: {
		businessName: {
			name: 'businessName',
			value: '',
			required: true,
			ErrorMsg: '',
		},
		businessNature: {
			name: 'businessNature',
			value: '',
			required: false,
			ErrorMsg: '',
		},
		businessAddress: {
			name: 'businessAddress',
			value: '',
			required: false,
		},
		employmentType: {
			name: 'employmentType',
			value: '',
			field: '',
			required: true,
		},
		employmentStatus: {
			name: 'employmentStatus',
			value: '',
			field: '',
			required: true,
		},
		rank: {
			name: 'rank',
			value: '',
			field: '',
			required: false,
		},
		position: {
			name: 'position',
			value: '',
			required: false,
		},
		gsisNumber: {
			name: 'gsisNumber',
			value: '',
			required: false,
		},
		tinNumber: {
			name: 'tinNumber',
			value: '',
			required: false,
		},
		dateOfHire: {
			name: 'dateOfHire',
			value: '',
			required: false,
		},
		serviceLength: {
			name: 'serviceLength',
			years: '',
			months: '',
			required: true,
		},
		totalWorking: {
			name: 'totalWorking',
			years: '',
			months: '',
			required: true,
		},
		telephoneNumberOffice: {
			name: 'telephoneNumberOffice',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		faxNumberOffice: {
			name: 'faxNumberOffice',
			value: '',
			required: false,
		},
		emailAddressOffice: {
			name: 'emailAddressOffice',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		hrContactPerson: {
			name: 'hrContactPerson',
			value: '',
			required: false,
		},
		officeTelephoneNumber2: {
			name: 'officeTelephoneNumber2',
			value: '',
			required: false,
		},
		timeDayCall: {
			name: 'timeDayCall',
			value: '',
			required: false,
		},
		serviceLength2: {
			name: 'serviceLength2',
			value: '',
			required: false,
		},
		businessZipCode: {
			name: 'businessZipCode',
			value: '',
		},
		previousBusinessName: {
			name: 'previousBusinessName',
			value: '',
		},
		previousLengthOfService: {
			name: 'previousLengthOfService',
			years: '',
			months: '',
			required: false,
		},
		previousPosition: {
			name: 'previousPosition',
			value: '',
		},
	},

	personalInfo: {
		personalName: {
			name: 'personalName',
			value: '',
			required: true,
		},
		personalMiddle: {
			name: 'personalMiddle',
			value: '',
			required: true,
		},
		personalLast: {
			name: 'personalLast',
			value: '',
			required: true,
		},
		personalMother: {
			name: 'personalMother',
			value: '',
			required: false,
		},
		personalDOB: {
			name: 'personalDOB',
			value: null,
			isError: false,
			isErrors: false,
			ErrorMsg: '',
			required: true,
		},
		personalAge: {
			name: 'personalAge',
			value: '',
			required: false,
		},
		personalPlaceOfBirth: {
			name: 'personalPlaceOfBirth',
			value: '',
			required: true,
		},
		personalCivilStatus: {
			name: 'personalCivilStatus',
			value: null,
			required: true,
		},
		personalGender: {
			name: 'personalGender',
			value: null,
			required: true,
		},
		personalNationality: {
			name: 'personalNationality',
			value: null,
			required: false,
		},
		personalNumberDependent: {
			name: 'personalNumberDependent',
			value: '',
			field: '',
			required: true,
		},
		personalEducationAttainment: {
			name: 'personalEducationAttainment',
			value: '',
			field: '',
			required: true,
		},
		personalHomeNumber: {
			name: 'personalHomeNumber',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		personalMobileNumber: {
			name: 'personalMobileNumber',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		personalEmail: {
			name: 'personalEmail',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		personalPersentHomeAddress: {
			name: 'personalPersentHomeAddress',
			value: '',
			required: true,
		},
		presentZipCode: {
			name: 'presentZipCode',
			value: '',
		},

		personalPresentyear: {
			name: 'personalPresentyear',
			value: '',
			required: false,
		},
		personalPresentMonth: {
			name: 'personalPresentMonth',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		personalPresentCheckbox: {
			name: 'personalPresentCheckbox',
			value: '',
			required: false,
		},
		personalPerviousHomeAddress: {
			name: 'personalPerviousHomeAddress',
			value: '',
			required: false,
		},
		perviousZipCode: {
			name: 'perviousZipCode',
			value: '',
		},
		personalPerviousyear: {
			name: 'personalPerviousyear',
			value: '',
			required: false,
		},
		personalPerviousMonth: {
			name: 'personalPerviousMonth',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		personalPerviousCheckbox: {
			name: 'personalPerviousCheckbox',
			value: true,
			required: false,
		},
		previousCheckbox: {
			name: 'previousCheckbox',
			value: true,
			required: false,
		},
		personalPermanentHomeAddress: {
			name: 'personalPermanentHomeAddress',
			value: '',
			required: false,
		},
		permanentZipCode: {
			name: 'permanentZipCode',
			value: '',
		},
		personalPermanentyear: {
			name: 'personalPermanentyear',
			value: '',
			required: false,
		},
		personalPermanentMonth: {
			name: 'personalPermanentMonth',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		personalPermanentCheckbox: {
			name: 'personalPermanentCheckbox',
			value: true,
			field: '',
			required: false,
		},
		personalCheckBox: {
			name: 'personalCheckBox',
			value: true,
			required: false,
		},
		personalSourceFund: {
			name: 'personalSourceFund',
			value: [],
			field: '',
			required: true,
		},
		personalCarOwner: {
			name: 'personalCarOwner',
			required: true,

			value: null,
			isError: false,
			ErrorMsg: '',

			field: '',
			isErrorField: false,
			ErrorMsgField: '',

			field2: '',
			isErrorField2: false,
			ErrorMsgField2: '',
		},
		personalEqBEmployee: {
			name: 'personalEqBEmployee',
			required: true,

			value: '',
			isError: false,
			ErrorMsg: '',

			field: '',
			isErrorField: false,
			ErrorMsgField: '',

			field2: '',
			isErrorField2: false,
			ErrorMsgField2: '',
		},
		personalDirectorDecleration: {
			name: 'personalDirectorDecleration',
			required: true,

			value: '',
			isError: false,
			ErrorMsg: '',

			field: '',
			isErrorField: false,
			ErrorMsgField: '',

			field2: '',
			isErrorField2: false,
			ErrorMsgField2: '',
		},
		personalDOSDecleration: {
			name: 'personalDOSDecleration',
			required: true,

			value: '',
			isError: false,
			ErrorMsg: '',

			field: '',
			isErrorField: false,
			ErrorMsgField: '',

			field2: '',
			isErrorField2: false,
			ErrorMsgField2: '',
		},
	},
	spouseInfo: {
		spouseFirstName: {
			name: 'spouseFirstName',
			value: '',
			required: false,
		},
		spouseMiddleName: {
			name: 'spouseMiddleName',
			value: '',
			required: false,
		},
		spouseLastName: {
			name: 'spouseLastName',
			value: '',
			required: false,
		},
		spouseBusName: {
			name: 'spouseBusName',
			value: '',
			required: false,
		},
		spousePosition: {
			name: 'spousePosition',
			value: '',
			required: false,
		},
		spouseBusAddress: {
			name: 'spouseBusAddress',
			value: '',
			required: false,
		},
		spouseDOB: {
			name: 'spouseDOB',
			value: '',
			required: false,
		},
		spouseOffNumber: {
			name: 'spouseOffNumber',
			value: '',
			required: false,
		},
		spouseMobileNumber: {
			name: 'spouseMobileNumber',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		spouseEmail: {
			name: 'spouseEmail',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		spouseZipCode: {
			name: 'spouseZipCode',
			value: '',
		},
	},
	otherInfo: {
		otherPersonalName: {
			name: 'otherPersonalName',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherRelationBorrower: {
			name: 'otherRelationBorrower',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherTelephoneNumber: {
			name: 'otherTelephoneNumber',
			value: '',
			isError: false,
			ErrorMsg: '',
			required: false,
		},
		otherHomeAddress: {
			name: 'otherHomeAddress',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherCreditCardIssueBank: {
			name: 'otherCreditCardIssueBank',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherCardNumber: {
			name: 'otherCardNumber',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherCardLimit: {
			name: 'otherCardLimit',
			value: '',
			required: false,
		},
		otherExpDate: {
			name: 'otherExpDate',
			value: '',
			required: false,
		},
		otherLoanAccount: {
			name: 'otherLoanAccount',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherTypeLoan: {
			name: 'otherTypeLoan',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherOutstandingBalance: {
			name: 'otherOutstandingBalance',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherMonthlyPayment: {
			name: 'otherMonthlyPayment',
			value: '',
			required: false,
			isError: false,
			ErrorMsg: '',
		},
		otherZipCode: {
			name: 'otherZipCode',
			value: '',
		},
	},
	undertaking: {
		borrowerSignatureAbovePrintedName: {
			name: 'borrowerSignatureAbovePrintedName',
			value: '',
			required: false,
		},
		dateUndertaking: {
			name: 'dateUndertaking',
			value: '',
			required: false,
		},
	},
	// documentRequirements:{
	// 	name:
	// }
};

// let mapper = {};
// if (loanInformation){
// 	if(loanInformation.loanAmount){
// 		mapper[`${loanInformation}_${loanAmount}`] = loanInformation.loanAmount.value;
// 	}
// 	if
// }

// loanInformation_loanAmount > 20000
