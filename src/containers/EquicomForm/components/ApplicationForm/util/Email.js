import React from 'react';
import { InputText } from 'primereact/inputtext';

const Email = ({
	name,
	onNameEnter,
	fieldname,
	validation,
	validError,
	validBoolean,
	required,
	maxlength,
	id,
	keyfilter,
	reg,
}) => {
	return (
		<div className="input-section p-float-label">
			<InputText
				id={id}
				value={name}
				onChange={onNameEnter}
				onBlur={validation}
				maxLength={maxlength}
				keyfilter={keyfilter}
			/>
			<label htmlFor={id}>
				{' '}
				{fieldname}{' '}
				{required ? <span className="required-field">*</span> : null}
			</label>
			{validBoolean && <span style={{ color: 'red' }}>{validError}</span>}
		</div>
	);
};

export default React.memo(Email);
