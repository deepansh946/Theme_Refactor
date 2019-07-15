import React from 'react';
import undertakingData from './static_data';

//console.log(undertakingData);

const Static = ({}) => {
	return (
		<div className="input-section p-float-label ">
			<p>{undertakingData.p1}</p>
			<p>{undertakingData.p2}</p>
			<p>{undertakingData.p3}</p>
			<p>{undertakingData.p4}</p>
			<p>{undertakingData.p5}</p>
			<p>{undertakingData.p6}</p>
			<p>{undertakingData.p7}</p>
			<p>{undertakingData.p8}</p>
			<p>{undertakingData.p9}</p>
			<p>{undertakingData.p10}</p>
			<p>{undertakingData.p11}</p>
			<p>{undertakingData.p12}</p>
			<p>{undertakingData.p13}</p>
		</div>
	);
};

export default React.memo(Static);
