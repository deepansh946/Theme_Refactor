import React from 'react';

const Card = ({ title, numbers, icon, subInfo, cardClass }) => {
	return (
		<div className="p-col-12 p-lg-6 p-xl-3">
			<div className={`overview-box ${cardClass}`}>
				<i className={`overview-icon ${icon}`} />
				<span className="overview-title">{title}</span>
				<div className="overview-numbers">$ {numbers}</div>
				<div className="overview-subinfo">{subInfo}</div>
			</div>
		</div>
	);
};

export default Card;
