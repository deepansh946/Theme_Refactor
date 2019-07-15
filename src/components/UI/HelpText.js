import React from 'react';

const HelpText = (props) => {
	const style = props.textWhite ? { color: '#fff' } : null;
	return (
		<p style={style} className="help-text">
			{props.text}
			{props.children}
		</p>
	);
};

export default React.memo(HelpText, (prevProps, nextProps) => {
	return prevProps.text === nextProps.text;
});
