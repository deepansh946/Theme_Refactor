import React from 'react';
import { InputText } from 'primereact/inputtext';

const TotalWorkingYears = ({
	totalWorking,
	updateTotalWorkingYears,
	updateValue,
}) => {
	return (
		<div className="input-section p-float-label month-year">
			<InputText
				keyfilter="pnum"
				id="in"
				value={totalWorking.years}
				onChange={(e) => updateValue(e, 'businessInfo', 'years')}
				maxLength={2}
				name={totalWorking.name}
			/>
			<label htmlFor="in">Years</label>
			{totalWorking.isError ? (
				<span style={{ color: 'red' }}>{totalWorking.ErrorMsg}</span>
			) : null}
		</div>
	);
};

export default React.memo(TotalWorkingYears);
