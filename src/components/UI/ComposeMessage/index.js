import React, { Component } from 'react';
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Editor } from 'primereact/editor';
import { SEND_ICON, CROSS_ICON } from '../../../icons';

import './style.css';

export default class ComposeMessage extends Component {
	constructor() {
		super();
		this.state = {
			from: ``,
			to: ``,
			message: ``,
		};
	}

	componentWillReceiveProps = () => {
		this.setState(this.props);
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.hideDialogBox();
	};

	onCancel = (event) => {
		event.preventDefault();
		this.props.hideDialogBox();
	};

	onMessageChange = (event) => {
		this.setState({ message: event.target.value });
	};

	render() {
		return (
			<div>
				<form className="compose-message-form">
					<Fieldset legend="Compose Your Email Message">
						<div className="form-group">
							<span className="p-float-label">
								<InputText id="from" />
								<label htmlFor="from">From:</label>
							</span>
						</div>

						<div className="form-group">
							<span className="p-float-label">
								<InputText id="to" />
								<label htmlFor="to">To:</label>
							</span>
						</div>
						<div className="form-group">
							<span className="p-float-label">
								<InputText id="cc" />
								<label htmlFor="cc">CC:</label>
							</span>
						</div>

						<div className="form-group">
							<FileUpload
								name="demo[]"
								url="./upload"
								multiple={true}
								accept="image/*, .pdf, .docx"
								maxFileSize={1000000}
							/>
						</div>

						{/* <div>
            <InputTextarea rows={5} cols={30} placeholder="Enter your message" value={this.state.message} onChange={this.onMessageChange} style={{ width: '100%' }}></InputTextarea>
          </div> */}

						<Editor
							value={this.state.message}
							onTextChange={(e) => this.setState({ message: e.htmlValue })}
							placeholder="Write your message"
						/>

						<Button
							label="Send"
							className="submit p-button-primary"
							onClick={this.onSubmit}
							icon={SEND_ICON}
						></Button>
						<Button
							label="Cancel"
							className="cancel p-button-primary"
							onCancel={this.onCancel}
							icon={CROSS_ICON}
						></Button>
					</Fieldset>
				</form>
			</div>
		);
	}
}
