import React from 'react';
import { Checkbox } from 'primereact/checkbox';

const CheckBoxOptions = ({ purpose, updateLoanPurpose, loanPurpose }) => {
	return (
		<div className="p-col-12 p-md-4 p-sm-12">
			<Checkbox
				inputId={purpose.label}
				value={purpose.value}
				onChange={updateLoanPurpose}
				checked={loanPurpose.value.indexOf(purpose.value) === -1 ? false : true}
			/>
			<label htmlFor={purpose.label} className="p-checkbox-label">
				{purpose.label}
			</label>
		</div>
	);
};

export default CheckBoxOptions;
