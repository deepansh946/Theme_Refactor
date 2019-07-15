import React from 'react';
import { InputText } from 'primereact/inputtext';

const Age = ({ age, ageCalAuto }) => {
	return (
		<div className="input-section p-float-label">
			<InputText
				id="in"
				keyfilter="num"
				value={age}
				readonly={true}
				onComplete={ageCalAuto}
			/>
			<label htmlFor="in"> Age</label>
		</div>
	);
};

export default React.memo(Age);
