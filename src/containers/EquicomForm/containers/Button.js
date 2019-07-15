import React from 'react';
import { Button } from 'primereact/button';
import '../components/ApplicationForm/Personal_Info/PersonalInfo.css';
const Buttons = (props) => {
	const {
		onDraftButton,
		onSubmitButton,
		button: { draftBtnDisabled, submitBtnDisabled },
	} = props;

	return (
		<div
			className="p-grid"
			style={{
				margin: '0 auto	',
				display: 'flex',
				alignItems: 'center',
				alignContent: 'center',
				textAlign: 'center',
			}}
		>
			<div className="p-col-12 p-md-6 p-sm-6">
				<Button
					label="Save"
					onClick={onDraftButton}
					disabled={draftBtnDisabled}
					style={{ marginRight: '.5em', width: '80px' }}
				/>
			</div>
			<div className="p-col-12 p-md-6 p-sm-6">
				<Button
					label="Submit"
					onClick={onSubmitButton}
					disabled={submitBtnDisabled}
					style={{ width: '80px', marginRight: '.5em' }}
				/>
			</div>
		</div>
	);
};
export default Buttons;
