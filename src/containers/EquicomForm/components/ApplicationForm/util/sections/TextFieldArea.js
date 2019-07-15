import React from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import '../../Personal_Info/PersonalInfo.css';
const TextFieldArea = ({
	nameT,
	updateValue,
	infoType,
	fieldname,
	col,
	row,
	disabled,
}) => {
	//console.log(nameT);
	return (
		<>
			<InputTextarea
				id="in"
				value={nameT.value}
				onChange={(e) => updateValue(e, infoType)}
				rows={row}
				cols={col}
				placeholder={fieldname}
				name={nameT.name}
				className="address-textarea set-to-inline-block"
				disabled={disabled}
			/>
			{nameT.isError && nameT.required && (
				<span style={{ color: 'red' }}>{nameT.ErrorMsg}</span>
			)}
		</>
	);
};

export default React.memo(TextFieldArea);
