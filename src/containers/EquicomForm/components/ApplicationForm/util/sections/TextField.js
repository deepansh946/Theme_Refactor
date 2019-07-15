import React from 'react';
import { InputText } from 'primereact/inputtext';

const TextField = ({
	nameT,
	onNameEnter,
	fieldname,
	validation,
	validError,
	validBoolean,
	required,
	maxlength,
	id,
	isValid,
	readonly,
	updateValue,
	disable,
	infoType,
	classes,
	filter = /^[a-zA-Z ]*$/,
}) => {
	//console.log(nameT.value);
	return (
		<>
			<div className="input-section p-float-label">
				<InputText
					//id={id}
					value={nameT.value}
					onChange={(e) => updateValue(e, infoType)}
					/*	onBlur={validation ? (e) => validation(infoType, e, isValid) : null}*/
					maxLength={maxlength}
					keyfilter={filter}
					name={nameT.name}
					disabled={disable}
					readOnly={readonly}
				/>
				<label htmlFor={id}>
					{' '}
					{fieldname}{' '}
					{required ? <span className="required-field">*</span> : null}
				</label>
			</div>
			{nameT.isError && <span style={{ color: 'red' }}>{nameT.ErrorMsg}</span>}
		</>
	);
};

export default TextField;

//{/^[a-zA-Z ]*$/}

///^[a-zA-Z ]*$/
