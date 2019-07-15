import React from 'react';
import { Calendar } from 'primereact/calendar';
import {
	TextField,
	PhoneNumber,
	Number,
	DatePicker,
	MonthYearCal,
	TextFieldArea,
} from '../util/sections/index';

import '../Personal_Info/PersonalInfo.css';

const OtherInfo = (props) => {
	const {
		updateValue,
		otherPersonalName,
		dateTemplate,
		checkValidation,
		otherRelationBorrower,

		otherTelephoneNumber,

		isOtherTelError,
		otherTelError,
		onOtherTelephoneValid,
		otherHomeAddress,

		otherCreditCardIssueBank,

		otherCardNumber,

		otherCardLimit,

		otherExpirydate,

		otherLoanAccount,

		otherTypeLoan,

		otherOutstandingBalance,

		otherMonthlyPayment,
		otherZipCode,
	} = props;
	//console.log(otherExpirydate, onOtherExpiryDate);
	const textfield = {
		1: {
			value: otherPersonalName,

			fieldname: 'Personal/Reference Name',
		},
		2: {
			value: otherRelationBorrower,

			fieldname: 'Relation To Borrower',
		},
	};
	const number = {
		1: {
			value: otherCardNumber,

			fieldname: 'Card Number',
		},
		2: {
			value: otherCardLimit,

			fieldname: 'Card Limit',
		},
	};

	const textfield1 = {
		1: {
			value: otherLoanAccount,

			fieldname: 'Bank/Loan account',
		},
		2: {
			value: otherTypeLoan,

			fieldname: 'Type of Loan',
		},
	};
	const payment = {
		1: {
			value: otherOutstandingBalance,

			fieldname: 'Outstanding Balance',
		},
		2: {
			value: otherMonthlyPayment,

			fieldname: 'Monthly Payment',
		},
	};

	return (
		<>
			<div className="p-grid">
				{Object.keys(textfield).map((value, index) => {
					return (
						<div className="p-col-12 p-md-4 p-sm-12" key={index}>
							<TextField
								nameT={textfield[value].value}
								updateValue={updateValue}
								fieldname={textfield[value].fieldname}
								infoType={'otherInfo'}
							/>
						</div>
					);
				})}
				<div className="p-col-12 p-md-4 p-sm-12">
					<PhoneNumber
						spoulOffNumber={otherTelephoneNumber}
						updateValue={updateValue}
						fieldname={'Telephone Number'}
						validation={checkValidation}
						infoType={'otherInfo'}
					/>
				</div>
			</div>
			<div className="p-grid" style={{ margin: '0' }}>
				<div className="p-col-12 p-md-12 p-sm-12 address-heading">
					<h3>Home Address</h3>
				</div>
			</div>
			<div className="address-parent-container">
				<div className="p-grid">
					<div className="p-col-12 p-md-12 p-sm-8">
						<div className="address-textarea--container">
							<h4>
								{' '}
								Address (Lot/BIk No., House/UnitNo., Floor No./Building Name,
								Subdivision/Village, City/Province, ZipCode)
							</h4>

							<TextFieldArea
								className="address-textarea"
								nameT={otherHomeAddress}
								updateValue={updateValue}
								fieldname={
									'Address( Lot/BIk No.,  House/UnitNo., Floor No./Building Name,Subdivision/Village, City/Province, ZipCode )'
								}
								infoType={'otherInfo'}
							/>
						</div>
						<Number
							number={otherZipCode}
							updateValue={updateValue}
							fieldname={' Zip Code'}
							len={4}
							infoType={'otherInfo'}
							classes="remove-margin move-above-and-right set-to-inline-block expand-width"
						/>
					</div>
				</div>
			</div>
			<div className="p-grid">
				<div className="p-col-12 p-md-3 p-sm-12">
					<TextField
						nameT={otherCreditCardIssueBank}
						fieldname={'Credit card Issuing Bank'}
						updateValue={updateValue}
						infoType={'otherInfo'}
					/>
				</div>
				{Object.keys(number).map((value, index) => {
					return (
						<div className="p-col-12 p-md-3 p-sm-12" key={index}>
							<Number
								number={number[value].value}
								fieldname={number[value].fieldname}
								infoType={'otherInfo'}
								updateValue={updateValue}
							/>
						</div>
					);
				})}

				<div className="p-col-12 p-md-3 p-sm-12">
					<MonthYearCal
						DOB={otherExpirydate}
						updateValue={updateValue}
						fieldName={'Expiry Date'}
						infoType={'otherInfo'}
						dateTemplate={dateTemplate}
					/>
				</div>
			</div>

			<div className="p-grid">
				{Object.keys(textfield1).map((value, index) => {
					return (
						<div className="p-col-12 p-md-3 p-sm-12" key={index}>
							<TextField
								nameT={textfield1[value].value}
								// onNameEnter={textfield1[value].onchange}
								updateValue={updateValue}
								infoType={'otherInfo'}
								fieldname={textfield1[value].fieldname}
							/>
						</div>
					);
				})}
				{Object.keys(payment).map((value, index) => {
					return (
						<div className="p-col-12 p-md-3 p-sm-12" key={index}>
							<Number
								number={payment[value].value}
								// onNumberEnter={payment[value].onchange}
								fieldname={payment[value].fieldname}
								updateValue={updateValue}
								infoType={'otherInfo'}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};
export default OtherInfo;
