import React, { PureComponent } from 'react';
import { Widget } from 'react-chat-widget';
// import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Loader from '../../components/UI/Loader';
import { ADD_ICON } from '../../icons';
import 'react-chat-widget/lib/styles.css';
import Table from '../../components/UI/Table';
import { SampleForms } from '../../Utils/formStructure';
import ComposeMessage from '../../components/UI/ComposeMessage';
import ContentHeader from '../../components/UI/ContentHeader';

import './style.css';

class ContactUsHistory extends PureComponent {
	constructor() {
		super();
		this.state = {
			dialogVisible: false,
			fieldData: {},
			selectedFilters: {},
			selectedField: {},
			expandedRow: null,
			displayModal: false,
			updateField: false,
			globalSearch: '',
			formLoading: false,
			columns: [
				{
					field: 'department',
					header: 'Department',
					sortable: 'true',
					filter: 'true',
					filterMatchMode: 'contains',
					filterType: 'string',
					filterPlaceholder: 'Search by Department',
				},
				{
					field: 'issue',
					header: 'Issue',
					sortable: 'true',
					filter: 'true',
					filterMatchMode: 'contains',
					filterType: 'string',
					filterPlaceholder: 'Search by Issue',
				},
				{
					field: 'status',
					header: 'Status',
					sortable: 'true',
					filter: 'true',
					filterMatchMode: 'contains',
					filterType: 'string',
					filterPlaceholder: 'Search by Status',
				},
				{
					field: 'message',
					header: 'Message',
					sortable: 'true',
					filter: 'true',
					filterMatchMode: 'contains',
					filterType: 'string',
					filterPlaceholder: 'Search by Message',
				},
			],
			values: [
				{
					department: 'D01',
					issue: 'ISSO1',
					message: 'afdsaf',
				},
				{
					department: 'D02',
					issue: 'ISSO2',
					status: 'sadf',
					message: 'afdsaf',
				},
				{
					department: 'D03',
					issue: 'ISSO3',
					message: 'afdsaf',
				},
				{
					department: 'D04',
					issue: 'ISSO4',
					message: 'afdsaf',
				},
				{
					department: 'D05',
					issue: 'ISSO5',
					message: 'afdsaf',
				},
				{
					department: 'D01',
					issue: 'ISSO1',
					message: 'afdsaf',
				},
				{
					department: 'D02',
					issue: 'ISSO2',
					status: 'sadf',
					message: 'afdsaf',
				},
				{
					department: 'D03',
					issue: 'ISSO3',
					message: 'afdsaf',
				},
				{
					department: 'D04',
					issue: 'ISSO4',
					message: 'afdsaf',
				},
				{
					department: 'D05',
					issue: 'ISSO5',
					message: 'afdsaf',
				},
				{
					department: 'D01',
					issue: 'ISSO1',
					message: 'afdsaf',
				},
				{
					department: 'D02',
					issue: 'ISSO2',
					status: 'sadf',
					message: 'afdsaf',
				},
				{
					department: 'D03',
					issue: 'ISSO3',
					message: 'afdsaf',
				},
				{
					department: 'D04',
					issue: 'ISSO4',
					message: 'afdsaf',
				},
				{
					department: 'D05',
					issue: 'ISSO5',
					message: 'afdsaf',
				},
				{
					department: 'D01',
					issue: 'ISSO1',
					message: 'afdsaf',
				},
				{
					department: 'D02',
					issue: 'ISSO2',
					status: 'sadf',
					message: 'afdsaf',
				},
				{
					department: 'D03',
					issue: 'ISSO3',
					message: 'afdsaf',
				},
				{
					department: 'D04',
					issue: 'ISSO4',
					message: 'afdsaf',
				},
				{
					department: 'D05',
					issue: 'ISSO5',
					message: 'afdsaf',
				},
				{
					department: 'D01',
					issue: 'ISSO1',
					message: 'afdsaf',
				},
				{
					department: 'D02',
					issue: 'ISSO2',
					status: 'sadf',
					message: 'afdsaf',
				},
				{
					department: 'D03',
					issue: 'ISSO3',
					message: 'afdsaf',
				},
				{
					department: 'D04',
					issue: 'ISSO4',
					message: 'afdsaf',
				},
				{
					department: 'D05',
					issue: 'ISSO5',
					message: 'afdsaf',
				},
			],
			rowsPerPageOptions: [10, 50, 100],
			formData: {
				...SampleForms,
			},
		};

		this.composeMessageProps = {
			from: '',
			to: '',
			department: '',
			issue: '',
		};
		// function bindings
		this.onValueUpdate = this.onValueUpdate.bind(this);
		this.onColumnToggle = this.onColumnToggle.bind(this);
		this.onReloadUpdate = this.onReloadUpdate.bind(this);
		this.onSaveItem = this.onSaveItem.bind(this);
		this.onUpdateItem = this.onUpdateItem.bind(this);
		this.onPaginationUpdate = this.onPaginationUpdate.bind(this);
	}

	onComposeMessageClick = () => {
		this.setState({ dialogVisible: true });
	};
	hideDialogBox = () => {
		this.setState({ dialogVisible: false });
	};

	onDialogHide = () => {
		this.setState({ dialogVisible: false });
	};
	onValueUpdate = (e, form = false) => {
		if (form) {
			const formData = { ...this.state.formData };
			formData[e.target.name].value = e.target.value;
			this.setState({
				formData,
			});
		} else {
			this.setState({
				[e.target.name]: e.target.value,
			});
		}
	};

	onColumnToggle = (e) => {
		console.log(e);
		this.setState({ columns: e.value });
	};

	onReloadUpdate = () => {
		alert('RELOAD DATA');
	};

	onSaveItem = () => {
		alert('Save Item');
	};

	onUpdateItem = () => {
		alert('UpdateItem');
	};

	onPaginationUpdate = (e) => {
		alert('Pagination Update');
	};
	createExpansionTemplate = (data) => <p>{JSON.stringify(data)}</p>;

	render() {
		// let header = (
		// 	<div style={{ textAlign: 'left' }}>
		// 		<i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
		// 		<InputText
		// 			type="search"
		// 			onInput={(e) => this.setState({ globalFilter: e.target.value })}
		// 			placeholder="Global Search"
		// 			size="50"
		// 		/>
		// 	</div>
		// );

		return (
			<div className="wrapper">
				<Button
					className="p-primary"
					label="Compose New Message"
					onClick={this.onComposeMessageClick}
					icon={ADD_ICON}
				></Button>
				<Widget
					handleNewUserMessage={this.handleNewUserMessage}
					title="Welcome to Credit Culture."
					subtitle=""
					senderPlaceHolder="Type a message"
				/>
				<ContentHeader heading="Contact Us History" />
				{this.state.formLoading && <Loader />}
				<Table
					columns={this.state.columns}
					values={this.state.values}
					rowsPerPageOptions={this.state.rowsPerPageOptions}
					valueUpdate={this.onValueUpdate}
					globalFilterFunc={true}
					globalFilter={this.state.globalSearch}
					crud={true}
					formData={this.state.formData}
					selectedField={this.state.selectedField}
					updateSelectedItem={(data) => {
						const formData = { ...this.state.formData };

						// update values in formData
						for (let key in formData) {
							formData[key].value = data[key];
						}

						this.setState({
							selectedField: data,
							displayModal: true,
							updateField: true,
							formData,
						});
					}}
					addNewItem={() => {
						this.setState({
							updateField: false,
							displayModal: true,
						});
					}}
					updateField={this.state.updateField}
					displayModal={this.state.displayModal}
					modalHeading={this.state.updateField ? 'Update' : 'Add'}
					hideModal={() => {
						const formData = { ...this.state.formData };

						// reset values in formData
						for (let key in formData) {
							formData[key].value = '';
						}

						this.setState({
							displayModal: false,
							updateField: false,
							formData: { ...formData },
							selectedField: {},
						});
					}}
					saveItem={this.onSaveItem}
					updateItem={this.onUpdateItem}
					// for colToggle
					colToggle={false}
					onColumnToggle={this.onColumnToggle}
					columnOptions={this.state.columns}
					// for colResize
					colResize={true}
					// for export
					exportFunc={false}
					onExportTable={this.onExportTable}
					// for rows expand
					rowExpandFunc={true}
					expandedRow={this.state.expandedRow}
					onRowExpansion={this.createExpansionTemplate}
					onRowToggle={(e) => this.setState({ expandedRow: e.data })}
					// for col reorder
					colReorderFunc={true}
				/>
				<Dialog
					visible={this.state.dialogVisible}
					style={{ width: '55vw' }}
					onHide={this.onDialogHide}
					maximizable
					contentStyle={{ marginTop: '15px' }}
					className="compose-message-form--dialog"
				>
					<ComposeMessage hideDialogBox={this.hideDialogBox} />
				</Dialog>
			</div>
		);
	}
}

export default ContactUsHistory;
