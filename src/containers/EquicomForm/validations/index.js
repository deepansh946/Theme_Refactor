/* =====================================================
    FILENAME: Equicom form Validations
    DEPENDENCIES: loanInfoValidations
======================================================== */

import { validateLoanInfo } from './loanInfoValidation';
import { validatePersonalInfo } from './personalInfoValidations';
import { validateOtherInfo } from './otherInfoValidations';

//import {}
// loan info validations
//validateLoanInfo();

export const validateEquicomForm = (formData) => {
	// Loan Info
	if (formData.loanInfo) {
		formData.loanInfo = validateLoanInfo(formData.loanInfo);
	}
	//TODO: Business Info
	//TODO: Personal Info
	if (formData.personalInfo) {
		formData.personalInfo = validatePersonalInfo(formData.personalInfo);
	}
	/* 	if (formData.otherInfo) {
		formData.otherInfo = validateOtherInfo(formData.otherInfo);
	} */

	//TODO: Spouse Info
	//TODO: Other Info
	//TODO: Undertaking
	return formData;
};
