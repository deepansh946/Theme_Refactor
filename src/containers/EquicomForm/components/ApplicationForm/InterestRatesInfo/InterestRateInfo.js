import React from 'react';
import './sections/monthlyAddOn.css';
import { MonthlyAddOnInterestRate, FeesAndCharges } from './sections/index';

const InterestRateInfo = (props) => {
	return (
		<>
			<div className="p-grid">
				<div className="p-col-12 p-md-6 p-sm-12">
					<MonthlyAddOnInterestRate />
				</div>
				<div className="p-col-12 p-md-6 p-sm-12">
					<FeesAndCharges />
				</div>
				<div className="p-grid">
					<div className="small-font bottom-info">
						All loan's are subject to Bank's approval and interest rate are
						subject to change with prior notice Tier 1 interest rates apply
						subject to review and approval
					</div>
					<div className="small-font bottom-info">
						This computation serves as a guide only. The bank at it's sole
						discretion, shall determine the final loan amount, term, and
						amortization to be approved
					</div>
				</div>
			</div>
		</>
	);
};

export default InterestRateInfo;
