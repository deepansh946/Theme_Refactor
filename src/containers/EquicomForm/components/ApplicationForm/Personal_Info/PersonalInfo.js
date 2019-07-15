import React from 'react';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import AddressField from './AddressField';
import { Nationality } from './nationality';
import Message from '../../../../../components/UI/Flash';
import './PersonalInfo.css';

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
	MultiSelection,
} from '../util/sections/index';

const PersonalInfo = (props) => {
	const {
		personalName,
		updateValue,
		personalMiddle,
		personalLast,

		personalMother,
		personalDOB,
		onDobEnter,
		personalAge,
		personalPlaceOfBirth,

		personalCivilStatus,
		CivilStatues,
		messageClose,
		personalGender,
		genders,
		personalNationality,
		previousCheckbox,
		personalNumberDependent,
		NumberDependent,

		personalEducationAttainment,
		EducationAttend,

		personalHomeNumber,
		personalMobileNumber,
		checkValidation,
		homePhoneValidation,

		personalEmail,

		personalPersentHomeAddress,
		personalPresentyear,
		personalPresentMonth,
		personalPresentCheckbox,
		checkBoxItem,

		personalPermanentHomeAddress,
		personalPermanentyear,
		personalPermanentMonth,
		personalPermanentCheckbox,

		personalPerviousHomeAddress,
		personalPerviousyear,
		personalPerviousMonth,
		personalPerviousCheckbox,

		personalSourceFund,
		SourceFund,
		personalCarOwner,
		CarOwnerShip,
		personalEqBEmployee,
		dateTemplate,
		personalDOSDecleration,
		personalDirectorDecleration,
		personalCheckBox,

		EQBEmp,

		Declaration,

		presentZipCode,
		perviousZipCode,
		permanentZipCode,

		/** validation Props */

		onMonthBlur,

		previousMonthError,
	} = props;

	const textfield = {
		1: {
			value: personalName,

			fieldname: 'First Name',
		},
		2: {
			value: personalMiddle,

			fieldname: 'Middle  Name',
		},
		3: {
			value: personalLast,

			fieldname: 'Last Name',
		},
	};

	const dropdown = {
		1: {
			value: personalCivilStatus,
			options: CivilStatues,
			fieldname2: 'Civil Status',
		},
		2: {
			value: personalGender,
			options: genders,
			fieldname2: 'Gender',
		},
	};
	const number = {
		1: {
			value: personalHomeNumber,
			//onchange: onHomeNumberEnter,
			fieldname: 'Home Phone Number',
			validation: checkValidation,
			//isPhoneError: isPhoneError,
			//PhoneError: PhoneError,
		},
		2: {
			value: personalMobileNumber,
			//onchange: onMobileNumberEnter,
			fieldname: 'Mobile Phone Number',
			validation: checkValidation,
			//isPhoneError: isMobileError,
			//PhoneError: MobileError,
			//required: true,
		},
	};
	const fieldArea1 = {
		personalPersentHomeAddress,
		personalPresentyear,
		personalPresentMonth,
		personalPresentCheckbox,
		personalCheckBox,
		checkValidation,
		presentZipCode,
		perviousZipCode,
		permanentZipCode,

		updateValue,

		personalPermanentHomeAddress,
		personalPermanentMonth,
		personalPermanentyear,
		personalPermanentCheckbox,
		checkBoxItem,

		personalPerviousHomeAddress,
		personalPerviousyear,
		personalPerviousMonth,
		personalPerviousCheckbox,
	};
	const fieldArea = {
		1: {
			value: personalPerviousHomeAddress,

			fieldname:
				'Address(Lot/Blk No., House/Unit No., Floor No./Building Name , Subdivision/Village ,City/Province)',
			lengthyear: personalPerviousyear,

			fieldname2: ' Years',
			months: personalPerviousMonth,

			checkbox: personalPerviousCheckbox,

			checkboxItem: checkBoxItem,

			presentMonthError: previousMonthError,
			onMonthBlur: onMonthBlur,
		},
	};

	const decleration = {
		1: {
			value: personalDirectorDecleration,
			option: Declaration,
			fieldname: 'Select Choice',
			fieldname2:
				'Are you a Director, Officer or Stockholder (DOS) of Equicom Saving         Bank(EqB) or EqB subsidiary and/or affiliate? if Yes, please specify company and position/ affiliation ',
		},
		2: {
			value: personalDOSDecleration,
			option: Declaration,
			fieldname: 'Select Choice',
			fieldname2:
				'Are you related to a DOS of EqB or any EqB subsidiary and/or affiliate of Equicom Group of Companies?  if Yes, specify and position /affiliation',
		},
	};

	const tmpZipCode = {
		name: 'presentZipCode',
		value: '',
	};
	return (
		<>
			<div className="p-grid">
				{personalDOB.isErrors && (
					<Message
						class="red"
						message={
							'Age should not be more than 65 at the time of loan maturity, Please change the loan payment term or contact bank for further process. '
						}
						closable={true}
						close={() => {
							messageClose('personalInfo');
						}}
					/>
				)}
				{Object.keys(textfield).map((value, index) => {
					return (
						<div className="p-col-12 p-md-4 p-sm-12" key={index}>
							<TextField
								nameT={textfield[value].value}
								updateValue={updateValue}
								fieldname={textfield[value].fieldname}
								required={true}
								filter={'alpha'}
								infoType={'personalInfo'}
							/>
						</div>
					);
				})}
			</div>
			<div className="p-grid">
				<div className="p-col-12 p-md-4 p-sm-12">
					<TextField
						nameT={personalMother}
						updateValue={updateValue}
						fieldname={" Mother's Maiden Name"}
						filter={/^[a-zA-Z ]*$/}
						infoType={'personalInfo'}
					/>
				</div>

				<div className="p-col-12 p-md-2 sm-12">
					<DatePicker
						DOB={personalDOB}
						updateValue={updateValue}
						fieldName={'Date of Birth'}
						required={true}
						yearRange={'1900:2019'}
						infoType={'personalInfo'}
						dateTemplate={dateTemplate}
					/>
				</div>
				<div className="p-col-12 p-md-2 p-sm-12">
					<TextField
						nameT={personalAge}
						readonly={true}
						fieldname={'Age'}
						disable={true}
					/>
				</div>

				<div className="p-col-12 p-md-4 p-sm-12">
					<TextField
						nameT={personalPlaceOfBirth}
						updateValue={updateValue}
						fieldname={'Place of Birth'}
						required={true}
						infoType={'personalInfo'}
					/>
				</div>
			</div>
			<div className="p-grid">
				{Object.keys(dropdown).map((value, index) => {
					//console.log(dropdown[value]['value']);
					return (
						<div className="p-col-12 p-md-3 p-sm-12" key={index}>
							<h4 className="margin-bottom-removal-text-alignment">
								{dropdown[value].fieldname2}
								<span className="required-field">*</span>
							</h4>

							<DropDown
								paymentTerm={dropdown[value].value}
								updateValue={updateValue}
								option={dropdown[value].options}
								typeInfo={'personalInfo'}
							/>

							{dropdown[value].value.isError && (
								<span style={{ color: 'red' }}>
									{dropdown[value].value.ErrorMsg}
								</span>
							)}
						</div>
					);
				})}

				<div className="p-col-12 p-md-3 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">Nationality </h4>
					<DropDown
						paymentTerm={personalNationality}
						updateValue={updateValue}
						required={true}
						typeInfo={'personalInfo'}
						option={Nationality}
						filter={true}
					/>
				</div>

				<div className="p-col-12 p-md-3 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						No. of Dependents
						<span className="required-field">*</span>
					</h4>

					<EducationAttended
						value={personalNumberDependent}
						option={NumberDependent}
						updateValue={updateValue}
						fieldname={'Select Choice'}
						infoType={'personalInfo'}
					/>
				</div>
			</div>
			<div className="p-grid">
				<div className="p-col-12 p-md-3 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						Education Attainment
						<span className="required-field">*</span>
					</h4>
					<EducationAttended
						value={personalEducationAttainment}
						option={EducationAttend}
						updateValue={updateValue}
						fieldname={'Select Choice'}
						infoType={'personalInfo'}
					/>
				</div>

				{Object.keys(number).map((value, index) => {
					return (
						<div className="p-col-12 p-md-3 p-sm-12" key={index}>
							<PhoneNumber
								spoulOffNumber={number[value].value}
								updateValue={updateValue}
								fieldname={number[value].fieldname}
								infoType={'personalInfo'}
							/>
						</div>
					);
				})}

				<div className="p-col-12 p-md-3 p-sm-12">
					<TextField
						nameT={personalEmail}
						updateValue={updateValue}
						fieldname={'Email Address'}
						filter={'email'}
						infoType={'personalInfo'}
						validation={checkValidation}
						isValid={'email'}
					/>
				</div>
			</div>
			<div className="p-grid" style={{ margin: '0' }}>
				<div className="p-col-12 p-md-12 p-sm-12 address-heading">
					<h3>Present Home Address</h3>
				</div>
			</div>
			<div className="address-parent-container">
				<div className="p-grid">
					<div className="p-col-12 p-md-12 p-sm-12">
						<div className="address-textarea--container">
							<h4>
								{
									'Address(Lot/Blk No., House/Unit No., Floor No./Building Name , Subdivision/Village ,City/Province)'
								}
								{'required-field' ? (
									<span className="required-field">*</span>
								) : null}
							</h4>
							<TextFieldArea
								className="address-textarea"
								nameT={personalPersentHomeAddress}
								updateValue={updateValue}
								fieldname={
									'Address(Lot/Blk No., House/Unit No., Floor No./Building Name , Subdivision/Village ,City/Province)'
								}
								infoType={'personalInfo'}
							/>
						</div>
						<Number
							number={presentZipCode}
							updateValue={updateValue}
							fieldname={' Zip Code'}
							len={4}
							infoType={'personalInfo'}
							classes="remove-margin move-above-and-right set-to-inline-block expand-width"
						/>
					</div>
				</div>
				{/* <div className="p-grid">
				<div
				className="p-col-12 p-md-3 p-sm-12"
				style={{ width: '50%', marginTop: '-20px', marginLeft: '7px' }}
				>
				<Number
				number={presentZipCode}
				updateValue={updateValue}
				fieldname={'ZipCode'}
				len={4}
				infoType={'personalInfo'}
				/>
				</div>
			</h4> */}
				{/*<div className="p-col-12 p-md-6 p-sm-12" style={{paddingLeft:"23%",
			paddingTop:"8%"}}>
			<Number 
			number={personalPresentyear} 
			updateValue={updateValue} 
			fieldname={" ZipCode"} 
			len={2} 
			infoType={"personalInfo"} 
			/> 
			
		</div>*/}
				<div className="p-grid address-options--container">
					<div className="p-col-12 p-md-6 p-sm-12 length-of-stay--container">
						<h4>Length Of Stay</h4>

						<Number
							number={personalPresentyear}
							updateValue={updateValue}
							fieldname={' Years'}
							len={2}
							infoType={'personalInfo'}
							classes="length-of-stay--year"
						/>

						<Number
							fieldname={'Months'}
							updateValue={updateValue}
							number={personalPresentMonth}
							filter={/^([1-9]|1[01])$/}
							len={2}
							infoType={'personalInfo'}
							validation={checkValidation}
							isValid={'month'}
							classes="length-of-stay--month"
						/>
					</div>
					<div
						className="p-col-12 p-md-6 p-sm-12"
						style={{ paddingTop: '4%', display: 'block' }}
					>
						<CheckBox
							checkbox={personalPresentCheckbox}
							updateValue={updateValue}
							checkBoxItem={checkBoxItem}
							infoType={'personalInfo'}
						/>
					</div>
				</div>
			</div>
			<div style={{ marginTop: '20px' }}>
				<div className="p-grid" style={{ margin: '0' }}>
					<div className="p-col-12 p-md-12 p-sm-12 address-heading">
						<h3>Permanent Home Address</h3>
					</div>
				</div>
				<div className="p-grid">
					<div
						style={{
							marginLeft: '10px',
							marginBottom: '10px',
							marginTop: '10px',
						}}
					>
						<Checkbox
							checked={personalCheckBox.value}
							onChange={(e) => updateValue(e, 'personalInfo')}
							name={personalCheckBox.name}
							id="sameAsPresent"
							style={{}}
						/>
						<label htmlFor="sameAsPresent">
							{' '}
							&nbsp; Same as present address
						</label>
					</div>
				</div>
				<AddressField address={fieldArea1} />
			</div>
			{Object.keys(fieldArea).map((value, index) => {
				return (
					<>
						<div className="p-grid" style={{ margin: '0' }}>
							<div className="p-col-12 p-md-12 p-sm-12 address-heading">
								<h3>Previous Home Address</h3>
							</div>
						</div>
						<div className="p-grid">
							<div
								style={{
									marginLeft: '10px',
									marginBottom: '10px',
									marginTop: '10px',
								}}
							>
								<Checkbox
									checked={previousCheckbox.value}
									onChange={(e) => updateValue(e, 'personalInfo')}
									name="previousCheckbox"
									id="previousCheckbox"
									value={previousCheckbox.value}
									style={{}}
								/>
								<label htmlFor="previousCheckbox">
									{' '}
									&nbsp; Same as Permanent address
								</label>
							</div>
						</div>
						<div className="address-parent-container">
							<div className="p-grid" key={index}>
								<div className="p-col-12 p-md-12 p-sm-12">
									<div className="address-textarea--container">
										<h4 style={{ paddingLeft: 8 }}>
											{fieldArea[value].fieldname}
											{fieldArea[value].required ? (
												<span className="required-field">*</span>
											) : null}
										</h4>

										<TextFieldArea
											nameT={
												previousCheckbox.value
													? personalCheckBox.value
														? personalPersentHomeAddress
														: personalPermanentHomeAddress
													: fieldArea[value].value
											}
											updateValue={updateValue}
											col={113}
											row={5}
											fieldname={fieldArea[value].fieldname}
											infoType={'personalInfo'}
											disabled={
												personalCheckBox.value || previousCheckbox.value
											}
										/>
									</div>
									<Number
										number={
											previousCheckbox.value
												? personalCheckBox.value
													? presentZipCode
													: permanentZipCode
												: perviousZipCode
										}
										updateValue={updateValue}
										fieldname={' Zip Code'}
										len={4}
										infoType={'personalInfo'}
										classes="remove-margin move-above-and-right set-to-inline-block expand-width"
										disabled={personalCheckBox.value || previousCheckbox.value}
									/>
								</div>
							</div>
							<div className="p-grid address-options--container">
								<div className="p-col-12 p-md-6 p-sm-12  length-of-stay--container">
									<h4>Length Of Stay</h4>
									<Number
										number={
											previousCheckbox.value
												? personalCheckBox.value
													? personalPresentyear
													: personalPermanentyear
												: fieldArea[value].lengthyear
										}
										updateValue={updateValue}
										fieldname={fieldArea[value].fieldname2}
										len={2}
										infoType={'personalInfo'}
										classes="length-of-stay--year"
										disabled={previousCheckbox.value || personalCheckBox.value}
									/>

									<Number
										fieldname={'Months'}
										updateValue={updateValue}
										number={
											previousCheckbox.value
												? personalCheckBox.value
													? personalPresentMonth
													: personalPermanentMonth
												: fieldArea[value].months
										}
										filter={/^([1-9]|1[01])$/}
										len={2}
										validation={checkValidation}
										isValid={'month'}
										infoType={'personalInfo'}
										classes="length-of-stay--month"
										disabled={previousCheckbox.value || personalCheckBox.value}
									/>
								</div>
								<div
									className="p-col-12 p-md-6 p-sm-12"
									style={{ paddingTop: '4%', display: 'block' }}
								>
									<CheckBox
										checkbox={
											previousCheckbox.value
												? personalCheckBox.value
													? personalPresentCheckbox
													: personalPermanentCheckbox
												: fieldArea[value].checkbox
										}
										updateValue={updateValue}
										checkBoxItem={fieldArea[value].checkboxItem}
										infoType={'personalInfo'}
										disabled={previousCheckbox.value || personalCheckBox.value}
									/>
								</div>
							</div>
						</div>
					</>
				);
			})}{' '}
			<div className="p-grid">
				<div className="p-col-12 p-md-6 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						Source of Funds
						<span className="required-field">*</span>
					</h4>
					<MultiSelection
						value={personalSourceFund}
						options={SourceFund}
						updateValue={updateValue}
						fieldname={'Select Choice'}
						infoType={'personalInfo'}
						classes="add-padding-3"
					/>
				</div>
				<div className="p-col-12 p-md-6 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						Car Ownership
						<span className="required-field">*</span>
					</h4>

					<EducationAttended
						value={personalCarOwner}
						option={CarOwnerShip}
						updateValue={updateValue}
						fieldname={'Select Option'}
						infoType={'personalInfo'}
					/>
				</div>
			</div>
			<div className="p-grid">
				<div className="p-col-12 p-md-12 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						Are you Related to any EqB Employee
						<span className="required-field">*</span>
					</h4>

					<EducationAttended
						value={personalEqBEmployee}
						option={EQBEmp}
						updateValue={updateValue}
						fieldname={' Select Choice'}
						infoType={'personalInfo'}
					/>
				</div>
			</div>
			{Object.keys(decleration).map((value, index) => {
				return (
					<div className="p-grid" key={index}>
						<div className="p-col-12 p-md-8 p-sm-12">
							<p>{decleration[value].fieldname2} </p>
						</div>
						<div className="p-col-12 p-md-4 p-sm-12">
							<h4 className="margin-bottom-removal-text-alignment reduce-top-border">
								Give Response
								<span className="required-field">*</span>
							</h4>
							<EducationAttended
								value={decleration[value].value}
								option={decleration[value].option}
								updateValue={updateValue}
								infoType={'personalInfo'}
								fieldname={decleration[value].fieldname}
							/>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default PersonalInfo;

/** 
 *  <div className="p-grid"> 
                <div className=" p-col-12 p-md-6 p-sm-12"> 
                    A{console.log(personalCheckBox)} 
                    <Checkbox 
                        checked={personalCheckBox.value} 
                        onChange={(e) => updateValue(e, "personalInfo")} 
                        name={personalCheckBox.name} 
                    /> 
                    <div className="p-col-12 p-md-6 p-sm-12"> 
                        <h5>same as present address</h5> 
                    </div> 
                </div> 
            </div> */
