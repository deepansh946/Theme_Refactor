import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const PaymentTerm = ({
	paymentTerms,
	paymentTerm,
	updateValue,
	validationHandler,
	validationFunc,
}) => {
	return (
		<>
			<Dropdown
				value={paymentTerm.value}
				name={paymentTerm.name}
				className="custom-dropdown-2"
				options={paymentTerms}
				onChange={(e) => updateValue(e, 'loanInfo')}
				placeholder="Select Choice"
			/>
			{paymentTerm.isError ? (
				<span style={{ color: 'red' }}>{paymentTerm.ErrorMsg}</span>
			) : null}
			<span />
		</>
	);
};

export default PaymentTerm;
