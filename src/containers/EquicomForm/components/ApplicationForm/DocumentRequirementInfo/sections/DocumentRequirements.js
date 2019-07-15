import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import UploadFile from './uploadFile.js';
import { DropDown } from '../../util/sections/index.js';
import { Dropdown } from 'primereact/dropdown';
import '../../Personal_Info/PersonalInfo.css';

class DocumentRequirements extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fileInfo: {
				twoGovernmentIssuedId: {},
				specimenSignature: {},
			},

			tableData: [
				{
					sNo: '1',
					fileToBeAdded: 'Application Form',
					fileName: '',
				},
				{ sNo: '2', fileToBeAdded: 'Government Issued Id(1)', fileName: '' },
				{ sNo: '3', fileToBeAdded: 'Government Issued Id(2)', fileName: '' },
				{ sNo: '4', fileToBeAdded: 'Specimen Signature(1)', fileName: '' },
				{ sNo: '5', fileToBeAdded: 'Specimen Signature(2)', fileName: '' },
				{ sNo: '6', fileToBeAdded: 'Specimen Signature(3)', fileName: '' },
				{
					sNo: '7',
					fileToBeAdded: 'Latest credit card Statement of Account (SOA)',
					fileName: '',
				},
				{
					sNo: '8',
					fileToBeAdded: `Latest one (1) month proof of billing (i.e. utility bill or lease contract under applicant's name)`,
					fileName: '',
				},
			],

			employedTableData: [
				{
					sNo: '1',
					fileToBeAdded: `Latest original one (1) month payslip`,
					fileName: '',
				},
			],

			selfEmployedTableData: [
				{
					sNo: '1',
					fileToBeAdded: `SEC/DTI Certificate of Registration`,
					fileName: '',
				},
				{
					sNo: '2',
					fileToBeAdded: `Six(6) months bank statements/passbook`,
					fileName: '',
				},
				{
					sNo: '3',
					fileToBeAdded: `Authorization to verify bank accounts`,
					fileName: '',
				},
			],

			id: 2,
			employmentStatus: '',
		};
		this.showSuccess = this.showSuccess.bind(this);
		this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
		this.fileRemovalHandler = this.fileRemovalHandler.bind(this);
		this.counter = 2;
		this.employmentStatuses = [
			{ label: 'Employed', value: 'employed' },
			{ label: 'Self employed', value: 'selfEmployed' },
		];
	}

	showSuccess() {
		this.growl.show({
			severity: 'success',
			summary: 'Success Message',
			detail: 'File Uploaded',
		});
	}

	fileSelectedHandler(event) {
		console.log('file changed');
		let id;
		const tableName = event.target.dataset.table;
		if (tableName === 'tableData') {
			id = parseInt(event.target.id.replace('row-', ''));
		} else {
			id = parseInt(event.target.id.replace('employment-row-', ''));
		}
		let file;
		if (event.target.files[0]) {
			file = event.target.files[0].name;
		}
		let newArrayFromState = this.state[tableName];
		newArrayFromState[id].fileName = file;

		this.setState(
			{
				[tableName]: newArrayFromState,
			},
			() => console.log(this.state[tableName]),
		);
	}

	fileRemovalHandler(event) {
		let id = event.target.id;
		const tableName = event.target.dataset.table;
		if (tableName === 'tableData') {
			id = parseInt(event.target.id.replace('row-', ''));
		} else {
			id = parseInt(event.target.id.replace('employment-row-', ''));
		}
		console.log(id);
		let newArrayFromState = this.state[tableName];
		if (newArrayFromState[id]) {
			newArrayFromState[id].fileName = '';
		}
		this.setState(
			{
				[tableName]: newArrayFromState,
			},
			() => console.log(this.state[tableName]),
		);
	}
	fileShowTemplate(e) {
		console.log(this.state.fileInfo);

		if (e.number === '1') {
			return <span>{this.state.fileInfo}</span>;
		}
	}
	render() {
		return (
			<>
				<div className="content-section implementation">
					<Growl ref={(el) => (this.growl = el)} />

					<Dialog
						header="Upload Documents"
						visible={this.props.visible}
						style={{
							width: '98%',
							maxWidth: '700px',
							minWidth: '300px',
							height: '85%',
						}}
						onHide={this.props.onHide}
						contentStyle={{ overflow: 'auto', height: '90%' }}
						maximizable
						blockScroll={true}
					>
						<table
							style={{ marginBottom: '20px' }}
							className="requirements-table"
						>
							<tbody>
								<tr>
									<th>S.No.</th>
									<th>File to be uploaded</th>
									<th>Actions</th>
									<th>Uploaded File</th>
								</tr>
								{this.state.tableData.map((rowData, index) => {
									let newIndex = `row-${index}`;
									return (
										<tr key={newIndex}>
											<td>{rowData.sNo}</td>
											<td>{rowData.fileToBeAdded}</td>
											<td
												style={{
													width: '80px',
													textAlign: 'center',
												}}
											>
												<input
													type="file"
													id={newIndex}
													name={newIndex}
													onChange={(e) =>
														this.fileSelectedHandler(e, 'tableData')
													}
													data-table={'tableData'}
													class="hide-input"
												/>
												<label htmlFor={newIndex}>
													<i class="fa fa-upload uploadButton" />
												</label>
												<button
													id={newIndex}
													onClick={(e) =>
														this.fileRemovalHandler(e, 'tableData')
													}
													data-table={'tableData'}
												>
													<i
														data-table={'tableData'}
														id={newIndex}
														class="fa fa-close cross-icon"
													></i>
												</button>
											</td>
											<td
												style={{
													width: '150px',
													maxWidth: '150px',
													textOverflow: 'ellipsis',
													overflow: 'hidden',
													whiteSpace: 'nowrap',
													fontSize: '12px',
												}}
											>
												{this.state.tableData[index].fileName}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>

						<Dropdown
							style={{ width: '200px', margin: '0 auto', display: 'block' }}
							value={this.state.employmentStatus}
							options={this.employmentStatuses}
							onChange={(e) =>
								this.setState(
									{
										employmentStatus: e.value,
									},
									console.log(e.value),
								)
							}
							placeholder="Select Choice"
							className="table-dropdown"
						/>
						{(this.state.employmentStatus === 'employed' ||
							this.state.employmentStatus === 'selfEmployed') && (
							<table
								style={{ marginTop: '20px' }}
								className="requirements-table"
							>
								<tbody>
									<tr>
										<th>S.No.</th>
										<th>File to be uploaded</th>
										<th>Actions</th>
										<th>Uploaded File</th>
									</tr>
									{this.state[
										this.state.employmentStatus === 'employed'
											? 'employedTableData'
											: 'selfEmployedTableData'
									].map((rowData, index) => {
										let newIndex = `employment-row-${index}`;
										const tableName =
											this.state.employmentStatus === 'employed'
												? 'employedTableData'
												: 'selfEmployedTableData';
										return (
											<tr key={newIndex}>
												<td>{rowData.sNo}</td>
												<td>{rowData.fileToBeAdded}</td>
												<td
													style={{
														width: '80px',
														textAlign: 'center',
													}}
												>
													<input
														type="file"
														id={newIndex}
														name={newIndex}
														onChange={(e) => this.fileSelectedHandler(e)}
														class="hide-input"
														data-table={tableName}
													/>
													<label htmlFor={newIndex}>
														<i class="fa fa-upload uploadButton" />
													</label>
													<button
														id={newIndex}
														onClick={(e) => this.fileRemovalHandler(e)}
														data-table={tableName}
													>
														<i
															data-table={tableName}
															id={newIndex}
															class="fa fa-close cross-icon"
														></i>
													</button>
												</td>
												<td
													style={{
														width: '150px',
														maxWidth: '150px',
														textOverflow: 'ellipsis',
														overflow: 'hidden',
														whiteSpace: 'nowrap',
														fontSize: '12px',
													}}
												>
													{this.state[tableName.toString()][index].fileName}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</Dialog>
				</div>
				<div className="p-grid">
					<div className="p-col-12 p-md-12 p-sm-12 adjusting-upload">
						<Button
							label="Upload Documents"
							icon="pi pi-external-link"
							onClick={this.props.onClick}
							className=""
						/>
					</div>
					<div className="p-col-12 p-md-7 p-sm-12">
						<div className=" ">
							<ul className="list-style">
								<li>
									<i /> Duly filled-out and original signed application form{' '}
								</li>
								<li>
									<i /> Photocopy of two (2) valid government issued ID with
									three (3) specimen signature
								</li>
								<li>
									<i /> Latest credit card Statement of Account (SOA)
								</li>
								<li>Proof of residence address, either of the following:</li>
								<ul>
									<li>
										<i />
										Latest one (1) month proof of billing (i.e. utility bill or
										lease contract under applicant's name)
									</li>
									<li>
										<i /> Latest one (1) government ID with residence address
										(i.e. driver's license, postal ID, NBI, police clearance,
										etc.)
									</li>
								</ul>
							</ul>
						</div>
					</div>
					<div className="p-col-12 p-md-5 p-sm-12">
						<div className=" ">
							<ul className="list-style">
								<li>
									{' '}
									<strong>If Employed:</strong>
								</li>
								<ul>
									{' '}
									<i /> Latest original one (1) month payslip
								</ul>
								<li>
									<strong>If Self-Employed:</strong>
								</li>
								<ul>
									<li>
										{' '}
										<i /> SEC/DTI Certificate of Registration
									</li>
									<li>
										{' '}
										<i /> Six(6) months bank statements/passbook
									</li>
									<li>
										{' '}
										<i /> Authorization to verify bank accounts
									</li>
								</ul>
							</ul>
						</div>
					</div>
					<p style={{ marginLeft: '30px' }}>
						Note: Other documents may be required to process the loan.
					</p>
				</div>
			</>
		);
	}
}
export default DocumentRequirements;
