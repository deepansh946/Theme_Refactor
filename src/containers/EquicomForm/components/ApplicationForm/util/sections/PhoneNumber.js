import React from 'react';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
const PhoneNumber = ({
	spoulOffNumber,
	onSpoulOffNumber,
	fieldname,
	validation,

	required,
	updateValue,
	infoType,
}) => {
	return (
		<div className="input-section p-float-label">
			<InputText
				keyfilter="pint"
				value={spoulOffNumber.value}
				onChange={(e) => updateValue(e, infoType)}
				onBlur={validation ? (e) => validation(infoType, e, 'mobile') : null}
				maxLength={15}
				name={spoulOffNumber.name}
			/>

			<label htmlFor="in">
				{fieldname}
				{required ? <span className="required-field">*</span> : null}
			</label>
			{spoulOffNumber.isError && (
				<span style={{ color: 'red' }}>{spoulOffNumber.ErrorMsg}</span>
			)}
			{}
		</div>
	);
};
export default PhoneNumber;

/**
 *	<InputMask
				mask="(999) 999-9999"
				value={spoulOffNumber}
				required={true}
				onComplete={validation}
				onChange={onSpoulOffNumber}
			/>
 *
 */
/**
 *
 */
