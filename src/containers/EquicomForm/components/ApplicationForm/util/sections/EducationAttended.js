import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const EducationAttended = ({
	value,
	option,
	updateValue,
	fieldname,
	educationAttendedUpdate,
	CarPhp,
	infoType,
}) => {
	return (
		<>
			<Dropdown
				value={value.value}
				name={value.name}
				className="custom-dropdown-2"
				options={option}
				onChange={(e) => updateValue(e, infoType)}
				placeholder={fieldname}
				optionLabel={option.forEach((value) => value.label)}
				style={{ padding: '2px' }}
			/>

			{value.value === 'others' ? (
				<div className="input-section p-float-label">
					<InputText
						value={value.field}
						onChange={(e) => updateValue(e, infoType, 'field')}
						name={value.name}
					/>
					<label htmlFor="in">Please Specify</label>
				</div>
			) : null}

			{value.value === 'other' ? (
				<div className="input-section p-float-label">
					<InputText
						value={value.field}
						onChange={(e) => updateValue(e, infoType, 'field')}
						name={value.name}
					/>
					<label htmlFor="in">Please Specify</label>
				</div>
			) : null}
			{value.value === 'children' ? (
				<div className="input-section p-float-label">
					<InputText
						keyfilter="pint"
						value={value.field}
						onChange={(e) => updateValue(e, infoType, 'field')}
						maxLength={2}
						name={value.name}
					/>
					<label htmlFor="in">No of children</label>
				</div>
			) : null}

			{value.value === 'yes' ? (
				<>
					<div className="input-section p-float-label">
						<InputText
							value={value.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							keyfilter={/^[a-zA-Z ]*$/}
							name={value.name}
						/>
						<label htmlFor="in">Name</label>
						{value.isErrorField && (
							<span style={{ color: 'red' }}>{value.ErrorMsgField}</span>
						)}
					</div>
					<div className="input-section p-float-label">
						<InputText
							value={value.field2}
							onChange={(e) => updateValue(e, infoType, 'field2')}
							keyfilter={/^[a-zA-Z ]*$/}
							name={value.name}
						/>
						<label htmlFor="in">Relationship</label>
						{value.isErrorField2 && (
							<span style={{ color: 'red' }}>{value.ErrorMsgField2}</span>
						)}
					</div>
				</>
			) : null}

			{value.value === 'yes' ? (
				<>
					<div className="input-section p-float-label">
						<InputText
							value={value.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							/* 	 */
							name={value.name}
						/>
						<label htmlFor="in">Company</label>
						{value.isErrorField && (
							<span style={{ color: 'red' }}>{value.ErrorMsgField}</span>
						)}
					</div>
					<div className="input-section p-float-label">
						<InputText
							value={value.field2}
							onChange={(e) => updateValue(e, infoType, 'field2')}
							/* 	 */
							name={value.name}
						/>
						<label htmlFor="in"> Position/Affiliation</label>
						{value.isErrorField2 && (
							<span style={{ color: 'red' }}>{value.ErrorMsgField2}</span>
						)}
					</div>
				</>
			) : null}

			{value.value === 'owned' ? (
				<div className="input-section p-float-label">
					<InputText
						value={value.field}
						onChange={(e) => updateValue(e, infoType, 'field')}
						keyfilter="pint"
						type="text"
						name={value.name}
					/>
					<label htmlFor="in">No of Car Owned</label>
					{value.isErrorField && (
						<span style={{ color: 'red' }}>{value.ErrorMsgField}</span>
					)}
				</div>
			) : null}
			{value.value === 'personal' || value.value === 'company' ? (
				<>
					<div className="input-section p-float-label">
						<InputText
							value={value.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							keyfilter="pint"
							name={value.name}
						/>
						<label htmlFor="in">Number Of cars</label>
						{value.isErrorField && (
							<span style={{ color: 'red' }}>{value.ErrorMsgField}</span>
						)}
					</div>
					<div className="input-section p-float-label">
						<InputText
							value={value.field2}
							onChange={(e) => updateValue(e, infoType, 'field2')}
							keyfilter="pint"
							name={value.name}
						/>
						<label htmlFor="in">Php per Month</label>
						{value.isErrorField2 && (
							<span style={{ color: 'red' }}>{value.ErrorMsgField2}</span>
						)}
					</div>
				</>
			) : null}
			{value.isError && value.required && (
				<span style={{ color: 'red' }}>{value.ErrorMsg}</span>
			)}
		</>
	);
};

export default EducationAttended;
