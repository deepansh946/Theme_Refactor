import React from 'react';
import { InputText } from 'primereact/inputtext';

const ServiceLengthMonths = ({
	serviceLength,
	updateServiceLengthMonths,
	updateValue,
	validation,
	isValid,
}) => {
	return (
		<div
			style={{ marginTop: '0 !important' }}
			className="input-section p-float-label month-year"
		>
			<InputText
				keyfilter="pnum"
				id="in"
				value={serviceLength.months}
				onChange={(e) => updateValue(e, 'businessInfo')}
				maxLength={2}
				name={serviceLength.name}

				/*onBlur={
					validation ? (e) => validation('businessInfo', e, isValid) : null
				}*/
			/>
			<label htmlFor="in">Months</label>
			{serviceLength.isError ? (
				<span style={{ color: 'red' }}>{serviceLength.ErrorMsg}</span>
			) : null}
			<span />
		</div>
	);
};

export default React.memo(ServiceLengthMonths);
