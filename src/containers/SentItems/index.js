import React, { PureComponent } from 'react';
import Table from '../../components/UI/Table';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from 'primereact/editor';
import './style.css';

class SentItems extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					field: 'to',
					header: 'To',
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
					to: 'Customer Service -> General Inquiry',
					subject: 'Re: Inquiry',
					attachments: 'No',
					date: `12th May 2016 6:55 PM`,
					content: `I would like to inquire about`,
				},
				{
					to: 'Billing Service -> Billing Issues',
					subject: 'Your latest payment has been received',
					attachments: 'Yes',
					date: '13th May 2016 6:55 PM',
					content: `Thanks for the service`,
				},
				{
					to: 'Tech Team -> Tech Support',
					subject: 'The system will be unavailable on 25th June',
					attachments: 'Yes',
					date: '13th May 2016 6:55 PM',
					content: `The issues are not yet resolved`,
				},
			],
			formData: {
				from: {
					type: 'text',
					label: 'To',
					name: 'to',
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
			<div className="wrapper sentItems">
				<h2>Sent Items</h2>
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
					className="sent-items--dialog"
					maximizable
					contentStyle={{ marginTop: '15px' }}
					onHide={this.onToggleReplyDialog}
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
					className="sent-items--dialog"
					maximizable
					contentStyle={{ marginTop: '0px' }}
					onHide={this.onAttachmentsDialogHide}
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
export default SentItems;
