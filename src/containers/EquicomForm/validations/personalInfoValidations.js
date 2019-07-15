/* =====================================================
    FILENAME:		Personal Info Validations
======================================================== */

import {
	validateRequiredField,
	validateMaximumFieldLength,
	validateCharacterOnlyString,
	validateNumberOnlyString,
	validateMaximumValue,
	validateMinimumValue,
	validateMaximumAddressLength,
	validateZipCode,
	validateRequiredArray,
	validateWhiteSpace,
	validateCharacterWithSpace,
	validateEmail,
	validateMobileNumber,
	validateTelephoneNumber,
	validateMonth,
	validateYear,
} from './common';

/* ---------------- First Name Validation ----------------- */
export const validatePersonalName = (personalName) => {
	// required check
	if (!validateRequiredField(personalName.value)) {
		personalName.isError = true;
		personalName.ErrorMsg = 'First Name is required';
	} else if (!validateWhiteSpace(personalName.value)) {
		personalName.isError = true;
		personalName.ErrorMsg = 'Whitespace is not allowed';
	}
	//character only string
	else if (!validateCharacterOnlyString(personalName.value)) {
		personalName.isError = true;
		personalName.ErrorMsg = 'First Name should only contain letters';
	}
	// maximum length check (20)
	else if (!validateMaximumFieldLength(personalName.value)) {
		personalName.isError = true;
		personalName.ErrorMsg = `Can't be more than 20 characters`;
	} else {
		personalName.isError = false;
		personalName.ErrorMsg = '';
	}
	//console.log(personalName);
	return personalName;
};

/* ---------------- Middle Name Validation ----------------- */
export const validatePersonalMiddle = (personalMiddle) => {
	// required check
	if (!validateRequiredField(personalMiddle.value)) {
		personalMiddle.isError = true;
		personalMiddle.ErrorMsg = 'Middle Name is required';
	} //character only string
	else if (!validateCharacterOnlyString(personalMiddle.value)) {
		personalMiddle.isError = true;
		personalMiddle.ErrorMsg = 'Middle Name should only contain letters';
	}
	// maximum length check (20)
	else if (!validateMaximumFieldLength(personalMiddle.value)) {
		personalMiddle.isError = true;
		personalMiddle.ErrorMsg = `Can't be more than 20 characters`;
	} else {
		personalMiddle.isError = false;
		personalMiddle.ErrorMsg = '';
	}
	return personalMiddle;
};

/* ---------------- Last Name Validation ----------------- */
export const validatePersonalLast = (personalLast) => {
	// required check
	if (!validateRequiredField(personalLast.value)) {
		personalLast.isError = true;
		personalLast.ErrorMsg = 'Middle Name is required';
	}
	//character only string
	else if (!validateCharacterOnlyString(personalLast.value)) {
		personalLast.isError = true;
		personalLast.ErrorMsg = 'Last Name should only contain letters';
	}
	// maximum length check (20)
	else if (!validateMaximumFieldLength(personalLast.value)) {
		personalLast.isError = true;
		personalLast.ErrorMsg = `Can't be more than 20 characters`;
	} else {
		personalLast.isError = false;
		personalLast.ErrorMsg = '';
	}
	return personalLast;
};

/* ---------------- DOB Validation ----------------- */
export const validatePersonalDOB = (personalLast) => {
	// required check
	if (!validateRequiredField(personalLast.value)) {
		personalLast.isError = true;
		personalLast.ErrorMsg = 'Date of Birth is required';
	} else {
		personalLast.isError = false;
		personalLast.ErrorMsg = '';
	}
	return personalLast;
};

/* ---------------- PLace Of Birth Validation ----------------- */
export const validatePersonalPlaceOfBirth = (personalPlaceOfBirth) => {
	// required check
	if (!validateRequiredField(personalPlaceOfBirth.value)) {
		personalPlaceOfBirth.isError = true;
		personalPlaceOfBirth.ErrorMsg = 'Place of Birth is required';
	} //character only string
	else if (!validateCharacterOnlyString(personalPlaceOfBirth.value)) {
		personalPlaceOfBirth.isError = true;
		personalPlaceOfBirth.ErrorMsg =
			'Place of birth should only contain letters';
	}
	// maximum length check (20)
	else if (!validateMaximumFieldLength(personalPlaceOfBirth.value)) {
		personalPlaceOfBirth.isError = true;
		personalPlaceOfBirth.ErrorMsg = `Can't be more than 20 characters`;
	} else {
		personalPlaceOfBirth.isError = false;
		personalPlaceOfBirth.ErrorMsg = '';
	}
	return personalPlaceOfBirth;
};

/* ---------------- Zip Code Validation ----------------- */
/* export const validatePresentZipCode = (personalPlaceOfBirth) => {
	// required check
	if (!validateRequiredField(personalPlaceOfBirth.value)) {
		personalPlaceOfBirth.isError = true;
		personalPlaceOfBirth.ErrorMsg = 'Place of Birth is required';
	} //character only string
	else if (!validateCharacterOnlyString(personalPlaceOfBirth.value)) {
		personalPlaceOfBirth.isError = true;
		personalPlaceOfBirth.ErrorMsg =
			'Place of birth should only contain letters';
	}
	// maximum length check (20)
	else if (!validateMaximumFieldLength(personalPlaceOfBirth.value)) {
		personalPlaceOfBirth.isError = true;
		personalPlaceOfBirth.ErrorMsg = `Can't be more than 20 characters`;
	} else {
		personalPlaceOfBirth.isError = false;
		personalPlaceOfBirth.ErrorMsg = '';
	}
	return personalPlaceOfBirth;
}; */

/* ---------------- Civil Status Validation ----------------- */
export const validatePersonalCivilStatus = (personalCivilStatus) => {
	// required check
	if (!validateRequiredField(personalCivilStatus.value)) {
		personalCivilStatus.isError = true;
		personalCivilStatus.ErrorMsg = 'Civil Status is required';
	} else {
		personalCivilStatus.isError = false;
		personalCivilStatus.ErrorMsg = '';
	}
	return personalCivilStatus;
};

/* ----------------  Gender Validation ----------------- */
export const validatePersonalGender = (personalGender) => {
	// required check
	if (!validateRequiredField(personalGender.value)) {
		personalGender.isError = true;
		personalGender.ErrorMsg = 'Gender is required';
	} else {
		personalGender.isError = false;
		personalGender.ErrorMsg = '';
	}
	return personalGender;
};

/* ---------------- Number of Dependent Validation ----------------- */
export const validatePersonalNumberDependent = (personalNumberDependent) => {
	// required check -- value
	if (!validateRequiredField(personalNumberDependent.value)) {
		personalNumberDependent.isError = true;
		personalNumberDependent.ErrorMsg = 'Required field';
	}
	// required check -- field
	else if (!validateRequiredField(personalNumberDependent.field)) {
		personalNumberDependent.isError = true;
		personalNumberDependent.ErrorMsg = `Number can't be left empty`;
	}
	// only numbers could be added
	else if (!validateNumberOnlyString(personalNumberDependent.field)) {
		personalNumberDependent.isError = true;
		personalNumberDependent.ErrorMsg = `Only numbers can be added`;
	}
	// max value = 99
	else if (!validateMaximumValue(personalNumberDependent.field, 99)) {
		personalNumberDependent.isError = true;
		personalNumberDependent.ErrorMsg = `Number should be less than 99`;
	}
	// min value = 0
	else if (!validateMinimumValue(personalNumberDependent.field, 1)) {
		personalNumberDependent.isError = true;
		personalNumberDependent.ErrorMsg = `Number should be more than 0`;
	} else {
		personalNumberDependent.isError = false;
		personalNumberDependent.ErrorMsg = '';
	}
	return personalNumberDependent;
};

/* ---------------- Education Attainment Validation ----------------- */
export const validatePersonalEducationAttainment = (
	personalEducationAttainment,
) => {
	// required check
	if (!validateRequiredField(personalEducationAttainment.value)) {
		personalEducationAttainment.isError = true;
		personalEducationAttainment.ErrorMsg =
			'Education attainment field is required';
	}

	if (validateRequiredField(personalEducationAttainment.value)) {
		// required check -- field
		if (!validateRequiredField(personalEducationAttainment.field)) {
			personalEducationAttainment.isError = true;
			personalEducationAttainment.ErrorMsg =
				'Education attainment field is required';
		} else {
			personalEducationAttainment.isError = false;
			personalEducationAttainment.ErrorMsg = '';
		}
	} else {
		personalEducationAttainment.isError = false;
		personalEducationAttainment.ErrorMsg = '';
	}
	return personalEducationAttainment;
};

/* ---------------- Present Address Validation ----------------- */
export const validatePersonalPersentHomeAddress = (
	personalPersentHomeAddress,
) => {
	// required check
	if (!validateRequiredField(personalPersentHomeAddress.value)) {
		personalPersentHomeAddress.isError = true;
		personalPersentHomeAddress.ErrorMsg = 'Required field';
	} else if (!validateMaximumAddressLength(personalPersentHomeAddress.value)) {
		personalPersentHomeAddress.isError = true;
		personalPersentHomeAddress.ErrorMsg = `Can't be more than 300 characters`;
	} else {
		personalPersentHomeAddress.isError = false;
		personalPersentHomeAddress.ErrorMsg = '';
	}
	return personalPersentHomeAddress;
};

/* ---------------- Present Zip code Validation ----------------- */
export const validatePresentZipCode = (presentZipCode) => {
	// required check
	if (!validateRequiredField(presentZipCode.value)) {
		presentZipCode.isError = true;
		presentZipCode.ErrorMsg = 'Zip code is required';
	} //number only string
	else if (!validateNumberOnlyString(presentZipCode.value)) {
		presentZipCode.isError = true;
		presentZipCode.ErrorMsg = 'Zip code should only contain numbers';
	}
	// valid Zip code check
	else if (!validateZipCode(presentZipCode.value)) {
		presentZipCode.isError = true;
		presentZipCode.ErrorMsg = `Invalid zip code`;
	} else {
		presentZipCode.isError = false;
		presentZipCode.ErrorMsg = '';
	}
	return presentZipCode;
};

/* ---------------- Source of Fund Validation ----------------- */
export const validatePersonalSourceFund = (personalSourceFund) => {
	// required check
	if (!validateRequiredArray(personalSourceFund.value)) {
		personalSourceFund.isError = true;
		personalSourceFund.ErrorMsg = 'Atleast one source of fund must be selected';
	} else {
		personalSourceFund.isError = false;
		personalSourceFund.ErrorMsg = '';
	}
	return personalSourceFund;
};

/* ---------------- Car owner Validation ----------------- */
export const validatePersonalCarOwner = (personalCarOwner) => {
	// required check -- value
	if (!validateRequiredField(personalCarOwner.value)) {
		personalCarOwner.isError = true;
		personalCarOwner.ErrorMsg = 'Car ownership is a required field';
	} else {
		personalCarOwner.isError = false;
		personalCarOwner.ErrorMsg = '';
	}

	if (validateRequiredField(personalCarOwner.value)) {
		//---------------- field checks ----------------
		if (
			personalCarOwner.value === 'owned' ||
			personalCarOwner.value === 'personal' ||
			personalCarOwner.value === 'company'
		) {
			// required check
			if (!validateRequiredField(personalCarOwner.field)) {
				personalCarOwner.isErrorField = true;
				personalCarOwner.ErrorMsgField =
					'Number of cars owned is a required field';
			} //number only string
			else if (!validateNumberOnlyString(personalCarOwner.field)) {
				personalCarOwner.isErrorField = true;
				personalCarOwner.ErrorMsgField = 'Only numbers must be entered';
			}
			// max lenght = 20
			else if (!validateMaximumFieldLength(personalCarOwner.field)) {
				personalCarOwner.isErrorField = true;
				personalCarOwner.ErrorMsgField = `Can't be more than 20 characters`;
			} else {
				personalCarOwner.isErrorField = false;
				personalCarOwner.ErrorMsgField = '';
			}
		}

		//--------------------- field2 check -------------------
		if (
			personalCarOwner.value === 'personal' ||
			personalCarOwner.value === 'company'
		) {
			// required check
			if (!validateRequiredField(personalCarOwner.field2)) {
				personalCarOwner.isErrorField2 = true;
				personalCarOwner.ErrorMsgField2 = 'Php per month is a required field';
			} //number only string
			else if (!validateNumberOnlyString(personalCarOwner.field2)) {
				personalCarOwner.isErrorField2 = true;
				personalCarOwner.ErrorMsgField2 = 'Only numbers must be entered';
			}
			// max length = 20
			else if (!validateMaximumFieldLength(personalCarOwner.field2)) {
				personalCarOwner.isErrorField2 = true;
				personalCarOwner.ErrorMsgField2 = `Can't be more than 20 characters`;
			} else {
				personalCarOwner.isErrorField2 = false;
				personalCarOwner.ErrorMsgField2 = '';
			}
		}
	}

	return personalCarOwner;
};

/* ---------------- Eqb Employee Validation ----------------- */
export const validatePersonalEqBEmployee = (personalEqBEmployee) => {
	// required check -- value
	if (!validateRequiredField(personalEqBEmployee.value)) {
		personalEqBEmployee.isError = true;
		personalEqBEmployee.ErrorMsg = 'Eqb employee is a required field';
	} else {
		personalEqBEmployee.isError = false;
		personalEqBEmployee.ErrorMsg = '';
	}

	if (validateRequiredField(personalEqBEmployee.value)) {
		if (personalEqBEmployee.value === 'yes') {
			//---------------- field checks ----------------
			// required check
			if (!validateRequiredField(personalEqBEmployee.field)) {
				personalEqBEmployee.isErrorField = true;
				personalEqBEmployee.ErrorMsgField = 'Name is a required field';
			} //characters only string
			else if (!validateCharacterOnlyString(personalEqBEmployee.field)) {
				personalEqBEmployee.isErrorField = true;
				personalEqBEmployee.ErrorMsgField = 'Only letters must be entered';
			}
			// max length = 20
			else if (!validateMaximumFieldLength(personalEqBEmployee.field)) {
				personalEqBEmployee.isErrorField = true;
				personalEqBEmployee.ErrorMsgField = `Can't be more than 20 characters`;
			} else {
				personalEqBEmployee.isErrorField = false;
				personalEqBEmployee.ErrorMsgField = '';
			}

			//---------------- field2 checks ----------------
			// required check
			if (!validateRequiredField(personalEqBEmployee.field2)) {
				personalEqBEmployee.isErrorField2 = true;
				personalEqBEmployee.ErrorMsgField2 = 'Relationship is a required field';
			} //letters only string
			else if (!validateCharacterOnlyString(personalEqBEmployee.field2)) {
				personalEqBEmployee.isErrorField2 = true;
				personalEqBEmployee.ErrorMsgField2 = 'Only letters must be entered';
			}
			// max length = 20
			else if (!validateMaximumFieldLength(personalEqBEmployee.field2)) {
				personalEqBEmployee.isErrorField2 = true;
				personalEqBEmployee.ErrorMsgField2 = `Can't be more than 20 characters`;
			} else {
				personalEqBEmployee.isErrorField2 = false;
				personalEqBEmployee.ErrorMsgField2 = '';
			}
		}
	}

	return personalEqBEmployee;
};

/* ---------------- Director Declaration Validation ----------------- */
export const validatePersonalDirectorDecleration = (
	personalDirectorDecleration,
) => {
	//console.log(personalDirectorDecleration);
	// required check -- value
	if (!validateRequiredField(personalDirectorDecleration.value)) {
		personalDirectorDecleration.isError = true;
		personalDirectorDecleration.ErrorMsg = 'Required field';
	} else {
		personalDirectorDecleration.isError = false;
		personalDirectorDecleration.ErrorMsg = '';
	}

	if (validateRequiredField(personalDirectorDecleration.value)) {
		if (personalDirectorDecleration.value === 'yes') {
			//---------------- field checks ----------------
			// required check
			if (!validateRequiredField(personalDirectorDecleration.field)) {
				personalDirectorDecleration.isErrorField = true;
				personalDirectorDecleration.ErrorMsgField =
					'Company is a required field';
			}
			// max length = 20
			else if (!validateMaximumFieldLength(personalDirectorDecleration.field)) {
				personalDirectorDecleration.isErrorField = true;
				personalDirectorDecleration.ErrorMsgField = `Can't be more than 20 characters`;
			} else {
				personalDirectorDecleration.isErrorField = false;
				personalDirectorDecleration.ErrorMsgField = '';
			}

			//---------------- field2 checks ----------------
			// required check
			if (!validateRequiredField(personalDirectorDecleration.field2)) {
				personalDirectorDecleration.isErrorField2 = true;
				personalDirectorDecleration.ErrorMsgField2 =
					'Position is a required field';
			}
			// max length = 20
			else if (
				!validateMaximumFieldLength(personalDirectorDecleration.field2)
			) {
				personalDirectorDecleration.isErrorField2 = true;
				personalDirectorDecleration.ErrorMsgField2 = `Can't be more than 20 characters`;
			} else {
				personalDirectorDecleration.isErrorField2 = false;
				personalDirectorDecleration.ErrorMsgField2 = '';
			}
		}
	}

	return personalDirectorDecleration;
};

/* ---------------- Director Declaration Validation ----------------- */
export const validatePersonalDOSDecleration = (personalDOSDecleration) => {
	//console.log(personalDOSDecleration);
	// required check -- value
	if (!validateRequiredField(personalDOSDecleration.value)) {
		personalDOSDecleration.isError = true;
		personalDOSDecleration.ErrorMsg = 'Required field';
	} else {
		personalDOSDecleration.isError = false;
		personalDOSDecleration.ErrorMsg = '';
	}

	if (validateRequiredField(personalDOSDecleration.value)) {
		if (personalDOSDecleration.value === 'yes') {
			//---------------- field checks ----------------
			// required check
			if (!validateRequiredField(personalDOSDecleration.field)) {
				personalDOSDecleration.isErrorField = true;
				personalDOSDecleration.ErrorMsgField = 'Company is a required field';
			}
			// max length = 20
			else if (!validateMaximumFieldLength(personalDOSDecleration.field)) {
				personalDOSDecleration.isErrorField = true;
				personalDOSDecleration.ErrorMsgField = `Can't be more than 20 characters`;
			} else {
				personalDOSDecleration.isErrorField = false;
				personalDOSDecleration.ErrorMsgField = '';
			}

			//---------------- field2 checks ----------------
			// required check
			if (!validateRequiredField(personalDOSDecleration.field2)) {
				personalDOSDecleration.isErrorField2 = true;
				personalDOSDecleration.ErrorMsgField2 = 'Position is a required field';
			}
			// max length = 20
			else if (!validateMaximumFieldLength(personalDOSDecleration.field2)) {
				personalDOSDecleration.isErrorField2 = true;
				personalDOSDecleration.ErrorMsgField2 = `Can't be more than 20 characters`;
			} else {
				personalDOSDecleration.isErrorField2 = false;
				personalDOSDecleration.ErrorMsgField2 = '';
			}
		}
	}

	return personalDOSDecleration;
};

// =============================NOT REQUIRED FIELDS====================
// -------------- Mother name validation-----------------------
export const validatePersonalMother = (personalMother) => {
	if (personalMother.value) {
		// letters with whitespace
		if (!validateCharacterWithSpace(personalMother.value)) {
			personalMother.isError = true;
			personalMother.ErrorMsg = 'Only letters are allowed';
		}
		// length = 20
		else if (!validateMaximumFieldLength(personalMother.value)) {
			personalMother.isError = true;
			personalMother.ErrorMsg = `Can't be more than 20 characters`;
		} else {
			personalMother.isError = false;
			personalMother.ErrorMsg = '';
		}
	} else {
		personalMother.isError = false;
		personalMother.ErrorMsg = '';
	}
	return personalMother;
};

// -------------- email address validation-----------------------
export const validatePersonalEmail = (personalEmail) => {
	// valid email
	if (personalEmail.value) {
		if (!validateEmail(personalEmail.value)) {
			personalEmail.isError = true;
			personalEmail.ErrorMsg = 'Invalid Email';
		} else {
			personalEmail.isError = false;
			personalEmail.ErrorMsg = '';
		}
	} else {
		personalEmail.isError = false;
		personalEmail.ErrorMsg = '';
	}
	return personalEmail;
};

// -------------- Phone number validation-----------------------
export const validatePersonalMobileNumber = (personalMobileNumber) => {
	// valid mobile number
	if (personalMobileNumber.value) {
		if (!validateMobileNumber(personalMobileNumber.value)) {
			personalMobileNumber.isError = true;
			personalMobileNumber.ErrorMsg = 'Invalid mobile number';
		} else {
			personalMobileNumber.isError = false;
			personalMobileNumber.ErrorMsg = '';
		}
	} else {
		personalMobileNumber.isError = false;
		personalMobileNumber.ErrorMsg = '';
	}
	return personalMobileNumber;
};

// -------------- Home number validation-----------------------
export const validatePersonalHomeNumber = (personalHomeNumber) => {
	// valid Home Number
	if (personalHomeNumber.value) {
		if (!validateTelephoneNumber(personalHomeNumber.value)) {
			personalHomeNumber.isError = true;
			personalHomeNumber.ErrorMsg = 'Invalid phone number';
		} else {
			personalHomeNumber.isError = false;
			personalHomeNumber.ErrorMsg = '';
		}
	} else {
		personalHomeNumber.isError = false;
		personalHomeNumber.ErrorMsg = '';
	}
	return personalHomeNumber;
};

// -------------- Personal Month validation-----------------------
export const validatePersonalPresentMonth = (personalPresentMonth) => {
	// valid Month number
	if (personalPresentMonth.value) {
		// number only
		if (!validateNumberOnlyString(personalPresentMonth.value)) {
			personalPresentMonth.isError = true;
			personalPresentMonth.ErrorMsg = 'Only numbers must be entered.';
		} else if (!validateMonth(personalPresentMonth.value)) {
			personalPresentMonth.isError = true;
			personalPresentMonth.ErrorMsg = 'Invalid month';
		} else {
			personalPresentMonth.isError = false;
			personalPresentMonth.ErrorMsg = '';
		}
	} else {
		personalPresentMonth.isError = false;
		personalPresentMonth.ErrorMsg = '';
	}
	return personalPresentMonth;
};

// -------------- Personal Year validation-----------------------
export const validatePersonalPresentyear = (personalPresentyear) => {
	// valid year number
	if (personalPresentyear.value) {
		// only number check
		if (!validateNumberOnlyString(personalPresentyear.value)) {
			personalPresentyear.isError = true;
			personalPresentyear.ErrorMsg = 'Only Numbers must be entered';
		} else if (!validateYear(personalPresentyear.value)) {
			personalPresentyear.isError = true;
			personalPresentyear.ErrorMsg = 'Invalid year';
		} else {
			personalPresentyear.isError = false;
			personalPresentyear.ErrorMsg = '';
		}
	} else {
		personalPresentyear.isError = false;
		personalPresentyear.ErrorMsg = '';
	}
	return personalPresentyear;
};

/* ---------------- Personal info global Validation ------------------- */
export const validatePersonalInfo = (personalInfo) => {
	// validate personal info
	//console.log(personalInfo.personalEmail);
	if (personalInfo) {
		personalInfo.personalName = validatePersonalName(personalInfo.personalName);
		personalInfo.personalMiddle = validatePersonalMiddle(
			personalInfo.personalMiddle,
		);
		personalInfo.personalLast = validatePersonalLast(personalInfo.personalLast);
		personalInfo.personalDOB = validatePersonalDOB(personalInfo.personalDOB);
		personalInfo.personalPlaceOfBirth = validatePersonalPlaceOfBirth(
			personalInfo.personalPlaceOfBirth,
		);
		personalInfo.personalCivilStatus = validatePersonalCivilStatus(
			personalInfo.personalCivilStatus,
		);
		personalInfo.personalGender = validatePersonalGender(
			personalInfo.personalGender,
		);
		personalInfo.personalNumberDependent = validatePersonalNumberDependent(
			personalInfo.personalNumberDependent,
		);
		personalInfo.personalEducationAttainment = validatePersonalEducationAttainment(
			personalInfo.personalEducationAttainment,
		);
		personalInfo.personalPersentHomeAddress = validatePersonalPersentHomeAddress(
			personalInfo.personalPersentHomeAddress,
		);
		personalInfo.presentZipCode = validatePresentZipCode(
			personalInfo.presentZipCode,
		);
		personalInfo.personalSourceFund = validatePersonalSourceFund(
			personalInfo.personalSourceFund,
		);
		personalInfo.personalCarOwner = validatePersonalCarOwner(
			personalInfo.personalCarOwner,
		);
		personalInfo.personalEqBEmployee = validatePersonalEqBEmployee(
			personalInfo.personalEqBEmployee,
		);
		personalInfo.personalDirectorDecleration = validatePersonalDirectorDecleration(
			personalInfo.personalDirectorDecleration,
		);

		personalInfo.personalDOSDecleration = validatePersonalDOSDecleration(
			personalInfo.personalDOSDecleration,
		);
		personalInfo.personalMother = validatePersonalMother(
			personalInfo.personalMother,
		);
		personalInfo.personalEmail = validatePersonalEmail(
			personalInfo.personalEmail,
		);
		personalInfo.personalMobileNumber = validatePersonalMobileNumber(
			personalInfo.personalMobileNumber,
		);
		personalInfo.personalHomeNumber = validatePersonalHomeNumber(
			personalInfo.personalHomeNumber,
		);
		// present
		personalInfo.personalPresentMonth = validatePersonalPresentMonth(
			personalInfo.personalPresentMonth,
		);
		personalInfo.personalPresentyear = validatePersonalPresentyear(
			personalInfo.personalPresentyear,
		);
		// prev
		personalInfo.personalPerviousMonth = validatePersonalPresentMonth(
			personalInfo.personalPerviousMonth,
		);
		personalInfo.personalPerviousyear = validatePersonalPresentyear(
			personalInfo.personalPerviousyear,
		);
		// permanent
		personalInfo.personalPermanentMonth = validatePersonalPresentMonth(
			personalInfo.personalPermanentMonth,
		);
		personalInfo.personalPermanentyear = validatePersonalPresentyear(
			personalInfo.personalPermanentyear,
		);
	}
	return personalInfo;
};
