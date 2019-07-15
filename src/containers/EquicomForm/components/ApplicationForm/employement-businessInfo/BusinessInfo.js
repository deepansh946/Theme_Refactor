import React from 'react';
import {
	TextField,
	DatePicker,
	EducationAttended,
	TextFieldArea,
	PhoneNumber,
	Number,
} from '../util/sections/index';
import '../Personal_Info/PersonalInfo.css';

import '../Personal_Info/PersonalInfo.css';

import {
	TinNumber,
	ServiceLengthMonths,
	ServiceLengthYears,
	TotalWorkingMonths,
	TotalWorkingYears,
	TimeDayCall,
} from './sections/index';

const BusinessInfo = (props) => {
	const {
		updateValue,
		businessZipCode,
		businessName,
		businessNature,
		businessAddress,
		employmentType,
		employmentTypes,
		employmentStatus,
		employmentStatuses,
		checkValidation,
		rank,
		ranks,
		position,
		gsisNumber,
		tinNumber,
		dateOfHire,
		serviceLength,
		totalWorking,
		telephoneNumberOffice,
		faxNumberOffice,
		emailAddressOffice,
		hrContactPerson,
		officeTelephoneNumber2,
		timeDayCall,
		previousBusinessName,
		previousLengthOfService,
		previousPosition,
	} = props;

	return (
		<>
			<div className="p-grid">
				<div className="p-col-12 p-md-8 p-sm-12">
					<TextField
						nameT={businessName}
						updateValue={updateValue}
						//onNameEnter={updateBusinessName}
						fieldname={'Employment/Business Name'}
						required={true}
						infoType={'businessInfo'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<TextField
						nameT={businessNature}
						updateValue={updateValue}
						fieldname={'Nature of Business'}
						infoType={'businessInfo'}
					/>
				</div>
			</div>
			<div className="p-grid" style={{ margin: '0' }}>
				<div className="p-col-12 p-md-12 p-sm-12 address-heading">
					<h3>Business Address</h3>
				</div>
			</div>
			<div className="address-parent-container">
				<div className="p-grid">
					<div className="p-col-12 p-md-12 p-sm-12">
						<div className="address-textarea--container">
							<h4>
								{' '}
								Address (Lot/BIk No., House/UnitNo., Floor No./Building Name,
								Subdivision/Village, City/Province)
							</h4>
							<TextFieldArea
								className="address-textarea"
								nameT={businessAddress}
								updateValue={updateValue}
								fieldname={
									'Address (Lot/BIk No., House/UnitNo., Floor No./Building Name, Subdivision/Village, City/Province)'
								}
								id="businessAddress"
								infoType={'businessInfo'}
							/>
						</div>
						<Number
							number={businessZipCode}
							updateValue={updateValue}
							fieldname={' Zip Code'}
							len={4}
							infoType={'businessInfo'}
							classes="remove-margin move-above-and-right set-to-inline-block expand-width"
						/>
					</div>
				</div>
			</div>
			<div className="p-grid">
				<div className="p-col-12 p-md-4 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						Type of Employment
						<span className="required-field">*</span>
					</h4>

					<EducationAttended
						value={employmentType}
						option={employmentTypes}
						updateValue={updateValue}
						fieldname={'Select Choice'}
						infoType={'businessInfo'}
					/>
				</div>

				<div className="p-col-12 p-md-4 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">
						Employement Status
						<span className="required-field">*</span>
					</h4>

					<EducationAttended
						value={employmentStatus}
						option={employmentStatuses}
						updateValue={updateValue}
						fieldname={'Select Choice'}
						infoType={'businessInfo'}
					/>
				</div>

				<div className="p-col-12 p-md-4 p-sm-12">
					<h4 className="margin-bottom-removal-text-alignment">Rank</h4>

					<EducationAttended
						value={rank}
						option={ranks}
						updateValue={updateValue}
						fieldname={'Select Choice'}
						infoType={'businessInfo'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<TextField
						nameT={position}
						updateValue={updateValue}
						fieldname={'Position'}
						infoType={'businessInfo'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<TextField
						nameT={gsisNumber}
						updateValue={updateValue}
						fieldname={'SSS/GSIS Number'}
						infoType={'businessInfo'}
						filter={'alphanum'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<TinNumber
						nameT={tinNumber}
						updateValue={updateValue}
						fieldname={'Tax Identification Number (TIN)'}
						infoType={'businessInfo'}
						filter={'alphanum'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12 add-top-border">
					<DatePicker
						DOB={dateOfHire}
						updateValue={updateValue}
						//onDobEnter={updateDateOfHire}
						fieldName={'Date of Hire'}
						infoType={'businessInfo'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<h4 className="align-center add-top-border">
						Length Of Service
						<span className="required-field">*</span>
					</h4>
					<div className="p-grid">
						<div className="p-col-12 p-md-5 p-sm-5 reduce-top-border--large">
							<ServiceLengthYears
								serviceLength={serviceLength}
								updateValue={updateValue}
								infoType={'businessInfo'}
							/>
						</div>
						<div className="p-col-12 p-md-5 p-sm-5 reduce-top-border--large">
							<ServiceLengthMonths
								serviceLength={serviceLength}
								updateValue={updateValue}
								validation={checkValidation}
								isValid={'month'}
								infoType={'businessInfo'}
							/>
						</div>
					</div>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<h4 className="align-center  add-top-border">
						Total Years Working
						<span className="required-field">*</span>
					</h4>
					<div className="p-grid">
						<div className="p-col-12 p-md-5 p-sm-5 reduce-top-border--large">
							<TotalWorkingYears
								totalWorking={totalWorking}
								updateValue={updateValue}
							/>
						</div>
						<div className="p-col-12 p-md-5 p-sm-5 reduce-top-border--large">
							<TotalWorkingMonths
								totalWorking={totalWorking}
								updateValue={updateValue}
								validation={checkValidation}
								isValid={'month'}
							/>
						</div>
					</div>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<PhoneNumber
						spoulOffNumber={telephoneNumberOffice}
						updateValue={updateValue}
						fieldname={'Office Telephone Number'}
						infoType={'businessInfo'}
						validation={checkValidation}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<PhoneNumber
						spoulOffNumber={faxNumberOffice}
						updateValue={updateValue}
						fieldname={'Office Fax Number'}
						infoType={'businessInfo'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<TextField
						nameT={emailAddressOffice}
						updateValue={updateValue}
						fieldname={'Office Email Address'}
						infoType={'businessInfo'}
						filter={'email'}
						validation={checkValidation}
						isValid={'email'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<TextField
						nameT={hrContactPerson}
						updateValue={updateValue}
						fieldname={'Supervisor/HR Contact Person'}
						infoType={'businessInfo'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<PhoneNumber
						spoulOffNumber={officeTelephoneNumber2}
						updateValue={updateValue}
						fieldname={'Office Telephone Number '}
						validation={checkValidation}
						infoType={'businessInfo'}
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<TimeDayCall timeDayCall={timeDayCall} updateValue={updateValue} />
				</div>
				<div className="p-col-12 p-md-4 p-sm-12 add-top-border">
					<TextField
						nameT={previousBusinessName}
						updateValue={updateValue}
						fieldname="Previous Employeer/Business Name"
						infoType="businessInfo"
					/>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12">
					<h4 className="align-center add-top-border">Length Of Service</h4>
					<div className="p-grid">
						<div className="p-col-12 p-md-5 p-sm-5 reduce-top-border--large">
							<ServiceLengthYears
								serviceLength={previousLengthOfService}
								updateValue={updateValue}
							/>
						</div>
						<div className="p-col-12 p-md-5 p-sm-5 reduce-top-border--large">
							<ServiceLengthMonths
								serviceLength={previousLengthOfService}
								updateValue={updateValue}
								validation={checkValidation}
								isValid={'month'}
							/>
						</div>
					</div>
				</div>
				<div className="p-col-12 p-md-4 p-sm-12 add-top-border">
					<TextField
						nameT={previousPosition}
						updateValue={updateValue}
						fieldname="Previous Position"
						infoType="businessInfo"
					/>
				</div>
			</div>
		</>
	);
};

export default BusinessInfo;
