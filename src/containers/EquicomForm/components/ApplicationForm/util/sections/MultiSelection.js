import React from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import '../../Personal_Info/PersonalInfo.css';
const MultiSelection = ({
	value,
	options,
	updateValue,
	fieldname,
	Update,
	infoType,
	classes,
}) => {
	//console.log(value, options, onChange, fieldname);

	return (
		<>
			<div className="p-multiselect-label-container">
				<MultiSelect
					className={`custom-dropdown-2 p-multiselect-label p-component ${classes}`}
					value={value.value}
					options={options}
					onChange={(e) => updateValue(e, infoType)}
					name={value.name}
					placeholder={fieldname}
				/>
				{value.value.includes('other') ? (
					<div className="input-section p-float-label">
						<InputText
							value={value.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							keyfilter={/^[a-zA-Z ]*$/}
							name={value.name}
						/>
						<label htmlFor="in">Please specify </label>
					</div>
				) : null}
				{value.isError && (
					<span style={{ color: 'red' }}>{value.ErrorMsg}</span>
				)}
			</div>
		</>
	);
};

export default React.memo(MultiSelection);
