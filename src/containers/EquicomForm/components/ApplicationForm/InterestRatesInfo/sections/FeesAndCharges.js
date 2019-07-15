import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CarService } from './CarService';
import { Checkbox } from 'primereact/checkbox';
import obj from './MonthlyAddOnInterestRateData';

class FeesAndCharges extends React.Component {
	render() {
		return (
			<div className="p-grid p-dir-col">
				<h4 style={{ marginTop: 35, textAlign: 'center' }}>FEES AND CHARGES</h4>
				{obj.map((e) => {
					return (
						<ul className="p-grid">
							<li className="p-col" style={{ padding: 0 }}>
								{e}
							</li>
						</ul>
					);
				})}
				<h4>Computation of Fixed Monthly Amortization</h4>
				<div className="container">
					<div className="circle-setup"> Desired Loan Amount </div>
					<div className="margin-fix-for-symbols">X</div>
					<div className="circle-setup">
						Factor Rate{' '}
						<span className="small-font">(based on desired term)</span>
					</div>
					<div className="margin-fix-for-symbols">=</div>
					<div className="circle-setup"> Monthly Amortization</div>
				</div>
			</div>
		);
	}
}

export default React.memo(FeesAndCharges);
