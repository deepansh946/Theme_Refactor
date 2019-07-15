import React, { PureComponent } from 'react';
import Table from '../../components/UI/Table';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import './style.css';

class Inbox extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					field: 'from',
					header: 'From',
				},
				{
					field: 'subject',
					header: 'Subject',
				},
				{
					field: 'attachments',
					header: 'Attachments',
				},
				{
					field: 'date',
					header: 'Date Time',
				},
			],
			replyDialogVisible: false,
			expandedRow: null,
			rowsPerPageOptions: [5, 10, 20],
			fieldData: {},
			selectedFilters: {},
			selectedField: {},
			displayModal: false,
			updateField: false,
			globalSearch: '',
			formLoading: false,

			values: [
				{
					from: 'Customer Service',
					subject: 'Re: Inquiry',
					attachments: 'No',
					date: `12th May 2016 6:55 PM`,
					content: `Thanks for contacting us. We will get back to you on your inquiry in 3 working days.`,
				},
				{
					from: 'Billing Service',
					subject: 'Your latest payment has been received',
					attachments: 'Yes',
					date: '13th May 2016 6:55 PM',
					content: `Thank you for paying us $XXXX.XX SGD to Credit Culture. We are processing your order. We'll get back to you soon.`,
				},
				{
					from: 'Tech Team',
					subject: 'The system will be unavailable on 25th June',
					attachments: 'No',
					date: '14th May 2016 6:55 PM',
					content: `Regretably, our online services will not be available between xx:xx am to xx:xx pm on 25th June. Inconvenience regretted.`,
				},
			],
			formData: {
				from: {
					type: 'text',
					label: 'From',
					name: 'from',
					value: '',
					validation: {
						required: true,
					},
					valid: true,
					msg: '',
				},
				subject: {
					type: 'text',
					label: 'Subject',
					name: 'subject',
					value: '',
					validation: {
						required: true,
					},
					valid: true,
					msg: '',
				},
				attachments: {
					type: 'text',
					label: 'Attachments',
					name: 'attachments',
					value: '',
					validation: {
						required: true,
					},
					valid: true,
					msg: '',
				},
				dateTime: {
					type: 'text',
					label: 'Date Time',
					name: 'dateTime',
					value: '',
					validation: {
						required: true,
					},
					valid: true,
					msg: '',
				},
			},
			message: '',
		};
	}

	onToggleReplyDialog = () => {
		this.setState({ replyDialogVisible: !this.state.replyDialogVisible });
	};

	onAttachmentsDialogHide = () => {
		this.setState({ attachmentsDialogVisible: false });
	};

	rowExpansionTemplate = (data) => {
		return (
			<div>
				{data.content ? (
					<div>
						<p>
							Dear Credit Culture Customer, <br />
							{data.content}
						</p>
						<p>
							Regards. <br />
							Credit Culture Support Team <br />
							Singapore
						</p>
						<div>
							<Button
								className="p-primary"
								label="Reply"
								onClick={(e) => this.setState({ replyDialogVisible: true })}
							/>
							<Button
								style={{ float: 'right' }}
								className="p-primary"
								label="Attachments"
								onClick={(e) =>
									this.setState({
										attachmentsDialogVisible: true,
									})
								}
								disabled={data.attachments !== 'Yes' ? 'disabled' : ''}
							/>
						</div>
					</div>
				) : (
					<div> </div>
				)}
			</div>
		);
	};

	render() {
		return (
			<div className="wrapper inbox">
				<h2>Inbox</h2>
				<Table
					columns={this.state.columns}
					values={this.state.values}
					rowsPerPageOptions={this.state.rowsPerPageOptions}
					valueUpdate={this.onValueUpdate}
					formData={this.state.formData}
					columnOptions={this.state.columns}
					colResize={true}
					expandedRow={this.state.expandedRow}
					onRowExpansion={this.rowExpansionTemplate}
					onRowToggle={(e) =>
						this.setState({ expandedRow: e.data }, () => this.state)
					}
					onColumnToggle={this.onColumnToggle}
					rowExpandFunc={true}
				/>

				<Dialog
					visible={this.state.replyDialogVisible}
					style={{ width: '52vw' }}
					maximizable
					contentStyle={{ marginTop: '15px' }}
					onHide={this.onToggleReplyDialog}
					className="sent-items--dialog"
				>
					<div style={{ margin: '5px' }}>
						<Editor
							value={this.state.message}
							onTextChange={(e) => this.setState({ message: e.htmlValue })}
							placeholder="Write your message"
						/>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginTop: '1vh',
							}}
						>
							<Button
								className="submit-reply"
								label="Reply"
								onClick={this.onToggleReplyDialog}
								icon="fa fa-reply"
							/>

							<Button
								icon="fa fa-save"
								style={{ marginLeft: '10px' }}
								className="p-primary"
								label="Save"
								onClick={this.onToggleReplyDialog}
							/>
						</div>
					</div>
				</Dialog>

				<Dialog
					header="Attachments"
					visible={this.state.attachmentsDialogVisible}
					style={{ width: '50vw' }}
					maximizable
					contentStyle={{ marginTop: '0px' }}
					onHide={this.onAttachmentsDialogHide}
					className="sent-items--dialog"
				>
					<ul>
						<li>
							{' '}
							<a
								href="http://www.africau.edu/images/default/sample.pdf"
								rel="noopener"
							>
								salary_slip.pdf (400kb)
							</a>{' '}
						</li>
						<li>
							{' '}
							<a
								href="http://www.africau.edu/images/default/sample.pdf"
								rel="noopener"
							>
								driver_license.pdf (1MB)
							</a>{' '}
						</li>
					</ul>
				</Dialog>
			</div>
		);
	}
}
export default Inbox;
