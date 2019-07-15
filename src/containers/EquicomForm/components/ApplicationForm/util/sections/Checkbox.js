import { RadioButton } from 'primereact/radiobutton';
import React from 'react';
import { InputText } from 'primereact/inputtext';
import '../../Personal_Info/PersonalInfo.css';

const CheckBox = ({
	checkbox,
	updateValue,
	infoType,
	checkBoxItem,
	disabled,
}) => {
	let checkBoxes = checkBoxItem.map((elem, index) => {
		return (
			<div
				className="content-section implementation"
				key={index}
				style={{ width: '250px', marginBottom: '10px' }}
			>
				<RadioButton
					inputId={elem.value}
					name={checkbox.name}
					value={elem.value}
					onChange={(e) => updateValue(e, infoType)}
					checked={checkbox.value === elem.value}
					disabled={disabled}
				/>
				<label htmlFor={elem.value} className="p-radiobutton-label">
					{elem.label}
					{checkbox.name === 'personalPresentCheckbox' &&
					checkbox.value === 'mortgaged' &&
					index === 3 ? (
						<>
							{/* <div className="input-section p-radiobutton-label address-option--extra"> */}
							<InputText
								value={checkbox.field}
								onChange={(e) => updateValue(e, infoType, 'field')}
								name={checkbox.name}
								keyfilter="pint"
								maxLength={7}
								disabled={disabled}
								className="address-option--extra"
							/>
							<label htmlFor="in">PhP/Month</label>
							{/* </div> */}
						</>
					) : null}
				</label>
				{checkbox.name === 'personalPresentCheckbox' &&
				checkbox.value === 'rented' &&
				index === 4 ? (
					<>
						{/* <div className="input-section p-radiobutton-label address-option--extra"> */}
						<InputText
							value={checkbox.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							name={checkbox.name}
							keyfilter="pint"
							maxLength={7}
							disabled={disabled}
							className="address-option--extra"
						/>
						<label htmlFor="in">PhP/Month</label>
						{/* </div> */}
					</>
				) : null}

				{checkbox.name === 'personalPerviousCheckbox' &&
				checkbox.value === 'mortgaged' &&
				index === 3 ? (
					<>
						{/* <div className="
					<>input-section p-radiobutton-label">
 */}{' '}
						<InputText
							value={checkbox.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							name={checkbox.name}
							keyfilter="pint"
							maxLength={7}
							disabled={disabled}
							className="address-option--extra"
						/>
						<label htmlFor="in">PhP/Month</label>
						{/* </div> */}
					</>
				) : null}
				{checkbox.name === 'personalPerviousCheckbox' &&
				checkbox.value === 'rented' &&
				index === 4 ? (
					<>
						{/* <div className="input-section p-radiobutton-label">
						 */}{' '}
						<InputText
							value={checkbox.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							name={checkbox.name}
							keyfilter="pint"
							maxLength={7}
							disabled={disabled}
						/>
						<label htmlFor="in">PhP/Month</label>
						{/* </div> */}
					</>
				) : null}

				{checkbox.name === 'personalPermanentCheckbox' &&
				checkbox.value === 'mortgaged' &&
				index === 3 ? (
					<>
						{/* <div className="input-section p-radiobutton-label">
						 */}{' '}
						<InputText
							value={checkbox.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							name={checkbox.name}
							keyfilter="pint"
							maxLength={7}
							disabled={disabled}
						/>
						<label htmlFor="in">PhP/Month</label>
						{/* </div> */}
					</>
				) : null}
				{checkbox.name === 'personalPermanentCheckbox' &&
				checkbox.value === 'rented' &&
				index === 4 ? (
					<>
						{/* <div className="input-section p-radiobutton-label">
						 */}{' '}
						<InputText
							value={checkbox.field}
							onChange={(e) => updateValue(e, infoType, 'field')}
							name={checkbox.name}
							keyfilter="pint"
							maxLength={7}
							disabled={disabled}
						/>
						<label htmlFor="in">PhP/Month</label>
						{/* </div> */}
					</>
				) : null}
			</div>
		);
	});

	return <>{checkBoxes}</>;
};

export default React.memo(CheckBox);

/**
 *
 *  {checkbox === "mortgaged" ? (
	<div className="input-section p-radiobutton-label">
	<InputText placeholder={"Mortgaged"} />
	</div>
	) : null}
	*
	*/
