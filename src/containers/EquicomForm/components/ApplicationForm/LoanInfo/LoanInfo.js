import React from 'react';

import {
	LoanAmount,
	PaymentTerm,
	LoanMode,
	LoanPurpose,
} from './sections/index';
import {
	TextField,
	DatePicker,
	Age,
	DropDown,
	EducationAttended,
	TextFieldArea,
	PhoneNumber,
	CheckBox,
	Number,
} from '../util/sections/index';

import {
	validateLoanAmount,
	validateLoanPaymentTerm,
	validateLoanMode,
	validateLoanPurpose,
} from '../../../validations/loanInfoValidation';

const LoanInfo = (props) => {
	const {
		updateValue,
		loanAmount,
		updateLoanAmount,
		paymentTerms,
		paymentTerm,
		updatePaymentTerm,
		loanModes,
		loanMode,
		updateLoanMode,
		loanPurposes,
		loanPurpose,
		updateLoanPurpose,
		updateLoanModeChange,
		checkValidation,
		isSubmitted,
		validationHandler,
	} = props;

	return (
		<>
			<div className="p-grid">
				<div className="p-col-12 p-md-4 p-sm-12">
					<Number
						number={loanAmount}
						updateValue={updateValue}
						fieldname={'Desired Loan Amount (PhP) '}
						required={true}
						infoType={'loanInfo'}
						len={7}
						/* validation={checkValidation} */
						validationHandler={validationHandler}
						validationFunc={validateLoanAmount}
						isValid={'loanAmount'}
						isSubmitted={isSubmitted}
						filter="pint"
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						Desired Payment Term <span className="required-field">*</span>
					</h4>
					<PaymentTerm
						paymentTerm={paymentTerm}
						paymentTerms={paymentTerms}
						updateValue={updateValue}
						isSubmitted={isSubmitted}
						validationHandler={validationHandler}
						validationFunc={validateLoanPaymentTerm}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						Mode of Loan Release <span className="required-field">*</span>
					</h4>
					<LoanMode
						loanMode={loanMode}
						loanModes={loanModes}
						updateValue={updateValue}
						validationHandler={validationHandler}
						validationFunc={validateLoanMode}
					/>
				</div>
			</div>
			<div className="p-grid">
				<LoanPurpose
					loanPurpose={loanPurpose}
					loanPurposes={loanPurposes}
					updateLoanPurpose={updateLoanPurpose}
					validationHandler={validationHandler}
					validationFunc={validateLoanPurpose}
				/>
			</div>
		</>
	);
};

export default LoanInfo;
