import React from 'react';
import { Calendar } from 'primereact/calendar';

const DateOfHire = ({
	dateOfHire,
	updateDateOfHire,
	onDateTemplate,
	required,
}) => {
	return (
		<div className="input-section p-float-label">
			<Calendar value={dateOfHire} onChange={updateDateOfHire} />
			<label htmlFor="in">
				{' '}
				Date of Hire
				{required ? <span className="required-field">*</span> : null}
			</label>
		</div>
	);
};

export default React.memo(DateOfHire);
