import React from 'react';
import { InputText } from 'primereact/inputtext';

const ServiceLengthYears = ({
	serviceLength,
	updateServiceLengthYears,
	updateValue,
}) => {
	return (
		<div className="input-section p-float-label month-year">
			<InputText
				keyfilter="pnum"
				id="in"
				value={serviceLength.years}
				onChange={(e) => updateValue(e, 'businessInfo', 'years')}
				maxLength={2}
				name={serviceLength.name}
			/>
			<label htmlFor="in">Years</label>
			{serviceLength.isError ? (
				<span style={{ color: 'red' }}>{serviceLength.ErrorMsg}</span>
			) : null}
		</div>
	);
};

export default React.memo(ServiceLengthYears);
