import React from 'react';
import { InputText } from 'primereact/inputtext';

const Number = ({
	number,

	fieldname,
	required,
	filter,
	isValid,
	validation,
	isSubmitted,
	isPresentMonthError,
	presentMonthError,
	updateValue,
	infoType,
	len,
	validationHandler,
	validationFunc,
	classes,
	disabled,
}) => {
	//console.log(number);
	return (
		<>
			<div className={`input-section p-float-label ${classes}`}>
				<InputText
					id="in"
					keyfilter={filter}
					/* onBlur={validation ? (e) => validation(infoType, e, isValid) : null} */
					onBlur={() => {
						validationHandler &&
							validationHandler(validationFunc, infoType, number);
					}}
					value={number.value}
					onChange={(e) => updateValue(e, infoType)}
					name={number.name}
					maxLength={len}
					disabled={isSubmitted || disabled}
				/>
				<label htmlFor="in">
					{' '}
					{fieldname}{' '}
					{required ? <span className="required-field">*</span> : null}
				</label>
			</div>
			{number.isError ? (
				<span
					style={{ color: 'red', marginLeft: '5px', display: 'inline-block' }}
				>
					{number.ErrorMsg}
				</span>
			) : null}
			<span />
		</>
	);
};

export default Number;
