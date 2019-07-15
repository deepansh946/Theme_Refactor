import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';

import './style.css';

export default class UserHistory extends Component {
	constructor() {
		super();
		this.state = {
			globalFilter: null,
			userHistory: [
				{
					userId: 'ashish_mehra',
					pageId: 'loan page',
					function: 'view loans',
					timeOfRecording: '11 am',
					timeElapsed: 1000 * 60 * 10,
					operation: 'read',
				},
				{
					userId: 'navneet.prakash',
					pageId: 'contact us',
					function: 'submit inquiry',
					timeOfRecording: '12 am',
					timeElapsed: 1000 * 60 * 20,
					operation: 'write',
				},
			],
		};
	}

	render() {
		let header = (
			<div style={{ textAlign: 'left' }}>
				<i className="pi pi-search" style={{ margin: '4px 4px 0 0' }} />
				<InputText
					type="search"
					onInput={(e) => this.setState({ globalFilter: e.target.value })}
					placeholder="Global Search"
					size="50"
				/>
			</div>
		);
		return (
			<div className="wrapper p-grid">
				<h2>User History</h2>
				<DataTable
					value={this.state.userHistory}
					header={header}
					globalFilter={this.state.globalFilter}
					paginator={true}
					rows={10}
					rowsPerPageOptions={[5, 10, 20]}
				>
					<Column
						field="userId"
						header="User Id"
						sortable="true"
						filter="true"
						filterMatchMode="contains"
						filterType="string"
						filterPlaceholder="Search by User Id"
					/>
					<Column
						field="pageId"
						header="Page Id"
						sortable="true"
						filter="true"
						filterMatchMode="contains"
						filterType="string"
						filterPlaceholder="Search by Page Id"
					/>
					<Column
						field="function"
						header="Function"
						sortable="true"
						filter="true"
						filterMatchMode="contains"
						filterType="string"
						filterPlaceholder="Search by function"
					/>
					<Column
						field="timeOfRecording"
						header="Time of Recording"
						sortable="true"
						filter="true"
						filterMatchMode="contains"
						filterType="string"
						filterPlaceholder="Search by time of recording"
					/>
					<Column
						field="timeElapsed"
						header="Time Elapsed (Miliseconds)"
						sortable="true"
						filter="true"
						filterMatchMode="contains"
						filterType="number"
						filterPlaceholder="Search by Id"
					/>
					<Column
						field="operation"
						header="Read/Write"
						sortable="true"
						filter="true"
						filterMatchMode="contains"
						filterType="string"
						filterPlaceholder="Search by operation"
					/>
				</DataTable>
			</div>
		);
	}
}
