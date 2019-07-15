import React from 'react';
import { InputText } from 'primereact/inputtext';

const TotalWorkingMonths = ({
	totalWorking,
	updateTotalWorkingMonths,
	updateValue,
	validation,

	isValid,
}) => {
	return (
		<div className="input-section p-float-label month-year">
			<InputText
				id="in"
				keyfilter="pnum"
				value={totalWorking.months}
				onChange={(e) => updateValue(e, 'businessInfo', 'months')}
				maxLength={2}
				name={totalWorking.name}
				/*onBlur={
					validation ? (e) => validation('businessInfo', e, isValid) : null
				}*/
			/>
			<label htmlFor="in">Months</label>
			{totalWorking.isError ? (
				<span style={{ color: 'red' }}>{totalWorking.ErrorMsg}</span>
			) : null}
		</div>
	);
};

export default React.memo(TotalWorkingMonths);
