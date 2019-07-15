import React from 'react';
import { InputText } from 'primereact/inputtext';

const TinNumber = ({ tinNumber, updateTinNumber, required }) => {
	return (
		<div className="input-section p-float-label">
			<InputText
				keyfilter="hex"
				id="in"
				value={tinNumber}
				onChange={updateTinNumber}
			/>
			<label htmlFor="in">
				Tax Identification Number (TIN)
				{required ? <span className="required-field">*</span> : null}
			</label>
		</div>
	);
};

export default React.memo(TinNumber);
