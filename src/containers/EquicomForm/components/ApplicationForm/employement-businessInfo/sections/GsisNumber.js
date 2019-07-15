import React from 'react';
import { InputText } from 'primereact/inputtext';

const GsisNumber = ({ gsisNumber, updateGsisNumber, required }) => {
	return (
		<div className="input-section p-float-label">
			<InputText
				keyfilter="hex"
				id="in"
				value={gsisNumber}
				onChange={updateGsisNumber}
			/>
			<label htmlFor="in">
				SSS/GSIS Number
				{required ? <span className="required-field">*</span> : null}
			</label>
		</div>
	);
};

export default React.memo(GsisNumber);
