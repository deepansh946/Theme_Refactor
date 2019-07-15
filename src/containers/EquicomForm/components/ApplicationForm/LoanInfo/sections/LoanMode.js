import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

const LoanMode = ({
	loanModes,
	loanMode,
	updateLoanMode,
	updateLoanModeChange,
	updateValue,
}) => {
	return (
		<>
			<Dropdown
				value={loanMode.value}
				name={loanMode.name}
				className="custom-dropdown-2"
				options={loanModes}
				onChange={(e) => updateValue(e, 'loanInfo')}
				placeholder="Select Choice"
			/>

			{loanMode.value === 'creditToEquicomAccount' ? (
				<div className="input-section p-float-label ">
					<InputText
						name={loanMode.name}
						value={loanMode.field}
						onChange={(e) => updateValue(e, 'loanInfo', 'field')}
					/>
					<label htmlFor="in">
						{' '}
						Specify Account Number <span className="required-field">*</span>
					</label>
				</div>
			) : null}
			{loanMode.value === 'creditToNonEquicomAccount' ? (
				<div className="input-section p-float-label">
					<InputText
						name={loanMode.name}
						value={loanMode.field}
						onChange={(e) => updateValue(e, 'loanInfo', 'field')}
					/>
					<label htmlFor="in">
						{' '}
						Specify Account Number <span className="required-field">*</span>
					</label>
					{loanMode && loanMode.field && loanMode.field.length === 0 && (
						<span style={{ color: 'red' }}>"required-field"</span>
					)}
					<span />
				</div>
			) : null}
			{loanMode.isError ? (
				<span style={{ color: 'red', marginLeft: '3px' }}>
					{loanMode.ErrorMsg}
				</span>
			) : null}
			<span />
		</>
	);
};

export default LoanMode;
