import React from 'react';

import './monthlyAddOn.css';

class MonthlyAddOnInterestRate extends React.Component {
	render() {
		return (
			<div>
				<h4 id="monthly">MONTHLY ADD-ON INTEREST RATES</h4>
				<table id="customers">
					<thead>
						<tr>
							<th>Effective Yield</th>
							<th>Term</th>
							<th>Add-On Rate</th>
							<th>Factor Rate</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td rowSpan="5">Tier2</td>
							<td>12 months</td>
							<td>1.55%</td>
							<td>0.09883</td>
						</tr>
						<tr>
							<td>18 months</td>
							<td>1.65%</td>
							<td>0.07206</td>
						</tr>
						<tr>
							<td>24 months</td>
							<td>1.65%</td>
							<td>0.05817</td>
						</tr>
						<tr>
							<td>36 months</td>
							<td>1.75%</td>
							<td>0.04528</td>
						</tr>
						<tr>
							<td>48 months</td>
							<td>1.85%</td>
							<td>0.03933</td>
						</tr>
						<tr>
							<td rowSpan="4">Tier3</td>
							<td>12 months</td>
							<td rowSpan="4">2.50%</td>
							<td>0.10833</td>
						</tr>
						<tr>
							<td>18 months</td>
							<td>0.08055</td>
						</tr>
						<tr>
							<td>24 months</td>
							<td>0.06666</td>
						</tr>
						<tr>
							<td>36 months</td>
							<td>0.05277</td>
						</tr>

						<tr>
							<td rowSpan="4">Tier4</td>
							<td>12 months</td>
							<td rowSpan="4">3.0%</td>
							<td>0.113333</td>
						</tr>
						<tr>
							<td>18 months</td>
							<td>0.085555</td>
						</tr>
						<tr>
							<td>24 months</td>
							<td>0.071666</td>
						</tr>
						<tr>
							<td>36 months</td>
							<td>0.057777</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default React.memo(MonthlyAddOnInterestRate);
