import React from 'react';
import _ from 'lodash';
import './style.css';

const Logo = ({
	styleClass,
	imgId,
	src = 'assets/layout/images/logo-white',
	alt,
	footer = false,
	layoutMode,
}) => {
	let imageSrc = `${src}${
		layoutMode === 'slim' && !footer ? '-small' : ''
	}.png`;

	return (
		<button className={`p-link ${styleClass || ''}`}>
			<img style={{ marginTop: 0 }} id={imgId} src={imageSrc} alt={alt} />
		</button>
	);
};

export default React.memo(Logo, (nextProps, prevProps) =>
	_.isEqual(nextProps, prevProps),
);
