import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

import _ from 'lodash';
import moment from 'moment';

import ApplicationForm from '../components/ApplicationForm/ApplicationForm';
import { getAge } from '../components/ApplicationForm/Personal_Info/ageAuto';
import Message from '../../../components/UI/Flash';

import { saveToLocalStorage } from '../containers/LocalStorage';
import { applicationFormStates } from '../data/FormStructure';
import { zipCode } from '../data/ZipCode';
import { convertToState, getPopulatedState } from '../data/stateMapper/';
import { validateEquicomForm } from '../validations/index';
import axios from 'axios';
import './ApplicationFormContainer.css';

/* REDUX ACTIONS */
import { add_global_message } from '../../../redux/actions/ui_actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ApplicationFormContainer extends Component {
	constructor() {
		super();
		let today = new Date();
		let month = today.getMonth();
		let year = today.getFullYear();
		let prevMonth = month === 0 ? 11 : month - 1;
		let prevYear = prevMonth === 11 ? year - 1 : year;
		let nextMonth = month === 11 ? 0 : month + 1;
		let nextYear = nextMonth === 0 ? year + 1 : year;

		let minDate = new Date();
		minDate.setMonth(prevMonth);
		minDate.setFullYear(prevYear);
		let maxDate = new Date();
		maxDate.setMonth(nextMonth);
		maxDate.setFullYear(nextYear);

		this.state = {
			formData: _.cloneDeep(applicationFormStates),
			/** My Spouse Information */
			spouseOffError: '',
			isSpouseOffError: false,
			spouseMobileError: '',
			spouseEmailError: '',
			isSpouseEmailError: false,
			isSpouseMobileError: false,

			/** Other Information State */

			otherTelError: '',
			isOtherTelError: false,
			// comment
			/* undertaking*/
			borrowerSignatureAbovePrintedName: null,
			dateUndertaking: null,

			isCibiPopulated: null,
			dialogVisible: false,

			tempFirstName: '',
			tempMiddleName: '',
			tempLastName: '',
			tempDOB: '',

			validFirstName: false,
			validMiddleName: false,
			validLastName: false,
			validDOB: false,

			validFirstNameError: '',
			validMiddleNameError: '',
			validLastNameError: '',
			validDOBError: '',
			// borrowerSignatureAbovePrintedName: null,
			// dateUndertaking: null,
			draftBtnDisabled: false,
			submitBtnDisabled: false,

			/*for modal*/
			visible: false,

			// For Accordians
			openAll: false,
			isDataPopulated: 'hide',
			dataMessage: null,
			submitMessage: null,
			formValid: false,
			showSubmitMessage: false,
			showDraftMessage: false,
		};
	}

	/**
	 * TODO: Properties need to be passed as a props to make this component resusable
	 */
	dateTemplate = (date) => {
		return date.day;
	};

	onClick = () => {
		this.setState({ visible: true });
	};

	onHide = () => {
		this.setState({ visible: false });
	};

	loanModes = [
		{ label: "Manager's Check", value: 'managersCheck' },
		{ label: 'Credit to Equicom Account', value: 'creditToEquicomAccount' },
		{
			label: 'Credit to Non-Equicom Account',
			value: 'creditToNonEquicomAccount',
		},
	];
	paymentTerms = [
		{ label: '12 months', value: '12' },
		{ label: '18 months', value: '18' },
		{ label: '24 months', value: '24' },
		{ label: '36 months', value: '36' },
		{ label: '48 months', value: '48' },
	];
	loanPurpose = [
		{ label: 'Travel', value: 'travel' },
		{ label: 'Electronic Gadgets', value: 'electronics-gadgets' },
		{ label: 'Health and Wellness', value: 'health-and-wellness' },
		{ label: 'Special Events', value: 'special-events' },
		{ label: 'Appliances', value: 'appliances' },
		{ label: 'Personal Consumption', value: 'personal-consumption' },
		{ label: 'Education', value: 'education' },

		{ label: 'Home Improvement', value: 'home-improvement' },
		{ label: 'Furniture/Fixtures', value: 'furniture/fixtures' },
		{ label: 'Hospitalization/Medical', value: 'hospitalization/medical' },
		{ label: 'Balance Transfer', value: 'balance-transfer' },
		{ label: 'Car Repair', value: 'car-repair' },
	];

	/*properties for My employement/business information */
	employmentTypes = [
		{ label: 'Private', value: 'private' },
		{ label: 'Government', value: 'government' },
		{ label: 'Professional', value: 'professional' },
		{ label: 'Self Employed', value: 'selfEmployed' },
		{ label: 'Retired', value: 'retired' },
		{ label: 'Others, please specify', value: 'others' },
	];

	employmentStatuses = [
		{ label: 'Permanent', value: 'permanent' },
		{ label: 'Probationary', value: 'probationary' },
		{ label: 'Contractual', value: 'contractual' },
		{ label: 'Professional', value: 'professional' },
		{ label: 'Consultant', value: 'consultant' },
		{ label: 'Special Occupation', value: 'specialOccupation' },
		{ label: 'Others, please specify', value: 'others' },
	];

	ranks = [
		{ label: 'Rank & File', value: 'rankAndFile' },
		{ label: 'Junior Officer', value: 'juniorOfficer' },
		{ label: 'Middle Manager', value: 'middleManager' },
		{ label: 'Senior Executive', value: 'seniorExecutive' },
		{ label: 'Self-Employed', value: 'selfEmployed' },
		{ label: 'Others, please specify', value: 'others' },
	];

	componentDidMount = async () => {
		try {
			const url = `https://hjk7yciihi.execute-api.ap-southeast-1.amazonaws.com/dev/equicomform`;

			/* const authUserName = localStorage.getItem(
				`CognitoIdentityServiceProvider.${config.userPoolWebClientId}.LastAuthUser`,
			);
			const idToken = localStorage.getItem(
				`CognitoIdentityServiceProvider.${config.userPoolWebClientId}.${authUserName}.idToken`,
			); */

			const auth = JSON.parse(localStorage.getItem('auth'));
			const idToken = auth.IdToken;

			const { data } = await axios({
				method: 'GET',
				url: url,
				headers: { Authorization: `Bearer ${idToken}` },
			});

			//console.log(Object.keys(data.body.data).length);
			//debugger;

			if (Object.keys(data.body.data).length > 0) {
				if (data.body.data.Item) {
					// form data
					//let formData = _.cloneDeep(applicationFormStates);
					let formData = JSON.parse(JSON.stringify(applicationFormStates));
					console.log(formData);
					formData.loanInfo = { ...data.body.data.Item.loanInfo };
					formData.personalInfo = { ...data.body.data.Item.personalInfo };
					formData.spouseInfo = { ...data.body.data.Item.spouseInfo };
					formData.businessInfo = { ...data.body.data.Item.businessInfo };
					formData.otherInfo = { ...data.body.data.Item.otherInfo };
					formData.undertaking = { ...data.body.data.Item.undertaking };

					console.log('--------form data received-----------');
					console.log(formData);
					console.log('--------form data received-----------');
					// buttons check
					let isSubmitted, isDrafted, isCibiPopulated;

					if (data.body.data.Item.isSubmitted) {
						isSubmitted = true;
						isDrafted = true;
					} else if (data.body.data.Item.isDrafted) {
						isDrafted = true;
						isSubmitted = false;
					} else {
						isSubmitted = false;
						isDrafted = false;
					}
					// this.setState({ dialogVisible: isCibiPopulated });

					this.setState(
						{
							formData: formData,
							draftBtnDisabled: isDrafted,
							submitBtnDisabled: isSubmitted,
						},
						() => console.log(this.state),
					);
					console.log(data.body.data.Item.isDrafted);
				}
			} else {
				this.setState({ dialogVisible: true });
			}
		} catch (error) {
			console.log(error);
		}

		//console.log(zipCode);
	};

	onLoanPurposeUpdate = (e) => {
		const loanPurpose = { ...this.state.formData.loanInfo.loanPurpose };

		// check if purpose is already exist if "yes" remove it
		const index = loanPurpose.value.indexOf(e.target.value);
		console.log(index);
		let isDrafted;
		if (this.state.isDrafted) {
			isDrafted = false;
		}
		if (index === -1) {
			loanPurpose.value.push(e.target.value);
		} else {
			loanPurpose.value.splice(index, 1);
		}

		this.setState({
			formData: {
				...this.state.formData,
				loanInfo: {
					...this.state.formData.loanInfo,
					loanPurpose,
				},
			},
			draftBtnDisabled: isDrafted,
		});
	};

	/********* Personal Information***************************/
	genders = [
		{ label: 'Male', value: 'male' },
		{ label: 'Female', value: 'female' },
	];
	EducationAttend = [
		{ label: 'High School', value: 'highSchool' },
		{ label: 'College', value: 'college' },
		{ label: 'Post Graduate', value: 'postGraduate' },
		{ label: 'Vocational', value: 'vocational' },
		{ label: 'Others', value: 'others' },
	];
	SourceFund = [
		{ label: 'Commission', value: 'commission' },
		{ label: 'Employment', value: 'employment' },
		{ label: 'Remittance', value: 'remittance' },
		{ label: 'Other', value: 'other' },
	];
	CarOwnerShip = [
		{ label: 'Owned', value: 'owned' },
		{ label: 'Personal', value: 'personal' },
		{ label: 'Company Provided', value: 'company' },
		{ label: 'None', value: 'none' },
	];
	EQBEmp = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }];
	CivilStatues = [
		{ label: 'Single', value: 'single' },
		{ label: 'Married', value: 'married' },
		{ label: 'Widowed', value: 'widowed' },
		{ label: 'Legally Separated', value: 'legallySeparated' },
	];
	checkBoxItem = [
		{ label: 'Owned', value: 'owned' },
		{ label: 'Living with Parents/Relative', value: 'living' },
		{ label: 'Company Provided', value: 'company' },
		{ label: 'Mortgaged', value: 'mortgaged' },
		{ label: 'Rented', value: 'rented' },
	];
	NumberDependent = [
		{ label: 'Children', value: 'children' },
		{ label: 'Other', value: 'other' },
	];
	Declaration = [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }];
	DeclarationCompany = [
		{ label: 'Yes', value: 'yes' },
		{ label: 'No', value: 'noo' },
	];

	onBorrowerSignatureAbovePrintedNameUpdate = (e) =>
		this.setState({
			borrowerSignatureAbovePrintedName: e.target.value,
		});

	onDateUndertakingUpdate = (e) =>
		this.setState({
			dateUndertaking: e.target.value,
		});

	onHideDialog = () => {
		this.setState({ dialogVisible: false });
	};

	onAutoFill = async () => {
		try {
			const {
				tempFirstName,
				tempMiddleName,
				tempLastName,
				tempDOB,
			} = this.state;

			if (tempFirstName.length <= 0) {
				await this.setState({
					validFirstName: true,
					validFirstNameError: 'First Name is required',
				});
			} else {
				await this.setState({
					validFirstName: false,
					validFirstNameError: '',
				});
			}

			if (tempMiddleName.length <= 0) {
				await this.setState({
					validMiddleName: true,
					validMiddleNameError: 'Middle Name is required',
				});
			} else {
				await this.setState({
					validMiddleName: false,
					validMiddleNameError: '',
				});
			}

			if (tempLastName.length <= 0) {
				await this.setState({
					validLastName: true,
					validLastNameError: 'Last Name is required',
				});
			} else {
				await this.setState({
					validLastName: false,
					validLastNameError: '',
				});
			}

			if (tempDOB.length <= 0) {
				await this.setState({
					validDOB: true,
					validDOBError: 'DOB is required',
				});
			} else {
				await this.setState({
					validDOB: false,
					validDOBError: '',
				});
			}

			const {
				validFirstName,
				validMiddleName,
				validLastName,
				validDOB,
			} = this.state;

			if (!(validFirstName || validMiddleName || validLastName || validDOB)) {
				const payload = {
					firstName: tempFirstName,
					secondName: tempMiddleName,
					lastName: tempLastName,
					dob: moment(tempDOB).format('YYYY-MM-DD'),
				};

				console.log(payload);

				const res = await axios({
					url:
						'https://swsmcrmcsi.execute-api.ap-southeast-1.amazonaws.com/dev/kycdetails',
					method: 'POST',
					data: {
						action: 'getKycDetails',
						payload,
					},
				});

				console.log(res);

				if (res.data) {
					const populatedData = getPopulatedState(res.data.body);

					this.setState(
						{
							formData: populatedData,
							dialogVisible: false,
							openAll: true,
							isDataPopulated: 'showSuccess',
							dataMessage: 'Data Populated',
						},
						() =>
							this.props.add_global_message({
								message: this.state.dataMessage,
								messageType: 'success',
								flash: true,
							}),
					);

					setTimeout(() => {
						this.setState({ isDataPopulated: 'hide' });
					}, 3000);
				}
			}
		} catch (error) {
			console.log(error);

			this.setState({
				formLoading: false,
				dialogVisible: false,
				dataMessage: 'Data not found',
				isDataPopulated: 'showError',
			});

			setTimeout(() => {
				this.setState({ isDataPopulated: 'hide' });
			}, 3000);

			// const { status, data } = error.response;

			// console.log(status, data);
		}
	};

	/*methods for Loan info */
	onLoanPurposeUpdate = (e) => {
		const loanPurpose = { ...this.state.formData.loanInfo.loanPurpose };

		// check if purpose is already exist if "yes" remove it
		const index = loanPurpose.value.indexOf(e.target.value);
		console.log(index);
		if (index === -1) {
			loanPurpose.value.push(e.target.value);
		} else {
			loanPurpose.value.splice(index, 1);
		}

		let isDrafted;
		if (this.state.draftBtnDisabled) {
			isDrafted = false;
		}

		loanPurpose.isError = loanPurpose.value.length > 0 ? false : true;
		this.setState({
			formData: {
				...this.state.formData,
				loanInfo: {
					...this.state.formData.loanInfo,
					loanPurpose,
				},
			},
			draftBtnDisabled: isDrafted,
		});
	};

	updateValue = (e, target, key = 'value') => {
		let formData = JSON.stringify(this.state.formData);
		formData = JSON.parse(formData);
		const data = { ...formData[target] };
		let isDrafted;
		if (this.state.draftBtnDisabled) {
			isDrafted = false;
		}
		//debugger;
		console.log(data[e.target.name].value);
		if (e.target.name === 'previousCheckbox') {
			data[e.target.name].value = !data[e.target.name].value;
			this.setState(
				{
					formData: {
						...formData,
						[target]: {
							...data,
						},
					},
					draftBtnDisabled: isDrafted,
				},
				() => console.log(this.state),
			);
		} else {
			this.fieldReset(e, target, key, data);
			/** For Auto Age Calcultate  */
			//debugger;
			this.autoAgeCal(e, data);

			//data[e.target.name]["field"] = "";

			data[e.target.name][key] = e.target.value;
			/** Checkbox method execute . */

			/* data[e.target.name][key] = e.checked;
			if (data[e.target.name][key]) {
				data[e.target.name][key] = false;
			} else {
				data[e.target.name][key] = true;
			} */

			this.checkboxValue(e, target, key, data);

			/* if (
			formData["businessInfo"]["serviceLength"]["years"].trim.length !== 0 ||
			formData["businessInfo"]["serviceLength"]["months"].trim.length !== 0
			) {
			formData["businessInfo"]["serviceLength"]["isError"] = "false";
			formData["businessInfo"]["serviceLength"]["ErrorMsg"] = "";
		}
		
		if (
			formData["businessInfo"]["totalWorking"]["years"].trim.length !== 0 ||
			formData["businessInfo"]["totalWorking"]["months"].trim.length !== 0
			) {
				formData["businessInfo"]["totalWorking"]["isError"] = "false";
				formData["businessInfo"]["totalWorking"]["ErrorMsg"] = "";
			} */

			this.setState(
				{
					formData: {
						...formData,
						[target]: {
							...data,
						},
					},
					draftBtnDisabled: isDrafted,
				},
				() => console.log(this.state),
			);
		}
	};

	validationHandler = (func, parentName, childState) => {
		console.log('func');
		let formData = JSON.stringify(this.state.formData);
		formData = JSON.parse(formData);
		childState = func(childState);

		let parentData = JSON.stringify(formData[parentName]);
		parentData = JSON.parse(parentData);
		parentData[childState.name] = childState;
		formData[parentName] = parentData;
		this.setState(
			{
				formData: formData,
			},
			() => console.log(this.state.formData),
		);
	};

	fieldReset = (e, target, key, data) => {
		data[e.target.name]['isError'] = false;
		data[e.target.name]['ErrorMsg'] = '';
	};

	autoAgeCal = (e, data) => {
		if (e.target.name === 'personalDOB') {
			const payment = this.state.formData.loanInfo.paymentTerm.value;

			if (payment != null) {
				const term = payment / 12;
				const dob = e.target.value;
				const age = getAge(dob);
				const pay = term + age;
				data['personalAge'].value = age;
				if (pay > 65) {
					data['personalAge'].value = age;

					data['personalDOB'].isErrors = true;
					return;
				}
				if (age >= 21 && pay <= 65) {
					return;
				}
				if (age < 21) {
					data['personalDOB']['isError'] = true;
					data['personalDOB']['ErrorMsg'] = 'Age must be between 21 to 65. ';
					return;
				}
			}

			if (payment === null) {
				const dob = e.target.value;
				const age = getAge(dob);
				data['personalAge'].value = age;
				if (age >= 21 && age <= 65) {
					data['personalAge'].value = age;

					return;
				} else {
					data['personalAge'].value = age;

					data['personalDOB']['isError'] = true;
					data['personalDOB']['ErrorMsg'] = 'Age must be between 21 to 65. ';
					return;
				}
			}
			/*	if (age >= 21 && age <= 65) {
				data["personalAge"].value = age;
			} else {
				console.log("Invalid Date of Birth");
				data["personalDOB"]["isError"] = true;
				data["personalDOB"]["ErrorMsg"] = "Age must be between 21 to 65 ";
			}*/
		}
	};

	messageClose = (target) => {
		let formData = JSON.stringify(this.state.formData);
		formData = JSON.parse(formData);
		const data = { ...formData[target] };
		data['personalDOB'].isErrors = false;

		this.setState({
			formData: {
				...formData,
				[target]: {
					...data,
				},
			},
		});
	};

	checkboxValue = (e, target, key, data) => {
		if (e.target.name === 'personalCheckBox') {
			data[e.target.name][key] = e.checked;

			//this.state.formData.

			if (e.checked === true) {
				data['personalPermanentHomeAddress'].value =
					data['personalPersentHomeAddress'].value;
				data['personalPermanentyear'].value = data['personalPresentyear'].value;
				data['personalPermanentMonth'].value =
					data['personalPresentMonth'].value;
				data['personalPermanentCheckbox'].value =
					data['personalPresentCheckbox'].value;
			}
			if (e.checked === false) {
				data['personalPermanentHomeAddress'].value = '';
				data['personalPermanentyear'].value = '';
				data['personalPermanentMonth'].value = '';
				data['personalPermanentCheckbox'].value = '';
			}
		}
	};

	checkValidation = (target, e, key) => {
		let formData = JSON.stringify(this.state.formData);
		formData = JSON.parse(formData);
		const data = { ...formData[target] };
		if (key === 'mobile') {
			if (e.target.value.length < 10 && e.target.value !== '') {
				data[e.target.name]['isError'] = true;
				data[e.target.name]['ErrorMsg'] = 'Invalid Phone Number';
			}
		}
		if (key === 'email') {
			let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!re.test(e.target.value) && e.target.value !== '') {
				data[e.target.name]['isError'] = true;
				data[e.target.name]['ErrorMsg'] = 'Invalid Email-ID';
			}
		}
		if (key === 'month') {
			if (e.target.value > 11) {
				data[e.target.name]['isError'] = true;
				data[e.target.name]['ErrorMsg'] = 'Invalid Month';
			}
		}
		/* if (key === "loanAmount") {
			if (e.target.value !== "") {
				console.log(e.target.value);
				if (e.target.value < 15000 || e.target.value > 1000000) {
					data[e.target.name]["isError"] = true;
					data[e.target.name]["ErrorMsg"] =
						"Loan Amount must be between 15000 to 1000000. ";
				}
			}
		} */
		this.setState({
			formData: {
				...formData,
				[target]: {
					...data,
				},
			},
		});

		/*	if (data[target.name].value < 10 && data[target.name] !== "") {
			data[target.name].isError = true;
			data[target.name].ErrorMsg = "invalid number";
			this.setState({
				formData: {
					...formData,
					[target]: {
						...data,
					},
				},
			});
		}*/
	};

	onDateUndertakingUpdate = (e) => {
		let isDrafted;
		if (this.state.isDrafted) {
			isDrafted = false;
		}
		this.setState({
			dateUndertaking: e.target.value,
			draftBtnDisabled: isDrafted,
		});
	};

	onEmailValidation = (e) => {
		const user = this.state.emailAddress;
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (user === '') {
			this.setState({
				EmailError: 'Email is Required',
				isEmailError: true,
			});
			return;
		}
		if (!re.test(user)) {
			this.setState({
				EmailError: 'Invalid Email Address',
				isEmailError: true,
			});
			return;
		}
	};

	/**Spouse Field Method */

	onSpouseOfficeValid = () => {
		const user = this.state.formData.spouseInfo.spouseOffNumber;
		const user2 = this.state.formData.personalInfo.personalMobileNumber;
		if (
			(user.value.length < 10 && user.value !== '') ||
			(user2.value.length < 10 && user2.value !== '')
		) {
			this.setState({
				isSpouseOffError: true,
				spouseOffError: 'Invalid Phone Number',
			});
		}
	};

	onSpouseMobileValid = () => {
		console.log('executed');
		const user = this.state.formData.spouseInfo.spouseMobileNumber;
		console.log(user);
		if (user.value.length < 10 && user.value !== '') {
			this.setState({
				isSpouseMobileError: true,
				spouseMobilError: 'Invalid Mobile Number',
			});
		}
	};

	onSpouseEmailValidation = (e) => {
		const user = this.state.spouseEmail;

		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!re.test(user) && user !== '') {
			this.setState({
				spouseEmailError: 'Invalid Email Address',
				isSpouseEmailError: true,
			});
			return;
		}
	};

	/************* Other Information */

	removeEmpty = (obj) => {
		Object.keys(obj).forEach((key) => {
			if (obj[key] && typeof obj[key] === 'object') this.removeEmpty(obj[key]);
			else if (obj[key] === null || obj[key] === '' || obj[key] === undefined)
				delete obj[key];
		});
		return obj;
	};

	validateRequiredFields = (obj) => {
		try {
			Object.keys(obj).forEach((key) => {
				if (obj[key] && typeof obj[key] === 'object') {
					this.validateRequiredFields(obj[key]);
				} else if (
					(obj.required && !obj.value) ||
					(Array.isArray(obj.value) && !obj.value.length)
				) {
					if (
						(obj.name === 'serviceLength' || obj.name === 'totalWorking') &&
						obj.years &&
						obj.years.trim() &&
						obj.months &&
						obj.months.trim()
					) {
					} else {
						this.formValid = false;
					}
				}
			});
		} catch (error) {
			console.log(this.error);
		}
	};

	validateInputs = (obj) => {
		try {
			Object.keys(obj).forEach((key) => {
				if (obj[key] && typeof obj[key] === 'object') {
					this.validateInputs(obj[key]);
				} else if (obj.isError && obj.ErrorMsg) {
					this.formValid = false;
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	showResponse = (response) => {
		if (response && response.data) {
			if (response.data.status === 200) {
				this.messages.clear();
				this.messages.show({
					severity: 'success',
					summary: '',
					detail: `${response.data.message}`,
					sticky: true,
				});
			} else if (response.data.status === 400) {
				this.messages.clear();
				this.messages.show({
					severity: 'error',
					summary: '',
					detail: `${response.data.message}`,
					sticky: true,
				});
			} else {
			}
		}
	};

	onSubmitButton = (event) => {
		try {
			if (event && event.preventDefault) event.preventDefault();
			//	debugger;
			this.formValid = true;
			this.validateRequiredFields(this.state.formData);
			this.validateInputs(this.state.formData);
			window.scrollTo(0, 0);

			if (!this.formValid) {
				/* this.messages.clear();
				this.messages.show({
					severity: "error",
					summary: "",
					detail: `Please rectify the errors in the form below.`,
					sticky: true,
				}); */

				let copyOfState = _.cloneDeep(this.state.formData);
				copyOfState = validateEquicomForm(copyOfState);
				console.log(copyOfState);

				/* 				for (let parentKey in copyOfState) {
					for (let key in copyOfState[parentKey]) {
						if (
							(typeof copyOfState[parentKey][key]["value"] === "string" &&
								copyOfState[parentKey][key]["value"].length === 0) ||
							(Array.isArray(copyOfState[parentKey][key]["value"]) &&
								copyOfState[parentKey][key]["value"].length === 0) ||
							(copyOfState[parentKey][key]["value"] === null &&
								copyOfState[parentKey][key]["required"] === true) ||
							(copyOfState[parentKey][key]["value"] === undefined &&
								copyOfState[parentKey][key]["required"])
						) {
							copyOfState[parentKey][key]["isError"] = true;
							copyOfState[parentKey][key]["ErrorMsg"] = "Required field";
						}
					}
				}
 */
				// loan mode check
				/* 				if (
					copyOfState["loanInfo"]["loanMode"]["value"] !== "managersCheck" &&
					(copyOfState["loanInfo"]["loanMode"]["field"] === "" ||
						!copyOfState["loanInfo"]["loanMode"]["field"])
				) {
					copyOfState["loanInfo"]["loanMode"]["isError"] = true;
					copyOfState["loanInfo"]["loanMode"]["ErrorMsg"] = "Required field";
				}

				copyOfState["businessInfo"]["serviceLength"]["isError"] = "false";
				copyOfState["businessInfo"]["serviceLength"]["ErrorMsg"] = "";

				copyOfState["businessInfo"]["totalWorking"]["isError"] = "false";
				copyOfState["businessInfo"]["totalWorking"]["ErrorMsg"] = ""; */
				/* if (
					copyOfState["businessInfo"]["serviceLength"]["years"].trim.length ===
						0 ||
					copyOfState["businessInfo"]["serviceLength"]["months"].trim.length ===
						0
				) {
					copyOfState["businessInfo"]["serviceLength"]["isError"] = "true";
					copyOfState["businessInfo"]["serviceLength"]["ErrorMsg"] =
						"Required field";
				}

				if (
					copyOfState["businessInfo"]["```totalWorking```"]["years"].trim.length ===
						0 ||
					copyOfState["businessInfo"]["totalWorking"]["months"].trim.length ===
						0
				) {
					copyOfState["businessInfo"]["totalWorking"]["isError"] = "true";
					copyOfState["businessInfo"]["totalWorking"]["ErrorMsg"] =
						"Required field";
				}
 */

				this.setState(
					{
						formData: copyOfState,
						formValid: false,
						submitMessage: 'Please correct the errors down below.',
						showSubmitMessage: true,
					},
					() =>
						this.props.add_global_message({
							message: this.state.submitMessage,
							messageType: this.state.formValid === true ? 'success' : 'error',
							flash: true,
						}),
				);
			} else {
				const auth = JSON.parse(localStorage.getItem('auth'));
				const idToken = auth.IdToken;
				/* const authUserName = localStorage.getItem(
					`CognitoIdentityServiceProvider.${config.userPoolWebClientId}.LastAuthUser`,
				);
				const idToken = localStorage.getItem(
					`CognitoIdentityServiceProvider.${config.userPoolWebClientId}.${authUserName}.idToken`,
				); */
				axios({
					method: `post`,
					url: `https://hjk7yciihi.execute-api.ap-southeast-1.amazonaws.com/dev/equicomform`,
					headers: { Authorization: `Bearer ${idToken}` },
					data: {
						//id: `test@test.com`,
						isDrafted: false,
						isSubmitted: true,
						isCibiPopulated: false,
						formData: this.removeEmpty(_.cloneDeep(this.state.formData)),
					},
				}).then(
					(response) => {
						this.setState(
							{
								draftBtnDisabled: true,
								submitBtnDisabled: true,
								formValid: true,
								submitMessage:
									'Congrats, Your loan application form has been successfully submitted.',
								showSubmitMessage: true,
							},
							() =>
								this.props.add_global_message({
									message: this.state.submitMessage,
									messageType:
										this.state.formValid === true ? 'success' : 'error',
									flash: true,
								}),
						);
						//	this.showResponse(response);
					},
					(reason) => {
						console.log(reason);
					},
				);
			}
		} catch (error) {}
	};

	onDraftButton = (event) => {
		try {
			if (event && event.preventDefault) event.preventDefault();
			const auth = JSON.parse(localStorage.getItem('auth'));
			const idToken = auth.IdToken;
			/* const authUserName = localStorage.getItem(
				`CognitoIdentityServiceProvider.${config.userPoolWebClientId}.LastAuthUser`,
			);
			const idToken = localStorage.getItem(
				`CognitoIdentityServiceProvider.${config.userPoolWebClientId}.${authUserName}.idToken`,
			); */
			axios({
				method: `post`,
				url: `https://hjk7yciihi.execute-api.ap-southeast-1.amazonaws.com/dev/equicomform`,
				headers: { Authorization: `Bearer ${idToken}` },
				data: {
					isDrafted: true,
					isSubmitted: false,
					isCibiPopulated: false,
					formData: this.removeEmpty(_.cloneDeep(this.state.formData)),
				},
			}).then((reason) => {
				console.log(reason);
				this.setState(
					{
						draftBtnDisabled: true,
						showDraftMessage: true,
					},
					() =>
						this.props.add_global_message({
							message: 'Application form saved',
							messageType: 'success',
							flash: true,
						}),
				);
			});
		} catch (error) {
			console.log(error);
		}
		//saveToLocalStorage(this.state);
		window.scrollTo(0, 0);
	};

	render() {
		// props for loan info
		const loanInfo = {
			loanPurposes: this.loanPurpose,
			loanPurpose: this.state.formData.loanInfo.loanPurpose,
			updateLoanPurpose: this.onLoanPurposeUpdate,
			loanAmount: this.state.formData.loanInfo.loanAmount,
			updateValue: this.updateValue,
			loanModes: this.loanModes,
			loanMode: this.state.formData.loanInfo.loanMode,
			paymentTerms: this.paymentTerms,
			paymentTerm: this.state.formData.loanInfo.paymentTerm,
			checkValidation: this.checkValidation,
			isSubmitted: this.isSubmitted,
			validationHandler: this.validationHandler,
		};

		const personalInfo = {
			dateTemplate: this.dateTemplate,
			updateValue: this.updateValue,
			personalName: this.state.formData.personalInfo.personalName,
			personalMiddle: this.state.formData.personalInfo.personalMiddle,
			personalLast: this.state.formData.personalInfo.personalLast,
			personalMother: this.state.formData.personalInfo.personalMother,
			personalDOB: this.state.formData.personalInfo.personalDOB,
			personalAge: this.state.formData.personalInfo.personalAge,
			onDobEnter: this.onDobEnter,
			personalPlaceOfBirth: this.state.formData.personalInfo
				.personalPlaceOfBirth,
			personalCivilStatus: this.state.formData.personalInfo.personalCivilStatus,
			CivilStatues: this.CivilStatues,
			personalGender: this.state.formData.personalInfo.personalGender,
			genders: this.genders,
			messageClose: this.messageClose,
			personalNationality: this.state.formData.personalInfo.personalNationality,
			personalNumberDependent: this.state.formData.personalInfo
				.personalNumberDependent,
			NumberDependent: this.NumberDependent,
			personalEducationAttainment: this.state.formData.personalInfo
				.personalEducationAttainment,
			EducationAttend: this.EducationAttend,
			personalHomeNumber: this.state.formData.personalInfo.personalHomeNumber,
			homePhoneValidation: this.onPhoneValidation,
			checkValidation: this.checkValidation,
			personalMobileNumber: this.state.formData.personalInfo
				.personalMobileNumber,
			onSpouseOfficeValid: this.onSpouseOfficeValid,
			personalEmail: this.state.formData.personalInfo.personalEmail,

			personalPersentHomeAddress: this.state.formData.personalInfo
				.personalPersentHomeAddress,
			presentZipCode: this.state.formData.personalInfo.presentZipCode,
			personalPresentyear: this.state.formData.personalInfo.personalPresentyear,
			personalPresentMonth: this.state.formData.personalInfo
				.personalPresentMonth,
			personalPresentCheckbox: this.state.formData.personalInfo
				.personalPresentCheckbox,
			personalPerviousHomeAddress: this.state.formData.personalInfo
				.personalPerviousHomeAddress,
			perviousZipCode: this.state.formData.personalInfo.perviousZipCode,
			personalPerviousyear: this.state.formData.personalInfo
				.personalPerviousyear,
			personalPerviousMonth: this.state.formData.personalInfo
				.personalPerviousMonth,
			personalPerviousCheckbox: this.state.formData.personalInfo
				.personalPerviousCheckbox,
			personalPermanentHomeAddress: this.state.formData.personalInfo
				.personalPermanentHomeAddress,
			permanentZipCode: this.state.formData.personalInfo.permanentZipCode,
			personalPermanentyear: this.state.formData.personalInfo
				.personalPermanentyear,
			personalPermanentMonth: this.state.formData.personalInfo
				.personalPermanentMonth,
			personalPermanentCheckbox: this.state.formData.personalInfo
				.personalPermanentCheckbox,
			checkBoxItem: this.checkBoxItem,
			previousCheckbox: this.state.formData.personalInfo.previousCheckbox,
			personalCheckBox: this.state.formData.personalInfo.personalCheckBox,
			personalSourceFund: this.state.formData.personalInfo.personalSourceFund,
			SourceFund: this.SourceFund,
			personalCarOwner: this.state.formData.personalInfo.personalCarOwner,
			CarOwnerShip: this.CarOwnerShip,
			personalEqBEmployee: this.state.formData.personalInfo.personalEqBEmployee,
			personalDirectorDecleration: this.state.formData.personalInfo
				.personalDirectorDecleration,
			personalDOSDecleration: this.state.formData.personalInfo
				.personalDOSDecleration,
			EQBEmp: this.EQBEmp,
			Declaration: this.Declaration,

			DeclarationCompany: this.DeclarationCompany,
			isSubmitted: this.isSubmitted,
		};

		const spouseInfo = {
			updateValue: this.updateValue,
			checkValidation: this.checkValidation,
			spouseFirstName: this.state.formData.spouseInfo.spouseFirstName,
			spouseMiddleName: this.state.formData.spouseInfo.spouseMiddleName,
			spouseLastName: this.state.formData.spouseInfo.spouseLastName,
			spouseBusName: this.state.formData.spouseInfo.spouseBusName,
			spousePosition: this.state.formData.spouseInfo.spousePosition,
			spouseBusAddress: this.state.formData.spouseInfo.spouseBusAddress,
			spouseDOB: this.state.formData.spouseInfo.spouseDOB,
			spouseOffNumber: this.state.formData.spouseInfo.spouseOffNumber,
			spouseMobileNumber: this.state.formData.spouseInfo.spouseMobileNumber,
			spouseEmail: this.state.formData.spouseInfo.spouseEmail,

			spouseOffValidation: this.onSpouseOfficeValid,
			spouseOffError: this.state.spouseOffError,
			isSpouseOffError: this.state.isSpouseOffError,
			spouseMobileValidation: this.onSpouseMobileValid,
			isSpouseMobileError: this.state.isSpouseMobileError,
			spouseMobileError: this.state.spouseMobilError,
			onSpouseEmailValidation: this.onSpouseEmailValidation,
			spouseEmailError: this.state.spouseEmailError,
			isSpouseEmailError: this.state.isSpouseEmailError,
			isSubmitted: this.isSubmitted,
			spouseZipCode: this.state.formData.spouseInfo.spouseZipCode,
		};

		const otherInfo = {
			checkValidation: this.checkValidation,
			dateTemplate: this.dateTemplate,
			updateValue: this.updateValue,
			otherPersonalName: this.state.formData.otherInfo.otherPersonalName,
			otherRelationBorrower: this.state.formData.otherInfo
				.otherRelationBorrower,
			otherTelephoneNumber: this.state.formData.otherInfo.otherTelephoneNumber,
			otherHomeAddress: this.state.formData.otherInfo.otherHomeAddress,
			otherCreditCardIssueBank: this.state.formData.otherInfo
				.otherCreditCardIssueBank,
			otherCardNumber: this.state.formData.otherInfo.otherCardNumber,
			otherCardLimit: this.state.formData.otherInfo.otherCardLimit,
			otherExpirydate: this.state.formData.otherInfo.otherExpDate,
			otherLoanAccount: this.state.formData.otherInfo.otherLoanAccount,
			otherTypeLoan: this.state.formData.otherInfo.otherTypeLoan,
			otherOutstandingBalance: this.state.formData.otherInfo
				.otherOutstandingBalance,
			otherMonthlyPayment: this.state.formData.otherInfo.otherMonthlyPayment,
			otherTelError: this.state.otherTelError,
			isOtherTelError: this.state.isOtherTelError,
			isSubmitted: this.isSubmitted,
			otherZipCode: this.state.formData.otherInfo.otherZipCode,
		};

		const businessInfo = {
			checkValidation: this.checkValidation,
			updateValue: this.updateValue,
			businessName: this.state.formData.businessInfo.businessName,
			businessNature: this.state.formData.businessInfo.businessNature,
			businessAddress: this.state.formData.businessInfo.businessAddress,
			employmentTypes: this.employmentTypes,
			employmentType: this.state.formData.businessInfo.employmentType,
			employmentStatuses: this.employmentStatuses,
			employmentStatus: this.state.formData.businessInfo.employmentStatus,
			ranks: this.ranks,
			rank: this.state.formData.businessInfo.rank,
			position: this.state.formData.businessInfo.position,
			gsisNumber: this.state.formData.businessInfo.gsisNumber,
			tinNumber: this.state.formData.businessInfo.tinNumber,
			dateOfHire: this.state.formData.businessInfo.dateOfHire,
			serviceLength: this.state.formData.businessInfo.serviceLength,
			totalWorking: this.state.formData.businessInfo.totalWorking,
			telephoneNumberOffice: this.state.formData.businessInfo
				.telephoneNumberOffice,
			faxNumberOffice: this.state.formData.businessInfo.faxNumberOffice,
			emailAddressOffice: this.state.formData.businessInfo.emailAddressOffice,
			hrContactPerson: this.state.formData.businessInfo.hrContactPerson,
			officeTelephoneNumber2: this.state.formData.businessInfo
				.officeTelephoneNumber2,
			timeDayCall: this.state.formData.businessInfo.timeDayCall,
			isSubmitted: this.isSubmitted,
			businessZipCode: this.state.formData.businessInfo.businessZipCode,
			previousBusinessName: this.state.formData.businessInfo
				.previousBusinessName,
			previousLengthOfService: this.state.formData.businessInfo
				.previousLengthOfService,
			previousPosition: this.state.formData.businessInfo.previousPosition,
		};

		const DraftButton = {
			onDraftButton: this.onDraftButton,
			button: this.state,
			onSubmitButton: this.onSubmitButton,
		};

		const Undertaking = {
			updateValue: this.updateValue,
			borrowerSignatureAbovePrintedName: this.state.formData.undertaking
				.borrowerSignatureAbovePrintedName,
			dateUndertaking: this.state.formData.undertaking.dateUndertaking,
		};

		const DocumentRequirementInfo = {
			onClick: this.onClick,
			onHide: this.onHide,
			visible: this.state.visible,
		};

		const footer = (
			<div className="align-left">
				<Button label="Submit" icon="pi pi-check" onClick={this.onAutoFill} />
				<Button
					label="Cancel"
					icon="pi pi-times"
					onClick={this.onHideDialog}
					className="p-button-secondary"
				/>
			</div>
		);

		const { dialogVisible, openAll, isDataPopulated, dataMessage } = this.state;

		const { tempFirstName, tempMiddleName, tempLastName, tempDOB } = this.state;

		const {
			requiredFirstName,
			requiredMiddleName,
			requiredLastName,
			requiredDOB,
		} = this.state;

		const {
			validFirstName,
			validMiddleName,
			validLastName,
			validDOB,
		} = this.state;

		const {
			validFirstNameError,
			validMiddleNameError,
			validLastNameError,
			validDOBError,
		} = this.state;

		return (
			<>
				<Dialog
					header="Auto Fill"
					visible={dialogVisible}
					/* style={{ width: '40vw' }} */
					footer={footer}
					className="cibi--dialog"
					onHide={this.onHideDialog}
				>
					<p
						style={{
							margin: '0 5px',
						}}
					>
						If you want to auto fill the form using CIBI, then please enter the
						following data:
					</p>
					<div className="mt-2 p-col-rev">
						<div className="input-section p-float-label input-fields">
							<InputText
								id={1}
								value={tempFirstName}
								onChange={(e) => {
									this.setState({
										tempFirstName: e.target.value,
									});
								}}
								name={tempFirstName}
								keyfilter={'alpha'}
								onPaste={(e) => e.preventDefault()}
							/>
							<label htmlFor={1}>
								{'First Name'}{' '}
								{requiredFirstName ? (
									<span className="required-field">*</span>
								) : null}
							</label>
						</div>

						{validFirstName && (
							<span style={{ color: 'red', margin: '0 5px' }}>
								{validFirstNameError}
							</span>
						)}
					</div>
					<div className="mt-2 p-col-rev">
						<div className="input-section p-float-label input-fields">
							<InputText
								id={2}
								value={tempMiddleName}
								onChange={(e) => {
									this.setState({
										tempMiddleName: e.target.value,
									});
								}}
								name={tempMiddleName}
								keyfilter={'alpha'}
								onPaste={(e) => e.preventDefault()}
							/>
							<label htmlFor={2}>
								{'Middle Name'}{' '}
								{requiredMiddleName ? (
									<span className="required-field">*</span>
								) : null}
							</label>
						</div>

						{validMiddleName && (
							<span style={{ color: 'red', margin: '0 5px' }}>
								{validMiddleNameError}
							</span>
						)}
					</div>
					<div className="mt-2 p-col-rev">
						<div className="input-section p-float-label input-fields">
							<InputText
								id={3}
								value={tempLastName}
								onChange={(e) => {
									this.setState({
										tempLastName: e.target.value,
									});
								}}
								name={tempLastName}
								keyfilter={'alpha'}
								onPaste={(e) => e.preventDefault()}
							/>
							<label htmlFor={3}>
								{'Last Name'}{' '}
								{requiredLastName ? (
									<span className="required-field">*</span>
								) : null}
							</label>
						</div>

						{validLastName && (
							<span style={{ color: 'red', margin: '0 5px' }}>
								{validLastNameError}
							</span>
						)}
					</div>
					<div className="p-datepicker-today mt-2 p-col-rev">
						<div className="input-section p-float-label input-fields">
							<Calendar
								value={tempDOB}
								onChange={(e) => {
									this.setState({
										tempDOB: e.target.value,
									});
								}}
								monthNavigator={true}
								yearNavigator={true}
								yearRange={'1900:2019'}
								readOnlyInput={true}
								name={tempDOB}
							/>
							<label htmlFor={4}>
								{'Date Of Birth'}{' '}
								{requiredDOB ? <span className="required-field">*</span> : null}
							</label>
						</div>
						{validDOB && (
							<span style={{ color: 'red', margin: '0 5px' }}>
								{validDOBError}
							</span>
						)}
					</div>
				</Dialog>
				<ApplicationForm
					loanInfo={loanInfo}
					businessInfo={businessInfo}
					personalInfo={personalInfo}
					spouseInfo={spouseInfo}
					otherInfo={otherInfo}
					active={this.state.activeIndex}
					button={DraftButton}
					Undertaking={Undertaking}
					DocumentRequirementInfo={DocumentRequirementInfo}
					openAll={openAll}
					isSubmitted={this.isSubmitted}
				/>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ add_global_message }, dispatch);

export default connect(
	null,
	mapDispatchToProps,
)(ApplicationFormContainer);
