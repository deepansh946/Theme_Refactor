import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const DropDown = ({ option, paymentTerm, updateValue, typeInfo, fliter }) => {
	return (
		<Dropdown
			value={paymentTerm.value}
			name={paymentTerm.name}
			className="custom-dropdown-2"
			options={option}
			filter={fliter}
			onChange={(e) => updateValue(e, typeInfo)}
			placeholder="Select Choice"
			style={{ padding: '2px' }}
		/>
	);
};

export default DropDown;
