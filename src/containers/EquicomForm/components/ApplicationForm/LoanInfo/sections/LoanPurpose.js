import React from 'react';
import PurposeOption from './PurposeOption';
import './LoanPurpose.css';

const LoanPurpose = (props) => {
	const { loanPurposes, loanPurpose } = props;
	console.log(loanPurpose);
	return (
		<>
			<div className="p-sm-12">
				<h4 style={{ display: 'inline-block' }}>
					Loan Purpose <span className="required-field">*</span>
				</h4>
				{loanPurpose.isError && (
					<span className="loanPurpose--error">
						Please select atleast one option.
					</span>
				)}
				<div className="p-grid">
					{loanPurposes.map((purpose, i) => (
						<PurposeOption key={i} purpose={purpose} {...props} />
					))}
				</div>
			</div>
		</>
	);
};

export default React.memo(LoanPurpose);
