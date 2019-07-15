import React from 'react';
import { InputText } from 'primereact/inputtext';

const GlobalSearch = ({ updateValue }) => (
	<div className="table-search--box">
		<InputText
			type="text"
			onInput={(e) => updateValue(e)}
			name="globalSearch"
			placeholder="Global Search"
			size="50"
		/>
		<i className="fa fa-search"></i>
	</div>
);

export default React.memo(GlobalSearch);
