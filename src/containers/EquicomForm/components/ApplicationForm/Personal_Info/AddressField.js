import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

import { TextFieldArea, CheckBox, Number } from '../util/sections/index';
import { InputText } from 'primereact/inputtext';
import './PersonalInfo.css';

const AddressField = (props) => {
	const {
		personalPersentHomeAddress,
		personalPresentyear,
		personalPresentMonth,
		personalPresentCheckbox,

		presentZipCode,
		perviousZipCode,
		permanentZipCode,
		personalCheckBox,
		updateValue,
		checkValidation,

		personalPermanentHomeAddress,
		personalPermanentMonth,
		personalPermanentCheckbox,
		checkBoxItem,
		personalPermanentyear,
	} = props.address;

	return (
		<div className="address-parent-container">
			{personalCheckBox.value === true ? (
				<>
					<div className="p-grid">
						<div className="p-col-12 p-md-12 p-sm-12">
							<div className="address-textarea--container">
								<h4>
									Address(Lot/Blk No., House/Unit No., Floor No./Building Name ,
									Subdivision/Village ,City/Province)
								</h4>
								<TextFieldArea
									nameT={personalPersentHomeAddress}
									updateValue={updateValue}
									col={113}
									row={5}
									fieldname={
										'Address(Lot/Blk No., House/Unit No., Floor No./Building Name , Subdivision/Village ,City/Province)'
									}
									infoType={'personalInfo'}
									disabled={true}
								/>
							</div>
							<Number
								number={presentZipCode}
								updateValue={updateValue}
								fieldname={' Zip Code'}
								len={4}
								infoType={'personalInfo'}
								classes="remove-margin move-above-and-right set-to-inline-block expand-width"
								disabled={true}
							/>
						</div>
					</div>

					<div className="p-grid address-options--container">
						<div className="p-col-12 p-md-6 p-sm-12 length-of-stay--container">
							<h4>Length Of Stay</h4>
							<div className="input-section p-float-label">
								<Number
									number={personalPresentyear}
									updateValue={updateValue}
									fieldname={'Year'}
									len={2}
									infoType={'personalInfo'}
									classes="length-of-stay--year"
									disabled={true}
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
									disabled={true}
								/>
							</div>
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
								disabled={true}
							/>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="p-grid">
						<div className="p-col-12 p-md-12 p-sm-12">
							<div className=" address-textarea--container">
								<h4>
									Address(Lot/Blk No., House/Unit No., Floor No./Building Name ,
									Subdivision/Village ,City/Province)
								</h4>
								<TextFieldArea
									className="address-textarea"
									nameT={personalPermanentHomeAddress}
									updateValue={updateValue}
									fieldname={
										'Address(Lot/Blk No., House/Unit No., Floor No./Building Name , Subdivision/Village ,City/Province)'
									}
									infoType={'personalInfo'}
								/>
							</div>
							<Number
								number={permanentZipCode}
								updateValue={updateValue}
								fieldname={' Zip Code'}
								len={4}
								infoType={'personalInfo'}
								classes="remove-margin move-above-and-right set-to-inline-block expand-width"
							/>
						</div>
					</div>

					<div className="p-grid address-options--container">
						<div className="p-col-12 p-md-6 p-sm-12 length-of-stay--container">
							<h4>Length Of Stay</h4>
							<Number
								number={personalPermanentyear}
								updateValue={updateValue}
								fieldname={'Year'}
								len={2}
								infoType={'personalInfo'}
								classes="length-of-stay--year"
							/>
							<Number
								fieldname={'Months'}
								updateValue={updateValue}
								number={personalPermanentMonth}
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
								checkbox={personalPermanentCheckbox}
								updateValue={updateValue}
								checkBoxItem={checkBoxItem}
								infoType={'personalInfo'}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default React.memo(AddressField);

/**
 */
