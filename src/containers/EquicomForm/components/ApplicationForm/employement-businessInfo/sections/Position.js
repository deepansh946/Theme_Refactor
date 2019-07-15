import React from 'react';
import { InputText } from 'primereact/inputtext';

const Position = ({ position, updatePosition }) => {
	return (
		<div className="input-section p-float-label">
			<InputText id="in" value={position} onChange={updatePosition} />
			<label htmlFor="in">Position</label>
		</div>
	);
};

export default React.memo(Position);
