import React from 'react';

const ErrorText = ({ text }) => (
	<span
		style={{ marginBottom: '2px', display: 'inline-block' }}
		className="error-text"
	>
		{text}
	</span>
);

export default React.memo(ErrorText);
