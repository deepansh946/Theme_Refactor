import React from 'react';
import {
	TextField,
	TextFieldArea,
	DatePicker,
	PhoneNumber,
	Number,
} from '../util/sections/index';

import '../Personal_Info/PersonalInfo.css';

const SpouseInfo = (props) => {
	// console.log(props);
	const {
		updateValue,
		spouseFirstName,

		spouseMiddleName,

		spouseLastName,

		spouseBusName,

		spousePosition,

		spouseBusAddress,

		spouseDOB,

		spouseOffNumber,
		onSpouseOffNumber,
		spouseOffValidation,
		spouseOffError,
		isSpouseOffError,
		spouseMobileNumber,
		onSpouseMobileNumber,
		spouseMobileValidation,
		spouseMobileError,
		isSpouseMobileError,
		spouseEmail,

		onSpouseEmailValidation,
		spouseEmailError,
		isSpouseEmailError,
		checkValidation,
		spouseZipCode,
	} = props;

	const textfield = {
		1: {
			value: spouseFirstName,
			//onchange: onSpouseFirstName,
			fieldname: 'First Name',
		},
		2: {
			value: spouseMiddleName,
			///onchange: onSpouseMiddleName,
			fieldname: 'Middle Name',
		},
		3: {
			value: spouseLastName,
			//onchange: onSpouseLastName,
			fieldname: 'Last Name',
		},
	};
	const phonenumber = {
		1: {
			value: spouseOffNumber,
			onchange: onSpouseOffNumber,
			fieldname: 'Office Phone Number',
			validation: checkValidation,
		},
		2: {
			value: spouseMobileNumber,
			onchange: onSpouseMobileNumber,
			fieldname: 'Mobile Phone Number',
			validation: checkValidation,
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
								// onNameEnter={textfield[value].onchange}
								updateValue={updateValue}
								fieldname={textfield[value].fieldname}
								infoType={'spouseInfo'}
							/>
						</div>
					);
				})}
			</div>
			<div className="p-grid">
				<div className="p-col-12 p-md-8 p-sm-12">
					<TextField
						nameT={spouseBusName}
						//onNameEnter={onSpouseBusName}
						updateValue={updateValue}
						fieldname={'Employer/Business Name'}
						infoType={'spouseInfo'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<TextField
						nameT={spousePosition}
						//onNameEnter={onSpousePosition}
						updateValue={updateValue}
						fieldname={'Position'}
						infoType={'spouseInfo'}
					/>
				</div>
			</div>
			<div className="p-grid" style={{ margin: '0' }}>
				<div className="p-col-12 p-md-12 p-sm-12 address-heading">
					<h3>Employer/Business Address</h3>
				</div>
			</div>
			<div className="address-parent-container">
				<div className="p-grid">
					<div className="p-col-12 p-md-12 p-sm-12">
						<div className="address-textarea--container">
							<h4>
								Address (Lot/BIk No., House/Unit No., Floor No./Building Name,
								Subdivision/Village, City/Province)
							</h4>

							<TextFieldArea
								nameT={spouseBusAddress}
								updateValue={updateValue}
								fieldname={
									'Address (lot/Blk No., house/unit No.,floor No., Bldg.Name , Subdivision/Village, City/Province)'
								}
								infoType={'spouseInfo'}
								className="address-textarea"
							/>
						</div>
						<Number
							number={spouseZipCode}
							updateValue={updateValue}
							fieldname={' Zip Code'}
							len={4}
							infoType={'spouseInfo'}
							classes="remove-margin move-above-and-right set-to-inline-block expand-width"
						/>
					</div>
				</div>
			</div>
			<div className="p-grid">
				<div className="p-col-12 p-md-3 p-sm-12">
					<DatePicker
						DOB={spouseDOB}
						updateValue={updateValue}
						//onDobEnter={onSpouseDOB}
						fieldName={'Date of Birth'}
						yearRange={'1900-2019'}
						infoType={'spouseInfo'}
					/>
				</div>

				{Object.keys(phonenumber).map((value, index) => {
					return (
						<div className="p-col-12 p-md-3 p-sm-12" key={index}>
							<PhoneNumber
								spoulOffNumber={phonenumber[value].value}
								updateValue={updateValue}
								fieldname={phonenumber[value].fieldname}
								validation={phonenumber[value].validation}
								infoType={'spouseInfo'}
							/>
						</div>
					);
				})}

				<div className="p-col-12 p-md-3 p-sm-12">
					<TextField
						nameT={spouseEmail}
						//onNameEnter={onSpouseEmail}
						fieldname={'Email'}
						updateValue={updateValue}
						validation={checkValidation}
						isValid={'email'}
						infoType={'spouseInfo'}
						filter={'email'}
					/>
				</div>
			</div>
		</>
	);
};
export default SpouseInfo;
