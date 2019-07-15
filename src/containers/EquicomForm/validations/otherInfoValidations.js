/* =====================================================
    FILENAME:		Other Info Validations
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
	validationCharacterWithNumber,
	removeCommas,
} from './common';

/* ---------------- Personal/Reference Name Validations ----------------- */
export const validateOtherPersonalName = (otherPersonalName) => {
	if (otherPersonalName.value) {
		if (!validateMaximumFieldLength(otherPersonalName.value)) {
			otherPersonalName.isError = true;
			otherPersonalName.ErrorMsg = `Can't be more than 20 characters`;
		} else if (!validateCharacterOnlyString(otherPersonalName.value)) {
			otherPersonalName.isError = true;
			otherPersonalName.ErrorMsg = `Name should only contain letters`;
		} else {
			otherPersonalName.isError = false;
			otherPersonalName.ErrorMsg = '';
		}
	}
	return otherPersonalName;
};
/* ---------------- Relation to borrower validation ----------------- */

export const validateOtherRelationBorrower = (otherRelationBorrower) => {
	if (otherRelationBorrower.value) {
		if (!validateMaximumFieldLength(otherRelationBorrower.value)) {
			otherRelationBorrower.isError = true;
			otherRelationBorrower.ErrorMsg = `Can't be more than 20 characters`;
		} else if (!validateCharacterOnlyString(otherRelationBorrower.value)) {
			otherRelationBorrower.isError = true;
			otherRelationBorrower.ErrorMsg = `Name should only contain letters`;
		} else {
			otherRelationBorrower.isError = false;
			otherRelationBorrower.ErrorMsg = '';
		}
	}
	return otherRelationBorrower;
};

/* ---------------- telephone number validation ----------------- */
export const validateOtherTelephoneNumber = (otherTelephoneNumber) => {
	if (otherTelephoneNumber.value) {
		if (!validateTelephoneNumber(otherTelephoneNumber.value)) {
			otherTelephoneNumber.isError = true;
			otherTelephoneNumber.ErrorMsg = 'Invalid phone number';
		} else {
			otherTelephoneNumber.isError = false;
			otherTelephoneNumber.ErrorMsg = '';
		}
	}
	return otherTelephoneNumber;
};

/* ---------------- Home address validation ----------------- */
export const validateOtherHomeAddress = (otherHomeAddress) => {
	//debugger;
	if (otherHomeAddress.value) {
		if (!validateMaximumAddressLength(otherHomeAddress.value)) {
			otherHomeAddress.isError = true;
			otherHomeAddress.ErrorMsg = `Can't be more than 300 characters`;
		} else {
			otherHomeAddress.isError = false;
			otherHomeAddress.ErrorMsg = '';
		}
	}
	return otherHomeAddress;
};
/* ---------------- Credit card ----------------- */
export const validateOtherCreditCardIssueBank = (otherCreditCardIssueBank) => {
	if (otherCreditCardIssueBank.value) {
		if (!validateMaximumFieldLength(otherCreditCardIssueBank.value)) {
			otherCreditCardIssueBank.isError = true;
			otherCreditCardIssueBank.ErrorMsg = `Can't be more than 20 characters`;
		} else {
			otherCreditCardIssueBank.isError = false;
			otherCreditCardIssueBank.ErrorMsg = '';
		}
	}
	return otherCreditCardIssueBank;
};

/* ---------------- Loan Account ----------------- */
export const validateOtherLoanAccount = (otherLoanAccount) => {
	if (otherLoanAccount.value) {
		if (!validateMaximumFieldLength(otherLoanAccount.value)) {
			otherLoanAccount.isError = true;
			otherLoanAccount.ErrorMsg = `Can't be more than 20 characters`;
		} else {
			otherLoanAccount.isError = false;
			otherLoanAccount.ErrorMsg = '';
		}
	}
	return otherLoanAccount;
};
/* ---------------- Loan Type ----------------- */
export const validateOtherTypeLoan = (otherTypeLoan) => {
	if (otherTypeLoan.value) {
		if (!validateMaximumFieldLength(otherTypeLoan.value)) {
			otherTypeLoan.isError = true;
			otherTypeLoan.ErrorMsg = `Can't be more than 20 characters`;
		} else {
			otherTypeLoan.isError = false;
			otherTypeLoan.ErrorMsg = '';
		}
	}
	return otherTypeLoan;
};
/* ---------------- Card Number ----------------- */
export const validateOtherCardNumber = (otherCardNumber) => {
	if (otherCardNumber.value) {
		if (!validationCharacterWithNumber(otherCardNumber.value)) {
			otherCardNumber.isError = true;
			otherCardNumber.ErrorMsg = `Invalid Card Number`;
		} else {
			otherCardNumber.isError = false;
			otherCardNumber.ErrorMsg = '';
		}
	}
	return otherCardNumber;
};

/*------------------Outstanding Balance---------*/
export const validateOtherOutstandingBalance = (otherOutstandingBalance) => {
	if (otherOutstandingBalance.value) {
		otherOutstandingBalance.value = removeCommas(otherOutstandingBalance.value);
		if (!validateMaximumFieldLength(otherOutstandingBalance.value)) {
			otherOutstandingBalance.isError = true;
			otherOutstandingBalance.ErrorMsg = `Can't be more than 20 characters`;
		} else if (!validateNumberOnlyString(otherOutstandingBalance.value)) {
			otherOutstandingBalance.isError = true;
			otherOutstandingBalance.ErrorMsg = `Only numbers should be entered`;
		} else {
			otherOutstandingBalance.isError = false;
			otherOutstandingBalance.ErrorMsg = '';
		}
	}
	return otherOutstandingBalance;
};

export const validateOtherMonthlyPayment = (otherMonthlyPayment) => {
	if (otherMonthlyPayment.value) {
		otherMonthlyPayment.value = removeCommas(otherMonthlyPayment.value);
		if (!validateMaximumFieldLength(otherMonthlyPayment.value)) {
			otherMonthlyPayment.isError = true;
			otherMonthlyPayment.ErrorMsg = `Can't be more than 20 characters`;
		} else if (!validateNumberOnlyString(otherMonthlyPayment.value)) {
			otherMonthlyPayment.isError = true;
			otherMonthlyPayment.ErrorMsg = `Only numbers should be entered`;
		} else {
			otherMonthlyPayment.isError = false;
			otherMonthlyPayment.ErrorMsg = '';
		}
	}
	return otherMonthlyPayment;
};
export const validateOtherInfo = (otherInfo) => {
	if (otherInfo) {
		otherInfo.otherPersonalName = validateOtherPersonalName(
			otherInfo.otherPersonalName,
		);
		otherInfo.otherRelationBorrower = validateOtherRelationBorrower(
			otherInfo.otherRelationBorrower,
		);
		otherInfo.otherTelephoneNumber = validateOtherTelephoneNumber(
			otherInfo.otherTelephoneNumber,
		);
		otherInfo.otherHomeAddress = validateOtherHomeAddress(
			otherInfo.otherHomeAddress,
		);
		otherInfo.otherCreditCardIssueBank = validateOtherCreditCardIssueBank(
			otherInfo.otherCreditCardIssueBank,
		);
		otherInfo.otherCardNumber = validateOtherCardNumber(
			otherInfo.otherCardNumber,
		);
		otherInfo.otherLoanAccount = validateOtherLoanAccount(
			otherInfo.otherLoanAccount,
		);
		otherInfo.otherTypeLoan = validateOtherTypeLoan(otherInfo.otherTypeLoan);
		otherInfo.otherOutstandingBalance = validateOtherOutstandingBalance(
			otherInfo.otherOutstandingBalance,
		);
		otherInfo.otherMonthlyPayment = validateOtherMonthlyPayment(
			otherInfo.otherMonthlyPayment,
		);
	}
	return otherInfo;
};
