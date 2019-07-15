/* =====================================================
    FILENAME: Loan Info Validations
    DEPENDENCIES: ValidateMinimumValue, validateMaximumValue, validateRequiredField, validateBeginFromZero 
======================================================== */

import {
	validateMinimumValue,
	validateMaximumValue,
	validateRequiredField,
	validateBeginFromZero,
	validateNumberOnlyString,
	validateCharacterOnlyString,
	validateMaximumFieldLength,
} from './common';

/* ---------------- Loan Amount Validation ----------------- */
export const validateLoanAmount = (loanAmount) => {
	// required check
	if (!validateRequiredField(loanAmount.value)) {
		loanAmount.isError = true;
		loanAmount.ErrorMsg = 'Loan Amount is required';
	} else if (!validateNumberOnlyString(loanAmount.value)) {
		loanAmount.isError = true;
		loanAmount.ErrorMsg = 'Only numbers should be entered';
	} else if (validateBeginFromZero(loanAmount.value)) {
		// zero check
		loanAmount.isError = true;
		loanAmount.ErrorMsg = "Loan Amount can't start from zero";
	} else if (!validateMinimumValue(loanAmount.value, 15000)) {
		// if value is less than 15,000
		loanAmount.isError = true;
		loanAmount.ErrorMsg = 'Loan Amount must be more than or equal to 15,000';
	} else if (!validateMaximumValue(loanAmount.value, 1000000)) {
		// if value is more than 10,00,000
		loanAmount.isError = true;
		loanAmount.ErrorMsg = 'Loan Amount must be less than or equal to 10,00,000';
	} else {
		loanAmount.isError = false;
		loanAmount.ErrorMsg = '';
	}
	return loanAmount;
};
/* ---------------- Loan Mode Validation ------------------- */
export const validateLoanMode = (loanMode) => {
	// ----- value validations ------
	//  value required check
	if (!validateRequiredField(loanMode.value)) {
		loanMode.isError = true;
		loanMode.ErrorMsg = 'Loan Mode must be selected';
	} else if (loanMode.value !== 'managersCheck') {
		// ----- field validations ------
		// required check
		if (!validateRequiredField(loanMode.field)) {
			loanMode.isError = true;
			loanMode.ErrorMsg = 'Account Number is required.';
		} else if (!validateMaximumFieldLength(loanMode.field)) {
			loanMode.isError = true;
			loanMode.ErrorMsg = `Account number should be less than 20 characters`;
		} else {
			loanMode.isError = false;
			loanMode.ErrorMsg = '';
		}
	} else {
		loanMode.isError = false;
		loanMode.ErrorMsg = '';
	}
	return loanMode;
};

/* ---------------- Payment Term Validation ------------------- */
export const validateLoanPaymentTerm = (paymentTerm) => {
	// required check
	if (!validateRequiredField(paymentTerm.value)) {
		paymentTerm.isError = true;
		paymentTerm.ErrorMsg = 'Payment Term is required';
	} else {
		paymentTerm.isError = false;
		paymentTerm.ErrorMsg = '';
	}
	return paymentTerm;
};

/* ---------------- Loan Purpose Validation ------------------- */
export const validateLoanPurpose = (loanPurpose) => {
	// atleast one in value array
	if (loanPurpose.value || loanPurpose.value.length >= 0) {
		if (loanPurpose.value.length <= 0) {
			loanPurpose.isError = true;
			loanPurpose.ErrorMessage = 'Atleast one Loan purpose must be selected.';
		} else {
			loanPurpose.isError = false;
			loanPurpose.ErrorMsg = '';
		}
	}
	return loanPurpose;
};

/* ---------------- Loan info global Validation ------------------- */
export const validateLoanInfo = (loanInfo) => {
	// validate loan amount
	if (loanInfo) {
		loanInfo.loanAmount = validateLoanAmount(loanInfo.loanAmount);
		// validate loan Mode
		loanInfo.loanMode = validateLoanMode(loanInfo.loanMode);
		// validate loan Purpose
		loanInfo.loanPurpose = validateLoanPurpose(loanInfo.loanPurpose);
		// validate Payment Term
		loanInfo.paymentTerm = validateLoanPaymentTerm(loanInfo.paymentTerm);
	}
	return loanInfo;
};
